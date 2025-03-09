// 游戏的高级职场场景 - 排兵布阵和跨部门合作
var advancedScenes = {
    // 组建特别小组
    form_team: {
        text: `
            <h2>排兵布阵</h2>
            <p>你决定采取"排兵布阵"的策略，组建一个高效的项目小组。</p>
            <p>经过仔细观察，你确定了理想的团队成员：技术能力强的小张、与产品沟通顺畅的小李、以及测试经验丰富的老王。</p>
            <p>你单独与每位成员交流，强调这个项目的重要性以及他们独特的价值："我特别欣赏你在XX方面的专长，这对项目至关重要。"</p>
            <p>经过努力，你成功组建了理想团队。为了建立凝聚力，你组织了一次项目启动会，明确了目标、时间线和每个人的职责，还巧妙地让每位成员都能在自己擅长的领域发挥特长。</p>
            <p>李总看到你的安排后点头称赞："没想到你还挺会用人的，把大家的积极性都调动起来了。"</p>
            <p>项目开始推进，团队氛围融洽，效率高于预期。不过，你注意到公司政治斗争激烈的市场部门开始对你的项目表现出兴趣...</p>
        `,
        choices: [
            { text: "与市场部建立联盟，扩大项目影响力", nextScene: "cross_department", effects: {performance: 10, mental: -5, skills: ["跨部门协作"]} },
            { text: "专注技术实现，避免卷入政治漩涡", nextScene: "focus_execution", effects: {performance: 5, mental: 5, skills: ["专注力"]} },
            { text: "做好防火墙，保护团队不受干扰", nextScene: "team_protection", effects: {performance: 8, mental: 2, skills: ["团队防护"], allies: ["项目组成员"]} }
        ]
    },
    
    // 跨部门联盟
    cross_department: {
        text: `
            <h2>跨界合作</h2>
            <p>你敏锐地意识到市场部的兴趣既是机遇也是挑战，决定主动出击建立联盟。</p>
            <p>你约市场部经理周总喝咖啡，了解他们的需求："我们的用户分析系统可以为市场策略提供数据支持，不知道贵部门有什么具体需求？"</p>
            <p>周总显得很惊喜："难得有技术部门主动来问我们需求！实际上，我们一直希望能看到更精细的用户转化漏斗和营销活动效果分析..."</p>
            <p>你迅速调整项目规划，增加了对市场部需求的支持，同时邀请周总派代表加入每周的项目例会。</p>
            <p>这一举措产生了意想不到的效果：市场部成了你项目的坚定支持者，在管理层会议上多次为你的项目"背书"。</p>
            <p>赵总在季度会上专门表扬了这种跨部门协作："这才是我们需要的团队合作精神。"</p>
            <p>然而就在项目接近尾声时，你发现市场部在给高层的汇报中，把你团队的部分成果标注为"市场部创新"...</p>
        `,
        choices: [
            { text: "私下找周总沟通，委婉表达关切", nextScene: "tactful_conversation", effects: {performance: 5, mental: 0, skills: ["冲突处理"]} },
            { text: "战略性让步，用局部利益换取长期盟友", nextScene: "strategic_concession", effects: {performance: 3, mental: -2, allies: ["周总"], skills: ["政治智慧"]} },
            { text: "在下次高层会议上巧妙澄清贡献归属", nextScene: "public_clarification", effects: {performance: 10, mental: -10, skills: ["危机公关"]} }
        ]
    },
    
    // 团队保护
    team_protection: {
        text: `
            <h2>筑起防火墙</h2>
            <p>看到公司内部复杂的政治环境，你决定优先保护团队免受干扰，做好"防火墙"。</p>
            <p>你设立了明确的沟通渠道："所有外部需求必须通过我来协调"，并对团队成员解释："这样大家就能专注于技术实现，我来应对外部干扰。"</p>
            <p>当市场部试图直接联系你的团队成员加塞需求时，你礼貌但坚定地进行了拦截，要求走正式流程。</p>
            <p>你的防护措施很快得到了回报——团队工作效率大幅提升，成员们纷纷表示："终于能安心写代码了！"</p>
            <p>李总注意到了你的管理方式，私下表示赞赏："你很会保护团队，这是个难得的品质。"</p>
            <p>项目进展顺利，团队士气高涨。然而，你也听到了一些流言，说你"独断专行"、"筑起信息孤岛"...</p>
        `,
        choices: [
            { text: "组织团队建设活动，增强内部凝聚力", nextScene: "team_building", effects: {performance: 5, mental: 5, allies: ["团队成员"], skills: ["团队建设"]} },
            { text: "适当开放沟通渠道，但保持关键决策控制", nextScene: "controlled_openness", effects: {performance: 8, mental: -2, skills: ["平衡术"]} },
            { text: "邀请关键部门领导参观项目进展，消除误解", nextScene: "transparency_initiative", effects: {performance: 10, mental: -5, skills: ["公关能力"]} }
        ]
    },
    
    // 战略性让步
    strategic_concession: {
        text: `
            <h2>长远的棋局</h2>
            <p>面对市场部"摘桃子"的行为，你决定从大局考虑，战略性地做出一些让步。</p>
            <p>你私下找到周总："看到贵部在汇报中提到的创新点，很高兴我们的系统能支持市场部的工作。对了，我们下个季度准备开发客户画像功能，不知道贵部有没有兴趣深度合作？"</p>
            <p>周总先是有些尴尬，随后表示非常感兴趣："我欣赏你的格局和远见，市场部会全力支持你的后续项目。"</p>
            <p>在高层会议上，周总不仅澄清了前期工作的贡献归属，还大力推荐了你提出的新功能计划。</p>
            <p>赵总看着你和周总的互动，意味深长地点了点头。</p>
            <p>会后，一位副总悄悄对你说："你很聪明，懂得在小处让步赢得大局。公司需要你这样的人才。"</p>
            <p>这次经历让你明白，职场上有时"吃小亏占大便宜"比斤斤计较更有价值。</p>
        `,
        choices: [
            { text: "继续深化与市场部的合作，打造跨部门标杆项目", nextScene: "flagship_project", effects: {performance: 15, mental: 5, allies: ["周总"], skills: ["战略合作"]} },
            { text: "借势向上发展，争取与更高层建立联系", nextScene: "upward_connection", effects: {performance: 20, mental: -10, skills: ["高层社交"]} },
            { text: "保持当前成果，转向培养团队核心成员", nextScene: "team_development", effects: {performance: 8, mental: 8, allies: ["核心团队"], skills: ["人才培养"]} }
        ]
    },
    
    // 高层社交
    upward_connection: {
        text: `
            <h2>与高层建立联系</h2>
            <p>你决定借着项目成功的东风，谋求与公司更高层建立联系。</p>
            <p>你精心准备了一份项目总结报告，强调了系统对业务的实际价值和未来可能的发展方向。赵总收到报告后，邀请你参加了高管月度会议做项目分享。</p>
            <p>会议上，你简洁有力地展示了项目成果，并巧妙地引出了几个战略性问题："我们的数据显示用户对新功能的接受度比预期高30%，这可能暗示我们低估了市场需求..."</p>
            <p>你的分析引起了CEO的兴趣，他破例在会后留你单独交谈了15分钟，询问你对公司产品方向的看法。</p>
            <p>第二天，你收到一封邮件，被邀请加入公司的"青年人才培养计划"，这个计划的参与者通常被视为未来管理层的储备人选。</p>
            <p>然而，随着你与高层联系的增多，一些中层管理者开始对你产生戒备，你感受到了一些微妙的阻力...</p>
        `,
        choices: [
            { text: "全力投入人才计划，冲刺快速晋升", nextScene: "fast_track", effects: {performance: 20, mental: -15, skills: ["战略视野", "高管思维"]} },
            { text: "平衡与各层级的关系，稳健发展", nextScene: "balanced_growth", effects: {performance: 10, mental: 5, skills: ["平衡术"]} },
            { text: "寻找盟友，组建自己的小核心圈", nextScene: "inner_circle", effects: {performance: 15, mental: -5, allies: ["高潜力同事"], skills: ["联盟建设"]} }
        ]
    },
    
    // 内部核心圈
    inner_circle: {
        text: `
            <h2>建立自己的核心圈</h2>
            <p>面对复杂的公司政治环境，你意识到需要建立自己的"小核心圈"，与志同道合的同事互相支持。</p>
            <p>你开始有选择地与几位关键同事建立更深入的联系：技术过硬的架构师李明、深受CEO信任的产品总监张薇、以及在基层很有影响力的老王。</p>
            <p>你为这个小圈子创造了共同的目标和价值观："我们不玩办公室政治，只做真正有价值的事，互相支持成长。"</p>
            <p>在午餐和私下聚会中，你们分享信息、互通有无，逐渐形成了一个非正式但高效的支持网络。</p>
            <p>当公司启动新一轮组织调整时，你的"核心圈"成员都得到了不错的位置，而你被提名为新成立的创新实验室负责人。</p>
            <p>在内部公告发布前，有人告诉你这个提名引起了一些争议，某些中层管理者认为你资历尚浅...</p>
        `,
        choices: [
            { text: "动用核心圈资源，确保提名顺利通过", nextScene: "leverage_network", effects: {performance: 15, mental: -10, skills: ["资源调动"]} },
            { text: "主动找高层沟通，表达自己的规划和愿景", nextScene: "vision_sharing", effects: {performance: 10, mental: -5, skills: ["远见规划"]} },
            { text: "暂时低调，等待合适时机再谋求更大发展", nextScene: "strategic_patience", effects: {performance: 5, mental: 5, skills: ["战略耐心"]} }
        ]
    },
    
    // 技术社区影响力
    industry_learning: {
        text: `
            <h2>技术社区影响力</h2>
            <p>你坚持每月撰写技术博客，分享工作中的经验和见解，慢慢在行业内积累了一定的影响力。</p>
            <p>你的文章开始在技术社区获得广泛关注，甚至有人开始在面试中提到曾学习过你的文章。</p>
            <p>这种影响力也反馈到了公司内部，同事们开始更尊重你的技术观点，你也被邀请在公司技术分享会上发言。</p>
            <p>李总在绩效面谈中提到："你的技术影响力为团队和公司都带来了正面形象，这种软实力很难得。"</p>
        `,
        choices: [
            { text: "继续专注技术深耕，争取成为行业专家", nextScene: "tech_expert_path", effects: {performance: 10, mental: 5, skills: ["技术影响力"]} },
            { text: "基于影响力拓展内部资源，推动更大项目", nextScene: "leverage_influence", effects: {performance: 8, mental: -3, skills: ["资源整合"]} },
            { text: "收到竞争对手的神秘联系...", nextScene: "headhunter_approach", effects: {performance: 0, mental: 2} }
        ]
    }
}; 