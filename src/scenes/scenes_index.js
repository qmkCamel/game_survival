// 合并所有游戏场景
window.scenes = {
    // 从各个场景文件中导入场景
    ...introScenes,             // 游戏开始和初始培训场景
    ...trainingResponseScenes,  // 培训回应场景
    ...officePoliticsScenes,    // 办公室政治场景
    ...projectScenes,           // 项目管理和团队协作场景
    ...advancedScenes,          // 高级职场场景
    ...dramaticEventScenes,     // 戏剧性转折场景
    ...dramaticOutcomeScenes,   // 戏剧性转折后续场景
    ...missingScenes,           // 补充的缺失场景定义
    ...hrFollowupScenes,        // HR培训相关后续场景
    ...endingScenes             // 游戏结局场景
};

// 调试信息
console.log("所有场景加载情况：");
console.log("introScenes 是否加载:", typeof introScenes !== 'undefined');
console.log("trainingResponseScenes 是否加载:", typeof trainingResponseScenes !== 'undefined');
console.log("officePoliticsScenes 是否加载:", typeof officePoliticsScenes !== 'undefined');
console.log("projectScenes 是否加载:", typeof projectScenes !== 'undefined');
console.log("advancedScenes 是否加载:", typeof advancedScenes !== 'undefined');
console.log("dramaticEventScenes 是否加载:", typeof dramaticEventScenes !== 'undefined');
console.log("dramaticOutcomeScenes 是否加载:", typeof dramaticOutcomeScenes !== 'undefined');
console.log("missingScenes 是否加载:", typeof missingScenes !== 'undefined');
console.log("hrFollowupScenes 是否加载:", typeof hrFollowupScenes !== 'undefined');
console.log("endingScenes 是否加载:", typeof endingScenes !== 'undefined');

console.log("scenes对象是否包含start场景:", window.scenes.hasOwnProperty('start'));
console.log("start场景的内容:", window.scenes.start); 