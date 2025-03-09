// 场景检查器 - 检查游戏场景中可能存在的错误

// 使用方法：直接在浏览器中加载此脚本，同时加载所有场景文件和游戏核心逻辑
// 在Node.js环境中运行时，需要加载游戏核心文件
if (typeof window === 'undefined') {
    // 在浏览器环境中，这些文件通过 HTML 加载
    // 这里是为了支持潜在的命令行测试环境
    require('../src/game.js');
    require('../src/scenes/scenes_loader.js');
    require('../src/scenes/scenes_intro.js');
    require('../src/scenes/scenes_training_responses.js');
    require('../src/scenes/scenes_office_politics.js');
    require('../src/scenes/scenes_projects.js');
    require('../src/scenes/scenes_advanced.js');
    require('../src/scenes/scenes_dramatic_events.js');
    require('../src/scenes/scenes_dramatic_outcomes.js');
    require('../src/scenes/scenes_missing_definitions.js');
    require('../src/scenes/scenes_hr_followup.js');
    require('../src/scenes/scenes_endings.js');
    require('../src/scenes/scenes_index.js');
}

// 全局变量来存储检查结果
const checkResults = {
    errors: [],
    warnings: [],
    stats: {
        totalScenes: 0,
        totalChoices: 0,
        unreachableScenes: 0,
        missingScenes: 0,
        problematicScenes: 0
    }
};

// 添加错误或警告
function addError(message, sceneId, details) {
    checkResults.errors.push({ message, sceneId, details });
    console.error(`场景错误: ${message}`, { sceneId, details });
    checkResults.stats.problematicScenes++;
}

function addWarning(message, sceneId, details) {
    checkResults.warnings.push({ message, sceneId, details });
    console.warn(`场景警告: ${message}`, { sceneId, details });
}

// 检查所有场景
function checkAllScenes() {
    console.log("开始检查所有场景...");
    
    // 确保window.scenes存在
    if (!window.scenes) {
        console.error("找不到游戏场景！确保已加载所有场景文件。");
        return checkResults;
    }
    
    // 1. 收集基本统计信息
    checkResults.stats.totalScenes = Object.keys(window.scenes).length;
    console.log(`游戏共有 ${checkResults.stats.totalScenes} 个场景`);
    
    // 2. 检查每个场景的基本结构和属性
    checkSceneStructures();
    
    // 3. 检查场景连通性
    checkSceneConnectivity();
    
    // 4. 检查未使用的场景
    checkUnusedScenes();
    
    // 5. 显示检查结果
    displayResults();
    
    return checkResults;
}

// 检查每个场景的基本结构和属性
function checkSceneStructures() {
    console.log("检查场景结构...");
    
    for (const [sceneId, scene] of Object.entries(window.scenes)) {
        // 检查场景是否有文本
        if (!scene.text) {
            addWarning("场景缺少文本内容", sceneId);
        }
        
        // 检查场景是否有选项（除了结局场景）
        if (!scene.choices || !Array.isArray(scene.choices) || scene.choices.length === 0) {
            // 如果是结局场景，没有选项是正常的
            if (sceneId.includes("ending") || scene.isEnding) {
                // 结局场景不需要选项
            } else {
                addWarning("场景没有选项", sceneId);
            }
        } else {
            // 检查每个选项
            checkResults.stats.totalChoices += scene.choices.length;
            
            scene.choices.forEach((choice, index) => {
                // 检查选项是否有文本
                if (!choice.text) {
                    addError("选项缺少文本", sceneId, { choiceIndex: index });
                }
                
                // 检查选项是否有指向的下一个场景
                if (!choice.nextScene) {
                    addError("选项缺少下一个场景", sceneId, { choiceIndex: index, choiceText: choice.text });
                } else if (choice.nextScene !== 'refresh_page') {
                    // 检查指向的场景是否存在
                    if (!window.scenes[choice.nextScene]) {
                        addError(`选项指向不存在的场景 ${choice.nextScene}`, sceneId, { 
                            choiceIndex: index, 
                            choiceText: choice.text,
                            targetScene: choice.nextScene 
                        });
                        checkResults.stats.missingScenes++;
                    }
                }
                
                // 检查选项效果是否合理
                if (choice.effects) {
                    // 统计属性应该是数字
                    if (choice.effects.performance !== undefined && typeof choice.effects.performance !== 'number') {
                        addWarning("选项performance效果不是数字", sceneId, { choiceIndex: index, value: choice.effects.performance });
                    }
                    
                    if (choice.effects.mental !== undefined && typeof choice.effects.mental !== 'number') {
                        addWarning("选项mental效果不是数字", sceneId, { choiceIndex: index, value: choice.effects.mental });
                    }
                    
                    // 技能和盟友应该是数组
                    if (choice.effects.skills && !Array.isArray(choice.effects.skills)) {
                        addWarning("选项skills效果不是数组", sceneId, { choiceIndex: index });
                    }
                    
                    if (choice.effects.allies && !Array.isArray(choice.effects.allies)) {
                        addWarning("选项allies效果不是数组", sceneId, { choiceIndex: index });
                    }
                }
            });
        }
    }
}

// 检查场景连通性，使用BFS算法
function checkSceneConnectivity() {
    console.log("检查场景连通性...");
    
    const reachableScenes = new Set();
    const startScene = 'start'; // 假设游戏起始场景是'start'
    
    if (!window.scenes[startScene]) {
        addError("找不到起始场景", startScene);
        return;
    }
    
    // 使用BFS算法找到所有可达场景
    const queue = [startScene];
    
    while (queue.length > 0) {
        const currentSceneId = queue.shift();
        
        if (reachableScenes.has(currentSceneId)) continue;
        reachableScenes.add(currentSceneId);
        
        const currentScene = window.scenes[currentSceneId];
        if (!currentScene) continue;
        
        if (!currentScene.choices) continue;
        
        for (const choice of currentScene.choices) {
            const nextSceneId = choice.nextScene;
            
            if (!nextSceneId || nextSceneId === 'refresh_page') continue;
            
            if (!reachableScenes.has(nextSceneId) && !queue.includes(nextSceneId)) {
                queue.push(nextSceneId);
            }
        }
    }
    
    // 检查未使用的场景
    for (const sceneId of Object.keys(window.scenes)) {
        if (!reachableScenes.has(sceneId)) {
            addWarning(`场景无法从开始场景达到`, sceneId);
            checkResults.stats.unreachableScenes++;
        }
    }
    
    console.log(`从开始场景可达的场景数: ${reachableScenes.size} / ${Object.keys(window.scenes).length}`);
}

// 检查未被其他场景引用的场景
function checkUnusedScenes() {
    console.log("检查未使用的场景...");
    
    // 收集所有被引用的场景
    const referencedScenes = new Set(['start']); // 起始场景总是被使用的
    
    for (const scene of Object.values(window.scenes)) {
        if (!scene.choices) continue;
        
        for (const choice of scene.choices) {
            if (choice.nextScene && choice.nextScene !== 'refresh_page') {
                referencedScenes.add(choice.nextScene);
            }
        }
    }
    
    // 检查未被引用的场景
    for (const sceneId of Object.keys(window.scenes)) {
        if (!referencedScenes.has(sceneId)) {
            addWarning(`场景未被任何其他场景引用`, sceneId);
        }
    }
}

// 汇总所有缺失的场景
function summaryMissingScenes() {
    // 收集所有引用但不存在的场景
    const missingScenes = new Set();
    const referencingScenes = {};
    
    // 从错误列表中收集缺失场景信息
    checkResults.errors.forEach(error => {
        if (error.details && error.details.targetScene) {
            const missingSceneId = error.details.targetScene;
            missingScenes.add(missingSceneId);
            
            // 记录引用关系
            if (!referencingScenes[missingSceneId]) {
                referencingScenes[missingSceneId] = [];
            }
            
            referencingScenes[missingSceneId].push({
                scene: error.sceneId,
                choiceText: error.details.choiceText || "未知选项"
            });
        }
    });
    
    // 如果没有缺失场景，直接返回
    if (missingScenes.size === 0) {
        console.log("没有发现缺失场景。");
        return { missingScenes, referencingScenes };
    }
    
    // 输出缺失场景汇总
    console.log("\n========== 缺失场景汇总 ==========");
    console.log(`共发现 ${missingScenes.size} 个缺失场景:`);
    
    // 按字母顺序排序场景ID
    Array.from(missingScenes).sort().forEach((scene, index) => {
        const references = referencingScenes[scene] || [];
        const referencesText = references.length > 0 
            ? `被 ${references.length} 个场景引用` 
            : "无场景引用";
        console.log(`${index + 1}. ${scene} (${referencesText})`);
        
        // 如果有引用，显示引用详情
        if (references.length > 0) {
            references.forEach((ref, refIndex) => {
                console.log(`   ${refIndex + 1}. 场景 '${ref.scene}' 的选项 '${ref.choiceText}'`);
            });
        }
    });
    
    // 输出场景模板，帮助开发者快速添加缺失场景
    console.log("\n========== 缺失场景模板示例 ==========");
    console.log("```javascript");
    console.log("// 将下面的模板添加到 scenes_missing_definitions.js 文件中");
    console.log("var missingScenes = {");
    
    Array.from(missingScenes).sort().forEach(scene => {
        console.log(`    ${scene}: {`);
        console.log(`        text: \``);
        console.log(`            <h2>场景标题</h2>`);
        console.log(`            <p>在这里添加场景描述...</p>`);
        console.log(`        \`,`);
        console.log(`        choices: [`);
        console.log(`            { text: "选项1", nextScene: "下一个场景ID", effects: {performance: 0, mental: 0} },`);
        console.log(`            { text: "选项2", nextScene: "另一个场景ID", effects: {performance: 0, mental: 0} },`);
        console.log(`            { text: "选项3", nextScene: "第三个场景ID", effects: {performance: 0, mental: 0} }`);
        console.log(`        ]`);
        console.log(`    },`);
        console.log(``);
    });
    
    console.log("};");
    console.log("```");
    
    return { missingScenes, referencingScenes };
}

// 在HTML中显示结果
function displayResults() {
    const errorCount = checkResults.errors.length;
    const warningCount = checkResults.warnings.length;
    
    console.log("==== 场景检查完成 ====");
    console.log(`发现 ${errorCount} 个错误, ${warningCount} 个警告`);
    console.log(`统计信息: 共 ${checkResults.stats.totalScenes} 个场景, ${checkResults.stats.totalChoices} 个选项`);
    console.log(`问题场景: ${checkResults.stats.problematicScenes} 个`);
    console.log(`缺失场景: ${checkResults.stats.missingScenes} 个`);
    console.log(`不可达场景: ${checkResults.stats.unreachableScenes} 个`);
    
    // 生成缺失场景汇总报告
    const { missingScenes, referencingScenes } = summaryMissingScenes();
    
    // 如果在浏览器环境中，可以创建一个可视化结果
    if (typeof document !== 'undefined') {
        const resultDiv = document.createElement('div');
        resultDiv.style.position = 'fixed';
        resultDiv.style.top = '10px';
        resultDiv.style.right = '10px';
        resultDiv.style.width = '400px';
        resultDiv.style.maxHeight = '80vh';
        resultDiv.style.overflow = 'auto';
        resultDiv.style.backgroundColor = '#f8f8f8';
        resultDiv.style.border = '1px solid #ddd';
        resultDiv.style.borderRadius = '5px';
        resultDiv.style.padding = '15px';
        resultDiv.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
        resultDiv.style.zIndex = '9999';
        resultDiv.style.fontSize = '14px';
        
        // 添加标题
        const title = document.createElement('h2');
        title.textContent = '场景检查结果';
        title.style.margin = '0 0 10px 0';
        resultDiv.appendChild(title);
        
        // 添加摘要
        const summary = document.createElement('div');
        summary.innerHTML = `
            <p>检查结果: <span style="color:${errorCount > 0 ? 'red' : 'green'}">${errorCount} 个错误</span>, 
            <span style="color:${warningCount > 0 ? 'orange' : 'green'}">${warningCount} 个警告</span></p>
            <p>统计信息: 共 ${checkResults.stats.totalScenes} 个场景, ${checkResults.stats.totalChoices} 个选项</p>
            <p>问题场景: ${checkResults.stats.problematicScenes} 个</p>
            <p>缺失场景: ${checkResults.stats.missingScenes} 个</p>
            <p>不可达场景: ${checkResults.stats.unreachableScenes} 个</p>
        `;
        resultDiv.appendChild(summary);
        
        // 添加缺失场景详情
        if (missingScenes.size > 0) {
            const missingTitle = document.createElement('h3');
            missingTitle.textContent = '缺失场景详情:';
            missingTitle.style.margin = '15px 0 5px 0';
            missingTitle.style.color = 'red';
            resultDiv.appendChild(missingTitle);
            
            const missingList = document.createElement('ul');
            missingList.style.margin = '0';
            missingList.style.paddingLeft = '20px';
            
            Array.from(missingScenes).sort().forEach(sceneId => {
                const references = referencingScenes[sceneId] || [];
                const item = document.createElement('li');
                item.innerHTML = `<strong>${sceneId}</strong> (被 ${references.length} 个场景引用)`;
                
                if (references.length > 0) {
                    const refList = document.createElement('ul');
                    refList.style.marginTop = '5px';
                    
                    references.forEach(ref => {
                        const refItem = document.createElement('li');
                        refItem.textContent = `场景 '${ref.scene}' 的选项 '${ref.choiceText}'`;
                        refList.appendChild(refItem);
                    });
                    
                    item.appendChild(refList);
                }
                
                missingList.appendChild(item);
            });
            
            resultDiv.appendChild(missingList);
            
            // 添加"复制模板"按钮
            const copyButton = document.createElement('button');
            copyButton.textContent = '复制缺失场景模板';
            copyButton.style.margin = '10px 0';
            copyButton.style.padding = '5px 10px';
            copyButton.style.backgroundColor = '#2196F3';
            copyButton.style.color = 'white';
            copyButton.style.border = 'none';
            copyButton.style.borderRadius = '3px';
            copyButton.style.cursor = 'pointer';
            
            copyButton.onclick = function() {
                let templateText = "// 将下面的模板添加到 scenes_missing_definitions.js 文件中\n";
                templateText += "var missingScenes = {\n";
                
                Array.from(missingScenes).sort().forEach(scene => {
                    templateText += `    ${scene}: {\n`;
                    templateText += `        text: \`\n`;
                    templateText += `            <h2>场景标题</h2>\n`;
                    templateText += `            <p>在这里添加场景描述...</p>\n`;
                    templateText += `        \`,\n`;
                    templateText += `        choices: [\n`;
                    templateText += `            { text: "选项1", nextScene: "下一个场景ID", effects: {performance: 0, mental: 0} },\n`;
                    templateText += `            { text: "选项2", nextScene: "另一个场景ID", effects: {performance: 0, mental: 0} },\n`;
                    templateText += `            { text: "选项3", nextScene: "第三个场景ID", effects: {performance: 0, mental: 0} }\n`;
                    templateText += `        ]\n`;
                    templateText += `    },\n\n`;
                });
                
                templateText += "};\n";
                
                // 创建一个临时textarea来复制文本
                const textArea = document.createElement('textarea');
                textArea.value = templateText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // 显示提示
                copyButton.textContent = '已复制!';
                setTimeout(() => {
                    copyButton.textContent = '复制缺失场景模板';
                }, 2000);
            };
            
            resultDiv.appendChild(copyButton);
        }
        
        // 添加错误详情
        if (errorCount > 0) {
            const errorTitle = document.createElement('h3');
            errorTitle.textContent = '错误详情:';
            errorTitle.style.margin = '15px 0 5px 0';
            errorTitle.style.color = 'red';
            resultDiv.appendChild(errorTitle);
            
            const errorList = document.createElement('ul');
            errorList.style.margin = '0';
            errorList.style.paddingLeft = '20px';
            
            checkResults.errors.forEach(error => {
                const item = document.createElement('li');
                item.textContent = `${error.message} (场景: ${error.sceneId})`;
                errorList.appendChild(item);
            });
            
            resultDiv.appendChild(errorList);
        }
        
        // 添加警告详情
        if (warningCount > 0) {
            const warningTitle = document.createElement('h3');
            warningTitle.textContent = '警告详情:';
            warningTitle.style.margin = '15px 0 5px 0';
            warningTitle.style.color = 'orange';
            resultDiv.appendChild(warningTitle);
            
            const warningList = document.createElement('ul');
            warningList.style.margin = '0';
            warningList.style.paddingLeft = '20px';
            
            checkResults.warnings.forEach(warning => {
                const item = document.createElement('li');
                item.textContent = `${warning.message} (场景: ${warning.sceneId})`;
                warningList.appendChild(item);
            });
            
            resultDiv.appendChild(warningList);
        }
        
        // 添加关闭按钮
        const closeButton = document.createElement('button');
        closeButton.textContent = '关闭';
        closeButton.style.marginTop = '15px';
        closeButton.style.padding = '5px 10px';
        closeButton.style.backgroundColor = '#4CAF50';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '3px';
        closeButton.style.cursor = 'pointer';
        
        closeButton.onclick = function() {
            document.body.removeChild(resultDiv);
        };
        
        resultDiv.appendChild(closeButton);
        document.body.appendChild(resultDiv);
    }
}

// 自动运行检查（如果在浏览器环境中）
if (typeof window !== 'undefined') {
    window.addEventListener('load', function() {
        // 等待游戏场景完全加载
        setTimeout(() => {
            console.log("开始运行场景检查器...");
            checkAllScenes();
        }, 1500);
    });
}

// 暴露检查函数，方便手动调用
if (typeof window !== 'undefined') {
    window.checkGameScenes = checkAllScenes;
} 