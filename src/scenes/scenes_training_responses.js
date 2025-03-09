// 游戏的培训回应场景
var trainingResponseScenes = {
    // 培训后续场景 - 加班积极
    training_overtime_positive: {
        text: `
            <h2>加班小能手</h2>
            <p>你表达了对加班的积极态度，HR和部门经理看起来很满意。</p>
            <p>培训结束后，你的直属领导李总找到你，说对你的态度很欣赏。</p>
            <p>"年轻人有拼劲是好事，我们团队正好有个紧急项目，需要人手，你愿意加入吗？"</p>
            <p>你意识到这可能是一个表现自己的机会，但也可能意味着接下来几周的无尽加班。</p>
        `,
        choices: [
            { text: "欣然接受挑战，表示会全力以赴", nextScene: "urgent_project_accept", effects: {performance: 10, mental: -10, skills: ["技术攻关"]} },
            { text: "询问项目细节和时间安排后再决定", nextScene: "urgent_project_inquire", effects: {performance: 3, mental: -2, skills: ["理性分析"]} },
            { text: "礼貌拒绝，表示需要时间熟悉公司环境", nextScene: "urgent_project_refuse", effects: {performance: -5, mental: 5} }
        ]
    },
    
    // 培训后续场景 - 效率优先
    training_efficiency: {
        text: `
            <h2>效率优先</h2>
            <p>你表达了效率优于时间的观点，引发了一些讨论。</p>
            <p>部门经理张总对你的发言表现出了兴趣，培训结束后专门找到你交流。</p>
            <p>"你的观点很有意思，不过在我们公司，有时候项目紧急，效率和时间都得要。你怎么看？"</p>
            <p>你感觉这是一个测试，张总似乎在评估你的工作态度。</p>
        `,
        choices: [
            { text: "坚持自己的观点，但表示紧急情况会配合加班", nextScene: "manager_chat_balanced", effects: {performance: 2, mental: 5, allies: ["张总"]} },
            { text: "顺势改变立场，表示愿意付出更多时间", nextScene: "manager_chat_change", effects: {performance: 5, mental: -5} },
            { text: "进一步解释高效工作方法，试图说服经理", nextScene: "manager_chat_convince", effects: {performance: -2, mental: 3, skills: ["沟通技巧"]} }
        ]
    },
    
    // 培训后续场景 - 加班消极
    training_overtime_negative: {
        text: `
            <h2>工作与生活的平衡</h2>
            <p>你直接表明了对过度加班的消极态度，引起了一阵尴尬的沉默。</p>
            <p>HR小王和部门经理交换了一个意味深长的眼神。</p>
            <p>培训结束后，一位资深员工王哥悄悄找到你："新人，话可不能这么直接说，小心被贴标签。"</p>
            <p>他似乎想给你一些建议，但被经理叫走了。你感觉自己可能犯了个错误。</p>
        `,
        choices: [
            { text: "找HR私下解释自己的真实想法", nextScene: "explain_to_hr", effects: {performance: -2, mental: -3} },
            { text: "找那位资深员工继续请教职场经验", nextScene: "senior_advice", effects: {performance: 2, mental: 5, allies: ["王哥"]} },
            { text: "保持观点但后续更加努力工作来证明自己", nextScene: "prove_yourself", effects: {performance: 5, mental: -2} }
        ]
    },
    
    // HR解释场景
    explain_to_hr: {
        text: `
            <h2>坦诚沟通</h2>
            <p>你找到HR小王，希望解释自己对工作与生活平衡的真实想法。</p>
            <p>"我并非不愿意努力工作，只是认为长期过度加班并不健康，也不利于工作效率和创新..."</p>
            <p>HR小王面无表情地听完，只是微微点头："我理解你的想法，不过在我们公司，有时候项目进度确实需要大家多付出一些。"</p>
            <p>她的语气很官方："希望你能理解公司文化，适当调整自己的期望。"</p>
            <p>你感觉自己的解释不仅没有改善印象，反而可能强化了他们对你的看法。</p>
        `,
        choices: [
            { text: "表示理解并承诺会积极配合公司需求", nextScene: "hr_compromise", effects: {performance: 2, mental: -5} },
            { text: "坚持自己的观点但表示会尽力平衡", nextScene: "hr_persistent", effects: {performance: -3, mental: 2, skills: ["自我坚持"]} },
            { text: "请HR给些建议如何更好融入团队", nextScene: "hr_advice", effects: {performance: 1, mental: 0, allies: ["HR小王"]} }
        ]
    },
    
    // HR妥协场景
    hr_compromise: {
        text: `
            <h2>妥协</h2>
            <p>你表示理解公司的要求，并承诺会积极配合公司的各项工作安排。</p>
            <p>"我会调整自己的期望和工作方式，全力支持团队和项目需求。"</p>
            <p>HR小王终于露出了一丝微笑："很高兴你能理解。相信你会是团队的好伙伴。"</p>
            <p>临走前，她又补充道："年轻人嘛，刚开始都需要一段适应期。你会慢慢习惯的。"</p>
            <p>虽然化解了尴尬，但回到工位的路上，你感到一丝失落和内心的不安。</p>
        `,
        choices: [
            { text: "决定低调做事，避免引起更多关注", nextScene: "low_profile", effects: {performance: 3, mental: -2} },
            { text: "暗下决心，边适应边寻找更好的机会", nextScene: "secret_job_hunting", effects: {performance: -1, mental: 3, skills: ["职业规划"]} },
            { text: "找同事了解公司实际的加班情况", nextScene: "overtime_inquiry", effects: {performance: 1, mental: 1, skills: ["信息收集"]} }
        ]
    },
    
    // HR坚持场景
    hr_persistent: {
        text: `
            <h2>坚持原则</h2>
            <p>你礼貌但坚定地表达了自己的立场："我理解项目紧急的情况，也会尽力配合，但我认为长期的工作生活平衡对双方都更有益。"</p>
            <p>HR小王的表情变得有些严肃："每个公司的文化不同，适应是新人的必修课。"</p>
            <p>她暗示道："你的直属领导可能对这个话题有自己的看法，希望你能和团队保持一致。"</p>
            <p>对话在略显紧张的氛围中结束，你感觉自己可能被贴上了"不好管理"的标签。</p>
        `,
        choices: [
            { text: "找直属领导坦诚交流你的工作理念", nextScene: "talk_to_leader", effects: {performance: -2, mental: -3, skills: ["勇气"]} },
            { text: "默默接受现状，但在工作中展现高效率", nextScene: "prove_efficiency", effects: {performance: 4, mental: -3, skills: ["高效工作"]} },
            { text: "寻找公司中志同道合的同事建立支持网络", nextScene: "find_allies", effects: {performance: 0, mental: 5, allies: ["志同道合者"]} }
        ]
    },
    
    // HR建议场景
    hr_advice: {
        text: `
            <h2>寻求建议</h2>
            <p>你请HR小王给些建议，如何更好地融入团队而不必完全放弃自己的原则。</p>
            <p>她稍微放松了表情："这是个好问题。"</p>
            <p>"每个团队的风格不同，我建议你先观察几周，了解团队实际的工作节奏。有时候看起来的'加班文化'其实没那么极端。"</p>
            <p>她补充道："和直属领导建立良好沟通也很重要，让他知道你的工作状态和界限，但也展现你的责任心。"</p>
            <p>这个建议听起来很中肯，你感觉HR对你的印象有所改观。</p>
        `,
        choices: [
            { text: "感谢建议，决定观察和适应团队节奏", nextScene: "observe_team", effects: {performance: 3, mental: 2, skills: ["观察力"]} },
            { text: "主动约直属领导一对一沟通", nextScene: "leader_one_on_one", effects: {performance: 2, mental: 0, allies: ["直属领导"]} },
            { text: "请HR介绍团队中工作平衡做得好的榜样", nextScene: "work_life_role_model", effects: {performance: 1, mental: 3, skills: ["人际智慧"]} }
        ]
    },
    
    // 培训后续场景 - 平衡工作生活
    training_balance: {
        text: `
            <h2>寻找平衡点</h2>
            <p>你表达了平衡工作和生活的观点，获得了一些新同事的认同点头。</p>
            <p>HR和经理的表情中性，似乎在评估你的真实态度。</p>
            <p>培训结束后，一位同组的新同事小林找到你："我很欣赏你的观点，感觉我们能成为好同事。"</p>
            <p>你们聊了几句，发现彼此都热爱技术但也重视个人生活。</p>
        `,
        choices: [
            { text: "和小林建立更深的友谊，组建自己的小圈子", nextScene: "new_friend", effects: {performance: 2, mental: 8, allies: ["小林"]} },
            { text: "保持礼貌但不过度亲近，避免被贴标签", nextScene: "keep_distance", effects: {performance: 3, mental: 2} },
            { text: "请小林介绍团队中的关键人物和潜规则", nextScene: "team_insights", effects: {performance: 5, mental: 3, skills: ["办公室情报"]} }
        ]
    },
    
    // 经理对话场景 - 平衡观点
    manager_chat_balanced: {
        text: `
            <h2>原则与灵活的平衡</h2>
            <p>你坚持自己的效率优先观点，但也表达了在紧急情况下会配合加班的意愿。</p>
            <p>张总微微点头："很好的态度。我欣赏有原则但也懂得灵活的人。"</p>
            <p>他补充道："下周我们部门有个小型技术分享会，你要不要准备一个关于提高工作效率的主题？十分钟左右就行。"</p>
            <p>这似乎是个展示自己的机会，但也需要额外的准备时间。</p>
        `,
        choices: [
            { text: "欣然接受，承诺准备精彩的分享", nextScene: "tech_sharing_prepare", effects: {performance: 5, mental: -3, skills: ["演讲技巧"]} },
            { text: "婉拒邀请，表示需要更多时间熟悉业务", nextScene: "decline_sharing", effects: {performance: -2, mental: 2} },
            { text: "谨慎接受，但要求先了解听众期望", nextScene: "sharing_research", effects: {performance: 3, mental: 0, skills: ["战略思考"]} }
        ]
    },
    
    // 经理对话场景 - 改变立场
    manager_chat_change: {
        text: `
            <h2>顺势而为</h2>
            <p>你迅速调整了自己的立场，表示愿意付出更多时间完成工作。</p>
            <p>张总笑了笑："嗯，适应性强是好事。不过，你在培训时的观点其实也有道理。"</p>
            <p>他若有所思地看着你："我们部门下周要启动一个新项目，时间比较紧，你愿意参与吗？"</p>
            <p>你意识到这可能是一个证明自己的机会，但也可能是对你适应性的测试。</p>
        `,
        choices: [
            { text: "立即表示愿意加入，展现积极性", nextScene: "quick_project_join", effects: {performance: 7, mental: -7} },
            { text: "询问项目细节后再做决定", nextScene: "project_inquiry", effects: {performance: 2, mental: 0, skills: ["谨慎决策"]} },
            { text: "委婉表示希望先完成培训期再接新项目", nextScene: "delay_project", effects: {performance: -3, mental: 5} }
        ]
    },
    
    // 经理对话场景 - 试图说服
    manager_chat_convince: {
        text: `
            <h2>高效工作法</h2>
            <p>你详细解释了你的高效工作方法，包括合理规划、专注时间块和定期回顾等理念。</p>
            <p>张总听完，若有所思："你的方法很系统，理论上确实能提高效率。但实际项目中，变数太多..."</p>
            <p>他似乎半信半疑，但对你的思考方式有了兴趣："有机会可以在团队中试试你的方法，看看效果如何。"</p>
            <p>你感觉他给了你一个证明自己理念的机会，但也隐含着挑战。</p>
        `,
        choices: [
            { text: "请求一个小型项目实践你的方法", nextScene: "efficiency_experiment", effects: {performance: 3, mental: 0, skills: ["工作方法论"]} },
            { text: "提议先在自己工作中实践并记录数据", nextScene: "self_experiment", effects: {performance: 1, mental: 3, skills: ["数据分析"]} },
            { text: "表示理解现实的复杂性，会灵活应用", nextScene: "flexible_approach", effects: {performance: 4, mental: -1} }
        ]
    }
}; 