// 游戏状态
let gameState = {
    // 玩家属性
    performance: 75, // 工作表现
    mental: 80,      // 心理健康
    energy: 70,      // 精力（策略资源）
    
    // 收集的技能和盟友
    skills: [],
    allies: [],
    favors: 0,       // 人情（盟友资源）
    allyLedger: {},  // 盟友关系账本：{ [name]: { trust, debt } }
    routeLock: null, // 'tech' | 'politics' | 'jump' | 'boundary'
    
    // 当前场景
    currentScene: 'start'
};

// 难度配置（只影响“节奏/触发阈值/效果倍率”，不改剧情结构）
const DIFFICULTY_CONFIGS = {
    normal: {
        label: '普通',
        effectsMultiplier: 1,
        endings: {
            burnout: { mentalMax: 20 },
            layoff: { performanceMax: 20 },
            promotion: { performanceMin: 90, mentalMin: 30 },
            workLifeBalance: { mentalMin: 85, performanceMin: 60 }
        }
    },
    hardcore: {
        label: '硬核',
        // 硬核：负面更疼、正面更克制（整体更难）
        effectsMultiplier: 1,
        negativeMultiplier: 1.35,
        positiveMultiplier: 0.85,
        endings: {
            burnout: { mentalMax: 28 },
            layoff: { performanceMax: 28 },
            promotion: { performanceMin: 94, mentalMin: 45 },
            workLifeBalance: { mentalMin: 90, performanceMin: 70 }
        }
    }
};

function applyDifficultyDelta(rawDelta, difficulty) {
    if (typeof rawDelta !== 'number') return rawDelta;
    let delta = rawDelta;
    if (rawDelta < 0 && difficulty.negativeMultiplier) delta = Math.round(rawDelta * difficulty.negativeMultiplier);
    if (rawDelta > 0 && difficulty.positiveMultiplier) delta = Math.round(rawDelta * difficulty.positiveMultiplier);
    return delta;
}

function applyRunTagDelta(rawDelta, tag) {
    // 组织风格对数值的“轻影响”，不改剧情结构
    if (typeof rawDelta !== 'number') return rawDelta;
    let delta = rawDelta;
    if (tag === 'push') {
        // 强推：负面更疼，正面更香（高风险高回报）
        if (delta < 0) delta = Math.round(delta * 1.15);
        if (delta > 0) delta = Math.round(delta * 1.10);
    } else if (tag === 'politics') {
        // 政治型：对心理更敏感（我们在 mental 里额外处理），这里保持中性
    } else if (tag === 'hands_off') {
        // 放养：正面更小（资源少），负面略小（自由度高）
        if (delta > 0) delta = Math.round(delta * 0.9);
        if (delta < 0) delta = Math.round(delta * 0.95);
    } else if (tag === 'balanced') {
        // 节奏友好：负面略小
        if (delta < 0) delta = Math.round(delta * 0.9);
    }
    return delta;
}

// DOM元素引用
const storyText = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices-container');
const performanceBar = document.getElementById('performance-bar');
const mentalBar = document.getElementById('mental-bar');
const energyBar = document.getElementById('energy-bar');
const performanceValue = document.getElementById('performance-value');
const mentalValue = document.getElementById('mental-value');
const energyValue = document.getElementById('energy-value');
const favorsValue = document.getElementById('favors-value');
const skillsList = document.getElementById('skills-list');
const alliesList = document.getElementById('allies-list');
const restartBtn = document.getElementById('restart-btn');
const toastContainer = document.getElementById('toast-container');
const difficultySelect = document.getElementById('difficulty-select');
const hintText = document.getElementById('hint-text');
const achievementsBtn = document.getElementById('achievements-btn');
let lastOutcome = null;
let lastChoices = [];
let runTag = null;

// 盟友关系账本：只对“明确的盟友人名”生效，泛化盟友不入账本
const TRACKED_ALLIES = new Set(['小林', '王哥', '小陈', 'HR小王', '李总', '赵总', '张总']);

function normalizeAllyName(name) {
    if (typeof name !== 'string') return null;
    const n = name.trim();
    if (TRACKED_ALLIES.has(n)) return n;
    return null;
}

function getDifficulty() {
    const stored = window.localStorage.getItem('difficulty');
    if (stored && DIFFICULTY_CONFIGS[stored]) return stored;
    if (difficultySelect && DIFFICULTY_CONFIGS[difficultySelect.value]) return difficultySelect.value;
    return 'normal';
}

function setDifficulty(value) {
    if (!DIFFICULTY_CONFIGS[value]) value = 'normal';
    window.localStorage.setItem('difficulty', value);
    if (difficultySelect) difficultySelect.value = value;
}

function showToast(title, message, type = 'info', durationMs = 2200) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.classList.add('toast');
    if (type === 'skill') toast.classList.add('toast-skill');
    if (type === 'ally') toast.classList.add('toast-ally');
    if (type === 'warning') toast.classList.add('toast-warning');
    if (type === 'achievement') toast.classList.add('toast-skill');

    toast.innerHTML = `
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
    `;

    toastContainer.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    window.setTimeout(() => {
        toast.classList.remove('show');
        window.setTimeout(() => toast.remove(), 250);
    }, durationMs);
}

const ACHIEVEMENT_DEFS = [
    { id: 'a_paper_trail', name: '留痕自保', desc: '获得技能：留痕', when: (s) => s.skills.includes('留痕') },
    { id: 'a_evidence_chain', name: '证据链玩家', desc: '获得技能：证据链', when: (s) => s.skills.includes('证据链') },
    { id: 'a_negotiator', name: '谈判高手', desc: '获得技能：谈判', when: (s) => s.skills.includes('谈判') },
    { id: 'a_process', name: '机制建设者', desc: '获得技能：流程优化', when: (s) => s.skills.includes('流程优化') },
    { id: 'a_survivor', name: '极限自救', desc: '触发并成功走出濒临结局', when: (s) => s.flags?.savedFromBurnout || s.flags?.savedFromLayoff },
    { id: 'a_friendship', name: '人情往来', desc: '人情 >= 2', when: (s) => s.favors >= 2 },
    { id: 'a_hardcore', name: '硬核生存', desc: '以硬核难度通关', when: (s) => getDifficulty() === 'hardcore' },
];

function computeAchievements() {
    return ACHIEVEMENT_DEFS.filter(a => a.when(gameState));
}

function loadSavedProgress() {
    try {
        const raw = window.localStorage.getItem('progress');
        return raw ? JSON.parse(raw) : { achievements: {}, meta: {} };
    } catch {
        return { achievements: {}, meta: {} };
    }
}

function saveProgress(progress) {
    try {
        window.localStorage.setItem('progress', JSON.stringify(progress));
    } catch {
        // ignore
    }
}

function getRunTag() {
    // 本局组织风格（贯穿影响）
    if (runTag) return runTag;
    try {
        const raw = window.localStorage.getItem('run_tag');
        if (raw) runTag = raw;
    } catch {
        // ignore
    }
    return runTag;
}

function setRunTag(tag) {
    runTag = tag;
    try {
        window.localStorage.setItem('run_tag', tag);
    } catch {
        // ignore
    }
}

function rollRunTag() {
    // 组织风格：每局随机一个
    const tags = [
        { id: 'push', name: '强推型', desc: '目标更激进，代价更大' },
        { id: 'politics', name: '政治型', desc: '口径与定性更重要' },
        { id: 'hands_off', name: '放养型', desc: '资源更少但自由度更高' },
        { id: 'balanced', name: '节奏友好', desc: '更接受边界与机制' },
    ];
    const pick = tags[Math.floor(Math.random() * tags.length)];
    setRunTag(pick.id);
    return pick;
}

function persistAchievements(earned) {
    const progress = loadSavedProgress();
    progress.achievements = progress.achievements || {};
    for (const a of earned) progress.achievements[a.id] = true;
    progress.meta = progress.meta || {};
    progress.meta.lastPlayedAt = Date.now();
    saveProgress(progress);
}

function hasAchievement(id) {
    const progress = loadSavedProgress();
    return !!progress.achievements?.[id];
}

function renderAchievements() {
    const wrap = document.createElement('div');
    wrap.classList.add('run-summary-achievements');
    const title = document.createElement('div');
    title.classList.add('run-summary-box-title');
    title.textContent = '称号';
    wrap.appendChild(title);

    const list = document.createElement('div');
    list.classList.add('run-summary-achievements-list');
    const earned = computeAchievements();
    if (earned.length === 0) {
        const empty = document.createElement('div');
        empty.textContent = '（本局未解锁）';
        list.appendChild(empty);
    } else {
        earned.forEach(a => {
            const item = document.createElement('div');
            item.classList.add('achievement-item');
            item.innerHTML = `<div class=\"achievement-name\">${a.name}</div><div class=\"achievement-desc\">${a.desc}</div>`;
            list.appendChild(item);
        });
    }
    wrap.appendChild(list);
    return wrap;
}

function getRunTagLabel(tag) {
    if (tag === 'push') return '强推型';
    if (tag === 'politics') return '政治型';
    if (tag === 'hands_off') return '放养型';
    if (tag === 'balanced') return '节奏友好';
    return tag || '未知';
}

function renderRunSummary(outcomeSceneId) {
    const summary = document.createElement('div');
    summary.classList.add('run-summary');

    const title = document.createElement('h3');
    title.textContent = '本局总结';
    summary.appendChild(title);

    const stats = document.createElement('div');
    stats.classList.add('run-summary-stats');
    const difficultyKey = getDifficulty();
    const difficultyLabel = DIFFICULTY_CONFIGS[difficultyKey]?.label || difficultyKey;
    const tagLabel = getRunTagLabel(getRunTag());
    stats.innerHTML = `
        <div class="run-stat"><span class="run-k">工作表现</span><span class="run-v">${gameState.performance}%</span></div>
        <div class="run-stat"><span class="run-k">心理健康</span><span class="run-v">${gameState.mental}%</span></div>
        <div class="run-stat"><span class="run-k">精力</span><span class="run-v">${gameState.energy}%</span></div>
        <div class="run-stat"><span class="run-k">人情</span><span class="run-v">${gameState.favors}</span></div>
        <div class="run-stat"><span class="run-k">难度</span><span class="run-v">${difficultyLabel}</span></div>
        <div class="run-stat"><span class="run-k">组织风格</span><span class="run-v">${tagLabel}</span></div>
        <div class="run-stat"><span class="run-k">结局</span><span class="run-v">${outcomeSceneId}</span></div>
    `;
    summary.appendChild(stats);

    const lists = document.createElement('div');
    lists.classList.add('run-summary-lists');

    const skillBox = document.createElement('div');
    skillBox.classList.add('run-summary-box');
    skillBox.innerHTML = `<div class="run-summary-box-title">技能</div>`;
    const skillList = document.createElement('div');
    skillList.classList.add('run-summary-items');
    if (gameState.skills.length === 0) {
        skillList.textContent = '（无）';
    } else {
        gameState.skills.forEach(s => {
            const it = document.createElement('span');
            it.classList.add('inventory-item');
            it.textContent = s;
            skillList.appendChild(it);
        });
    }
    skillBox.appendChild(skillList);
    lists.appendChild(skillBox);

    const allyBox = document.createElement('div');
    allyBox.classList.add('run-summary-box');
    allyBox.innerHTML = `<div class="run-summary-box-title">盟友</div>`;
    const allyList = document.createElement('div');
    allyList.classList.add('run-summary-items');
    if (gameState.allies.length === 0) {
        allyList.textContent = '（无）';
    } else {
        gameState.allies.forEach(a => {
            const it = document.createElement('span');
            it.classList.add('inventory-item', 'ally-item');
            it.textContent = a;
            allyList.appendChild(it);
        });
    }
    allyBox.appendChild(allyList);
    lists.appendChild(allyBox);

    summary.appendChild(lists);
    summary.appendChild(renderAchievements());
    // 本局解锁的称号写入跨局存档
    persistAchievements(computeAchievements());

    const replay = document.createElement('div');
    replay.classList.add('run-summary-replay');
    const replayTitle = document.createElement('div');
    replayTitle.classList.add('run-summary-box-title');
    replayTitle.textContent = '关键选择';
    replay.appendChild(replayTitle);

    const replayList = document.createElement('ol');
    replayList.classList.add('run-summary-replay-list');
    const items = (lastChoices || []).slice(-3);
    if (items.length === 0) {
        const li = document.createElement('li');
        li.textContent = '（无）';
        replayList.appendChild(li);
    } else {
        items.forEach(i => {
            const li = document.createElement('li');
            const title = getSceneTitle(i.sceneId);
            li.textContent = `${title}：${i.text}`;
            replayList.appendChild(li);
        });
    }
    replay.appendChild(replayList);
    summary.appendChild(replay);
    return summary;
}

function isEndingSceneId(sceneId) {
    // 引擎层面的四个“硬结局”
    return ['burnout', 'layoff', 'promotion', 'work_life_balance'].includes(sceneId);
}

function isEdgeEndingSceneId(sceneId) {
    return ['burnout_edge', 'layoff_edge'].includes(sceneId);
}

function getSceneTitle(sceneId) {
    const scene = window.scenes && window.scenes[sceneId];
    const text = scene && typeof scene.text === 'string' ? scene.text : '';
    const m = text.match(/<h2>(.*?)<\/h2>/i);
    if (m && m[1]) {
        return m[1].replace(/<[^>]+>/g, '').trim() || sceneId;
    }
    return sceneId;
}

function buildAchievementsModal() {
    const backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop');
    backdrop.id = 'achievements-modal';

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const header = document.createElement('div');
    header.classList.add('modal-header');

    const title = document.createElement('div');
    title.classList.add('modal-title');
    title.textContent = '称号图鉴';
    header.appendChild(title);

    const close = document.createElement('button');
    close.classList.add('modal-close');
    close.textContent = '关闭';
    close.addEventListener('click', () => backdrop.classList.remove('show'));
    header.appendChild(close);

    modal.appendChild(header);

    const grid = document.createElement('div');
    grid.classList.add('ach-grid');

    const progress = loadSavedProgress();
    const earned = progress.achievements || {};
    for (const a of ACHIEVEMENT_DEFS) {
        const card = document.createElement('div');
        const isEarned = !!earned[a.id];
        card.classList.add('ach-card');
        if (isEarned) card.classList.add('earned');
        card.innerHTML = `
            <div class="ach-name">${a.name}</div>
            <div class="ach-desc">${a.desc}</div>
            <div class="ach-status ${isEarned ? 'earned' : ''}">${isEarned ? '已解锁' : '未解锁'}</div>
        `;
        grid.appendChild(card);
    }

    modal.appendChild(grid);
    backdrop.appendChild(modal);

    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.classList.remove('show');
    });

    return backdrop;
}

// 初始化游戏
async function initGame() {
    gameState = {
        performance: 75,
        mental: 80,
        energy: 70,
        skills: [],
        allies: [],
        favors: 0,
        allyLedger: {},
        routeLock: null,
        currentScene: 'start',
        flags: { savedFromBurnout: false, savedFromLayoff: false, relationshipEventTriggered: false, earnedAchievements: {}, drama: { rescue: {}, betray: {} } },
        cycle: { choiceCount: 0, lastInjectedAt: 0 }
    };
    lastOutcome = null;
    lastChoices = [];
    
    try {
        // 如果启用 JSON 场景加载，则先加载再开始游戏
        if (window.USE_SCENE_DATA === true && typeof window.initScenes === "function") {
            await window.initScenes();
        }

        // 开局确定本局组织风格
        const rolled = rollRunTag();
        showToast('本局组织风格', `${rolled.name}：${rolled.desc}`, 'info', 1800);

        // 微继承：根据跨局称号给一点点开局优势（不破坏平衡，增强复玩动力）
        const progress = loadSavedProgress();
        const earned = progress.achievements || {};
        if (earned.a_process) gameState.energy = Math.min(100, gameState.energy + 3);
        if (earned.a_paper_trail) gameState.performance = Math.min(100, gameState.performance + 2);
        if (earned.a_friendship) gameState.favors = Math.min(9, gameState.favors + 1);

        loadScene(gameState.currentScene);
        updateStats();
    } catch (error) {
        console.error("游戏初始化错误:", error);
        
        // 显示调试信息
        storyText.innerHTML = `
            <h2>游戏加载错误</h2>
            <p>很抱歉，游戏初始化时遇到了问题。</p>
            <p>错误信息: ${error.message}</p>
            <p>请检查控制台获取更多信息。</p>
            <p>尝试刷新页面，或联系开发者获取帮助。</p>
        `;
        
        // 添加重启按钮
        choicesContainer.innerHTML = '';
        const debugBtn = document.createElement('button');
        debugBtn.classList.add('choice-btn');
        debugBtn.textContent = "重新加载游戏";
        debugBtn.addEventListener('click', () => {
            window.location.reload();
        });
        choicesContainer.appendChild(debugBtn);
    }
}

// 加载场景
function loadScene(sceneId) {
    if (window.DEBUG === true) console.log(`尝试加载场景: ${sceneId}`);
    
    // 确保scenes对象存在
    if (typeof scenes === 'undefined' || scenes === null) {
        console.error('scenes对象未定义！使用全局window对象');
        
        // 在全局作用域创建scenes对象
        window.scenes = window.scenes || {};
        
        // 如果introScenes中有start场景，则使用它
        if (typeof introScenes !== 'undefined' && introScenes.start) {
            window.scenes.start = introScenes.start;
        } else {
            // 否则创建一个基本的错误场景
            window.scenes.start = {
                text: `
                    <h2>游戏加载错误</h2>
                    <p>无法加载游戏场景。请刷新页面重试。</p>
                `,
                choices: [
                    { text: "刷新页面", nextScene: "start" }
                ]
            };
        }
    }
    
    // 明确使用全局scenes对象
    const scene = window.scenes[sceneId];
    
    if (!scene) {
        console.error(`场景 "${sceneId}" 不存在！`);
        if (window.DEBUG === true) console.log(`当前scenes对象包含的场景:`, Object.keys(window.scenes));
        
        // 如果找不到请求的场景，则回退到start场景
        if (sceneId !== 'start' && window.scenes.start) {
            console.log('回退到start场景');
            loadScene('start');
            return;
        }
        
        // 如果连start场景都没有，显示错误信息
        storyText.innerHTML = `
            <h2>场景加载错误</h2>
            <p>无法找到场景: "${sceneId}"</p>
            <p>请刷新页面重试。</p>
        `;
        
        // 添加刷新按钮
        choicesContainer.innerHTML = '';
        const refreshBtn = document.createElement('button');
        refreshBtn.classList.add('choice-btn');
        refreshBtn.textContent = "刷新页面";
        refreshBtn.addEventListener('click', () => {
            window.location.reload();
        });
        choicesContainer.appendChild(refreshBtn);
        
        return;
    }
    
    if (window.DEBUG === true) console.log(`成功加载场景: ${sceneId}`);
    
    // 设置当前场景
    gameState.currentScene = sceneId;
    
    // 显示场景文本（支持少量动态渲染）
    let debtEventContext = null;
    if (sceneId === 'ally_debt_event') {
        const worst = getWorstDebtAlly();
        const who = worst?.ally || '盟友';
        const debt = worst?.debt || 0;
        debtEventContext = { who, debt };
        storyText.innerHTML = `
            <h2>关系反噬：${who}</h2>
            <p>你发现对方的语气变了：不再热情、开始拖延、甚至不回消息。</p>
            <p>你突然意识到：你把“求助”当成了习惯，而对方把它当成了成本。</p>
            <p>你们之间的账现在是：<strong>债 ${debt}</strong>。</p>
            <p>这一次，你不只是在处理一件事，你是在处理<strong>一段关系</strong>。</p>
        `;
    } else {
        storyText.innerHTML = scene.text;
    }

    // 结局页追加“本局总结”
    if (isEndingSceneId(sceneId)) {
        storyText.appendChild(renderRunSummary(sceneId));
    }
    
    // 清除现有选项
    choicesContainer.innerHTML = '';
    if (hintText) hintText.textContent = '';

    let hiddenEndingGateCount = 0;

    // 创建新选项
    let choicesToRender = [...scene.choices];
    if (sceneId === 'ally_debt_event' && debtEventContext) {
        // 根据盟友角色渲染更具体的选项文案（P0 收官）
        const who = debtEventContext.who;
        const choiceTemplates = {
            '小林': {
                repay: '立刻还一次人情：帮小林顶一班/扛一段（耗精力）',
                trade: '谈交换：我可以帮，但你也要帮我顶一次（谈判）',
                tough: '硬扛：这次不求助了（关系继续变薄）',
            },
            '王哥': {
                repay: '立刻还一次人情：帮王哥过一遍材料/口径（耗精力）',
                trade: '谈交换：你帮我稳口径，我帮你兜一次风险（谈判）',
                tough: '硬扛：不找王哥了（老江湖记账很快）',
            },
            '小陈': {
                repay: '立刻还一次人情：替小陈顶一次需求对齐会（耗精力）',
                trade: '谈交换：口径给我，你要的资源我来谈（谈判）',
                tough: '硬扛：不求助小陈了（但口径会变）',
            },
            'HR小王': {
                repay: '立刻还一次人情：按流程补齐材料，帮HR收尾（耗精力）',
                trade: '谈交换：你按流程记录可以，但标准要写清（谈判）',
                tough: '硬扛：不走HR通道（风险会更高）',
            }
        };
        const t = choiceTemplates[who];
        if (t && choicesToRender.length >= 3) {
            choicesToRender = choicesToRender.map((c, idx) => {
                const nc = { ...c };
                if (idx === 0) nc.text = t.repay;
                if (idx === 1) nc.text = t.trade;
                if (idx === 2) nc.text = t.tough;
                return nc;
            });
        }
    }

    // 彩蛋：有跨局称号的人，在开局会多一个“熟练者”选项
    if (sceneId === 'start') {
        const progress = loadSavedProgress();
        const hasAny = progress.achievements && Object.keys(progress.achievements).length > 0;
        if (hasAny) {
            choicesToRender.unshift({
                text: '（继承）带着经验入场：先定口径与留痕',
                nextScene: 'training_efficiency',
                effects: { performance: 2, mental: 1, energy: 2, skills: ['留痕'] }
            });
        }
    }

    choicesToRender.forEach((choice, index) => {
        if (shouldHideChoice(choice)) {
            hiddenEndingGateCount += 1;
            return;
        }
        if (shouldHideDebugChoice(choice)) return;
        // 硬门槛：需要特定技能/人情，否则该选项不出现
        if (shouldHideHardGatedChoice(choice)) return;
        const choiceBtn = document.createElement('button');
        choiceBtn.classList.add('choice-btn');
        choiceBtn.appendChild(renderChoiceContent(choice));
        
        // 添加选择效果
        choiceBtn.addEventListener('click', () => {
            if (window.DEBUG === true) console.log(`点击选项: ${choice.text}, 下一场景: ${choice.nextScene}`);
            handleChoice(choice);
        });
        
        choicesContainer.appendChild(choiceBtn);
    });

    // 轻提示：当终局门被隐藏时，给玩家一个“缺筹码”的叙事提醒（不打断流程）
    if (hiddenEndingGateCount > 0 && hintText) {
        hintText.textContent = '你隐约感觉终局将至，但你还缺一点筹码（技能/盟友/战绩/精力）。';
    }
    
    // 滚动到顶部
    window.scrollTo(0, 0);
}

function shouldHideChoice(choice) {
    // 软门槛：终局门需要“筹码”才出现，避免过早跳到终局导致割裂
    const text = (choice.text || '');
    if (!text.includes('（终局门）')) return false;

    // 路线锁定后，隐藏无关终局门（仍保留部分跨轨可能性通过终局门内部选择实现）
    if (gameState.routeLock) {
        if (gameState.routeLock === 'tech' && text.includes('离场路线')) return true;
        if (gameState.routeLock === 'tech' && text.includes('政治路线')) return true;
        if (gameState.routeLock === 'politics' && text.includes('技术路线')) return true;
        if (gameState.routeLock === 'politics' && text.includes('离场路线')) return true;
        if (gameState.routeLock === 'jump' && (text.includes('技术路线') || text.includes('政治路线'))) return true;
        if (gameState.routeLock === 'boundary' && text.includes('政治路线')) return true;
    }

    // 终局门显示条件：至少满足其一
    // - 获得关键能力（留痕/证据链/谈判/流程优化/口径）
    // - 有盟友（至少 1）
    // - 工作表现或心理健康达到一定水平
    // - 或者精力已经很低（提醒玩家该做终局选择了）
    const keySkills = ['留痕', '证据链', '谈判', '流程优化', '口径'];
    const hasKeySkill = keySkills.some(s => gameState.skills.includes(s));
    const hasAlly = gameState.allies.length > 0;
    const hasFavors = gameState.favors > 0;
    const hasStats = gameState.performance >= 70 || gameState.mental >= 75;
    const isExhausted = gameState.energy <= 25;

    return !(hasKeySkill || hasAlly || hasFavors || hasStats || isExhausted);
}

function renderChoiceContent(choice) {
    const wrap = document.createElement('div');

    const main = document.createElement('span');
    main.classList.add('choice-main');
    main.textContent = choice.text;
    wrap.appendChild(main);

    const tags = buildEffectTags(choice.effects);
    if (tags.length > 0) {
        const meta = document.createElement('div');
        meta.classList.add('choice-meta');
        tags.forEach(t => meta.appendChild(t));
        wrap.appendChild(meta);
    }

    return wrap;
}

function buildEffectTags(effects) {
    if (!effects) return [];
    const tags = [];

    const difficulty = DIFFICULTY_CONFIGS[getDifficulty()] || DIFFICULTY_CONFIGS.normal;
    const applyPreviewScaling = (rawDelta) => {
        return applyDifficultyDelta(rawDelta, difficulty);
    };

    const p = applyPreviewScaling(effects.performance);
    const m = applyPreviewScaling(effects.mental);
    const e = applyPreviewScaling(effects.energy);
    const f = applyPreviewScaling(effects.favors);

    if (typeof p === 'number' && p !== 0) tags.push(makeTag(`工作表现 ${formatDelta(p)}`, p));
    if (typeof m === 'number' && m !== 0) tags.push(makeTag(`心理健康 ${formatDelta(m)}`, m));
    if (typeof e === 'number' && e !== 0) tags.push(makeTag(`精力 ${formatDelta(e)}`, e));
    if (typeof f === 'number' && f !== 0) tags.push(makeTag(`人情 ${formatDelta(f)}`, f));

    if (Array.isArray(effects.skills)) {
        effects.skills.forEach(skill => tags.push(makeTag(`+${skill}`, 1, 'neutral')));
    }
    if (Array.isArray(effects.allies)) {
        effects.allies.forEach(ally => tags.push(makeTag(`+盟友 ${ally}`, 1, 'neutral')));
    }
    if (typeof effects.routeLock === 'string') {
        const map = { tech: '锁定：技术', politics: '锁定：政治', jump: '锁定：离场', boundary: '锁定：边界' };
        tags.push(makeTag(map[effects.routeLock] || `锁定：${effects.routeLock}`, 0, 'neutral'));
    }

    return tags;
}

function formatDelta(n) {
    return n > 0 ? `+${n}` : `${n}`;
}

function makeTag(text, delta, overrideKind) {
    const tag = document.createElement('span');
    tag.classList.add('choice-tag');
    tag.textContent = text;

    const kind = overrideKind || (delta > 0 ? 'good' : delta < 0 ? 'bad' : 'neutral');
    tag.classList.add(kind);
    return tag;
}

function shouldHideHardGatedChoice(choice) {
    const text = (choice.text || '');
    // 约定：出现这些前缀即表示“硬门槛”
    // 这些选项会提供明显更优解，所以必须通过“拿到筹码”才能看到
    const skillGateRules = [
        { token: '（证据链硬解锁）', required: ['证据链'] },
        { token: '（留痕硬解锁）', required: ['留痕'] },
        { token: '（谈判硬解锁）', required: ['谈判'] },
        { token: '（流程优化硬解锁）', required: ['流程优化'] },
        { token: '（口径硬解锁）', required: ['口径'] },
        { token: '（盟友硬解锁）', requiredFavors: 1 }
    ];

    const matched = skillGateRules.find(r => text.includes(r.token));
    if (!matched) return false;

    if (matched.required && matched.required.some(s => !gameState.skills.includes(s))) return true;
    if (matched.requiredFavors && gameState.favors < matched.requiredFavors) return true;
    return false;
}

function shouldHideDebugChoice(choice) {
    const text = (choice.text || '');
    if (!text.includes('（调试入口）')) return false;
    return window.DEBUG !== true;
}

function shouldInjectAllyDebtEvent() {
    // 轻量机制：当你的人情债累积到一定程度，偶尔会触发“关系变薄/背刺风险”事件
    // 由于引擎没有复杂条件分支，这里先用“弹提示 + 小惩罚”作为反馈闭环
    const ledger = gameState.allyLedger || {};
    const entries = Object.entries(ledger);
    if (entries.length === 0) return false;
    const worst = entries.reduce((a, b) => (b[1].debt || 0) > (a[1].debt || 0) ? b : a, entries[0]);
    const worstDebt = worst[1].debt || 0;
    return worstDebt >= 3;
}

function getWorstDebtAlly() {
    const ledger = gameState.allyLedger || {};
    const entries = Object.entries(ledger);
    if (entries.length === 0) return null;
    const worst = entries.reduce((a, b) => (b[1].debt || 0) > (a[1].debt || 0) ? b : a, entries[0]);
    return { ally: worst[0], debt: worst[1].debt || 0 };
}

function getAllyTrust(name) {
    const n = normalizeAllyName(name);
    if (!n) return 0;
    return gameState.allyLedger?.[n]?.trust || 0;
}

function getAllyDebt(name) {
    const n = normalizeAllyName(name);
    if (!n) return 0;
    return gameState.allyLedger?.[n]?.debt || 0;
}

function maybeInjectRelationshipDrama(nextSceneId, skipAutoInject) {
    // P0：关系戏剧化（救场/背刺），让盟友“活”起来
    // 规则（轻量且可解释）：
    // - 有盟友且关系债较高：小概率触发背刺
    // - 有盟友且信任较高：小概率触发救场
    // - 每局每类最多一次，避免刷屏
    if (!gameState.allies || gameState.allies.length === 0) return false;

    const candidates = [
        { ally: '小林', rescue: 'ally_rescue_event', betray: 'ally_betray_event' },
        { ally: '王哥', rescue: 'ally_rescue_wangge', betray: 'ally_betray_wangge' },
        { ally: '小陈', rescue: 'ally_rescue_xiaochen', betray: 'ally_betray_xiaochen' },
        { ally: 'HR小王', rescue: 'ally_rescue_hr', betray: 'ally_betray_hr' },
    ];

    gameState.flags = gameState.flags || {};
    gameState.flags.drama = gameState.flags.drama || { rescue: {}, betray: {} };

    if (skipAutoInject.includes(gameState.currentScene) || skipAutoInject.includes(nextSceneId)) return false;

    for (const c of candidates) {
        if (!gameState.allies.includes(c.ally)) continue;
        const trust = getAllyTrust(c.ally);
        const debt = getAllyDebt(c.ally);

        // 背刺：债高且信任不够（满足条件更偏必触发一次，而不是纯概率）
        if (!gameState.flags.drama.betray[c.ally] && debt >= 3 && trust <= 1) {
            if (Math.random() < 0.55 && window.scenes?.[c.betray]) {
                gameState.flags.drama.betray[c.ally] = true;
                loadScene(c.betray);
                updateStats();
                return true;
            }
        }

        // 救场：信任高且债不爆（更常见一些，增强“关系是保险”的体感）
        if (!gameState.flags.drama.rescue[c.ally] && trust >= 3 && debt <= 3) {
            if (Math.random() < 0.30 && window.scenes?.[c.rescue]) {
                gameState.flags.drama.rescue[c.ally] = true;
                loadScene(c.rescue);
                updateStats();
                return true;
            }
        }
    }

    return false;
}

function getDebtEventSceneForAlly(ally) {
    // 统一模板，但会在 loadScene 时按盟友动态渲染内容
    return 'ally_debt_event';
}

// 处理选择
function handleChoice(choice) {
    if (window.DEBUG === true) console.log("处理选择:", choice);

    const newlyAddedSkills = [];
    const newlyAddedAllies = [];
    
    const difficultyKey = getDifficulty();
    const difficulty = DIFFICULTY_CONFIGS[difficultyKey] || DIFFICULTY_CONFIGS.normal;
    const tag = getRunTag();

    // 硬核：对“加班/通宵/救火/事故/背锅”等高压选择额外惩罚（只要选项文案命中就触发）
    if (difficultyKey === 'hardcore') {
        const text = (choice.text || '');
        const hardcorePenaltyKeywords = ['加班', '通宵', '熬夜', '值班', '救火', '事故', '背锅', '紧急', '赶工'];
        const hits = hardcorePenaltyKeywords.filter(k => text.includes(k));
        if (hits.length > 0) {
            // 技能减免（更细）：不同技能对不同“高压类型”有不同的减免效果
            // - 流程优化：偏“救火/事故/紧急/值班”
            // - 证据链：偏“背锅/事故”
            // - 留痕：偏“赶工/加班/通宵”（让不确定性变少、沟通更顺）
            const skillMitigations = [];
            const addMitigation = (skill, keywords) => {
                if (!gameState.skills.includes(skill)) return;
                if (keywords.some(k => text.includes(k))) skillMitigations.push(skill);
            };
            addMitigation('流程优化', ['救火', '事故', '紧急', '值班']);
            addMitigation('证据链', ['背锅', '事故']);
            addMitigation('留痕', ['赶工', '加班', '通宵']);

            const mitigation = Math.min(2, skillMitigations.length); // 最多减免 2，避免把硬核变普通

            // 每命中一个关键词 -1 心理健康，上限 -4；有减免技能则 +1（即少扣 1）
            const rawPenalty = Math.min(4, hits.length);
            const mitigatedPenalty = Math.max(0, rawPenalty - mitigation);
            const extra = -mitigatedPenalty;
            gameState.mental = Math.max(0, Math.min(100, gameState.mental + extra));
            if (mitigation > 0 && mitigatedPenalty < rawPenalty) {
                const reason = skillMitigations.slice(0, mitigation).join('、');
                showToast('硬核惩罚（已减免）', `高压选择消耗：心理健康 ${extra}（${reason} 减免 -${mitigation}）`, 'warning', 1600);
            } else {
                showToast('硬核惩罚', `高压选择额外消耗：心理健康 ${extra}`, 'warning', 1400);
            }
        }
    }

    // 应用选项效果
    if (choice.effects) {
        if (window.DEBUG === true) console.log("应用效果:", choice.effects);
        
        // 更新工作表现
        if (choice.effects.performance !== undefined) {
            const rawDelta = choice.effects.performance;
            const delta = applyRunTagDelta(applyDifficultyDelta(rawDelta, difficulty), tag);
            if (window.DEBUG === true) console.log(`工作表现变化: ${gameState.performance} -> ${gameState.performance + delta}`);
            gameState.performance += delta;
            // 确保在合理范围内
            gameState.performance = Math.max(0, Math.min(100, gameState.performance));
        }
        
        // 更新心理健康
        if (choice.effects.mental !== undefined) {
            const rawDelta = choice.effects.mental;
            let delta = applyRunTagDelta(applyDifficultyDelta(rawDelta, difficulty), tag);
            // 政治型：更容易被“口径/定性/背刺/纪要/校准”消耗心态
            if (tag === 'politics') {
                const text = (choice.text || '');
                const politicsDrain = ['口径', '定性', '背刺', '甩锅', '纪要', '校准'];
                if (delta < 0 && politicsDrain.some(k => text.includes(k))) delta -= 1;
            }
            if (window.DEBUG === true) console.log(`心理健康变化: ${gameState.mental} -> ${gameState.mental + delta}`);
            gameState.mental += delta;
            // 确保在合理范围内
            gameState.mental = Math.max(0, Math.min(100, gameState.mental));
        }

        // 更新精力（策略资源）
        if (choice.effects.energy !== undefined) {
            const rawDelta = choice.effects.energy;
            const delta = applyRunTagDelta(applyDifficultyDelta(rawDelta, difficulty), tag);
            gameState.energy += delta;
            gameState.energy = Math.max(0, Math.min(100, gameState.energy));
        }

        // 路线锁定（不可逆抉择）
        if (typeof choice.effects.routeLock === 'string') {
            gameState.routeLock = choice.effects.routeLock;
        }
        
        // 添加技能
        if (choice.effects.skills) {
            console.log("添加技能:", choice.effects.skills);
            choice.effects.skills.forEach(skill => {
                if (!gameState.skills.includes(skill)) {
                    gameState.skills.push(skill);
                    newlyAddedSkills.push(skill);
                }
            });
        }
        
        // 添加盟友
        if (choice.effects.allies) {
            console.log("添加盟友:", choice.effects.allies);
            choice.effects.allies.forEach(ally => {
                if (!gameState.allies.includes(ally)) {
                    gameState.allies.push(ally);
                    newlyAddedAllies.push(ally);
                    gameState.favors += 1; // 每新增一个盟友，默认给 1 点人情（可消耗）

                    const normalized = normalizeAllyName(ally);
                    if (normalized) {
                        gameState.allyLedger[normalized] = gameState.allyLedger[normalized] || { trust: 0, debt: 0 };
                        gameState.allyLedger[normalized].trust += 1;
                    }
                }
            });
        }

        // 盟友移除（用于“拒绝还人情”等剧情后果）
        if (choice.effects.removeAllies === true) {
            gameState.allies = [];
        }

        // 人情消耗/获得（来自特定剧情/选项）
        if (choice.effects.favors !== undefined) {
            const rawDelta = choice.effects.favors;
            const delta = applyRunTagDelta(applyDifficultyDelta(rawDelta, difficulty), tag);
            gameState.favors += delta;
            gameState.favors = Math.max(0, Math.min(9, gameState.favors));
        }

        // 关系账本调整（可选）：{ ally: '小林', trust: +1, debt: +1 }
        if (choice.effects.allyImpact && typeof choice.effects.allyImpact === 'object') {
            let allyKey = choice.effects.allyImpact.ally;
            if (allyKey === '__worst__') {
                const worst = getWorstDebtAlly();
                allyKey = worst?.ally || null;
            }
            const allyName = normalizeAllyName(allyKey);
            if (allyName) {
                gameState.allyLedger[allyName] = gameState.allyLedger[allyName] || { trust: 0, debt: 0 };
                if (typeof choice.effects.allyImpact.trust === 'number') gameState.allyLedger[allyName].trust += choice.effects.allyImpact.trust;
                if (typeof choice.effects.allyImpact.debt === 'number') gameState.allyLedger[allyName].debt += choice.effects.allyImpact.debt;
            }
        }
    }

    // UI 提示：获得新技能/盟友
    if (newlyAddedSkills.length > 0) {
        showToast('获得技能', newlyAddedSkills.join('、'), 'skill');
    }
    if (newlyAddedAllies.length > 0) {
        showToast('结识盟友', newlyAddedAllies.join('、'), 'ally');
    }

    // 成就：本局首次达成就提示一次（避免刷屏）
    gameState.flags = gameState.flags || {};
    const earned = computeAchievements();
    const earnedIds = new Set(earned.map(a => a.id));
    gameState.flags.earnedAchievements = gameState.flags.earnedAchievements || {};
    for (const a of earned) {
        if (!gameState.flags.earnedAchievements[a.id]) {
            gameState.flags.earnedAchievements[a.id] = true;
            showToast('解锁称号', a.name, 'achievement', 1600);
        }
    }

    // 记录关键选择（用于结局回放）
    lastChoices.push({ sceneId: gameState.currentScene, text: choice.text || '' });
    if (lastChoices.length > 30) lastChoices = lastChoices.slice(-30);

    // 周期注入：每做出 N 次选择，自动进入一次“月度复盘”
    // - 避免玩家必须手动点击“周期节点”才能体验到职场周期压力
    // - 避免打断结局/终局门/边缘结局
    gameState.cycle = gameState.cycle || { choiceCount: 0, lastInjectedAt: 0 };
    const nextSceneId = choice.nextScene;
    const skipAutoInject = [
        'monthly_review',
        'monthly_review_prepare',
        'monthly_review_meeting',
        'monthly_review_after',
        'quarterly_calibration',
        'quarterly_calibration_prep',
        'quarterly_calibration_room',
        'quarterly_calibration_result',
        'burnout_edge',
        'burnout_recover',
        'layoff_edge',
        'layoff_recover',
        'ending_gate_tech',
        'ending_gate_politics',
        'ending_gate_jump',
        'ending_gate_balance',
        'burnout',
        'layoff',
        'promotion',
        'work_life_balance'
    ];
    if (!skipAutoInject.includes(gameState.currentScene) && !skipAutoInject.includes(nextSceneId)) {
        gameState.cycle.choiceCount += 1;
    }

    // 关系戏剧化（P0）：小概率触发盟友救场/背刺
    if (maybeInjectRelationshipDrama(nextSceneId, skipAutoInject)) return;

    // 随机事件注入：每 9 次选择有一次概率触发（不打断关键节点）
    // 通过一个“事件池入口”让可控随机保持可维护
    if (!skipAutoInject.includes(gameState.currentScene) && !skipAutoInject.includes(nextSceneId)) {
        const shouldRoll = gameState.cycle.choiceCount > 0 && (gameState.cycle.choiceCount % 9 === 0);
        if (shouldRoll) {
            const roll = Math.random();
            if (roll < 0.45 && window.scenes && window.scenes['random_event_hub']) {
                loadScene('random_event_hub');
                updateStats();
                return;
            }
        }
    }

    // 关系反馈：债务过高时给一次警报（不强制剧情分支，先做“软背刺”）
    if (shouldInjectAllyDebtEvent()) {
        // 每局只触发一次“关系反噬事件”，避免频繁打断
        gameState.flags = gameState.flags || { savedFromBurnout: false, savedFromLayoff: false };
        gameState.flags.relationshipEventTriggered = gameState.flags.relationshipEventTriggered || false;

        if (!gameState.flags.relationshipEventTriggered && !skipAutoInject.includes(nextSceneId)) {
            const worst = getWorstDebtAlly();
            const ally = worst?.ally || '盟友';
            showToast('关系反噬', worst ? `${ally}开始不耐烦了：你欠得有点多` : '你的人情债累积太高', 'warning', 1600);
            gameState.flags.relationshipEventTriggered = true;
            loadScene(getDebtEventSceneForAlly(ally));
            updateStats();
            return;
        }
    }
    
    // 检查特殊结局条件（P0：改为“濒临结局 → 可挽救窗口 → 真结局”）
    const endingThresholds = (DIFFICULTY_CONFIGS[getDifficulty()] || DIFFICULTY_CONFIGS.normal).endings;
    // 精力过低会显著加速崩溃（但给一次挽救机会在 P0 边缘结局里处理）

    // 只允许每局各触发一次“挽救窗口”
    gameState.flags = gameState.flags || { savedFromBurnout: false, savedFromLayoff: false };

    if (gameState.mental <= endingThresholds.burnout.mentalMax) {
        if (!gameState.flags.savedFromBurnout && !isEdgeEndingSceneId(gameState.currentScene)) {
            gameState.flags.savedFromBurnout = true;
            loadScene('burnout_edge');
        } else {
            lastOutcome = 'burnout';
            if (window.DEBUG === true) console.log("触发特殊结局: burnout");
            loadScene('burnout');
        }
    } else if (gameState.performance <= endingThresholds.layoff.performanceMax) {
        if (!gameState.flags.savedFromLayoff && !isEdgeEndingSceneId(gameState.currentScene)) {
            gameState.flags.savedFromLayoff = true;
            loadScene('layoff_edge');
        } else {
            lastOutcome = 'layoff';
            if (window.DEBUG === true) console.log("触发特殊结局: layoff");
            loadScene('layoff');
        }
    } else if (gameState.performance >= endingThresholds.promotion.performanceMin && gameState.mental >= endingThresholds.promotion.mentalMin) {
        lastOutcome = 'promotion';
        if (window.DEBUG === true) console.log("触发特殊结局: promotion");
        loadScene('promotion');
    } else if (gameState.mental >= endingThresholds.workLifeBalance.mentalMin && gameState.performance >= endingThresholds.workLifeBalance.performanceMin) {
        lastOutcome = 'work_life_balance';
        if (window.DEBUG === true) console.log("触发特殊结局: work_life_balance");
        loadScene('work_life_balance');
    } else {
        const shouldInjectMonthly = gameState.cycle.choiceCount > 0 && (gameState.cycle.choiceCount % 7 === 0);
        if (shouldInjectMonthly) {
            if (window.DEBUG === true) console.log('自动注入月度复盘');
            loadScene('monthly_review');
            updateStats();
            return;
        }

        // 加载下一个场景
        if (window.DEBUG === true) console.log(`加载下一个场景: ${choice.nextScene}`);
        loadScene(choice.nextScene);
    }
    
    // 更新界面状态
    updateStats();
}

// 更新状态显示
function updateStats() {
    // 更新进度条
    performanceBar.style.width = `${gameState.performance}%`;
    mentalBar.style.width = `${gameState.mental}%`;
    if (energyBar) energyBar.style.width = `${gameState.energy}%`;
    
    // 更新数值
    performanceValue.textContent = `${gameState.performance}%`;
    mentalValue.textContent = `${gameState.mental}%`;
    if (energyValue) energyValue.textContent = `${gameState.energy}%`;
    if (favorsValue) favorsValue.textContent = `${gameState.favors}`;
    
    // 更新技能列表
    skillsList.innerHTML = '';
    gameState.skills.forEach(skill => {
        const skillItem = document.createElement('span');
        skillItem.classList.add('inventory-item');
        skillItem.textContent = skill;
        skillsList.appendChild(skillItem);
    });
    
    // 更新盟友列表
    alliesList.innerHTML = '';
    gameState.allies.forEach(ally => {
        const allyItem = document.createElement('span');
        allyItem.classList.add('inventory-item', 'ally-item');
        const normalized = normalizeAllyName(ally);
        if (normalized && gameState.allyLedger[normalized]) {
            const { trust, debt } = gameState.allyLedger[normalized];
            allyItem.textContent = `${ally}（信任${trust}/债${debt}）`;
        } else {
            allyItem.textContent = ally;
        }
        alliesList.appendChild(allyItem);
    });
    
    // 状态颜色调整
    performanceBar.style.backgroundColor = getStatusColor(gameState.performance);
    mentalBar.style.backgroundColor = getStatusColor(gameState.mental);
    if (energyBar) energyBar.style.backgroundColor = getStatusColor(gameState.energy);
}

// 根据状态值获取颜色
function getStatusColor(value) {
    if (value <= 30) return '#ff5252'; // 危险
    if (value <= 60) return '#ffb142'; // 警告
    return '#4CAF50'; // 良好
}

// 重启游戏
restartBtn.addEventListener('click', initGame);

// 难度：本地保存，不强制重开；切换后下一次选择生效
if (difficultySelect) {
    difficultySelect.addEventListener('change', () => {
        const v = difficultySelect.value;
        setDifficulty(v);
        showToast('难度已切换', DIFFICULTY_CONFIGS[getDifficulty()]?.label || v, 'warning', 1600);
    });
}

// 游戏启动
document.addEventListener('DOMContentLoaded', () => {
    // 读本地难度
    setDifficulty(getDifficulty());
    // 初始化称号图鉴弹窗
    if (!document.getElementById('achievements-modal')) {
        document.body.appendChild(buildAchievementsModal());
    }
    if (achievementsBtn) {
        achievementsBtn.addEventListener('click', () => {
            const el = document.getElementById('achievements-modal');
            if (el) el.classList.add('show');
        });
    }
    initGame();
}); 
