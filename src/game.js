// 游戏状态
let gameState = {
    // 玩家属性
    performance: 75, // 工作表现
    mental: 80,      // 心理健康
    
    // 收集的技能和盟友
    skills: [],
    allies: [],
    
    // 当前场景
    currentScene: 'start'
};

// DOM元素引用
const storyText = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices-container');
const performanceBar = document.getElementById('performance-bar');
const mentalBar = document.getElementById('mental-bar');
const performanceValue = document.getElementById('performance-value');
const mentalValue = document.getElementById('mental-value');
const skillsList = document.getElementById('skills-list');
const alliesList = document.getElementById('allies-list');
const restartBtn = document.getElementById('restart-btn');

// 初始化游戏
function initGame() {
    gameState = {
        performance: 75,
        mental: 80,
        skills: [],
        allies: [],
        currentScene: 'start'
    };
    
    try {
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
    console.log(`尝试加载场景: ${sceneId}`);
    
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
        console.log(`当前scenes对象包含的场景:`, Object.keys(window.scenes));
        
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
    
    console.log(`成功加载场景: ${sceneId}`);
    
    // 设置当前场景
    gameState.currentScene = sceneId;
    
    // 显示场景文本
    storyText.innerHTML = scene.text;
    
    // 清除现有选项
    choicesContainer.innerHTML = '';
    
    // 创建新选项
    scene.choices.forEach((choice, index) => {
        const choiceBtn = document.createElement('button');
        choiceBtn.classList.add('choice-btn');
        choiceBtn.textContent = choice.text;
        
        // 添加选择效果
        choiceBtn.addEventListener('click', () => {
            console.log(`点击选项: ${choice.text}, 下一场景: ${choice.nextScene}`);
            handleChoice(choice);
        });
        
        choicesContainer.appendChild(choiceBtn);
    });
    
    // 滚动到顶部
    window.scrollTo(0, 0);
}

// 处理选择
function handleChoice(choice) {
    console.log("处理选择:", choice);
    
    // 应用选项效果
    if (choice.effects) {
        console.log("应用效果:", choice.effects);
        
        // 更新工作表现
        if (choice.effects.performance !== undefined) {
            console.log(`工作表现变化: ${gameState.performance} -> ${gameState.performance + choice.effects.performance}`);
            gameState.performance += choice.effects.performance;
            // 确保在合理范围内
            gameState.performance = Math.max(0, Math.min(100, gameState.performance));
        }
        
        // 更新心理健康
        if (choice.effects.mental !== undefined) {
            console.log(`心理健康变化: ${gameState.mental} -> ${gameState.mental + choice.effects.mental}`);
            gameState.mental += choice.effects.mental;
            // 确保在合理范围内
            gameState.mental = Math.max(0, Math.min(100, gameState.mental));
        }
        
        // 添加技能
        if (choice.effects.skills) {
            console.log("添加技能:", choice.effects.skills);
            choice.effects.skills.forEach(skill => {
                if (!gameState.skills.includes(skill)) {
                    gameState.skills.push(skill);
                }
            });
        }
        
        // 添加盟友
        if (choice.effects.allies) {
            console.log("添加盟友:", choice.effects.allies);
            choice.effects.allies.forEach(ally => {
                if (!gameState.allies.includes(ally)) {
                    gameState.allies.push(ally);
                }
            });
        }
    }
    
    // 检查特殊结局条件
    if (gameState.mental <= 20) {
        console.log("触发特殊结局: burnout");
        loadScene('burnout');
    } else if (gameState.performance <= 20) {
        console.log("触发特殊结局: layoff");
        loadScene('layoff');
    } else if (gameState.performance >= 90 && gameState.mental >= 30) {
        console.log("触发特殊结局: promotion");
        loadScene('promotion');
    } else if (gameState.mental >= 85 && gameState.performance >= 60) {
        console.log("触发特殊结局: work_life_balance");
        loadScene('work_life_balance');
    } else {
        // 加载下一个场景
        console.log(`加载下一个场景: ${choice.nextScene}`);
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
    
    // 更新数值
    performanceValue.textContent = `${gameState.performance}%`;
    mentalValue.textContent = `${gameState.mental}%`;
    
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
        allyItem.textContent = ally;
        alliesList.appendChild(allyItem);
    });
    
    // 状态颜色调整
    performanceBar.style.backgroundColor = getStatusColor(gameState.performance);
    mentalBar.style.backgroundColor = getStatusColor(gameState.mental);
}

// 根据状态值获取颜色
function getStatusColor(value) {
    if (value <= 30) return '#ff5252'; // 危险
    if (value <= 60) return '#ffb142'; // 警告
    return '#4CAF50'; // 良好
}

// 重启游戏
restartBtn.addEventListener('click', initGame);

// 游戏启动
document.addEventListener('DOMContentLoaded', initGame); 