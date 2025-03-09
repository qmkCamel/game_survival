// 游戏的项目管理和团队协作场景
var projectScenes = {
    // 紧急项目场景 - 接受
    urgent_project_accept: {
        text: `
            <h2>深入虎穴</h2>
            <p>你欣然接受了紧急项目的挑战，李总拍拍你的肩膀："好样的，我看好你！"</p>
            <p>接下来的两周，你几乎每天都工作到凌晨，周末也泡在公司。</p>
            <p>项目虽然压力山大，但你学到了很多技术知识，也引起了团队的注意。</p>
            <p>项目即将截止，你发现一个严重的系统漏洞，修复需要至少两天，但截止日只剩一天了。</p>
        `,
        choices: [
            { text: "通宵达旦修复bug，确保按时交付", nextScene: "overnight_fix", effects: {performance: 15, mental: -15, skills: ["危机处理"]} },
            { text: "如实向李总报告情况，请求延期", nextScene: "report_delay", effects: {performance: -5, mental: -3} },
            { text: "寻求团队帮助，集体攻关解决问题", nextScene: "team_effort", effects: {performance: 8, mental: -5, skills: ["团队协作"]} }
        ]
    },
    
    // 紧急项目场景 - 询问
    urgent_project_inquire: {
        text: `
            <h2>谨慎决策</h2>
            <p>你询问了项目的详细情况，李总简要介绍了项目背景和时间安排。</p>
            <p>"这是一个重要客户的项目，期限很紧，估计需要连续加班两周左右。"</p>
            <p>李总的表情变得严肃："老实说，这个项目压力不小，但对新人来说是个锻炼的好机会。"</p>
            <p>你能感觉到李总在等你的回应，这个决定可能会影响你在团队中的定位。</p>
        `,
        choices: [
            { text: "接受挑战，但提出合理的工作安排建议", nextScene: "accept_with_plan", effects: {performance: 7, mental: -3, skills: ["项目管理"]} },
            { text: "直接拒绝，表示作为新人需要时间适应", nextScene: "decline_politely", effects: {performance: -8, mental: 5} },
            { text: "接受项目但设定边界，不接受过度加班", nextScene: "accept_with_boundary", effects: {performance: 3, mental: 0, skills: ["边界管理"]} }
        ]
    },
    
    // 紧急项目场景 - 拒绝
    urgent_project_refuse: {
        text: `
            <h2>稳扎稳打</h2>
            <p>你礼貌地谢绝了李总的邀请，表示作为新人需要先熟悉公司环境和工作流程。</p>
            <p>"李总，我很感谢您的信任，但我觉得我应该先打好基础，以免在紧急项目中拖团队后腿。"</p>
            <p>李总的表情有些失望，但点了点头："理解。稳扎稳打也是一种态度，不过机会可不等人啊。"</p>
            <p>在接下来的日子里，你注意到李总开始更多关注其他新人，而对你的交流明显减少了。</p>
            <p>这个决定保护了你的个人时间，但可能影响了你在团队中的发展速度。</p>
        `,
        choices: [
            { text: "主动承担一些小任务，重新获得关注", nextScene: "small_tasks", effects: {performance: 5, mental: -2, skills: ["循序渐进"]} },
            { text: "利用较少的加班时间自学提升技能", nextScene: "self_improvement", effects: {performance: 3, mental: 5, skills: ["自主学习"]} },
            { text: "寻找其他导师和发展路径", nextScene: "find_mentor", effects: {performance: 2, mental: 3, skills: ["人脉拓展"]} }
        ]
    },
    
    // 明确合作边界
    collaborate_boundary: {
        text: `
            <h2>明确的边界</h2>
            <p>你主动邀请小明加入项目，但同时明确了职责分工："你可以负责数据可视化这块，我会在PR中注明你的贡献。"</p>
            <p>小明看起来有些惊讶，但同意了这个安排。</p>
            <p>在接下来的合作中，你发现小明确实在数据可视化方面有独到见解，为项目增色不少。</p>
            <p>你按约定在项目文档和汇报中突出了他的贡献，这让他对你的印象也好了不少。</p>
            <p>最终项目顺利完成，获得了管理层的一致好评。李总私下表示，你的团队协作能力让他印象深刻。</p>
        `,
        choices: [
            { text: "继续与小明保持良好的合作关系", nextScene: "strategic_alliance", effects: {performance: 8, mental: 5, allies: ["小明"], skills: ["团队合作"]} },
            { text: "利用这次成功向上管理，争取更多资源", nextScene: "upward_management", effects: {performance: 10, mental: -3, skills: ["向上管理"]} },
            { text: "深夜接到系统故障通知，事情不太寻常...", nextScene: "project_crisis", effects: {performance: 0, mental: -2} }
        ]
    },
    
    // 紧急完成项目
    rush_completion: {
        text: `
            <h2>争分夺秒</h2>
            <p>看到小明有"摘桃子"的迹象，你决定加班加点提前完成项目。</p>
            <p>连续三个晚上，你都工作到凌晨，优化了界面设计，增加了几个关键数据维度，甚至还开发了一个简单的预测模型。</p>
            <p>原计划一周的工作，你在三天内就完成了。</p>
            <p>你直接向李总提交了成果，并请求提前进行演示。李总很惊讶，但也很满意："没想到这么快就完成了，而且质量超出预期！"</p>
            <p>当小明得知项目已经完成时，脸上闪过一丝尴尬。会议上，李总特别表扬了你的效率和主动性。</p>
            <p>然而，连续的熬夜让你感到身体有些吃不消，你开始思考这种工作方式是否可持续。</p>
        `,
        choices: [
            { text: "继续保持高强度工作，争取更多关注", nextScene: "high_intensity", effects: {performance: 15, mental: -15, skills: ["极限工作"]} },
            { text: "适当放缓节奏，寻找更高效的工作方法", nextScene: "efficiency_focus", effects: {performance: 5, mental: 5, skills: ["工作效率"]} },
            { text: "与小明私下交流，了解他的想法和动机", nextScene: "understand_colleague", effects: {performance: 3, mental: 3, allies: ["小明"], skills: ["人际洞察"]} }
        ]
    },
    
    // 记录贡献
    document_contribution: {
        text: `
            <h2>留下足迹</h2>
            <p>你决定采取预防措施，开始在团队工作群中详细记录自己每天的工作进展和设计思路。</p>
            <p>"今日进度：完成了数据看板的核心图表功能，解决了历史数据加载慢的问题，设计了用户交互流程..."</p>
            <p>你的日报既专业又详细，项目的每一步推进都有清晰记录。小明似乎注意到了你的策略，变得不那么积极地谈论"改进想法"了。</p>
            <p>一周后，项目进展顺利，李总在查看群记录时对你的工作方法表示赞赏："记录得很详细，对项目管理很有帮助。"</p>
            <p>高层汇报会上，你准备充分，自信展示了项目成果。赵总也点头表示认可。</p>
            <p>会后，小明主动找到你："其实我有几个补充想法，不知道能不能和你讨论下？"他的态度明显比之前谦逊了许多。</p>
        `,
        choices: [
            { text: "欢迎小明的想法，但明确表示会记录各自贡献", nextScene: "clear_contribution", effects: {performance: 7, mental: 2, skills: ["边界管理"]} },
            { text: "委婉拒绝，表示项目已经接近尾声", nextScene: "polite_refusal", effects: {performance: 5, mental: 0, skills: ["拒绝艺术"]} },
            { text: "战略性接纳部分建议，同时争取更大的项目", nextScene: "strategic_move", effects: {performance: 10, mental: -3, skills: ["战略思考"], allies: ["小明"]} }
        ]
    },
    
    // 更大的项目
    bigger_project: {
        text: `
            <h2>更高的平台</h2>
            <p>乘着数据看板项目成功的东风，你在部门会议上主动请缨接手一个更大的挑战——公司的核心用户分析系统改造。</p>
            <p>"基于上个项目的经验，我认为可以将同样的数据可视化方案应用到用户分析系统中，这将大大提升决策效率。"</p>
            <p>李总有些犹豫："这个项目难度不小，通常我们会安排给有3年以上经验的同事..."</p>
            <p>这时，赵总插话了："我看过数据看板的成果，做得不错。年轻人有冲劲，给他个机会试试也好。"</p>
            <p>就这样，你获得了一个远超你资历的项目机会。然而，团队中有些老员工看你的眼神中流露出不满。</p>
            <p>你意识到这个项目既是机遇，也是挑战——不仅要完成技术任务，还要处理好团队关系。</p>
        `,
        choices: [
            { text: "主动与资深同事沟通，寻求指导和支持", nextScene: "seek_mentorship", effects: {performance: 8, mental: 2, allies: ["老员工"], skills: ["向上管理"]} },
            { text: "低调推进，用结果说话", nextScene: "low_profile", effects: {performance: 5, mental: 5, skills: ["稳健推进"]} },
            { text: "组建'特别小组'，吸纳核心技术人才", nextScene: "form_team", effects: {performance: 15, mental: -8, skills: ["团队组建", "资源调配"]} }
        ]
    },
    
    // 小任务场景
    small_tasks: {
        text: `
            <h2>积少成多</h2>
            <p>你开始主动承担一些小任务，虽然都不是核心工作，但你认真对待每一项任务。</p>
            <p>渐渐地，你的勤恳和认真被团队注意到。李总在一次周会上表扬了你的工作态度。</p>
            <p>"小步慢跑也能走远，"李总对团队说，"有些同事虽然不爱出风头，但做事扎实可靠。"</p>
            <p>你感到自己的策略奏效了，虽然没有参与紧急项目那样的高强度工作，但也找到了自己的位置。</p>
        `,
        choices: [
            { text: "继续保持这种策略，稳步发展", nextScene: "steady_growth", effects: {performance: 5, mental: 5, skills: ["踏实工作"]} },
            { text: "在站稳脚跟后，尝试申请更有挑战的任务", nextScene: "seek_challenge", effects: {performance: 8, mental: -2, skills: ["循序渐进"]} },
            { text: "分享你的经验，帮助其他新人融入", nextScene: "help_others", effects: {performance: 3, mental: 8, allies: ["新人团队"], skills: ["团队协作"]} }
        ]
    },
    
    // 自我提升场景
    self_improvement: {
        text: `
            <h2>自我投资</h2>
            <p>你利用较少的加班时间系统地学习新技能，参加在线课程，阅读技术书籍。</p>
            <p>几个月后，团队遇到一个技术难题，恰好是你最近学习的领域。</p>
            <p>"这个问题我可能有思路，"你在会议上说，然后提出了一个创新的解决方案。</p>
            <p>团队成员惊讶于你的专业知识，李总也对你刮目相看："没想到你私下里做了这么多功课。"</p>
        `,
        choices: [
            { text: "继续深耕技术，成为团队技术专家", nextScene: "tech_specialist", effects: {performance: 10, mental: 2, skills: ["技术精进"]} },
            { text: "分享你的学习方法，组建学习小组", nextScene: "learning_group", effects: {performance: 5, mental: 5, allies: ["学习小组成员"], skills: ["知识分享"]} },
            { text: "利用新技能，申请更有挑战性的项目", nextScene: "leverage_skills", effects: {performance: 8, mental: -3, skills: ["机会把握"]} }
        ]
    },
    
    // 寻找导师场景
    find_mentor: {
        text: `
            <h2>另辟蹊径</h2>
            <p>你开始寻找团队中其他可能的导师和发展路径。很快，你注意到了技术总监张工。</p>
            <p>虽然他不直接管理你的工作，但在技术社区很有声望，且似乎更注重技术本身而非办公室政治。</p>
            <p>你开始在技术问题上向他请教，并主动参加他组织的技术分享会。</p>
            <p>渐渐地，你与张工建立了良好的专业关系，他甚至邀请你参与他负责的一个创新项目。</p>
        `,
        choices: [
            { text: "接受邀请，转向创新项目方向发展", nextScene: "innovation_path", effects: {performance: 8, mental: 5, allies: ["张工"], skills: ["创新思维"]} },
            { text: "同时维持与李总和张工的关系，平衡发展", nextScene: "balanced_networking", effects: {performance: 5, mental: -5, skills: ["人际平衡"]} },
            { text: "在张工指导下专注技术深度，少参与政治", nextScene: "technical_depth", effects: {performance: 10, mental: 8, skills: ["技术专精"]} }
        ]
    }
}; 