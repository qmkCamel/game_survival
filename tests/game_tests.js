// 游戏测试框架

// 如果在 Node.js 环境中运行，需要加载游戏核心文件
if (typeof window === 'undefined') {
    // 在浏览器环境中，这些文件通过 HTML 加载
    // 这里是为了支持潜在的命令行测试环境
    require('../src/game.js');
    require('../src/scenes/scenes_index.js');
}

// 测试结果容器
const testResults = {
    passed: 0,
    failed: 0,
    tests: [],
    missingScenes: [],        // 存储缺失的场景
    referencingScenes: {}     // 存储引用缺失场景的信息
};

// 测试辅助函数
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "断言失败");
    }
    return true;
}

// 测试运行器
function runTest(testName, testFunction) {
    try {
        console.log(`运行测试: ${testName}`);
        testFunction();
        testResults.passed++;
        testResults.tests.push({ name: testName, passed: true, error: null });
        console.log(`✅ 测试通过: ${testName}`);
        return true;
    } catch (error) {
        testResults.failed++;
        testResults.tests.push({ name: testName, passed: false, error: error.message });
        console.error(`❌ 测试失败: ${testName}`);
        console.error(`   错误: ${error.message}`);
        return false;
    }
}

// 测试套件
function runTestSuite(suiteName, tests) {
    console.log(`========== 开始测试套件: ${suiteName} ==========`);
    const suiteStart = performance.now();
    
    for (const [testName, testFunction] of Object.entries(tests)) {
        runTest(`${suiteName} - ${testName}`, testFunction);
    }
    
    const suiteEnd = performance.now();
    console.log(`========== 测试套件: ${suiteName} 完成 ==========`);
    console.log(`耗时: ${(suiteEnd - suiteStart).toFixed(2)}ms`);
}

// 显示测试结果
function showTestResults() {
    // 如果已经存在结果窗口，先移除
    const existingResults = document.getElementById('test-results');
    if (existingResults) {
        document.body.removeChild(existingResults);
    }
    
    // 创建结果窗口
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'test-results';
    resultsContainer.style.position = 'fixed';
    resultsContainer.style.top = '50%';
    resultsContainer.style.left = '50%';
    resultsContainer.style.transform = 'translate(-50%, -50%)';
    resultsContainer.style.width = '80%';
    resultsContainer.style.maxWidth = '800px';
    resultsContainer.style.maxHeight = '80%';
    resultsContainer.style.overflow = 'auto';
    resultsContainer.style.backgroundColor = '#fff';
    resultsContainer.style.border = '1px solid #ddd';
    resultsContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
    resultsContainer.style.padding = '20px';
    resultsContainer.style.borderRadius = '5px';
    resultsContainer.style.zIndex = '1000';
    
    // 添加标题
    const title = document.createElement('h2');
    title.textContent = '测试结果';
    title.style.margin = '0 0 15px 0';
    title.style.borderBottom = '1px solid #eee';
    title.style.paddingBottom = '10px';
    resultsContainer.appendChild(title);
    
    // 添加总结
    const summary = document.createElement('div');
    const totalTests = testResults.passed + testResults.failed;
    const passRate = totalTests > 0 ? Math.round((testResults.passed / totalTests) * 100) : 0;
    
    summary.innerHTML = `
        <p>
            <span style="color: ${testResults.failed > 0 ? '#f44336' : '#4CAF50'}; font-weight: bold;">
                ${testResults.passed} 通过 / ${totalTests} 总计 (${passRate}%)
            </span>
        </p>
    `;
    resultsContainer.appendChild(summary);
    
    // 缺失场景特别显示区域
    if (testResults.missingScenes && testResults.missingScenes.length > 0) {
        const missingSection = document.createElement('div');
        missingSection.style.margin = '15px 0';
        missingSection.style.padding = '15px';
        missingSection.style.backgroundColor = '#fff8f8';
        missingSection.style.border = '1px solid #ffcdd2';
        missingSection.style.borderRadius = '4px';
        
        const missingTitle = document.createElement('h3');
        missingTitle.textContent = '缺失场景汇总';
        missingTitle.style.color = '#f44336';
        missingTitle.style.margin = '0 0 10px 0';
        missingSection.appendChild(missingTitle);
        
        const missingInfo = document.createElement('p');
        missingInfo.textContent = `共发现 ${testResults.missingScenes.length} 个缺失场景`;
        missingSection.appendChild(missingInfo);
        
        const missingList = document.createElement('ul');
        missingList.style.margin = '10px 0';
        missingList.style.paddingLeft = '20px';
        
        testResults.missingScenes.sort().forEach(scene => {
            const references = testResults.referencingScenes ? testResults.referencingScenes[scene] || [] : [];
            const item = document.createElement('li');
            item.innerHTML = `<strong>${scene}</strong> (被 ${references.length} 个场景引用)`;
            
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
        
        missingSection.appendChild(missingList);
        
        // 添加复制场景模板按钮
        const copyButton = document.createElement('button');
        copyButton.textContent = '复制缺失场景模板';
        copyButton.style.padding = '8px 15px';
        copyButton.style.backgroundColor = '#2196F3';
        copyButton.style.color = 'white';
        copyButton.style.border = 'none';
        copyButton.style.borderRadius = '4px';
        copyButton.style.cursor = 'pointer';
        copyButton.style.marginTop = '10px';
        
        copyButton.onclick = function() {
            let templateText = "// 将下面的模板添加到 src/scenes/scenes_missing_definitions.js 文件中\n";
            templateText += "var missingScenes = {\n";
            
            testResults.missingScenes.sort().forEach(scene => {
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
        
        missingSection.appendChild(copyButton);
        resultsContainer.appendChild(missingSection);
    }
    
    // 场景连通性错误特别显示区域
    const connectivityErrors = testResults.tests.filter(test => 
        test.passed === false && 
        (test.name.includes('场景联通性') || test.error.includes('场景') || test.error.includes('Scene'))
    );
    
    if (connectivityErrors.length > 0) {
        const connectivitySection = document.createElement('div');
        connectivitySection.style.margin = '15px 0';
        connectivitySection.style.padding = '15px';
        connectivitySection.style.backgroundColor = '#fff8f8';
        connectivitySection.style.border = '1px solid #ffcdd2';
        connectivitySection.style.borderRadius = '4px';
        
        const connectivityTitle = document.createElement('h3');
        connectivityTitle.textContent = '场景连通性错误';
        connectivityTitle.style.color = '#f44336';
        connectivityTitle.style.margin = '0 0 10px 0';
        connectivitySection.appendChild(connectivityTitle);
        
        const errorList = document.createElement('ul');
        errorList.style.margin = '0';
        errorList.style.paddingLeft = '20px';
        
        connectivityErrors.forEach(test => {
            const item = document.createElement('li');
            item.textContent = test.error;
            item.style.marginBottom = '5px';
            errorList.appendChild(item);
        });
        
        connectivitySection.appendChild(errorList);
        resultsContainer.appendChild(connectivitySection);
    }
    
    // 添加失败测试列表
    if (testResults.failed > 0) {
        const failedSection = document.createElement('div');
        failedSection.style.margin = '15px 0';
        
        const failedTitle = document.createElement('h3');
        failedTitle.textContent = '失败的测试';
        failedTitle.style.color = '#f44336';
        failedTitle.style.margin = '0 0 10px 0';
        failedSection.appendChild(failedTitle);
        
        const failedList = document.createElement('ul');
        failedList.style.margin = '0';
        failedList.style.paddingLeft = '20px';
        
        testResults.tests.filter(test => !test.passed).forEach(test => {
            const item = document.createElement('li');
            item.innerHTML = `<strong>${test.name}</strong>: ${test.error}`;
            item.style.marginBottom = '5px';
            failedList.appendChild(item);
        });
        
        failedSection.appendChild(failedList);
        resultsContainer.appendChild(failedSection);
    }
    
    // 添加通过测试列表
    if (testResults.passed > 0) {
        const passedSection = document.createElement('div');
        passedSection.style.margin = '15px 0';
        
        const passedTitle = document.createElement('h3');
        passedTitle.textContent = '通过的测试';
        passedTitle.style.color = '#4CAF50';
        passedTitle.style.margin = '0 0 10px 0';
        passedSection.appendChild(passedTitle);
        
        const passedList = document.createElement('ul');
        passedList.style.margin = '0';
        passedList.style.paddingLeft = '20px';
        
        testResults.tests.filter(test => test.passed).forEach(test => {
            const item = document.createElement('li');
            item.textContent = test.name;
            item.style.marginBottom = '5px';
            passedList.appendChild(item);
        });
        
        passedSection.appendChild(passedList);
        resultsContainer.appendChild(passedSection);
    }
    
    // 添加关闭按钮
    const closeButton = document.createElement('button');
    closeButton.textContent = '关闭';
    closeButton.style.marginTop = '15px';
    closeButton.style.padding = '8px 15px';
    closeButton.style.backgroundColor = '#4CAF50';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = function() {
        document.body.removeChild(resultsContainer);
    };
    resultsContainer.appendChild(closeButton);
    
    // 添加到页面
    document.body.appendChild(resultsContainer);
}

// =====================================================
// 游戏测试用例
// =====================================================

// 1. 场景初始化测试
const sceneInitTests = {
    "场景对象存在": function() {
        assert(typeof window.scenes === 'object', "scenes对象未定义");
        assert(Object.keys(window.scenes).length > 0, "scenes对象为空");
    },
    
    "start场景存在": function() {
        assert(window.scenes.hasOwnProperty('start'), "start场景不存在");
        assert(window.scenes.start.hasOwnProperty('text'), "start场景缺少text属性");
        assert(window.scenes.start.hasOwnProperty('choices'), "start场景缺少choices属性");
        assert(Array.isArray(window.scenes.start.choices), "start场景的choices不是数组");
        assert(window.scenes.start.choices.length > 0, "start场景的choices为空");
    },
    
    "初始游戏状态正确": function() {
        // 保存当前状态
        const originalState = JSON.parse(JSON.stringify(gameState));
        
        // 重置游戏
        initGame();
        
        // 验证初始状态
        assert(gameState.performance === 75, `初始性能值错误: ${gameState.performance}`);
        assert(gameState.mental === 80, `初始心理健康值错误: ${gameState.mental}`);
        assert(Array.isArray(gameState.skills), "技能应该是数组");
        assert(gameState.skills.length === 0, "初始技能应该为空");
        assert(Array.isArray(gameState.allies), "盟友应该是数组");
        assert(gameState.allies.length === 0, "初始盟友应该为空");
        assert(gameState.currentScene === 'start', `初始场景错误: ${gameState.currentScene}`);
        
        // 恢复状态
        Object.assign(gameState, originalState);
    }
};

// 2. 场景导航测试
const sceneNavigationTests = {
    "场景导航功能正常": function() {
        // 保存当前状态
        const originalState = JSON.parse(JSON.stringify(gameState));
        const originalHTML = storyText.innerHTML;
        const originalChoices = choicesContainer.innerHTML;
        
        // 测试场景加载
        const testScene = 'start';
        loadScene(testScene);
        
        // 验证是否正确加载
        assert(gameState.currentScene === testScene, `场景未正确设置: ${gameState.currentScene}`);
        assert(storyText.innerHTML !== "", "场景文本未加载");
        assert(choicesContainer.innerHTML !== "", "选项未加载");
        
        // 寻找第一个选项并测试
        const firstChoice = window.scenes[testScene].choices[0];
        assert(firstChoice, "找不到第一个选项");
        assert(firstChoice.nextScene, "选项没有nextScene属性");
        
        // 测试选项处理
        const nextSceneId = firstChoice.nextScene;
        // 手动模拟处理选项，但不实际更新UI
        const nextScene = window.scenes[nextSceneId];
        assert(nextScene, `nextScene (${nextSceneId}) 不存在`);
        
        // 恢复状态
        Object.assign(gameState, originalState);
        storyText.innerHTML = originalHTML;
        choicesContainer.innerHTML = originalChoices;
    },
    
    "场景联通性测试": function() {
        const checkedScenes = new Set();
        const sceneQueue = ['start'];
        const problematicScenes = [];
        
        // 广度优先遍历场景图，检查可达性
        while (sceneQueue.length > 0) {
            const currentSceneId = sceneQueue.shift();
            
            // 如果已经检查过，跳过
            if (checkedScenes.has(currentSceneId)) continue;
            
            // 标记为已检查
            checkedScenes.add(currentSceneId);
            
            // 获取当前场景
            const currentScene = window.scenes[currentSceneId];
            try {
                assert(currentScene, `场景 ${currentSceneId} 不存在`);
            } catch (error) {
                problematicScenes.push({
                    scene: currentSceneId,
                    error: "场景不存在"
                });
                continue; // 如果场景不存在，无法检查其选项，继续下一个场景
            }
            
            // 检查所有选项
            if (currentScene.choices) {
                for (const choice of currentScene.choices) {
                    const nextSceneId = choice.nextScene;
                    
                    // 跳过特殊场景如refresh_page
                    if (nextSceneId === 'refresh_page') continue;
                    
                    // 如果nextScene已经被检查或在队列中，跳过
                    if (!nextSceneId || checkedScenes.has(nextSceneId) || sceneQueue.includes(nextSceneId)) continue;
                    
                    // 检查nextScene是否存在
                    try {
                        assert(window.scenes[nextSceneId], `场景 ${currentSceneId} 指向不存在的场景 ${nextSceneId}`);
                        // 添加到队列
                        sceneQueue.push(nextSceneId);
                    } catch (error) {
                        problematicScenes.push({
                            scene: currentSceneId,
                            nextScene: nextSceneId,
                            choiceText: choice.text,
                            error: "指向不存在的场景"
                        });
                    }
                }
            }
            
            // 限制检查的场景数量，防止无限循环
            if (checkedScenes.size > 200) {
                console.warn("场景数量超过限制，提前结束检查");
                break;
            }
        }
        
        // 确保至少有一些场景是可达的
        assert(checkedScenes.size > 5, `只有 ${checkedScenes.size} 个场景是可达的，可能存在连接问题`);
        console.log(`共检查了 ${checkedScenes.size} 个场景的联通性`);
        
        // 如果有问题场景，显示详细信息
        if (problematicScenes.length > 0) {
            console.error(`发现 ${problematicScenes.length} 个场景连通性问题:`);
            
            // 将问题按类型分组
            const missingScenes = new Set();
            const referencingScenes = {};
            
            problematicScenes.forEach((problem, index) => {
                if (problem.nextScene) {
                    console.error(`${index + 1}. 场景 '${problem.scene}' 的选项 '${problem.choiceText}' 指向不存在的场景 '${problem.nextScene}'`);
                    
                    // 收集不存在的场景
                    missingScenes.add(problem.nextScene);
                    
                    // 记录引用关系
                    if (!referencingScenes[problem.nextScene]) {
                        referencingScenes[problem.nextScene] = [];
                    }
                    referencingScenes[problem.nextScene].push({
                        scene: problem.scene,
                        choiceText: problem.choiceText
                    });
                } else {
                    console.error(`${index + 1}. ${problem.scene}: ${problem.error}`);
                    missingScenes.add(problem.scene);
                }
            });
            
            // 输出不存在的场景列表
            console.error("\n========== 缺失的场景汇总 ==========");
            console.log(`共发现 ${missingScenes.size} 个缺失场景:`);
            
            Array.from(missingScenes).sort().forEach((scene, index) => {
                const references = referencingScenes[scene] || [];
                const referencesText = references.length > 0 
                    ? `被 ${references.length} 个场景引用` 
                    : "无场景引用";
                console.error(`${index + 1}. ${scene} (${referencesText})`);
                
                // 如果有引用，显示引用详情
                if (references.length > 0) {
                    references.forEach((ref, refIndex) => {
                        console.error(`   ${refIndex + 1}. 场景 '${ref.scene}' 的选项 '${ref.choiceText}'`);
                    });
                }
            });
            
            // 输出场景模板，帮助开发者快速添加缺失场景
            console.error("\n========== 缺失场景模板示例 ==========");
            console.error("```javascript");
            console.error("// 将下面的模板添加到 src/scenes/scenes_missing_definitions.js 文件中");
            console.error("var missingScenes = {");
            
            Array.from(missingScenes).sort().forEach(scene => {
                console.error(`    ${scene}: {`);
                console.error(`        text: \``);
                console.error(`            <h2>场景标题</h2>`);
                console.error(`            <p>在这里添加场景描述...</p>`);
                console.error(`        \`,`);
                console.error(`        choices: [`);
                console.error(`            { text: "选项1", nextScene: "下一个场景ID", effects: {performance: 0, mental: 0} },`);
                console.error(`            { text: "选项2", nextScene: "另一个场景ID", effects: {performance: 0, mental: 0} },`);
                console.error(`            { text: "选项3", nextScene: "第三个场景ID", effects: {performance: 0, mental: 0} }`);
                console.error(`        ]`);
                console.error(`    },`);
                console.error(``);
            });
            
            console.error("};");
            console.error("```");
            
            // 更新测试结果中添加缺失场景信息
            testResults.missingScenes = Array.from(missingScenes);
            testResults.referencingScenes = referencingScenes;
            
            assert(problematicScenes.length === 0, `有 ${problematicScenes.length} 个场景连通性问题需要修复`);
        }
    },
    
    "HR培训相关场景路径测试": function() {
        // 测试从training_overtime_negative开始的所有路径
        const startScene = "training_overtime_negative";
        assert(window.scenes[startScene], `起始场景 ${startScene} 不存在`);
        
        // 测试选项1 - explain_to_hr路径
        const explainToHrPath = [
            { scene: startScene, choice: 0, nextScene: "explain_to_hr" },
            { scene: "explain_to_hr", choice: 0, nextScene: "hr_compromise" },
            { scene: "explain_to_hr", choice: 1, nextScene: "hr_persistent" },
            { scene: "explain_to_hr", choice: 2, nextScene: "hr_advice" }
        ];
        
        // 测试选项2 - senior_advice路径 (确保该场景存在)
        assert(window.scenes[startScene].choices[1].nextScene === "senior_advice", 
               `场景 ${startScene} 的第2个选项应该指向 senior_advice，但实际指向 ${window.scenes[startScene].choices[1].nextScene}`);
        
        // 测试选项3 - prove_yourself路径
        const proveYourselfPath = [
            { scene: startScene, choice: 2, nextScene: "prove_yourself" },
            { scene: "prove_yourself", choice: 0, nextScene: "build_reputation" },
            { scene: "prove_yourself", choice: 1, nextScene: "discuss_methodology" },
            { scene: "prove_yourself", choice: 2, nextScene: "lead_small_project" }
        ];
        
        // 检查路径有效性
        const checkPath = (path) => {
            for (const step of path) {
                // 检查场景是否存在
                const scene = window.scenes[step.scene];
                assert(scene, `场景 ${step.scene} 不存在`);
                
                // 检查选项是否存在
                assert(scene.choices && scene.choices.length > step.choice, 
                       `场景 ${step.scene} 没有第${step.choice + 1}个选项`);
                
                // 检查nextScene是否正确
                const actualNextScene = scene.choices[step.choice].nextScene;
                assert(actualNextScene === step.nextScene, 
                       `场景 ${step.scene} 的第${step.choice + 1}个选项应该指向 ${step.nextScene}，但实际指向 ${actualNextScene}`);
                
                // 检查下一个场景是否存在
                assert(window.scenes[step.nextScene], `场景 ${step.nextScene} 不存在`);
            }
            return true;
        };
        
        // 检查explain_to_hr路径
        console.log("检查explain_to_hr路径...");
        assert(checkPath(explainToHrPath), "explain_to_hr路径测试失败");
        
        // 检查prove_yourself路径
        console.log("检查prove_yourself路径...");
        assert(checkPath(proveYourselfPath), "prove_yourself路径测试失败");
        
        console.log("HR培训相关场景路径测试全部通过!");
    }
};

// 3. 游戏逻辑测试
const gameLogicTests = {
    "handleChoice函数正确更新状态": function() {
        // 保存当前状态
        const originalState = JSON.parse(JSON.stringify(gameState));
        
        // 创建测试选项
        const testChoice = {
            text: "测试选项",
            nextScene: "start", // 使用已知存在的场景
            effects: {
                performance: 5,
                mental: -3,
                skills: ["测试技能"],
                allies: ["测试盟友"]
            }
        };
        
        // 记录之前的状态
        const prevPerformance = gameState.performance;
        const prevMental = gameState.mental;
        const prevSkillsCount = gameState.skills.length;
        const prevAlliesCount = gameState.allies.length;
        
        // 处理选项
        handleChoice(testChoice);
        
        // 验证状态变化
        assert(gameState.performance === prevPerformance + 5, "性能值未正确更新");
        assert(gameState.mental === prevMental - 3, "心理健康值未正确更新");
        assert(gameState.skills.includes("测试技能"), "技能未正确添加");
        assert(gameState.allies.includes("测试盟友"), "盟友未正确添加");
        
        // 恢复状态
        Object.assign(gameState, originalState);
    },
    
    "状态边界检查": function() {
        // 保存当前状态
        const originalState = JSON.parse(JSON.stringify(gameState));
        
        // 测试性能值上限
        gameState.performance = 95;
        handleChoice({ effects: { performance: 10 } });
        assert(gameState.performance === 100, "性能值应该在100封顶");
        
        // 测试性能值下限
        gameState.performance = 5;
        handleChoice({ effects: { performance: -10 } });
        assert(gameState.performance === 0, "性能值应该在0封底");
        
        // 测试心理健康值上限
        gameState.mental = 95;
        handleChoice({ effects: { mental: 10 } });
        assert(gameState.mental === 100, "心理健康值应该在100封顶");
        
        // 测试心理健康值下限
        gameState.mental = 5;
        handleChoice({ effects: { mental: -10 } });
        assert(gameState.mental === 0, "心理健康值应该在0封底");
        
        // 恢复状态
        Object.assign(gameState, originalState);
    },
    
    "技能和盟友不重复添加": function() {
        // 保存当前状态
        const originalState = JSON.parse(JSON.stringify(gameState));
        
        // 确保技能列表为空
        gameState.skills = [];
        gameState.allies = [];
        
        // 添加相同的技能和盟友两次
        handleChoice({ effects: { skills: ["测试技能"], allies: ["测试盟友"] } });
        handleChoice({ effects: { skills: ["测试技能"], allies: ["测试盟友"] } });
        
        // 验证技能和盟友各只有一个
        assert(gameState.skills.length === 1, "技能被重复添加");
        assert(gameState.allies.length === 1, "盟友被重复添加");
        
        // 恢复状态
        Object.assign(gameState, originalState);
    }
};

// 4. 结局条件测试
const endingConditionTests = {
    "倦怠结局触发条件": function() {
        // 保存当前状态和DOM
        const originalState = JSON.parse(JSON.stringify(gameState));
        const originalScene = gameState.currentScene;
        
        // 设置倦怠结局的条件
        gameState.mental = 19;  // 心理健康低于20触发倦怠结局
        
        // 创建一个监视对象来检测loadScene的调用
        let loadedScene = null;
        const originalLoadScene = window.loadScene;
        window.loadScene = function(sceneId) {
            loadedScene = sceneId;
        };
        
        // 处理一个不会改变场景的选项
        handleChoice({ text: "测试", nextScene: "不存在的场景" });
        
        // 验证结局
        assert(loadedScene === 'burnout', `倦怠结局未正确触发，加载的场景是: ${loadedScene}`);
        
        // 恢复函数和状态
        window.loadScene = originalLoadScene;
        Object.assign(gameState, originalState);
        gameState.currentScene = originalScene;
    },
    
    "裁员结局触发条件": function() {
        // 保存当前状态
        const originalState = JSON.parse(JSON.stringify(gameState));
        const originalScene = gameState.currentScene;
        
        // 设置裁员结局的条件
        gameState.performance = 19;  // 工作表现低于20触发裁员结局
        gameState.mental = 30;  // 确保不会触发倦怠结局
        
        // 创建一个监视对象来检测loadScene的调用
        let loadedScene = null;
        const originalLoadScene = window.loadScene;
        window.loadScene = function(sceneId) {
            loadedScene = sceneId;
        };
        
        // 处理一个不会改变场景的选项
        handleChoice({ text: "测试", nextScene: "不存在的场景" });
        
        // 验证结局
        assert(loadedScene === 'layoff', `裁员结局未正确触发，加载的场景是: ${loadedScene}`);
        
        // 恢复函数和状态
        window.loadScene = originalLoadScene;
        Object.assign(gameState, originalState);
        gameState.currentScene = originalScene;
    }
};

// =====================================================
// 运行测试
// =====================================================

function runAllTests() {
    // 重置测试结果
    testResults.passed = 0;
    testResults.failed = 0;
    testResults.tests = [];
    testResults.missingScenes = [];
    testResults.referencingScenes = {};
    
    // 运行所有测试套件
    runTestSuite("场景初始化测试", sceneInitTests);
    runTestSuite("场景导航测试", sceneNavigationTests);
    runTestSuite("游戏逻辑测试", gameLogicTests);
    runTestSuite("结局条件测试", endingConditionTests);
    
    // 显示测试结果
    showTestResults();
    
    // 返回总结
    return {
        total: testResults.passed + testResults.failed,
        passed: testResults.passed,
        failed: testResults.failed,
        missingScenes: testResults.missingScenes.length
    };
}

// 添加一个自动测试配置
const testConfig = {
    autoRunOnLoad: false,  // 页面加载后自动运行测试
    showTestButton: true, // 是否显示测试按钮
    showResultsOnPass: false // 如果所有测试通过，是否依然显示结果窗口
};

// 运行测试后的回调函数
function onTestsComplete(results) {
    console.log(`测试完成: ${results.passed}/${results.total} 通过`);
    
    if (results.missingScenes > 0) {
        console.warn(`发现 ${results.missingScenes} 个缺失场景，详情请查看测试结果窗口`);
    }
    
    // 如果有测试失败，或者配置了即使通过也显示结果，则显示结果窗口
    if (results.failed > 0 || results.missingScenes > 0 || testConfig.showResultsOnPass) {
        showTestResults();
    } else {
        // 在页面上显示小提示
        const notification = document.createElement('div');
        notification.textContent = `✅ 全部测试通过 (${results.passed}/${results.total})`;
        notification.style.position = 'fixed';
        notification.style.bottom = '10px';
        notification.style.right = '10px';
        notification.style.padding = '5px 10px';
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
        notification.style.borderRadius = '3px';
        notification.style.zIndex = '9999';
        notification.style.opacity = '0.9';
        document.body.appendChild(notification);
        
        // 3秒后移除提示
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
}

// 添加测试按钮
function addTestButton() {
    // 如果配置为不显示按钮，则直接返回
    if (!testConfig.showTestButton) return;
    
    const testButton = document.createElement('button');
    testButton.textContent = '运行测试';
    testButton.style.position = 'fixed';
    testButton.style.bottom = '10px';
    testButton.style.right = '10px';
    testButton.style.padding = '5px 10px';
    testButton.style.backgroundColor = '#4CAF50';
    testButton.style.color = 'white';
    testButton.style.border = 'none';
    testButton.style.borderRadius = '3px';
    testButton.style.cursor = 'pointer';
    testButton.style.zIndex = '9999';
    
    testButton.onclick = function() {
        const results = runAllTests();
        onTestsComplete(results);
    };
    
    document.body.appendChild(testButton);
}

// 在页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 等待游戏初始化完成
    setTimeout(() => {
        // 添加测试按钮
        addTestButton();
        
        // 如果配置为自动运行测试，则运行测试
        if (testConfig.autoRunOnLoad) {
            console.log("自动运行测试...");
            const results = runAllTests();
            onTestsComplete(results);
        }
    }, 1000);
}); 