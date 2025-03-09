// 确保所有场景变量都被初始化
// 如果某个场景变量未定义，则初始化为空对象
if (typeof introScenes === 'undefined') {
    var introScenes = {};
    console.error("introScenes 未定义，已初始化为空对象");
}

if (typeof trainingResponseScenes === 'undefined') {
    var trainingResponseScenes = {};
    console.error("trainingResponseScenes 未定义，已初始化为空对象");
}

if (typeof officePoliticsScenes === 'undefined') {
    var officePoliticsScenes = {};
    console.error("officePoliticsScenes 未定义，已初始化为空对象");
}

if (typeof projectScenes === 'undefined') {
    var projectScenes = {};
    console.error("projectScenes 未定义，已初始化为空对象");
}

if (typeof advancedScenes === 'undefined') {
    var advancedScenes = {};
    console.error("advancedScenes 未定义，已初始化为空对象");
}

if (typeof dramaticEventScenes === 'undefined') {
    var dramaticEventScenes = {};
    console.error("dramaticEventScenes 未定义，已初始化为空对象");
}

if (typeof dramaticOutcomeScenes === 'undefined') {
    var dramaticOutcomeScenes = {};
    console.error("dramaticOutcomeScenes 未定义，已初始化为空对象");
}

if (typeof missingScenes === 'undefined') {
    var missingScenes = {};
    console.error("missingScenes 未定义，已初始化为空对象");
}

if (typeof endingScenes === 'undefined') {
    var endingScenes = {};
    console.error("endingScenes 未定义，已初始化为空对象");
}

// 确保start场景存在
if (!introScenes.start) {
    console.error("start场景不存在，创建一个基本的start场景");
    introScenes.start = {
        text: `
            <h2>游戏加载中...</h2>
            <p>如果您看到这个页面，说明游戏场景加载出现了问题。</p>
            <p>请刷新页面，或检查浏览器控制台获取更多信息。</p>
        `,
        choices: [
            { text: "刷新页面", nextScene: "refresh_page" }
        ]
    };
}

// 添加refresh_page场景
introScenes.refresh_page = {
    text: `
        <h2>刷新页面</h2>
        <p>正在刷新页面，请稍候...</p>
    `,
    choices: []
};

// 在用户点击"刷新页面"按钮时，真正刷新页面
document.addEventListener('click', function(event) {
    if (event.target.textContent === "刷新页面") {
        window.location.reload();
    }
}); 