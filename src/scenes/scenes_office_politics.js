// 游戏的办公室政治场景
var officePoliticsScenes = {
    // 资深员工建议
    senior_advice: {
        text: `
            <h2>资深员工的忠告</h2>
            <p>你找到了那位资深员工王哥，他看了看四周，把你拉到一个安静的角落。</p>
            <p>"新人啊，我看你挺实诚的，跟你说几句心里话。这个公司有几个不成文的规矩..."</p>
            <p>王哥详细讲解了公司的"潜规则"：如何避免成为"背锅侠"，如何识别"低垂的果实"（容易完成但能获得认可的任务），以及如何应对同事的"摘桃子"行为（抢功劳）。</p>
            <p>"记住，不要轻易承诺做不到的事，但也别拒绝太多。找到平衡点才能长久。"</p>
            <p>这次谈话让你对公司的生态有了更深的了解。</p>
        `,
        choices: [
            { text: "感谢王哥并请教如何识别团队中的'关键人物'", nextScene: "key_figures", effects: {performance: 3, mental: 5, skills: ["职场眼光", "政治嗅觉"]} },
            { text: "重点询问如何应对'摘桃子'行为", nextScene: "credit_stealing", effects: {performance: 2, mental: 2, skills: ["功劳保护"]} },
            { text: "询问如何找到并完成'低垂的果实'", nextScene: "low_hanging_fruit", effects: {performance: 5, mental: 3, skills: ["任务筛选"]} }
        ]
    },
    
    // 关键人物
    key_figures: {
        text: `
            <h2>职场关系图谱</h2>
            <p>王哥微微一笑："这个问题问得好，认清公司中谁真正有话语权比做多少加班都重要。"</p>
            <p>他详细描述了部门中的几个关键角色：</p>
            <p>"别看李总是直属领导，但他在公司其实不太受重视。真正的决策者是技术VP赵总，他虽然不常露面，但一句话能决定项目走向。"</p>
            <p>"还有产品经理小陈，表面上职位不高，但和CEO是校友，意见很受重视。得罪谁也别得罪她。"</p>
            <p>"最后别忽视HR小王，她虽然总是笑脸相迎，但掌握着绩效评定的关键信息渠道。"</p>
            <p>王哥拍拍你的肩膀："新人要想站稳脚跟，得学会'排兵布阵'，合理分配精力，重点维护关键关系。"</p>
        `,
        choices: [
            { text: "争取和技术VP赵总搭上线", nextScene: "approach_vp", effects: {performance: 8, mental: -5, skills: ["高层社交"]} },
            { text: "和产品经理小陈建立良好关系", nextScene: "befriend_pm", effects: {performance: 5, mental: -2, allies: ["小陈"]} },
            { text: "忽然接到通知，公司要进行重大重组...", nextScene: "company_restructure", effects: {performance: 0, mental: -5} }
        ]
    },
    
    // 应对摘桃子
    credit_stealing: {
        text: `
            <h2>功劳保卫战</h2>
            <p>王哥听到你的问题，苦笑道："这个问题问到点子上了，'摘桃子'可是职场常态。"</p>
            <p>他分享了几个应对策略：</p>
            <p>"首先，重要成果要做好记录，在群里及时汇报，留下痕迹；其次，关键会议一定要参加，不给别人代表你的机会；最后，建立自己的'粉丝团'，让更多人知道你的贡献。"</p>
            <p>"记住，不要正面冲突指责同事摘桃子，那样只会让自己看起来小气。要用制度和流程来保护自己。"</p>
            <p>王哥最后提醒你："有时候适当让别人分享一点功劳，也能换来日后的帮助。这是门艺术。"</p>
        `,
        choices: [
            { text: "在团队中建立周报制度，记录每个人的贡献", nextScene: "establish_system", effects: {performance: 7, mental: -3, skills: ["流程建设"]} },
            { text: "学会在关键场合展示自己的工作", nextScene: "self_promotion", effects: {performance: 5, mental: -2, skills: ["自我营销"]} },
            { text: "偶尔分享功劳，建立互惠关系网", nextScene: "share_credit", effects: {performance: 3, mental: 4, allies: ["团队成员"], skills: ["人情世故"]} }
        ]
    },
    
    // 低垂的果实
    low_hanging_fruit: {
        text: `
            <h2>精明的任务选择</h2>
            <p>王哥露出赞赏的表情："你很聪明，知道要找'低垂的果实'。"</p>
            <p>他解释道："'低垂的果实'就是那些投入小、回报大、容易完成但看起来很有价值的任务。"</p>
            <p>"比如系统优化类的工作，优化前后有明显数据对比；或者一些看起来技术难度高但其实有现成方案的问题；再或者是直接影响用户体验的小功能，改进后立竿见影。"</p>
            <p>王哥进一步分析："新人刚来，要先接一些能快速出成果的工作，建立初步信任；同时避开那些历史遗留的'坑'，那些往往是前人都解决不了的难题。"</p>
            <p>他神秘地笑了笑："最近有个数据看板项目，技术难度不大但很受领导关注，你可以考虑争取一下。"</p>
        `,
        choices: [
            { text: "争取接手数据看板项目", nextScene: "dashboard_project", effects: {performance: 10, mental: -5, skills: ["战略眼光"]} },
            { text: "请王哥指导如何识别项目中的'陷阱'", nextScene: "identify_traps", effects: {performance: 3, mental: 2, skills: ["风险识别"]} },
            { text: "询问如何平衡'低垂果实'和有挑战性的任务", nextScene: "balance_tasks", effects: {performance: 5, mental: 5, skills: ["职业规划"]} }
        ]
    },
    
    // 数据看板项目
    dashboard_project: {
        text: `
            <h2>抢手的项目</h2>
            <p>在王哥的建议下，你主动向李总请缨负责数据看板项目。</p>
            <p>李总有些惊讶："这个项目之前几个人都不太想接，说没有技术亮点。你确定要做？"</p>
            <p>你表示有信心做好，并提出了初步方案。李总欣然同意，但提醒项目下周要向高层汇报。</p>
            <p>接手项目后，你才发现这确实是个"低垂的果实"：技术实现不复杂，但能直观展示公司业务数据，高层非常重视。</p>
            <p>然而，就在你完成一半时，同事小明突然表示也想参与这个项目，并在组内会议上分享了一些"改进想法"。</p>
            <p>你意识到这可能是一个"摘桃子"的苗头。</p>
        `,
        choices: [
            { text: "邀请小明加入，但清晰划分职责和贡献", nextScene: "collaborate_boundary", effects: {performance: 5, mental: 0, skills: ["合作边界"]} },
            { text: "加班加点提前完成项目，不给摘桃子的机会", nextScene: "rush_completion", effects: {performance: 8, mental: -8, skills: ["快速交付"]} },
            { text: "在团队群里详细记录自己的工作进展和创意", nextScene: "document_contribution", effects: {performance: 6, mental: -3, skills: ["自我保护"]} }
        ]
    }
}; 