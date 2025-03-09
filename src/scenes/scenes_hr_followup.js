// HR和培训相关的后续场景
var hrFollowupScenes = {
    // 努力证明自己场景
    prove_yourself: {
        text: `
            <h2>用行动证明价值</h2>
            <p>你决定不改变自己的工作与生活平衡的观点，但会通过更加努力的工作来证明自己的价值。</p>
            <p>接下来的几周，你主动承担更多任务，提前完成各项工作，同时保持高质量的输出。</p>
            <p>虽然你依然按时下班，但你的工作效率和成果开始引起团队的注意。</p>
            <p>一个月后，项目经理在团队会议上特别表扬了你的贡献："有些人用结果说话，比单纯的加班更有价值。"</p>
        `,
        choices: [
            { text: "继续保持高效工作模式，树立个人品牌", nextScene: "build_reputation", effects: {performance: 8, mental: 2, skills: ["高效工作"]} },
            { text: "借势与经理深入交流工作方法论", nextScene: "discuss_methodology", effects: {performance: 5, mental: 5, allies: ["项目经理"]} },
            { text: "申请带领一个小型项目，展示领导力", nextScene: "lead_small_project", effects: {performance: 10, mental: -3, skills: ["领导力"]} }
        ]
    },
    
    // 低调工作场景
    low_profile: {
        text: `
            <h2>谨言慎行</h2>
            <p>接下来的几周，你选择了低调行事的策略。</p>
            <p>你不再在公开场合发表关于加班的看法，而是默默地按时完成工作，偶尔配合团队加班，但也坚持维护必要的个人时间。</p>
            <p>这种平衡的方式让你逐渐摆脱了"不合群"的标签，主管也开始注意到你扎实的工作能力。</p>
            <p>一个月后，当团队讨论新项目人员分配时，你的名字出现在了核心成员列表中。</p>
        `,
        choices: [
            { text: "欣然接受并继续保持低调策略", nextScene: "core_team_lowkey", effects: {performance: 5, mental: 3, skills: ["职场智慧"]} },
            { text: "趁机展现更多才能，提升影响力", nextScene: "show_talent", effects: {performance: 8, mental: -2, skills: ["领导力"]} },
            { text: "在私下和主管沟通你的长期发展规划", nextScene: "career_planning", effects: {performance: 3, mental: 5, skills: ["职业规划"]} }
        ]
    },
    
    // 秘密求职场景
    secret_job_hunting: {
        text: `
            <h2>另谋出路</h2>
            <p>虽然表面上你积极适应公司环境，但私下里你开始更新简历，关注市场上的其他机会。</p>
            <p>你在招聘网站上设置了职位提醒，并联系了几位业内朋友打听更适合自己的公司。</p>
            <p>两个月内，你参加了三场秘密面试，其中一家公司对你的技术能力和工作理念非常认可。</p>
            <p>与此同时，你在当前公司的表现也很稳定，没有人察觉你的求职意图。</p>
        `,
        choices: [
            { text: "接受新公司的offer，提出辞职", nextScene: "resignation", effects: {performance: 0, mental: 8, skills: ["决断力"]} },
            { text: "利用offer和现公司谈条件", nextScene: "negotiate_conditions", effects: {performance: 5, mental: -5, skills: ["谈判技巧"]} },
            { text: "继续观望，等待更好的机会", nextScene: "keep_waiting", effects: {performance: 3, mental: 2, skills: ["耐心"]} }
        ]
    },
    
    // 了解加班情况场景
    overtime_inquiry: {
        text: `
            <h2>实情调查</h2>
            <p>你找了个机会和几位老员工聊天，委婉地了解公司的实际加班情况。</p>
            <p>"其实也没那么夸张，"一位在公司工作三年的同事说，"主要是季度末和大项目上线前比较忙。日常还好。"</p>
            <p>你了解到，虽然公司文化倾向于加班，但实际执行会因团队和主管而异。有些团队鼓励高效率，有些则看重"在位时间"。</p>
            <p>这些信息让你对公司有了更全面的认识，也明白了如何在不同场合做出适当的选择。</p>
        `,
        choices: [
            { text: "有针对性地选择更注重效率的团队加入", nextScene: "join_efficient_team", effects: {performance: 5, mental: 5, skills: ["战略决策"]} },
            { text: "和直属领导坦诚交流，了解他的期望", nextScene: "talk_to_leader", effects: {performance: 3, mental: 2, allies: ["直属领导"]} },
            { text: "适当展示加班，但提高工作效率保护自己", nextScene: "strategic_overtime", effects: {performance: 2, mental: -2, skills: ["时间管理"]} }
        ]
    },
    
    // 与领导交流场景
    talk_to_leader: {
        text: `
            <h2>坦诚对话</h2>
            <p>你找了个合适的时机，约直属领导李经理喝咖啡，坦诚地表达了你对工作与生活平衡的看法。</p>
            <p>"我非常看重这份工作，也愿意为团队全力以赴，但我相信高效工作比长时间工作更重要。"</p>
            <p>出乎意料的是，李经理很欣赏你的坦率："其实我个人也不太支持无效加班，但在这个环境下，有时必须做出一些妥协。"</p>
            <p>他给了你一些在公司环境中平衡的实用建议，也表示会尽量按绩效而非工作时长来评价团队成员。</p>
        `,
        choices: [
            { text: "感谢理解，提议优化团队工作流程", nextScene: "optimize_workflow", effects: {performance: 5, mental: 5, skills: ["流程优化"], allies: ["李经理"]} },
            { text: "承诺必要时会加班，但请求灵活安排", nextScene: "flexible_arrangement", effects: {performance: 3, mental: 3} },
            { text: "询问如何在公司更好地发展晋升", nextScene: "promotion_advice", effects: {performance: 4, mental: 2, skills: ["职业规划"]} }
        ]
    },
    
    // 高效工作证明场景
    prove_efficiency: {
        text: `
            <h2>行动胜于言语</h2>
            <p>你决定不再争论加班问题，而是通过高效率的工作方式来证明自己的价值。</p>
            <p>你开始优化自己的工作流程，提前规划任务，减少无效会议，并学习使用各种提高效率的工具和技术。</p>
            <p>一个月后，你不仅按时完成了所有分配的任务，还主动承担了额外的工作，同时比大多数同事更早下班。</p>
            <p>你的主管开始注意到这种变化，在一次会议上还表扬了你的工作方法。</p>
        `,
        choices: [
            { text: "分享你的高效工作方法给团队", nextScene: "share_methods", effects: {performance: 8, mental: 5, skills: ["知识分享"], allies: ["团队成员"]} },
            { text: "请求承担更有挑战性的项目", nextScene: "request_challenge", effects: {performance: 10, mental: -3, skills: ["主动性"]} },
            { text: "保持现状，享受工作与生活的平衡", nextScene: "maintain_balance", effects: {performance: 3, mental: 8} }
        ]
    },
    
    // 寻找盟友场景
    find_allies: {
        text: `
            <h2>志同道合</h2>
            <p>在接下来的几周里，你开始有意识地寻找公司中与你持相似工作理念的同事。</p>
            <p>通过午餐交流和项目协作，你发现市场部的小张、技术部的老王也都认同工作效率高于工作时长的理念。</p>
            <p>你们逐渐形成了一个非正式的小圈子，不仅交流工作心得，还互相支持，共同抵抗无效加班的压力。</p>
            <p>这种互相支持的关系让你在公司感到不再孤单，心理压力也减轻了许多。</p>
        `,
        choices: [
            { text: "组织效率提升研讨会，扩大影响", nextScene: "efficiency_workshop", effects: {performance: 7, mental: 3, skills: ["组织能力"], allies: ["效率联盟"]} },
            { text: "与盟友一起向管理层提出改善建议", nextScene: "group_suggestion", effects: {performance: 5, mental: -2, skills: ["沟通谈判"]} },
            { text: "保持低调的盟友关系，互相支持", nextScene: "quiet_support", effects: {performance: 2, mental: 7, allies: ["小张", "老王"]} }
        ]
    },
    
    // 观察团队场景
    observe_team: {
        text: `
            <h2>耐心观察</h2>
            <p>按照HR的建议，你决定先不急于表态，而是花时间观察团队的实际工作模式。</p>
            <p>经过几周的观察，你发现团队确实存在加班文化，但大多集中在项目关键节点。日常工作中，只要按时完成任务，适当弹性是可以接受的。</p>
            <p>你还注意到不同的同事应对方式各异：有人选择高效率完成后提前离开，有人则习惯了打卡式工作。</p>
            <p>这些发现让你开始调整自己的策略，在关键时刻全力投入，平时则注重效率和质量。</p>
        `,
        choices: [
            { text: "学习高效同事的工作方法", nextScene: "learn_from_efficient", effects: {performance: 5, mental: 5, skills: ["效率工作法"]} },
            { text: "在团队中推广任务导向而非时间导向", nextScene: "promote_task_oriented", effects: {performance: 7, mental: -2, skills: ["影响力"]} },
            { text: "适应团队节奏，但保持自己的边界", nextScene: "adapt_with_boundary", effects: {performance: 3, mental: 7, skills: ["自我管理"]} }
        ]
    },
    
    // 领导一对一场景
    leader_one_on_one: {
        text: `
            <h2>一对一沟通</h2>
            <p>你主动约了直属领导张总进行一对一沟通，表达了你对工作的理解和期望。</p>
            <p>"我很重视这个工作机会，希望能在团队中发挥最大价值。我注重工作质量和效率，也愿意在关键时刻付出额外努力。"</p>
            <p>张总对你的主动性表示赞赏："能看到你对工作的认真态度。我们需要的是结果，而不仅仅是时间投入。当然，团队合作有时需要灵活配合。"</p>
            <p>通过这次坦诚的交流，你对团队的期望更加清晰，也建立了与领导的直接沟通渠道。</p>
        `,
        choices: [
            { text: "请教张总对你职业发展的建议", nextScene: "career_guidance", effects: {performance: 3, mental: 5, skills: ["职业规划"], allies: ["张总"]} },
            { text: "提议定期一对一会议保持沟通", nextScene: "regular_one_on_one", effects: {performance: 4, mental: 3, allies: ["张总"]} },
            { text: "请求参与更有挑战性的项目任务", nextScene: "challenge_request", effects: {performance: 7, mental: -2, skills: ["主动性"]} }
        ]
    },
    
    // 工作生活平衡榜样场景
    work_life_role_model: {
        text: `
            <h2>成功典范</h2>
            <p>你请HR介绍团队中在工作与生活平衡方面做得好的榜样，希望学习他们的经验。</p>
            <p>HR提到了技术部的陈经理："他管理着公司最核心的项目之一，但很少加班，团队氛围却很好，绩效也是最稳定的。"</p>
            <p>在HR的引荐下，你约了陈经理吃午饭。他分享了自己的方法："关键是合理规划、明确优先级、提高团队效率，而不是简单地延长工作时间。"</p>
            <p>他还建议你："在这里生存，要学会平衡公司文化与个人原则，适当妥协但不失底线。"</p>
        `,
        choices: [
            { text: "主动申请加入陈经理的团队", nextScene: "join_efficient_team", effects: {performance: 8, mental: 5, allies: ["陈经理"]} },
            { text: "在自己的工作中实践陈经理的方法", nextScene: "apply_efficiency_methods", effects: {performance: 5, mental: 3, skills: ["时间管理", "效率工作法"]} },
            { text: "向陈经理请教更多职场生存技巧", nextScene: "more_survival_tips", effects: {performance: 3, mental: 7, skills: ["职场智慧"]} }
        ]
    },
    
    // 树立个人品牌场景
    build_reputation: {
        text: `
            <h2>高效能员工</h2>
            <p>你决定继续保持高效的工作模式，逐渐在公司内部树立"高产出、高质量"的个人品牌。</p>
            <p>你不仅按时完成自己的任务，还善于帮助同事解决问题，分享工作经验和技巧。</p>
            <p>三个月后，你的名字在季度总结会上被多次提及，成为了团队中公认的效率标杆。</p>
            <p>有趣的是，尽管你很少加班，但没有人再质疑你对工作的投入，因为你的成果已经证明了一切。</p>
        `,
        choices: [
            { text: "接受公司内部效率培训师的邀请", nextScene: "efficiency_trainer", effects: {performance: 7, mental: 5, skills: ["知识分享"]} },
            { text: "利用良好声誉争取更好的项目和资源", nextScene: "leverage_reputation", effects: {performance: 10, mental: 0, skills: ["资源争取"]} },
            { text: "保持低调，享受工作与生活的平衡", nextScene: "balanced_success", effects: {performance: 5, mental: 8} }
        ]
    },
    
    // 工作方法论讨论场景
    discuss_methodology: {
        text: `
            <h2>方法论交流</h2>
            <p>得到认可后，你约项目经理李总吃了午饭，深入交流你的工作方法和效率理念。</p>
            <p>"我发现合理规划任务、减少无效会议和干扰、专注时间块工作，比单纯延长工作时间更有效。"</p>
            <p>李总对你的思考很感兴趣："你的方法有数据支持，我也一直觉得我们的工作方式可以优化。"</p>
            <p>午餐结束时，他提议："要不你在下次团队建设日分享一下你的工作方法？我觉得对大家都有帮助。"</p>
        `,
        choices: [
            { text: "欣然接受，准备一份详尽的效率工作法分享", nextScene: "efficiency_presentation", effects: {performance: 8, mental: 5, skills: ["演讲能力", "影响力"]} },
            { text: "建议先在小范围测试这套方法的效果", nextScene: "methodology_experiment", effects: {performance: 5, mental: 3, skills: ["实验精神"]} },
            { text: "推荐相关书籍和资源给整个团队", nextScene: "share_resources", effects: {performance: 3, mental: 7, allies: ["知识分享者"]} }
        ]
    },
    
    // 领导小项目场景
    lead_small_project: {
        text: `
            <h2>初试领导力</h2>
            <p>你向经理申请带领一个小型项目，希望进一步证明自己的能力。</p>
            <p>"我想负责新功能模块的开发，我有一些提高效率和质量的想法。"</p>
            <p>经理考虑了一下，同意了你的请求："这是个机会，让我们看看你的方法能否适用于团队协作。"</p>
            <p>接下来的两个月，你带领三人小组，按照自己的高效工作理念推进项目，不仅提前完成了任务，团队成员也很少需要加班。</p>
        `,
        choices: [
            { text: "向管理层提交项目成功经验总结", nextScene: "project_report", effects: {performance: 10, mental: 2, skills: ["项目管理", "经验总结"]} },
            { text: "申请扩大团队规模，接手更大项目", nextScene: "team_expansion", effects: {performance: 12, mental: -5, skills: ["团队管理"]} },
            { text: "指导其他团队成员应用你的方法", nextScene: "mentor_colleagues", effects: {performance: 7, mental: 5, allies: ["团队成员"]} }
        ]
    }
};

// 将新场景添加到游戏场景中
if (typeof window !== 'undefined' && window.scenes) {
    Object.assign(window.scenes, hrFollowupScenes);
} 