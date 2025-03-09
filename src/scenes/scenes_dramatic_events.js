// 游戏的戏剧性转折场景
var dramaticEventScenes = {
    // 公司重组突发事件
    company_restructure: {
        text: `
            <h2>地震来袭</h2>
            <p>一个平静的周一早晨，公司内部群突然炸开了锅。</p>
            <p>CEO发出全员邮件：由于战略调整，公司将进行大规模重组，你所在的部门面临解散或并入其他团队的可能。</p>
            <p>办公室里弥漫着不安的气氛，同事们三三两两地聚在一起窃窃私语。</p>
            <p>你的直属领导李总看起来也很忧虑，据说他可能在此次调整中被降职。</p>
            <p>这场突如其来的变动打乱了你原有的职业规划。</p>
        `,
        choices: [
            { text: "主动联系其他部门的经理，探讨转岗可能性", nextScene: "seek_transfer", effects: {performance: 5, mental: -3, skills: ["危机管理"]} },
            { text: "保持冷静，向李总表达忠诚，共度难关", nextScene: "loyalty_crisis", effects: {performance: 0, mental: 2, allies: ["李总"]} },
            { text: "趁机更新简历，开始寻找新的工作机会", nextScene: "update_resume", effects: {performance: -3, mental: 5, skills: ["自我营销"]} }
        ]
    },
    
    // 竞争对手挖角
    headhunter_approach: {
        text: `
            <h2>意外的邀约</h2>
            <p>一个陌生号码的微信请求引起了你的注意。</p>
            <p>对方自称是"星辰科技"的HR，他们注意到了你在技术社区的活跃表现，想邀请你参加面试。</p>
            <p>星辰科技是996科技的主要竞争对手，据说工作环境更好，薪资也更具竞争力。</p>
            <p>这个邀请来得十分意外，尤其是在公司重组的敏感时期。</p>
            <p>但你也听说过有同事因为与竞争对手接触而被公司以"违反职业道德"为由解雇的案例。</p>
        `,
        choices: [
            { text: "婉拒对方，保持职业忠诚", nextScene: "refuse_offer", effects: {performance: 5, mental: -2} },
            { text: "秘密赴约，了解更多信息", nextScene: "secret_interview", effects: {performance: 0, mental: 3, skills: ["信息获取"]} },
            { text: "咨询可信赖的同事，寻求建议", nextScene: "seek_advice_offer", effects: {performance: -1, mental: 2, skills: ["人际网络"]} }
        ]
    },
    
    // 项目危机
    project_crisis: {
        text: `
            <h2>深夜警报</h2>
            <p>凌晨2点，你的手机疯狂震动。</p>
            <p>紧急群通知：公司核心服务器遭遇重大故障，用户数据面临丢失风险，所有技术人员需立即响应。</p>
            <p>你匆忙登录系统，发现情况比想象的还要糟糕。这不是简单的技术故障，而是一次疑似内部人员操作失误导致的灾难。</p>
            <p>更糟的是，你发现故障与你前几天审核通过的一段代码可能有关。</p>
            <p>团队成员们紧急召开线上会议，气氛紧张，有人开始暗示这是你的责任。</p>
        `,
        choices: [
            { text: "主动承担责任，立即着手解决问题", nextScene: "take_responsibility", effects: {performance: -5, mental: -5, skills: ["危机处理"]} },
            { text: "仔细分析日志，找出真正的原因", nextScene: "analyze_logs", effects: {performance: 3, mental: -8, skills: ["技术调查"]} },
            { text: "保持沉默，等待更多信息再做判断", nextScene: "stay_silent", effects: {performance: -3, mental: -3} }
        ]
    },
    
    // 神秘投资人
    mysterious_investor: {
        text: `
            <h2>意外的贵客</h2>
            <p>公司突然迎来一位神秘的贵客，据说是来自硅谷的知名投资人。</p>
            <p>为了展示公司实力，管理层临时决定由你负责演示最新的产品原型。</p>
            <p>这个任务本应由产品经理小陈负责，但她突然"生病请假"。你怀疑这可能是一个圈套，因为产品还存在不少问题。</p>
            <p>但这也是一个在高层面前展示自己能力的难得机会。</p>
            <p>更让你惊讶的是，有同事悄悄告诉你，这位投资人其实是来评估公司价值的，可能与收购有关。</p>
        `,
        choices: [
            { text: "通宵加班完善产品，力求完美展示", nextScene: "perfect_demo", effects: {performance: 10, mental: -10, skills: ["临危不乱"]} },
            { text: "诚实展示产品现状，并清晰说明未来规划", nextScene: "honest_presentation", effects: {performance: 5, mental: -2, skills: ["诚信沟通"]} },
            { text: "找小陈了解详情，怀疑背后有不为人知的原因", nextScene: "investigate_truth", effects: {performance: 2, mental: -3, skills: ["情报收集"]} }
        ]
    },
    
    // 办公室潜规则
    office_hidden_rules: {
        text: `
            <h2>不明文的游戏</h2>
            <p>在一次部门聚餐后，几位喝了酒的老员工开始畅谈公司的"潜规则"。</p>
            <p>你才发现，公司晋升表面上看是靠绩效，实际却有一套不成文的评价体系。</p>
            <p>"那个新来的技术总监，之所以能空降进来，是因为他是副总的大学室友..."</p>
            <p>"去年评选优秀员工，名单在投票前就已经定好了，那些投票不过是走形式..."</p>
            <p>这些信息让你对公司的认知产生了动摇，也让你意识到单纯靠技术和努力可能无法获得真正的晋升。</p>
        `,
        choices: [
            { text: "努力融入这套潜规则体系，寻找靠山", nextScene: "play_by_rules", effects: {performance: 8, mental: -5, skills: ["权术"]} },
            { text: "坚持自己的原则，用实力说话", nextScene: "stick_to_principles", effects: {performance: 2, mental: 5, skills: ["专业精神"]} },
            { text: "表面适应，暗中规划自己的出路", nextScene: "double_strategy", effects: {performance: 5, mental: 0, skills: ["战略思考"]} }
        ]
    },
    
    // 职场陷阱
    workplace_trap: {
        text: `
            <h2>看不见的陷阱</h2>
            <p>在一次重要会议上，你的提案获得了高层的一致好评。</p>
            <p>会后，总监亲自找到你，表示对你的赏识，并提出让你负责一个"特殊项目"。</p>
            <p>"这是个重要机会，但需要保密，暂时不要告诉你的直属领导李总。"</p>
            <p>这个提议让你感到既兴奋又忐忑。一方面，这是得到高层认可的机会；另一方面，绕过直属领导似乎违背了职场伦理。</p>
            <p>更复杂的是，你听说这个"特殊项目"之前已经有两位员工尝试过，都以失败告终，随后离职了。</p>
        `,
        choices: [
            { text: "接受挑战，但婉转告知李总情况", nextScene: "accept_inform", effects: {performance: 3, mental: -3, allies: ["李总"]} },
            { text: "礼貌拒绝，表示需要专注当前工作", nextScene: "politely_refuse", effects: {performance: -2, mental: 5, skills: ["自我保护"]} },
            { text: "完全接受，把握难得的高层机会", nextScene: "full_accept", effects: {performance: 10, mental: -8, skills: ["冒险精神"]} }
        ]
    }
}; 