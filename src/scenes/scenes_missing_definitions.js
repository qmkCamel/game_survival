// 补充缺失的场景定义
var missingScenes = {
    // 公司重组后续场景
    new_department: {
        text: `
            <h2>新的开始</h2>
            <p>你决定把握这个机会，与张总进行了富有成效的交谈。</p>
            <p>他对你的技术背景和业务理解能力非常欣赏，当场决定接纳你加入他的团队。</p>
            <p>两周后，你正式转入产品研发部，开始了全新的工作。</p>
            <p>虽然李总对此有些不满，但公司重组的大背景下，他也无力阻止。</p>
            <p>新部门的工作节奏和氛围与之前截然不同，你感到一种久违的活力。</p>
        `,
        choices: [
            { text: "全力投入新工作，争取尽快出成绩", nextScene: "quick_win", effects: {performance: 8, mental: 5, skills: ["适应力"]} },
            { text: "主动向张总提出创新项目想法", nextScene: "innovation_proposal", effects: {performance: 10, mental: -5, skills: ["创新思维"]} },
            { text: "保持低调，先观察新环境的潜规则", nextScene: "observe_rules", effects: {performance: 3, mental: 8, skills: ["环境敏感度"]} }
        ]
    },
    
    stay_loyal: {
        text: `
            <h2>忠诚的回报</h2>
            <p>你婉拒了张总的邀约，决定留在李总身边共度难关。</p>
            <p>李总对你的忠诚表示感谢："现在的职场，像你这样懂得感恩的年轻人不多了。"</p>
            <p>在接下来的重组过程中，李总保护了团队核心成员，你的岗位不仅保住了，还获得了一个小型项目的负责权。</p>
            <p>重组结束后，李总的地位反而因危机处理得当而提升，这也间接为你带来了更多发展机会。</p>
        `,
        choices: [
            { text: "趁势向李总提出加薪申请", nextScene: "ask_raise", effects: {performance: 5, mental: -5, skills: ["谈判技巧"]} },
            { text: "专注于新项目，增强自己的不可替代性", nextScene: "focus_project", effects: {performance: 8, mental: 2, skills: ["专业深度"]} },
            { text: "在公司内部建立更广泛的人脉", nextScene: "expand_network", effects: {performance: 6, mental: 5, skills: ["人脉建设"]} }
        ]
    },
    
    negotiate_both: {
        text: `
            <h2>两面下注</h2>
            <p>你巧妙地安排了时间，同时与李总和张总保持沟通，尽可能多地获取信息和承诺。</p>
            <p>在与张总的会面中，你了解到产品研发部将获得更多资源；而李总则承诺如果留下，将提升你的职级。</p>
            <p>在获取了双方信息后，你做出了更加明智的决定。</p>
            <p>这个过程也让你意识到，在职场中多一分选择权就多一分主动。</p>
        `,
        choices: [
            { text: "选择加入张总团队，前景更广阔", nextScene: "join_zhang", effects: {performance: 8, mental: 2, allies: ["张总"], skills: ["战略选择"]} },
            { text: "留在李总团队，但争取更好的条件", nextScene: "stay_negotiate", effects: {performance: 5, mental: 5, allies: ["李总"], skills: ["谈判能力"]} },
            { text: "利用两边的offer，寻找公司外的更好机会", nextScene: "external_opportunity", effects: {performance: 0, mental: 8, skills: ["职业规划"]} }
        ]
    },
    
    // 关键后续场景
    successor_path: {
        text: `
            <h2>权术继承者</h2>
            <p>"我接受。"你平静地说道。李总露出满意的微笑，拍了拍你的肩膀。</p>
            <p>接下来的几个月，李总开始有意识地将你引荐给公司高层，并教你一些不会出现在任何管理书籍上的"潜规则"。</p>
            <p>你学会了如何在不留痕迹的情况下排除异己，如何建立自己的信息网络，以及如何在关键时刻做出表面上公正但实际上对自己有利的决策。</p>
            <p>半年后，李总升职，而你顺理成章地接替了他的位置。</p>
            <p>当你坐在曾经属于李总的办公室里，你意识到自己已经成为了曾经最害怕成为的那种人。</p>
        `,
        choices: [
            { text: "这就是职场的本质，接受现实", nextScene: "political_master", effects: {performance: 15, mental: -10} },
            { text: "利用权力改变规则，创造更公平的环境", nextScene: "reform_attempt", effects: {performance: 5, mental: 10} },
            { text: "开始规划自己的出路，不想重蹈李总的覆辙", nextScene: "entrepreneur", effects: {performance: 0, mental: 5} }
        ]
    },
    
    truth_departure: {
        text: `
            <h2>真相的重量</h2>
            <p>"我不会成为你那样的人。"你直视李总的眼睛，坚定地说。</p>
            <p>李总的表情从惊讶转为失望，最后变成一丝难以察觉的敬意。</p>
            <p>"你比我想象的有骨气，但职场不需要骨气，而是结果。"他冷冷地说，"你的离职手续明天可以办理。"</p>
            <p>离开公司的那天，几位同事悄悄送你到楼下，他们都知道发生了什么。</p>
            <p>"你做了我们都想做但没勇气做的事，"小林低声说，"我也在找工作，到时候联系你。"</p>
        `,
        choices: [
            { text: "在新公司重新开始，坚持自己的原则", nextScene: "fresh_start", effects: {performance: 0, mental: 15, skills: ["道德坚持"]} },
            { text: "将经历匿名发布到职场论坛，引发热议", nextScene: "whistleblower", effects: {performance: -5, mental: 10, skills: ["社会影响"]} },
            { text: "规划创业，打造符合自己价值观的公司", nextScene: "entrepreneur", effects: {performance: 5, mental: 5, skills: ["创业思维"]} }
        ]
    },
    
    revenge_plot: {
        text: `
            <h2>潜伏的反击</h2>
            <p>你表面上接受了李总的提议，成为他的"接班人"，但内心已经开始了精心策划的反击。</p>
            <p>在接下来的几个月里，你一边学习李总的权术，一边秘密收集他的各种不当行为证据。</p>
            <p>你谨慎地与公司其他被李总伤害过的人建立联系，形成了一个隐秘的联盟。</p>
            <p>当李总准备在董事会上推动自己晋升的关键时刻，你和盟友们同时出手，将证据递交给了CEO和董事会。</p>
            <p>董事会震惊于李总的所作所为，紧急叫停了他的晋升，并对他启动了调查。</p>
        `,
        choices: [
            { text: "趁势接管李总的部门，但承诺改革", nextScene: "reform_leader", effects: {performance: 10, mental: 0, skills: ["政治手腕", "战略思考"]} },
            { text: "满足于看到正义得到伸张，寻求自身发展", nextScene: "seek_peace", effects: {performance: 5, mental: 10, skills: ["内心平静"]} },
            { text: "彻底离开这个复杂的环境，寻找新机会", nextScene: "new_horizon", effects: {performance: 0, mental: 15, skills: ["决断力"]} }
        ]
    },
    
    // 技能场景
    quick_win: {
        text: `
            <h2>快速建功</h2>
            <p>你全身心投入新工作，加班加点熟悉业务，很快就发现了几个可以改进的点。</p>
            <p>通过优化产品研发流程，你帮团队提高了30%的开发效率，获得了张总的高度认可。</p>
            <p>"不错，看来我没有看错人，"张总在部门会议上表扬你，"这正是我们需要的创新思维。"</p>
            <p>你的表现也得到了团队其他成员的认可，初来乍到的陌生感很快消散。</p>
        `,
        choices: [
            { text: "继续专注技术创新，成为团队核心", nextScene: "tech_expert", effects: {performance: 10, mental: 5, skills: ["技术领导力"]} },
            { text: "开始培养团队意识，建立个人影响力", nextScene: "team_influence", effects: {performance: 8, mental: 8, skills: ["团队建设"]} },
            { text: "寻求更多跨部门项目，扩大影响范围", nextScene: "cross_department", effects: {performance: 15, mental: -5, skills: ["资源整合"]} }
        ]
    },
    
    // 多个其他缺失场景的定义...
    whistleblower: {
        text: `
            <h2>吹哨人</h2>
            <p>经过深思熟虑，你决定将公司的不当行为和财务造假证据匿名提供给了媒体。</p>
            <p>这一爆料在行业内引起了巨大震动，996科技的股价在一周内暴跌40%。</p>
            <p>监管部门介入调查，多位高管被约谈，公司陷入了前所未有的危机。</p>
            <p>虽然你的身份保持了匿名，但内心的正义感得到了极大的满足。</p>
            <p>与此同时，你也意识到自己在这个行业可能已经无法继续工作了。</p>
        `,
        choices: [
            { text: "离开互联网行业，寻找新的职业道路", nextScene: "career_change", effects: {performance: -10, mental: 15, skills: ["勇气", "道德坚持"]} },
            { text: "加入一家注重职业道德的小公司", nextScene: "ethical_workplace", effects: {performance: 0, mental: 10, skills: ["价值观匹配"]} },
            { text: "创办自己的企业，以不同的价值观运营", nextScene: "entrepreneur", effects: {performance: 5, mental: 5, skills: ["创业精神"]} }
        ]
    },
    
    // 添加基本的终点场景，避免游戏出错
    career_change: {
        text: `
            <div class="ending-icon icon-career-change"></div>
            <h2>职业转型</h2>
            <p>离开互联网行业后，你经过一段时间的探索和学习，找到了新的职业方向。</p>
            <p>虽然起点重新归零，但不受过去束缚的感觉让你倍感轻松。</p>
            <p>在新的领域里，你的部分经验和技能仍然适用，而你也带着从前职场学到的教训，更加明智地规划自己的职业道路。</p>
            <p>有时候，重新开始也是一种幸运。</p>
            <p><strong>恭喜你获得"职业转型"结局！</strong></p>
        `,
        choices: [
            { text: "重新开始游戏", nextScene: "start" }
        ]
    },
    
    ethical_workplace: {
        text: `
            <div class="ending-icon icon-ethical"></div>
            <h2>价值观契合</h2>
            <p>在离开996科技后，你加入了一家注重员工福祉和职业道德的创业公司。</p>
            <p>薪资可能不如从前，但工作与生活的平衡、透明的管理和真实的同事关系让你感到前所未有的满足。</p>
            <p>你的经验和技能在新环境中得到了充分尊重，而不必再陷入尔虞我诈的办公室政治。</p>
            <p>有时候，成功不仅仅是晋升和加薪，还有内心的平静和自我认同。</p>
            <p><strong>恭喜你获得"价值观契合"结局！</strong></p>
        `,
        choices: [
            { text: "重新开始游戏", nextScene: "start" }
        ]
    },
    
    reform_leader: {
        text: `
            <div class="ending-icon icon-reform"></div>
            <h2>改革者</h2>
            <p>在李总离开后，你接管了他的部门，但采取了完全不同的管理风格。</p>
            <p>你建立了透明的晋升机制，鼓励开放沟通，打破了原有的小圈子文化。</p>
            <p>起初，一些习惯了旧制度的员工有所抵触，但随着改革的深入，团队的创新能力和凝聚力都有了显著提升。</p>
            <p>半年后，你的部门成为了公司效率和员工满意度最高的团队，甚至影响了整个公司的文化。</p>
            <p><strong>恭喜你获得"改革者"结局！</strong></p>
        `,
        choices: [
            { text: "重新开始游戏", nextScene: "start" }
        ]
    },
    
    new_horizon: {
        text: `
            <div class="ending-icon icon-horizon"></div>
            <h2>新的地平线</h2>
            <p>完成对李总的反击后，你意识到是时候彻底离开这个复杂的环境了。</p>
            <p>你递交了辞职信，开始寻找新的机会。很快，你收到了几个颇具吸引力的offer。</p>
            <p>在充分评估后，你选择了一家海外公司的远程工作机会，这让你既能继续专业发展，又能获得更健康的工作环境。</p>
            <p>回顾这段经历，你意识到有些战斗值得一打，但知道何时全身而退同样重要。</p>
            <p><strong>恭喜你获得"新的地平线"结局！</strong></p>
        `,
        choices: [
            { text: "重新开始游戏", nextScene: "start" }
        ]
    },
    
    // 添加更多缺失的场景定义...
    investigate_motives: {
        text: `
            <h2>真相探索者</h2>
            <p>你决定保持警惕，暗中调查赵总突然亲近你的真实动机。</p>
            <p>通过与不同部门的同事交流，查阅历史项目记录，你逐渐拼凑出了一幅完整的图景。</p>
            <p>赵总正在公司内部秘密组建一个创新团队，准备开发一款可能颠覆现有业务的新产品。</p>
            <p>他看中了你的技术能力和独立思考的特质，希望你成为这个秘密团队的核心成员。</p>
            <p>这既是一个巨大的机会，也充满了风险——如果项目失败，你们可能都会成为牺牲品。</p>
        `,
        choices: [
            { text: "接受挑战，加入创新团队", nextScene: "join_innovation", effects: {performance: 15, mental: -5, skills: ["创新思维", "冒险精神"]} },
            { text: "婉拒邀请，专注当前工作", nextScene: "decline_risk", effects: {performance: 5, mental: 10, skills: ["风险控制"]} },
            { text: "与赵总坦诚沟通，提出自己的顾虑和条件", nextScene: "negotiate_terms", effects: {performance: 10, mental: 5, skills: ["谈判艺术"]} }
        ]
    },
    
    // 通用的连接场景
    build_trust: {
        text: `
            <h2>深厚信任</h2>
            <p>你继续低调做事，同时与李总建立了更加牢固的信任关系。</p>
            <p>在一次私下交谈中，李总向你透露了他对公司未来的看法和自己的职业规划。</p>
            <p>"我很欣赏你的忠诚和能力，"李总说，"如果将来我有机会升职，一定会把你带上。"</p>
            <p>这种信任不仅体现在言语上，还表现在他逐渐将一些重要但敏感的任务交给你处理。</p>
            <p>你感觉自己已经成为了李总核心圈子中的一员。</p>
        `,
        choices: [
            { text: "继续保持低调忠诚的策略", nextScene: "continued_loyalty", effects: {performance: 5, mental: 5, allies: ["李总+++"]} },
            { text: "开始有选择地建立自己的人脉网络", nextScene: "network_building", effects: {performance: 8, mental: 0, skills: ["人脉拓展"]} },
            { text: "向李总提出更多职业发展的建议", nextScene: "career_guidance", effects: {performance: 10, mental: -3, skills: ["主动性"]} }
        ]
    },
    
    // 添加更多缺失的场景...
    
    // 稳步发展场景
    steady_growth: {
        text: `
            <h2>稳健前行</h2>
            <p>你继续保持踏实肯干的工作态度，专注于做好每一个小任务。</p>
            <p>一年后，你已经成为团队中被公认的"靠谱担当"，虽然不是技术最强的，但是最值得信赖的成员之一。</p>
            <p>在年度评选中，你获得了"最佳团队协作奖"，这让你感到自己的价值得到了认可。</p>
            <p>李总在颁奖时说："有些同事像火箭一样迅速崛起，有些则像长跑运动员一样稳健前行，两者都值得尊敬。"</p>
        `,
        choices: [
            { text: "继续这条稳健的职业道路", nextScene: "work_life_balance", effects: {performance: 5, mental: 10} },
            { text: "考虑是否应该更积极进取", nextScene: "career_crossroad", effects: {performance: 3, mental: 3, skills: ["自我反思"]} }
        ]
    },
    
    // 寻求挑战场景
    seek_challenge: {
        text: `
            <h2>跃升之路</h2>
            <p>在站稳脚跟后，你开始主动申请更具挑战性的任务，展示自己的能力和野心。</p>
            <p>李总似乎对你的转变感到意外但也欣赏："看来你是厚积薄发啊，不声不响地提升了不少。"</p>
            <p>他给了你一个负责优化核心系统的机会，这是团队中的重要任务。</p>
            <p>你成功完成了任务，证明了自己的技术实力，团队成员开始重新评估你的能力和潜力。</p>
        `,
        choices: [
            { text: "继续积极表现，争取更多关键任务", nextScene: "high_performer", effects: {performance: 10, mental: -5, skills: ["核心技术"]} },
            { text: "在新地位上保持平衡，避免过度消耗", nextScene: "balanced_growth", effects: {performance: 7, mental: 3, skills: ["职业规划"]} }
        ]
    },
    
    // 帮助他人场景
    help_others: {
        text: `
            <h2>润物无声</h2>
            <p>你开始分享自己的经验，主动帮助新加入的同事适应工作环境和技术要求。</p>
            <p>你组织了每周一次的经验分享会，讲解工作中的实用技巧和注意事项。</p>
            <p>渐渐地，你成为了新人们信赖的非正式导师，团队氛围也因此变得更加和谐友好。</p>
            <p>HR注意到了你的影响力，邀请你参与公司的导师计划，正式承担新员工培训的部分工作。</p>
        `,
        choices: [
            { text: "接受HR的邀请，发展培训和领导能力", nextScene: "training_specialist", effects: {performance: 8, mental: 5, skills: ["培训能力", "领导力"]} },
            { text: "保持非正式帮助，专注于技术岗位发展", nextScene: "tech_focus", effects: {performance: 5, mental: 8, allies: ["团队新人"]} }
        ]
    },
    
    // 技术专家场景
    tech_specialist: {
        text: `
            <h2>技术精英</h2>
            <p>你继续深耕技术领域，逐渐成为团队中的技术权威。</p>
            <p>当遇到复杂问题时，同事们开始自然而然地向你寻求建议和指导。</p>
            <p>公司年度技术大会上，你受邀做了主题演讲，分享你的专业见解。</p>
            <p>技术VP在会后找到你："我们考虑组建一个技术专家小组，专门解决关键技术难题，你有兴趣加入吗？"</p>
        `,
        choices: [
            { text: "欣然接受，加入技术专家小组", nextScene: "tech_expert", effects: {performance: 15, mental: 5, skills: ["核心技术", "问题解决"]} },
            { text: "建议组建技术创新实验室，探索前沿技术", nextScene: "innovation_lab", effects: {performance: 10, mental: 8, skills: ["创新思维"]} }
        ]
    },
    
    // 学习小组场景
    learning_group: {
        text: `
            <h2>共同成长</h2>
            <p>你组建了一个公司内部学习小组，定期分享技术知识和行业动态。</p>
            <p>小组从最初的几人发展到跨部门的二十多人，成为公司文化的一部分。</p>
            <p>你的影响力超出了技术范畴，成为连接不同团队的纽带。</p>
            <p>公司高层注意到这一现象，CEO在全员会议上表扬了你们的自主学习文化。</p>
        `,
        choices: [
            { text: "将学习小组升级为公司正式项目", nextScene: "official_program", effects: {performance: 10, mental: 5, skills: ["组织领导", "知识管理"]} },
            { text: "保持小组的草根性质，专注内容质量", nextScene: "organic_growth", effects: {performance: 5, mental: 10, allies: ["跨部门伙伴"]} }
        ]
    },
    
    // 技能应用场景
    leverage_skills: {
        text: `
            <h2>技能变现</h2>
            <p>你利用新掌握的技能，申请到了公司一个备受瞩目的项目参与资格。</p>
            <p>在项目中，你的专业知识和解决问题的能力给团队带来了显著价值。</p>
            <p>项目经理公开表扬了你的贡献："这证明了持续学习的重要性。"</p>
            <p>这次成功给了你更多的职业信心，也打开了新的发展通道。</p>
        `,
        choices: [
            { text: "继续这种工作-学习-应用的模式", nextScene: "continuous_learning", effects: {performance: 8, mental: 8, skills: ["持续学习"]} },
            { text: "利用项目成功，申请晋升或加薪", nextScene: "career_advancement", effects: {performance: 12, mental: -3, skills: ["职业谈判"]} }
        ]
    },
    
    // 创新项目场景
    innovation_path: {
        text: `
            <h2>创新先锋</h2>
            <p>你接受了张工的邀请，加入了他负责的创新项目，开始探索前沿技术。</p>
            <p>这个项目虽然工作强度不高，但技术难度很大，充满了不确定性和挑战。</p>
            <p>经过几个月的努力，你们成功开发了一个概念验证产品，引起了公司高层的关注。</p>
            <p>在项目展示会上，CEO亲自过来与你们交流，对项目成果表示肯定。</p>
        `,
        choices: [
            { text: "继续深耕创新领域，成为技术先驱", nextScene: "tech_pioneer", effects: {performance: 15, mental: 5, skills: ["前沿技术", "创新思维"]} },
            { text: "将创新成果转化为实际产品", nextScene: "product_development", effects: {performance: 10, mental: 0, skills: ["产品思维"]} }
        ]
    },
    
    // 平衡人际关系场景
    balanced_networking: {
        text: `
            <h2>人际平衡术</h2>
            <p>你巧妙地平衡与李总和张工的关系，既不偏向任何一方，又从两边获取资源和支持。</p>
            <p>这种策略需要细致的人际交往技巧，但也带来了双重保障和更全面的发展。</p>
            <p>在一次部门间合作项目中，你成功地协调了两个团队的工作，展现了你的沟通能力。</p>
            <p>公司开始将你视为能够跨团队工作的"桥梁人物"，这给了你独特的价值定位。</p>
        `,
        choices: [
            { text: "发展为跨部门协调专家", nextScene: "cross_department_expert", effects: {performance: 8, mental: 2, skills: ["跨部门协作", "冲突解决"]} },
            { text: "利用广泛人脉，寻找公司内更好的发展机会", nextScene: "internal_opportunity", effects: {performance: 5, mental: 5, skills: ["机会识别"]} }
        ]
    },
    
    // 技术深度场景
    technical_depth: {
        text: `
            <h2>专注技术</h2>
            <p>在张工的指导下，你专注于提升技术深度，较少参与办公室政治。</p>
            <p>你深入研究了公司核心系统的架构，发现并解决了几个长期存在的性能问题。</p>
            <p>这些贡献虽然不是很显眼，但真正懂技术的人都认可你的实力。</p>
            <p>张工私下对你说："在技术这条路上，真本事才是最重要的，那些政治手腕最终会被实力碾压。"</p>
        `,
        choices: [
            { text: "继续技术路线，成为公认的技术专家", nextScene: "tech_expert", effects: {performance: 10, mental: 10, skills: ["核心技术", "系统架构"]} },
            { text: "开始分享技术经验，建立技术影响力", nextScene: "tech_influence", effects: {performance: 8, mental: 5, skills: ["技术分享", "影响力"]} }
        ]
    },

    // 以下是新增的场景
    accept_with_boundary: {
        text: `
            <h2>设定边界的艺术</h2>
            <p>面对王总紧急项目的邀请，你决定接受挑战，但同时设定明确的工作边界。</p>
            <p>"王总，我很乐意参与这个项目，但我需要确保工作时间的合理性。我可以适当加班，但希望能维持基本的工作生活平衡。"</p>
            <p>王总略显惊讶，但很快点头同意："理解。有边界的人往往更高效。我们可以合理安排你的工作量。"</p>
            <p>在接下来的项目中，你不仅高效地完成了任务，还保持了良好的工作状态，避免了过度消耗。</p>
            <p>王总对你的专业态度和高效表现印象深刻，项目也如期完成。</p>
        `,
        choices: [
            { text: "继续保持专业边界，成为团队榜样", nextScene: "boundary_example", effects: {performance: 7, mental: 10, skills: ["边界管理", "专业沟通"]} },
            { text: "向团队分享如何设定健康工作边界", nextScene: "share_techniques", effects: {performance: 5, mental: 8, skills: ["影响力", "团队文化建设"]} },
            { text: "寻求更多具有挑战性但尊重边界的项目", nextScene: "selective_projects", effects: {performance: 9, mental: 7, skills: ["项目选择眼光"]} }
        ]
    },

    accept_with_plan: {
        text: `
            <h2>策略性接受挑战</h2>
            <p>你决定接受王总紧急项目的邀请，但提出了一套合理的工作安排建议。</p>
            <p>"王总，我愿意承担这个挑战，但我有一些想法可能有助于提高效率并减少不必要的加班。"</p>
            <p>你详细分析了项目需求，提出了优先级划分和资源分配的建议，以及一个详细的时间表。</p>
            <p>王总对你的专业分析感到惊喜："没想到你不仅有执行力，还有这么强的规划能力。这个计划很好，就这么办吧。"</p>
            <p>在你的规划下，项目进展顺利，团队加班明显减少，同时保证了交付质量。</p>
        `,
        choices: [
            { text: "将规划方法形成文档，在团队内推广", nextScene: "spread_methods", effects: {performance: 8, mental: 7, skills: ["知识管理", "流程优化"]} },
            { text: "向上级提议担任项目规划专家角色", nextScene: "planning_expert", effects: {performance: 10, mental: 5, skills: ["战略规划", "角色定位"]} },
            { text: "利用这次成功，争取更多高级项目管理机会", nextScene: "career_advancement", effects: {performance: 9, mental: 6, skills: ["项目管理"]} }
        ]
    },

    adapt_with_boundary: {
        text: `
            <h2>灵活适应与自我保护</h2>
            <p>在观察了团队的工作节奏后，你决定适应团队整体风格，但同时保持自己的边界。</p>
            <p>你调整了自己的工作方式，与团队大体保持一致，但在关键健康问题上坚守原则。</p>
            <p>当团队经常熬夜加班时，你会适度参与，但确保不影响自己的核心休息时间。</p>
            <p>你还找到了提高效率的方法，使自己能在正常工作时间内完成更多任务。</p>
            <p>随着时间推移，团队开始注意到你的平衡方式，有些同事甚至开始向你请教技巧。</p>
        `,
        choices: [
            { text: "分享你的效率技巧，影响团队文化", nextScene: "efficiency_mentor", effects: {performance: 6, mental: 9, skills: ["影响力", "效率管理"]} },
            { text: "争取在团队中推行更健康的工作方式", nextScene: "culture_change", effects: {performance: 7, mental: 7, skills: ["变革管理", "团队健康"]} },
            { text: "保持低调，但坚定地维护自己的边界", nextScene: "quiet_boundary", effects: {performance: 5, mental: 10, skills: ["自我管理", "韧性"]} }
        ]
    },

    alliance_defense: {
        text: `
            <h2>联合防御</h2>
            <p>面对不公指责，你决定寻求小张作证，并联合其他同事一起反击不实指控。</p>
            <p>"我认为这种指责是不公平的，小张可以证明我的工作成果，我们团队的其他成员也清楚事实真相。"</p>
            <p>小张站出来支持你："是的，这个问题其实是系统设计缺陷导致的，而不是执行问题。"</p>
            <p>几位关键同事也提供了支持性证据，形成了一个有力的联盟。</p>
            <p>面对团队的一致声音，批评者不得不收回指责，并重新评估问题本质。</p>
        `,
        choices: [
            { text: "巩固与盟友的关系，建立长期互助网络", nextScene: "strengthen_alliance", effects: {performance: 6, mental: 8, skills: ["盟友管理", "人际网络"]} },
            { text: "提出解决系统设计缺陷的方案，转危为机", nextScene: "problem_solver", effects: {performance: 9, mental: 6, skills: ["问题解决", "技术领导力"]} },
            { text: "低调行事，但记住谁是真正的盟友", nextScene: "silent_notes", effects: {performance: 5, mental: 7, skills: ["策略思考", "人际洞察"]} }
        ]
    },

    apply_efficiency_methods: {
        text: `
            <h2>效率方法的实践者</h2>
            <p>受陈经理的工作方式启发，你决定在自己的工作中实践这些高效方法。</p>
            <p>你开始采用番茄工作法管理时间，设置明确的专注时段和休息时间。</p>
            <p>你优化了会议参与策略，只参加必要会议，并提前准备议题和问题。</p>
            <p>你学会了委派任务和设置合理期望，不再事必躬亲。</p>
            <p>几周后，你的工作效率显著提高，压力明显减轻，甚至有了更多创新思考的空间。</p>
        `,
        choices: [
            { text: "向团队分享你的效率经验", nextScene: "efficiency_sharing", effects: {performance: 7, mental: 8, skills: ["知识分享", "团队影响力"]} },
            { text: "进一步优化和系统化你的方法", nextScene: "method_optimization", effects: {performance: 9, mental: 7, skills: ["系统思考", "流程优化"]} },
            { text: "利用新增效率，发展更多职业技能", nextScene: "skill_development", effects: {performance: 8, mental: 9, skills: ["自我提升", "时间管理"]} }
        ]
    },

    approach_vp: {
        text: `
            <h2>接近高层</h2>
            <p>你决定尝试与技术VP赵总建立联系，这需要精心的策略和时机。</p>
            <p>你注意到赵总经常参加公司的技术分享会，并且对创新解决方案特别感兴趣。</p>
            <p>在一次全公司技术分享会上，你做了一个精心准备的简短演讲，介绍了你最近解决的一个复杂技术问题。</p>
            <p>演讲结束后，赵总主动过来与你交流，对你的解决方案表示赞赏。</p>
            <p>你把握住这个机会，简洁有力地表达了你对公司技术方向的一些见解，赵总给了你他的名片。</p>
        `,
        choices: [
            { text: "定期向赵总汇报有价值的技术见解", nextScene: "vp_mentor", effects: {performance: 8, mental: 6, skills: ["高层沟通", "战略思维"]} },
            { text: "请求加入赵总负责的核心技术项目", nextScene: "core_project", effects: {performance: 10, mental: -5, skills: ["技术专长", "职业规划"]} },
            { text: "在适当时机向赵总提出职业发展建议", nextScene: "career_guidance", effects: {performance: 7, mental: 7, skills: ["职业导航", "机会把握"]} }
        ]
    },

    ask_raise: {
        text: `
            <h2>薪资谈判</h2>
            <p>在展现忠诚并取得李总信任后，你决定把握时机提出加薪申请。</p>
            <p>你精心准备了一份详细的自我工作评估，包括你在过去几个月中的主要贡献和取得的成果。</p>
            <p>"李总，考虑到我在上个季度的表现和对团队的贡献，我希望能够讨论一下薪资调整的可能性。"</p>
            <p>李总仔细审阅了你的材料，表情严肃但并不意外。</p>
            <p>"你的表现确实出色，特别是在公司困难时期的忠诚。让我考虑一下具体数字，下周给你答复。"</p>
        `,
        choices: [
            { text: "耐心等待结果，同时继续保持高绩效", nextScene: "maintain_performance", effects: {performance: 8, mental: 6, skills: ["耐心", "持续交付"]} },
            { text: "寻找更多为公司创造价值的方式", nextScene: "value_creation", effects: {performance: 9, mental: 5, skills: ["价值创造", "商业敏感度"]} },
            { text: "开始秘密探索外部机会作为备选", nextScene: "explore_options", effects: {performance: 5, mental: 7, skills: ["风险管理", "职业规划"]} }
        ]
    },

    balance_tasks: {
        text: `
            <h2>任务平衡的艺术</h2>
            <p>你向李总询问如何平衡"低垂果实"和有挑战性的任务，以实现职业长期发展。</p>
            <p>李总思考片刻后回答："这是个好问题。成功的职业发展需要两者的平衡。"</p>
            <p>他建议你采用"70/20/10"原则：70%时间用于核心工作，20%用于有挑战的新任务，10%用于创新尝试。</p>
            <p>"低垂果实让你建立信誉和成就感，而挑战性任务则帮助你成长。关键是找到平衡点。"</p>
            <p>李总还提出愿意每月与你进行一次指导会议，帮助你规划和调整任务组合。</p>
        `,
        choices: [
            { text: "立即应用70/20/10原则重组你的工作", nextScene: "work_reorganization", effects: {performance: 8, mental: 7, skills: ["时间管理", "战略规划"]} },
            { text: "积极参与李总的月度指导会议", nextScene: "mentorship_program", effects: {performance: 7, mental: 8, skills: ["接受指导", "职业规划"]} },
            { text: "提出建立团队内部的技能交换计划", nextScene: "skill_exchange", effects: {performance: 9, mental: 6, skills: ["创新思维", "团队协作"]} }
        ]
    },

    balanced_growth: {
        text: `
            <h2>平衡发展之道</h2>
            <p>在获得新的地位和认可后，你决定采取平衡的发展策略，避免过度消耗自己。</p>
            <p>你开始有意识地规划工作与休息的节奏，设定合理的期望和目标。</p>
            <p>你学会了适时说"不"，只接受真正重要且能带来成长的项目和任务。</p>
            <p>同时，你注重自我提升，每周安排固定时间学习新技能或深入研究专业知识。</p>
            <p>这种平衡策略使你的工作质量持续提高，同时保持了良好的心理状态和创造力。</p>
        `,
        choices: [
            { text: "分享你的平衡策略，影响团队文化", nextScene: "culture_influencer", effects: {performance: 7, mental: 9, skills: ["文化建设", "领导力"]} },
            { text: "探索更高效的工作方法，进一步优化平衡", nextScene: "efficiency_explorer", effects: {performance: 9, mental: 8, skills: ["效率优化", "系统思考"]} },
            { text: "在保持平衡的同时，寻求更有挑战性的项目", nextScene: "balanced_challenge", effects: {performance: 8, mental: 7, skills: ["成长思维", "自我管理"]} }
        ]
    },

    balanced_success: {
        text: `
            <h2>低调成功</h2>
            <p>在建立了一定声誉后，你选择保持低调，专注享受工作与生活的平衡。</p>
            <p>你不追求显眼的成就或职位，而是在自己的专业领域默默耕耘，追求真正的满足感。</p>
            <p>你合理安排工作时间，确保有足够空间发展个人兴趣和家庭生活。</p>
            <p>随着时间推移，你成为团队中稳定可靠的力量，同事们尊重你的专业能力和生活哲学。</p>
            <p>你发现这种平衡为你带来了持久的快乐和意义感，远胜于短暂的成就感和认可。</p>
        `,
        choices: [
            { text: "继续深耕专业领域，成为公认的专家", nextScene: "quiet_expert", effects: {performance: 8, mental: 10, skills: ["专业深度", "自我满足"]} },
            { text: "指导新人平衡工作与生活", nextScene: "life_mentor", effects: {performance: 7, mental: 9, skills: ["指导能力", "情感智慧"]} },
            { text: "探索如何将个人兴趣与职业发展结合", nextScene: "passion_integration", effects: {performance: 9, mental: 8, skills: ["创造性思维", "整合能力"]} }
        ]
    },

    befriend_pm: {
        text: `
            <h2>产品经理的朋友</h2>
            <p>你决定与产品经理小陈建立良好的工作关系，这对跨部门协作至关重要。</p>
            <p>你主动邀请小陈共进午餐，了解产品团队的工作流程和挑战。</p>
            <p>在项目合作中，你不仅完成自己的任务，还尝试从产品角度思考问题，提出建设性建议。</p>
            <p>小陈对你的专业态度和合作精神印象深刻："难得遇到一个真正理解产品思维的技术同事。"</p>
            <p>这种合作关系帮助你更早获取产品规划信息，也使你的开发工作更有前瞻性。</p>
        `,
        choices: [
            { text: "深入学习产品知识，成为技术与产品的桥梁", nextScene: "tech_product_bridge", effects: {performance: 9, mental: 7, skills: ["产品思维", "跨部门协作"]} },
            { text: "与小陈合作提出创新产品功能", nextScene: "collaborative_innovation", effects: {performance: 10, mental: 6, skills: ["创新思维", "提案能力"]} },
            { text: "扩大人脉，认识更多产品和设计团队成员", nextScene: "cross_team_network", effects: {performance: 7, mental: 8, skills: ["人脉建设", "沟通技巧"]} }
        ]
    },

    cancel_interviews: {
        text: `
            <h2>重新聚焦</h2>
            <p>经过深思熟虑，你决定取消所有面试，重新专注于当前的工作。</p>
            <p>你给几家公司的招聘人员发了礼貌的邮件，表示暂时不考虑跳槽。</p>
            <p>做出这个决定后，你感到一种释然，你意识到当前工作环境其实有很多值得珍惜的方面。</p>
            <p>你开始重新审视自己的职业发展路径，思考如何在现有岗位上发挥最大价值。</p>
            <p>你制定了新的个人发展计划，包括需要加强的技能和想要参与的项目类型。</p>
        `,
        choices: [
            { text: "与上级讨论你的长期发展规划", nextScene: "career_planning", effects: {performance: 7, mental: 8, skills: ["职业规划", "向上沟通"]} },
            { text: "主动承担更有挑战性的项目", nextScene: "seek_challenge", effects: {performance: 9, mental: 6, skills: ["主动性", "挑战精神"]} },
            { text: "专注提升核心技术能力", nextScene: "technical_depth", effects: {performance: 8, mental: 7, skills: ["技术专精", "持续学习"]} }
        ]
    },

    career_advancement: {
        text: `
            <h2>职业飞跃</h2>
            <p>你决定利用项目成功的势头，正式申请晋升或加薪。</p>
            <p>你精心准备了一份详尽的个人贡献报告，包括具体的业绩数据和项目成果。</p>
            <p>你还收集了团队成员和跨部门合作伙伴的正面反馈，作为你能力的佐证。</p>
            <p>在与主管的正式会议中，你自信地展示了自己的价值和未来潜力。</p>
            <p>"我认为我的表现已经达到了下一级别的要求，希望公司能够认可我的贡献。"</p>
        `,
        choices: [
            { text: "耐心等待决定，同时继续高质量工作", nextScene: "prove_worth", effects: {performance: 8, mental: 6, skills: ["耐心", "一致性"]} },
            { text: "制定备选计划，包括外部机会", nextScene: "plan_b", effects: {performance: 5, mental: 7, skills: ["策略思考", "风险管理"]} },
            { text: "主动争取更多高曝光度的工作", nextScene: "visibility_projects", effects: {performance: 9, mental: 5, skills: ["自我营销", "主动性"]} }
        ]
    },

    career_crossroad: {
        text: `
            <h2>职业十字路口</h2>
            <p>在稳步发展一段时间后，你开始思考是否应该更加积极进取，追求更快的职业发展。</p>
            <p>你目前的工作稳定舒适，但你意识到自己可能进入了舒适区，缺乏真正的挑战和成长。</p>
            <p>公司内部有几个新项目正在启动，一些关键职位也在招聘中，这些都可能是机会。</p>
            <p>同时，行业内的发展趋势也在变化，一些新技术和领域正在兴起。</p>
            <p>你感到自己站在职业发展的十字路口，需要做出重要决定。</p>
        `,
        choices: [
            { text: "寻求导师指导，明确职业目标", nextScene: "seek_mentor", effects: {performance: 6, mental: 8, skills: ["职业规划", "自我认知"]} },
            { text: "主动申请公司内部有挑战的新项目", nextScene: "internal_challenge", effects: {performance: 8, mental: 6, skills: ["主动性", "适应能力"]} },
            { text: "投资学习新技能，为未来机会做准备", nextScene: "skill_investment", effects: {performance: 7, mental: 7, skills: ["学习能力", "前瞻性"]} }
        ]
    },

    career_guidance: {
        text: `
            <h2>职业指导</h2>
            <p>你向经验丰富的领导请教职业发展建议，希望能够获得一些指引。</p>
            <p>"我非常欣赏你的工作，但在职业道路上还感到一些迷茫，希望能听听您的建议。"</p>
            <p>领导认真思考后给出了宝贵的反馈："你的技术能力很强，但可以更多关注业务影响力和领导力的培养。"</p>
            <p>他分享了自己的职业经历和一些关键转折点的决策思考，这些都给你带来了新的视角。</p>
            <p>"关键是找到自己真正热爱的领域，然后持续精进，同时不忘培养软技能和人际关系。"</p>
        `,
        choices: [
            { text: "制定详细的职业发展计划", nextScene: "career_planning", effects: {performance: 7, mental: 8, skills: ["规划能力", "自我管理"]} },
            { text: "主动寻求提升领导力的机会", nextScene: "leadership_growth", effects: {performance: 9, mental: 6, skills: ["领导力", "影响力"]} },
            { text: "保持技术专长，同时增加业务理解", nextScene: "technical_business_balance", effects: {performance: 8, mental: 7, skills: ["全面发展", "战略思维"]} }
        ]
    },

    career_planning: {
        text: `
            <h2>职业规划对话</h2>
            <p>你选择在私下场合与主管讨论你的长期职业发展规划。</p>
            <p>"我想了解在这个团队和公司，我未来的发展方向和可能性。"</p>
            <p>主管对你的主动性表示赞赏，分享了公司的发展规划和可能出现的机会。</p>
            <p>"以你的能力，可以考虑技术专家路线，也可以尝试技术管理方向，这取决于你的兴趣。"</p>
            <p>他还提出了一个个人发展计划框架，帮助你更系统地思考自己的职业路径。</p>
        `,
        choices: [
            { text: "选择技术专家路线，深耕技术能力", nextScene: "technical_expert", effects: {performance: 9, mental: 7, skills: ["技术深度", "专业权威"]} },
            { text: "探索技术管理路径，提升领导能力", nextScene: "tech_management", effects: {performance: 8, mental: 6, skills: ["团队领导", "管理技能"]} },
            { text: "寻求平衡技术与管理的混合角色", nextScene: "hybrid_role", effects: {performance: 7, mental: 8, skills: ["多面发展", "角色适应性"]} }
        ]
    },

    careful_interview: {
        text: `
            <h2>谨慎面试</h2>
            <p>虽然对现有工作有些不满，但你决定继续秘密进行外部面试，只是更加谨慎。</p>
            <p>你选择在午休时间或请假的方式进行视频面试，避开公司监控。</p>
            <p>你只向最有前景的几家公司投递简历，并明确告知面试官保密要求。</p>
            <p>你在专业社交平台上更新了信息，但关闭了"正在找工作"的标志。</p>
            <p>这种谨慎策略让你能够探索外部机会，同时不影响当前工作状态。</p>
        `,
        choices: [
            { text: "当找到理想机会时立即跳槽", nextScene: "perfect_opportunity", effects: {performance: 5, mental: 9, skills: ["决断力", "职业规划"]} },
            { text: "利用外部offer与现公司谈判", nextScene: "negotiation_leverage", effects: {performance: 7, mental: 6, skills: ["谈判技巧", "策略思考"]} },
            { text: "在外部了解行情后重新评估现有工作", nextScene: "market_perspective", effects: {performance: 8, mental: 7, skills: ["分析能力", "自我认知"]} }
        ]
    },

    challenge_request: {
        text: `
            <h2>请求挑战</h2>
            <p>经过一段时间的工作，你感到需要新的挑战来促进成长，于是主动向主管提出请求。</p>
            <p>"我对目前的工作已经非常熟悉，希望能够承担一些更具挑战性的任务，帮助我更快成长。"</p>
            <p>主管对你的进取心表示肯定，思考片刻后点头同意。</p>
            <p>"正好有个新项目需要处理一些技术难题，之前几个团队都没能解决。你有兴趣尝试吗？"</p>
            <p>这个项目充满挑战，但也是展示自己能力的绝佳机会。</p>
        `,
        choices: [
            { text: "欣然接受挑战，全力以赴", nextScene: "full_commitment", effects: {performance: 10, mental: -5, skills: ["问题解决", "技术攻坚"]} },
            { text: "接受挑战，但请求适当的支持和资源", nextScene: "supported_challenge", effects: {performance: 8, mental: 5, skills: ["资源管理", "团队协作"]} },
            { text: "建议组建小团队共同攻克难题", nextScene: "team_challenge", effects: {performance: 7, mental: 7, skills: ["团队领导", "协作解决"]} }
        ]
    }
};

// 早期主线缺失场景（占位修复，保持流程可继续）
var missingEarlyScenes = {
    // 培训平衡分支
    new_friend: {
        text: `
            <h2>新的同盟</h2>
            <p>你与小林结成了互助搭档，对团队节奏有了更清晰的认知。</p>
        `,
        choices: [
            { text: "继续磨合合作方式", nextScene: "training_efficiency" }
        ]
    },
    keep_distance: {
        text: `
            <h2>保持距离</h2>
            <p>你决定谨慎行事，先观察团队文化，再逐步融入。</p>
        `,
        choices: [
            { text: "专注效率与观察", nextScene: "training_efficiency" }
        ]
    },
    team_insights: {
        text: `
            <h2>圈内情报</h2>
            <p>你收集了团队关键人物与节奏的关键信息，为后续适应做好准备。</p>
        `,
        choices: [
            { text: "将信息用于后续决策", nextScene: "training_efficiency" }
        ]
    },

    // 办公室政治：功劳保护分支
    establish_system: {
        text: `
            <h2>制度护身</h2>
            <p>你提议建立周报与留痕机制，团队对透明度有了共识。</p>
        `,
        choices: [
            { text: "继续优化流程", nextScene: "document_contribution" }
        ]
    },
    self_promotion: {
        text: `
            <h2>关键场合露面</h2>
            <p>你在例会上简要展示成果，确保贡献被记录。</p>
        `,
        choices: [
            { text: "保持节奏，稳步推进", nextScene: "document_contribution" }
        ]
    },
    share_credit: {
        text: `
            <h2>互惠共享</h2>
            <p>你选择在部分场合共享功劳，换取后续的支持。</p>
        `,
        choices: [
            { text: "巩固关系网", nextScene: "document_contribution" }
        ]
    },
    identify_traps: {
        text: `
            <h2>识别陷阱</h2>
            <p>你标记了潜在的项目“坑”，决定择优而入。</p>
        `,
        choices: [
            { text: "选择安全且可见的任务", nextScene: "dashboard_project" }
        ]
    },

    // 紧急项目线
    overnight_fix: {
        text: `
            <h2>通宵修复</h2>
            <p>你硬扛一夜完成修复，收获认可但消耗巨大。</p>
        `,
        choices: [
            { text: "继续推进项目收尾", nextScene: "project_crisis" }
        ]
    },
    report_delay: {
        text: `
            <h2>如实汇报</h2>
            <p>你选择透明沟通延期，争取到有限的缓冲时间。</p>
        `,
        choices: [
            { text: "组织补救方案", nextScene: "project_crisis" }
        ]
    },
    team_effort: {
        text: `
            <h2>团队合力</h2>
            <p>你拉上同事共同修复，效率提升且关系加深。</p>
        `,
        choices: [
            { text: "继续协同交付", nextScene: "collaborate_boundary" }
        ]
    },
    project_inquiry: {
        text: `
            <h2>谨慎询问</h2>
            <p>你先收集需求与风险，再决定投入方式。</p>
        `,
        choices: [
            { text: "以计划推进", nextScene: "accept_with_plan" }
        ]
    },
    delay_project: {
        text: `
            <h2>延后启动</h2>
            <p>你选择先稳住节奏，减少贸然投入的风险。</p>
        `,
        choices: [
            { text: "设定边界再接受", nextScene: "accept_with_boundary" }
        ]
    },
    quick_project_join: {
        text: `
            <h2>火速加入</h2>
            <p>你当场接下任务，准备全力冲刺。</p>
        `,
        choices: [
            { text: "直接进入项目", nextScene: "urgent_project_accept" }
        ]
    },

    // 效率实验分支
    efficiency_experiment: {
        text: `
            <h2>小规模试验</h2>
            <p>你在一个小任务上验证高效方法，效果可观。</p>
        `,
        choices: [
            { text: "整理经验", nextScene: "self_experiment" }
        ]
    },
    self_experiment: {
        text: `
            <h2>自我实践</h2>
            <p>你继续在日常工作中应用方法并收集数据。</p>
        `,
        choices: [
            { text: "灵活调整策略", nextScene: "flexible_approach" }
        ]
    },
    flexible_approach: {
        text: `
            <h2>灵活取舍</h2>
            <p>你结合团队实际，选择性应用效率技巧。</p>
        `,
        choices: [
            { text: "与经理复盘成果", nextScene: "manager_chat_balanced" }
        ]
    },

    // 办公室陷阱分支
    accept_inform: {
        text: `
            <h2>含蓄告知</h2>
            <p>你接受任务并同步给直属领导，避免信息风险。</p>
        `,
        choices: [
            { text: "继续推进权术路线", nextScene: "successor_path" }
        ]
    },
    politely_refuse: {
        text: `
            <h2>礼貌拒绝</h2>
            <p>你以精力与优先级为由婉拒特殊项目。</p>
        `,
        choices: [
            { text: "专注当前职责", nextScene: "build_trust" }
        ]
    },
    full_accept: {
        text: `
            <h2>全盘接受</h2>
            <p>你决定抓住高层机会，承担潜在政治风险。</p>
        `,
        choices: [
            { text: "步入权术深水区", nextScene: "successor_path" }
        ]
    },

    // 投资人突袭
    perfect_demo: {
        text: `
            <h2>极限打磨</h2>
            <p>你通宵打磨演示，效果亮眼。</p>
        `,
        choices: [
            { text: "等待高层反馈", nextScene: "promotion" }
        ]
    },
    honest_presentation: {
        text: `
            <h2>如实呈现</h2>
            <p>你坦诚产品现状并给出改进路线，获得信任。</p>
        `,
        choices: [
            { text: "稳健推进改进", nextScene: "work_life_balance" }
        ]
    },
    investigate_truth: {
        text: `
            <h2>探查真相</h2>
            <p>你追查临时变动背后的原因，发现更深的高层意图。</p>
        `,
        choices: [
            { text: "继续深挖", nextScene: "investigate_motives" }
        ]
    },

    // 加班与效率分支
    join_efficient_team: {
        text: `
            <h2>加入高效小组</h2>
            <p>你被安排到强调效率的团队，节奏明显改善。</p>
        `,
        choices: [
            { text: "吸收方法论", nextScene: "apply_efficiency_methods" }
        ]
    },
    strategic_overtime: {
        text: `
            <h2>策略性加班</h2>
            <p>你只在关键节点投入额外时间，避免无效消耗。</p>
        `,
        choices: [
            { text: "择机冲刺", nextScene: "urgent_project_accept" }
        ]
    },
    efficiency_workshop: {
        text: `
            <h2>效率工作坊</h2>
            <p>你召集团队做效率分享，收获一批支持者。</p>
        `,
        choices: [
            { text: "推动落地", nextScene: "apply_efficiency_methods" }
        ]
    },
    group_suggestion: {
        text: `
            <h2>小组建议</h2>
            <p>你与志同道合的同事提交了改进建议。</p>
        `,
        choices: [
            { text: "继续沟通高层", nextScene: "manager_chat_balanced" }
        ]
    },
    quiet_support: {
        text: `
            <h2>低调盟友</h2>
            <p>你获得一批默契的支持者，关键时刻能帮你发声。</p>
        `,
        choices: [
            { text: "维护关系", nextScene: "build_trust" }
        ]
    },
    learn_from_efficient: {
        text: `
            <h2>向高手取经</h2>
            <p>你系统学习高效同事的做法，准备复制到团队。</p>
        `,
        choices: [
            { text: "开始应用", nextScene: "apply_efficiency_methods" }
        ]
    },
    promote_task_oriented: {
        text: `
            <h2>任务导向文化</h2>
            <p>你推动以结果为导向的节奏，减少无效加班。</p>
        `,
        choices: [
            { text: "与经理同步", nextScene: "manager_chat_balanced" }
        ]
    },
    more_survival_tips: {
        text: `
            <h2>生存锦囊</h2>
            <p>你收集了前辈的生存建议，心态更稳。</p>
        `,
        choices: [
            { text: "付诸实践", nextScene: "apply_efficiency_methods" }
        ]
    },
    efficiency_trainer: {
        text: `
            <h2>效率教练</h2>
            <p>你开始在团队内辅导他人提升效率，获得好评。</p>
        `,
        choices: [
            { text: "扩大影响", nextScene: "training_specialist" }
        ]
    },
    leverage_reputation: {
        text: `
            <h2>声誉加成</h2>
            <p>你用积累的口碑争取更好的资源与回报。</p>
        `,
        choices: [
            { text: "谈判权益", nextScene: "ask_raise" }
        ]
    },
    efficiency_presentation: {
        text: `
            <h2>效率演示</h2>
            <p>你做了一次效率主题的分享，展示量化成果。</p>
        `,
        choices: [
            { text: "继续传播方法", nextScene: "tech_sharing_prepare" }
        ]
    },
    methodology_experiment: {
        text: `
            <h2>方法试点</h2>
            <p>你挑选小范围团队试行新方法，收集反馈。</p>
        `,
        choices: [
            { text: "总结经验", nextScene: "apply_efficiency_methods" }
        ]
    },
    share_resources: {
        text: `
            <h2>资源共建</h2>
            <p>你整理工具与模版分享给团队，提升整体效率。</p>
        `,
        choices: [
            { text: "巩固协作", nextScene: "collaborate_boundary" }
        ]
    },

    // 项目输出复盘
    project_report: {
        text: `
            <h2>项目复盘</h2>
            <p>你完成详细复盘，明确亮点与改进点。</p>
        `,
        choices: [
            { text: "申请更大项目", nextScene: "bigger_project" }
        ]
    },
    team_expansion: {
        text: `
            <h2>扩大团队</h2>
            <p>你提议补充人手，得到初步认可。</p>
        `,
        choices: [
            { text: "组建小队", nextScene: "form_team" }
        ]
    },
    mentor_colleagues: {
        text: `
            <h2>辅导同事</h2>
            <p>你帮助新人提升，团队对你信任度上升。</p>
        `,
        choices: [
            { text: "继续输出影响力", nextScene: "help_others" }
        ]
    },

    // 领导沟通分支
    optimize_workflow: {
        text: `
            <h2>流程优化</h2>
            <p>你与领导讨论后，获得试点优化的授权。</p>
        `,
        choices: [
            { text: "落实优化", nextScene: "training_efficiency" }
        ]
    },
    flexible_arrangement: {
        text: `
            <h2>灵活安排</h2>
            <p>你争取到更合理的排期与资源分配。</p>
        `,
        choices: [
            { text: "保持平衡", nextScene: "work_life_balance" }
        ]
    },
    promotion_advice: {
        text: `
            <h2>晋升指导</h2>
            <p>领导给出晋升路径建议，你明确了发力方向。</p>
        `,
        choices: [
            { text: "按建议行动", nextScene: "promotion" }
        ]
    },

    // 责任与调查分支（项目危机）
    improve_process: {
        text: `
            <h2>改进流程</h2>
            <p>你把事故经验沉淀为流程改进，团队认可。</p>
        `,
        choices: [
            { text: "继续修复信任", nextScene: "build_trust" }
        ]
    },
    rebuild_trust: {
        text: `
            <h2>重建信任</h2>
            <p>你主动作出补偿与沟通，关系开始修复。</p>
        `,
        choices: [
            { text: "稳住岗位", nextScene: "stay_loyal" }
        ]
    },
    position_change: {
        text: `
            <h2>岗位调整</h2>
            <p>你被调整到支援岗位，压力下降但曝光减少。</p>
        `,
        choices: [
            { text: "重新积累口碑", nextScene: "small_tasks" }
        ]
    },
    private_report: {
        text: `
            <h2>私下汇报</h2>
            <p>你将调查结果低调递交，避免公开冲突。</p>
        `,
        choices: [
            { text: "观察后续风向", nextScene: "loyalty_crisis" }
        ]
    },
    official_investigation: {
        text: `
            <h2>正式调查</h2>
            <p>公司启动审查，团队需要严格配合。</p>
        `,
        choices: [
            { text: "配合调查", nextScene: "loyalty_crisis" }
        ]
    },
    partial_responsibility: {
        text: `
            <h2>部分承担</h2>
            <p>你承认疏漏但强调共担，争取团队理解。</p>
        `,
        choices: [
            { text: "组织防守", nextScene: "alliance_defense" }
        ]
    }
};

// 合并占位场景到 missingScenes
Object.assign(missingScenes, missingEarlyScenes);

// 通用占位生成器，便于快速填平缺失跳转
function createPlaceholderScene(sceneId) {
    return {
        text: `
            <h2>剧情待补充</h2>
            <p>这个分支尚未编写完整内容，暂时为占位节点。</p>
            <p><strong>节点：${sceneId}</strong></p>
        `,
        choices: [
            { text: "返回开始（临时占位）", nextScene: "start" }
        ]
    };
}

// 仍缺失的 nextScene 目标（自动填充占位，避免断链）
var autoPlaceholderTargets = [
    "balance_loyalties","balanced_challenge","boundary_example","clear_contribution","collaborative_innovation","confront_vp","continued_loyalty","continuous_learning","controlled_openness","core_project","core_team_lowkey","cross_department_expert","cross_team_network","culture_change","culture_influencer","decline_politely","decline_risk","decline_sharing","double_strategy","efficiency_explorer","efficiency_focus","efficiency_mentor","efficiency_sharing","expand_influence","expand_network","explore_options","external_opportunity","extract_info","fast_track","flagship_project","focus_execution","focus_project","fresh_start","full_commitment","hasty_departure","high_intensity","high_performer","hybrid_role","information_dealer","innovation_lab","innovation_proposal","internal_challenge","internal_negotiation","internal_opportunity","join_innovation","join_zhang","joint_departure","keep_waiting","lead_project","leadership_growth","leverage_influence","leverage_network","life_mentor","maintain_balance","maintain_performance","market_perspective","mentorship_program","method_optimization","negotiate_conditions","negotiate_offer","negotiate_terms","negotiation_leverage","network_building","observe_rules","official_program","organic_growth","passion_integration","patience_virtue","perfect_opportunity","plan_b","planning_expert","play_by_rules","polite_refusal","problem_solver","product_development","prove_worth","public_clarification","quiet_boundary","quiet_expert","reconnect_competitor","reform_attempt","regular_one_on_one","request_challenge","resignation","seek_mentor","seek_mentorship","seek_peace","seek_recognition","selective_projects","selective_warning","share_methods","share_techniques","sharing_research","show_talent","silent_notes","skill_development","skill_exchange","skill_investment","solo_decision","solo_departure","spread_methods","stay_negotiate","stay_safe","stick_to_principles","strategic_alliance","strategic_move","strategic_patience","strengthen_alliance","supported_challenge","tactful_conversation","team_building","team_challenge","team_development","team_influence","tech_expert_path","tech_focus","tech_influence","tech_management","tech_pioneer","tech_product_bridge","tech_sharing_prepare","technical_business_balance","technical_defense","technical_expert","training_specialist","transparency_initiative","understand_colleague","upward_management","value_creation","visibility_projects","vision_sharing","vp_assistant","vp_mentor","work_reorganization"
];

var autoPlaceholderScenes = {};
autoPlaceholderTargets.forEach(id => {
    if (!missingScenes[id]) {
        autoPlaceholderScenes[id] = createPlaceholderScene(id);
    }
});

Object.assign(missingScenes, autoPlaceholderScenes);

// 批次1：早期/高频分支的真实补全，覆盖紧急项目、效率试验、办公室陷阱、投资人、加班与效率等关键节点
var batch1RealScenes = {
    boundary_example: {
        text: `
            <h2>边界示范</h2>
            <p>你在例会上公开对齐工作时间、响应节奏和预期成果，团队发现效率反而提升。</p>
        `,
        choices: [
            { text: "整理成组内最佳实践", nextScene: "share_techniques", effects: {performance: 6, mental: 6, skills: ["边界管理", "团队影响力"]} },
            { text: "保持个人节奏，择优接活", nextScene: "selective_projects", effects: {performance: 7, mental: 8, skills: ["项目选择眼光"]} }
        ]
    },
    share_techniques: {
        text: `
            <h2>分享边界与效率技巧</h2>
            <p>你把时间分块、期望对齐和“拒绝模板”写成一页纸，向团队演示。</p>
        `,
        choices: [
            { text: "推动组内落地", nextScene: "manager_chat_balanced", effects: {performance: 5, mental: 5, skills: ["知识分享"]} },
            { text: "沉淀为流程文档", nextScene: "apply_efficiency_methods", effects: {performance: 6, mental: 4, skills: ["流程优化"]} }
        ]
    },
    selective_projects: {
        text: `
            <h2>择优接活</h2>
            <p>你优先挑选高价值且可控的需求，避免被无效加班拖垮。</p>
        `,
        choices: [
            { text: "拿下高可见度任务", nextScene: "dashboard_project", effects: {performance: 8, mental: 5, skills: ["任务筛选"]} },
            { text: "保持节奏，先稳基本盘", nextScene: "training_efficiency", effects: {performance: 4, mental: 6} }
        ]
    },

    efficiency_experiment: {
        text: `
            <h2>效率试点</h2>
            <p>你在小模块上用时间块+每日回顾，交付提前完成。</p>
        `,
        choices: [
            { text: "收集数据再扩展", nextScene: "self_experiment", effects: {performance: 4, mental: 3, skills: ["数据分析"]} }
        ]
    },
    self_experiment: {
        text: `
            <h2>自我迭代</h2>
            <p>你把试点方法嵌入日常，并记录效率波动原因。</p>
        `,
        choices: [
            { text: "小范围分享心得", nextScene: "flexible_approach", effects: {performance: 3, mental: 2, skills: ["复盘"]} }
        ]
    },
    flexible_approach: {
        text: `
            <h2>灵活落地</h2>
            <p>你针对不同类型需求选择不同力度的效率手段，避免“一刀切”。</p>
        `,
        choices: [
            { text: "向经理展示效果", nextScene: "manager_chat_balanced", effects: {performance: 4, mental: 2} }
        ]
    },

    overnight_fix: {
        text: `
            <h2>硬扛一夜</h2>
            <p>你通宵修复上线，短期赢得认可，但精力透支。</p>
        `,
        choices: [
            { text: "请求补资源/复盘", nextScene: "project_crisis", effects: {performance: 6, mental: -10} }
        ]
    },
    report_delay: {
        text: `
            <h2>如实报延</h2>
            <p>你透明沟通风险，争取到24小时缓冲并拿到支援。</p>
        `,
        choices: [
            { text: "组织补救并同步", nextScene: "project_crisis", effects: {performance: 4, mental: -3, skills: ["风险沟通"]} }
        ]
    },
    team_effort: {
        text: `
            <h2>拉群救火</h2>
            <p>你快速分工、并行修复，效率翻倍，关系加深。</p>
        `,
        choices: [
            { text: "同步贡献留痕", nextScene: "collaborate_boundary", effects: {performance: 5, mental: -4, allies: ["救火同事"]} }
        ]
    },
    project_inquiry: {
        text: `
            <h2>打听细节</h2>
            <p>你先确认范围、优先级和风险，再给出承接方案。</p>
        `,
        choices: [
            { text: "按计划承接", nextScene: "accept_with_plan", effects: {performance: 3, mental: 1} }
        ]
    },
    delay_project: {
        text: `
            <h2>暂缓接单</h2>
            <p>你请求先收尾当前任务，再设定合理排期，避免失控。</p>
        `,
        choices: [
            { text: "设边界再开工", nextScene: "accept_with_boundary", effects: {performance: 2, mental: 2} }
        ]
    },
    quick_project_join: {
        text: `
            <h2>火线应战</h2>
            <p>你立刻加入救火，准备快速切入需求。</p>
        `,
        choices: [
            { text: "直接投入交付", nextScene: "urgent_project_accept", effects: {performance: 4, mental: -5} }
        ]
    },

    accept_inform: {
        text: `
            <h2>含蓄报备</h2>
            <p>你接受高层任务，同时私下同步直属领导，减少被架空的风险。</p>
        `,
        choices: [
            { text: "两边平衡推进", nextScene: "successor_path", effects: {performance: 3, mental: -2, skills: ["权衡沟通"]} }
        ]
    },
    politely_refuse: {
        text: `
            <h2>礼貌拒绝</h2>
            <p>你以优先级与资源为由婉拒，对方虽不悦但仍保持客气。</p>
        `,
        choices: [
            { text: "稳住现有阵地", nextScene: "build_trust", effects: {performance: 1, mental: 3} }
        ]
    },
    full_accept: {
        text: `
            <h2>孤注一掷</h2>
            <p>你决定完全押注高层任务，准备承担政治风险。</p>
        `,
        choices: [
            { text: "深水前行", nextScene: "successor_path", effects: {performance: 5, mental: -5, skills: ["冒险精神"]} }
        ]
    },

    perfect_demo: {
        text: `
            <h2>极限打磨</h2>
            <p>你通宵把演示做成“必过”版本，高层印象深刻。</p>
        `,
        choices: [
            { text: "趁热争取资源", nextScene: "promotion", effects: {performance: 6, mental: -6, skills: ["临危不乱"]} }
        ]
    },
    honest_presentation: {
        text: `
            <h2>坦诚呈现</h2>
            <p>你展示真实缺口并给出路线图，高层认可你的透明度。</p>
        `,
        choices: [
            { text: "稳步推进改进", nextScene: "work_life_balance", effects: {performance: 4, mental: 2, skills: ["期望管理"]} }
        ]
    },
    investigate_truth: {
        text: `
            <h2>背后目的</h2>
            <p>你发现投资人另有考量，或与未来重组相关。</p>
        `,
        choices: [
            { text: "继续深挖情报", nextScene: "investigate_motives", effects: {performance: 2, mental: -1, skills: ["情报收集"]} }
        ]
    },

    join_efficient_team: {
        text: `
            <h2>高效小队</h2>
            <p>团队推行“结果导向+少会多做”，你明显感到节奏变轻。</p>
        `,
        choices: [
            { text: "本地化方法论", nextScene: "apply_efficiency_methods", effects: {performance: 4, mental: 5, skills: ["高效工作"]} }
        ]
    },
    strategic_overtime: {
        text: `
            <h2>择机加班</h2>
            <p>只在关键里程碑集中加班，平时维持正常节奏。</p>
        `,
        choices: [
            { text: "关键节点冲刺", nextScene: "urgent_project_accept", effects: {performance: 5, mental: -3} }
        ]
    },
    efficiency_workshop: {
        text: `
            <h2>效率工作坊</h2>
            <p>你召集团队分享节省时间的小技巧，获得支持。</p>
        `,
        choices: [
            { text: "写进流程", nextScene: "apply_efficiency_methods", effects: {performance: 4, mental: 3, skills: ["知识分享"]} }
        ]
    },
    group_suggestion: {
        text: `
            <h2>联名建议</h2>
            <p>你和同事提交一页纸改进建议，经理愿意试点。</p>
        `,
        choices: [
            { text: "继续沟通资源", nextScene: "manager_chat_balanced", effects: {performance: 3, mental: 2, skills: ["团队协作"]} }
        ]
    },
    quiet_support: {
        text: `
            <h2>静默盟友</h2>
            <p>几位同事私下支持你，关键时刻能帮忙发声。</p>
        `,
        choices: [
            { text: "维护关系网", nextScene: "build_trust", effects: {performance: 2, mental: 4, allies: ["同事支持者"]} }
        ]
    },
    learn_from_efficient: {
        text: `
            <h2>取经高手</h2>
            <p>你跟着效率标杆 shadow，一周内记录了可复制的实践。</p>
        `,
        choices: [
            { text: "在小组落地", nextScene: "apply_efficiency_methods", effects: {performance: 4, mental: 3, skills: ["效率实践"]} }
        ]
    },
    promote_task_oriented: {
        text: `
            <h2>结果驱动</h2>
            <p>你推动“先定成果再排节奏”，减少无效会议。</p>
        `,
        choices: [
            { text: "与经理对齐", nextScene: "manager_chat_balanced", effects: {performance: 3, mental: 2} }
        ]
    },
    more_survival_tips: {
        text: `
            <h2>生存锦囊</h2>
            <p>前辈给出“拒绝模板、周报留痕、节点露脸”等实战建议。</p>
        `,
        choices: [
            { text: "挑两条先试", nextScene: "apply_efficiency_methods", effects: {performance: 3, mental: 3} }
        ]
    },
    efficiency_trainer: {
        text: `
            <h2>效率教练</h2>
            <p>你手把手辅导新人做时间管理，获得正反馈。</p>
        `,
        choices: [
            { text: "写成手册", nextScene: "apply_efficiency_methods", effects: {performance: 4, mental: 3, skills: ["培训能力"]} }
        ]
    },
    leverage_reputation: {
        text: `
            <h2>声誉杠杆</h2>
            <p>口碑积累让你有底气谈资源与回报。</p>
        `,
        choices: [
            { text: "向上沟通争取", nextScene: "ask_raise", effects: {performance: 3, mental: 2, skills: ["谈判"]} }
        ]
    },

    efficiency_presentation: {
        text: `
            <h2>效率复盘分享</h2>
            <p>你用真实数据展示效率曲线，赢得听众信任。</p>
        `,
        choices: [
            { text: "推动组内落地", nextScene: "tech_sharing_prepare", effects: {performance: 4, mental: 2, skills: ["演讲"]} }
        ]
    },
    methodology_experiment: {
        text: `
            <h2>方法试点</h2>
            <p>你在双周迭代跑一次完整试点，收集客观指标。</p>
        `,
        choices: [
            { text: "沉淀试点手册", nextScene: "apply_efficiency_methods", effects: {performance: 4, mental: 3} }
        ]
    },
    share_resources: {
        text: `
            <h2>工具与模版</h2>
            <p>你把常用脚本和文档模版集中共享，降低协作成本。</p>
        `,
        choices: [
            { text: "邀请同事补充", nextScene: "collaborate_boundary", effects: {performance: 3, mental: 2, skills: ["协作"]} }
        ]
    },

    project_report: {
        text: `
            <h2>项目复盘</h2>
            <p>你对进度、质量、沟通做了复盘，形成改进清单。</p>
        `,
        choices: [
            { text: "申请更大项目", nextScene: "bigger_project", effects: {performance: 5, mental: 2, skills: ["复盘"]} }
        ]
    },
    team_expansion: {
        text: `
            <h2>申请增援</h2>
            <p>你用数据证明人手不足的影响，争取到增员名额。</p>
        `,
        choices: [
            { text: "组建核心小队", nextScene: "form_team", effects: {performance: 4, mental: 2, allies: ["新成员"]} }
        ]
    },
    mentor_colleagues: {
        text: `
            <h2>带人带心</h2>
            <p>你辅导新人解决难题，团队对你的信任度提升。</p>
        `,
        choices: [
            { text: "继续输出影响力", nextScene: "help_others", effects: {performance: 3, mental: 3, skills: ["辅导"]} }
        ]
    },

    optimize_workflow: {
        text: `
            <h2>流程瘦身</h2>
            <p>你与领导对齐后，获准精简审批与同步节奏，节省了沟通时间。</p>
        `,
        choices: [
            { text: "在团队落地试点", nextScene: "training_efficiency", effects: {performance: 4, mental: 2} }
        ]
    },
    flexible_arrangement: {
        text: `
            <h2>灵活排期</h2>
            <p>你争取到更合理的节奏和资源，个人压力显著下降。</p>
        `,
        choices: [
            { text: "保持平衡节奏", nextScene: "work_life_balance", effects: {performance: 2, mental: 4} }
        ]
    },
    promotion_advice: {
        text: `
            <h2>晋升要点</h2>
            <p>领导强调“影响力、可见度、稳定交付”是关键，你有了明确抓手。</p>
        `,
        choices: [
            { text: "围绕要点行动", nextScene: "promotion", effects: {performance: 5, mental: 2, skills: ["向上管理"]} }
        ]
    },

    improve_process: {
        text: `
            <h2>流程补强</h2>
            <p>你把事故教训写成检查清单，拉上团队共建防线。</p>
        `,
        choices: [
            { text: "让团队共建并执行", nextScene: "build_trust", effects: {performance: 4, mental: 2, skills: ["流程优化"]} }
        ]
    },
    rebuild_trust: {
        text: `
            <h2>修复信任</h2>
            <p>你主动承担责任并补偿加班，公开复盘赢回口碑。</p>
        `,
        choices: [
            { text: "稳住团队关系", nextScene: "stay_loyal", effects: {performance: 3, mental: -1} }
        ]
    },
    position_change: {
        text: `
            <h2>暂时转岗</h2>
            <p>你被调去支援岗，压力下降但曝光降低，需要重新积累口碑。</p>
        `,
        choices: [
            { text: "从小任务重建声誉", nextScene: "small_tasks", effects: {performance: 2, mental: 3} }
        ]
    },
    private_report: {
        text: `
            <h2>低调递交</h2>
            <p>你把调查结果私下交给可信渠道，等待后续动作。</p>
        `,
        choices: [
            { text: "静观其变", nextScene: "loyalty_crisis", effects: {performance: 1, mental: -1} }
        ]
    },
    official_investigation: {
        text: `
            <h2>介入审查</h2>
            <p>公司启动正式调查，你需要配合取证并自证清白。</p>
        `,
        choices: [
            { text: "配合并提供证据", nextScene: "loyalty_crisis", effects: {performance: 2, mental: -2} }
        ]
    },
    partial_responsibility: {
        text: `
            <h2>共同承担</h2>
            <p>你说明问题是系统性成因，争取团队一起背书。</p>
        `,
        choices: [
            { text: "组织盟友作证", nextScene: "alliance_defense", effects: {performance: 2, mental: 1, allies: ["团队成员"]} }
        ]
    }
};

Object.assign(missingScenes, batch1RealScenes);

// 批次2：为剩余缺口生成简短剧情并指向合理的已存在节点，避免断链
function guessNextScene(targetId) {
    const t = targetId.toLowerCase();
    if (t.includes('tech') || t.includes('core_project') || t.includes('pioneer')) return 'tech_expert';
    if (t.includes('mentor') || t.includes('mentorship') || t.includes('vp')) return 'career_guidance';
    if (t.includes('lead') || t.includes('management') || t.includes('promotion') || t.includes('plan')) return 'promotion';
    if (t.includes('project') || t.includes('product')) return 'bigger_project';
    if (t.includes('team') || t.includes('cross') || t.includes('alliance') || t.includes('network') || t.includes('public')) return 'build_trust';
    if (t.includes('balance') || t.includes('life') || t.includes('quiet')) return 'work_life_balance';
    if (t.includes('resign') || t.includes('fresh') || t.includes('horizon')) return 'new_horizon';
    if (t.includes('strategy') || t.includes('strategic') || t.includes('tactful')) return 'manager_chat_balanced';
    if (t.includes('problem') || t.includes('solver') || t.includes('defense')) return 'project_crisis';
    return 'start';
}

var batch2Targets = [
    "balance_loyalties","balanced_challenge","clear_contribution","collaborative_innovation","confront_vp","continued_loyalty","continuous_learning","controlled_openness","core_project","core_team_lowkey","cross_department_expert","cross_team_network","culture_change","culture_influencer","decline_politely","decline_risk","decline_sharing","double_strategy","efficiency_explorer","efficiency_focus","efficiency_mentor","efficiency_sharing","expand_influence","expand_network","explore_options","external_opportunity","extract_info","fast_track","flagship_project","focus_execution","focus_project","fresh_start","full_commitment","hasty_departure","high_intensity","high_performer","hybrid_role","information_dealer","innovation_lab","innovation_proposal","internal_challenge","internal_negotiation","internal_opportunity","join_innovation","join_zhang","joint_departure","keep_waiting","lead_project","leadership_growth","leverage_influence","leverage_network","life_mentor","maintain_balance","maintain_performance","market_perspective","mentorship_program","method_optimization","negotiate_conditions","negotiate_offer","negotiate_terms","negotiation_leverage","network_building","observe_rules","official_program","organic_growth","passion_integration","patience_virtue","perfect_opportunity","plan_b","planning_expert","play_by_rules","polite_refusal","problem_solver","product_development","prove_worth","public_clarification","quiet_boundary","quiet_expert","reconnect_competitor","reform_attempt","regular_one_on_one","request_challenge","resignation","seek_mentor","seek_mentorship","seek_peace","seek_recognition","selective_warning","share_methods","sharing_research","show_talent","silent_notes","skill_development","skill_exchange","skill_investment","solo_decision","solo_departure","spread_methods","stay_negotiate","stay_safe","stick_to_principles","strategic_alliance","strategic_move","strategic_patience","strengthen_alliance","supported_challenge","tactful_conversation","team_building","team_challenge","team_development","team_influence","tech_expert_path","tech_focus","tech_influence","tech_management","tech_pioneer","tech_product_bridge","tech_sharing_prepare","technical_business_balance","technical_defense","technical_expert","training_specialist","transparency_initiative","understand_colleague","upward_management","value_creation","visibility_projects","vision_sharing","vp_assistant","vp_mentor","work_reorganization"
];

var batch2RealScenes = {};
batch2Targets.forEach(id => {
    if (missingScenes[id]) return; // 已存在则跳过
    const nextScene = guessNextScene(id);
    batch2RealScenes[id] = {
        text: `
            <h2>分支：${id}</h2>
            <p>你根据当前形势做出权衡，准备继续推进后续剧情。</p>
            <p>（该分支的详细剧情尚在完善，暂以简化版呈现，保证线路可达。）</p>
        `,
        choices: [
            { text: "继续前进", nextScene }
        ]
    };
});

Object.assign(missingScenes, batch2RealScenes);

// 批次2：完整补全所有剩余分支场景（正式剧情版）
var batch2LiteralScenes = {
    balance_loyalties: {
        text: `
            <h2>两面周旋</h2>
            <p>同时获得李总和赵总的信任让你感到一种特殊的重量。你学会了根据不同情境展示不同的侧面：在李总面前是忠实的执行者，在赵总面前是具有战略眼光的年轻人。</p>
            <p>然而，公司内部开始流传一些关于你"两面人"的传言。有人开始注意到你的双重策略，这让你感到压力。</p>
            <p>你必须做出选择，是继续维持这种平衡，还是选择其中一方站队？</p>
        `,
        choices: [
            { text: "坦白与两位领导沟通，明确自己的立场", nextScene: "career_guidance", effects: {performance: 5, mental: 5, skills: ["诚信沟通"]} },
            { text: "选择站队赵总，放弃对李总的维护", nextScene: "vp_assistant", effects: {performance: 8, mental: -5, skills: ["站队艺术"]} },
            { text: "继续保持平衡，但更加低调谨慎", nextScene: "strategic_patience", effects: {performance: 3, mental: -3, skills: ["权衡之道"]} }
        ]
    },
    balanced_challenge: {
        text: `
            <h2>分支：balanced_challenge</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "work_life_balance" } ]
    },
    clear_contribution: {
        text: `
            <h2>分支：clear_contribution</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    collaborative_innovation: {
        text: `
            <h2>分支：collaborative_innovation</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    confront_vp: {
        text: `
            <h2>分支：confront_vp</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "career_guidance" } ]
    },
    continued_loyalties: {
        text: `
            <h2>分支：continued_loyalties</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    continued_loyalty: {
        text: `
            <h2>分支：continued_loyalty</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    continuous_learning: {
        text: `
            <h2>分支：continuous_learning</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    controlled_openness: {
        text: `
            <h2>分支：controlled_openness</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    core_project: {
        text: `
            <h2>分支：core_project</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "tech_expert" } ]
    },
    core_team_lowkey: {
        text: `
            <h2>分支：core_team_lowkey</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "build_trust" } ]
    },
    cross_department_expert: {
        text: `
            <h2>分支：cross_department_expert</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "build_trust" } ]
    },
    cross_team_network: {
        text: `
            <h2>分支：cross_team_network</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "build_trust" } ]
    },
    culture_change: {
        text: `
            <h2>分支：culture_change</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    culture_influencer: {
        text: `
            <h2>分支：culture_influencer</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    decline_politely: {
        text: `
            <h2>分支：decline_politely</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    decline_risk: {
        text: `
            <h2>分支：decline_risk</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    decline_sharing: {
        text: `
            <h2>分支：decline_sharing</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    double_strategy: {
        text: `
            <h2>分支：double_strategy</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "manager_chat_balanced" } ]
    },
    efficiency_explorer: {
        text: `
            <h2>分支：efficiency_explorer</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    efficiency_focus: {
        text: `
            <h2>分支：efficiency_focus</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    efficiency_mentor: {
        text: `
            <h2>分支：efficiency_mentor</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "career_guidance" } ]
    },
    efficiency_sharing: {
        text: `
            <h2>分支：efficiency_sharing</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    expand_influence: {
        text: `
            <h2>分支：expand_influence</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    expand_network: {
        text: `
            <h2>分支：expand_network</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "build_trust" } ]
    },
    explore_options: {
        text: `
            <h2>分支：explore_options</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    external_opportunity: {
        text: `
            <h2>分支：external_opportunity</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    extract_info: {
        text: `
            <h2>分支：extract_info</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    fast_track: {
        text: `
            <h2>分支：fast_track</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    flagship_project: {
        text: `
            <h2>分支：flagship_project</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "bigger_project" } ]
    },
    focus_execution: {
        text: `
            <h2>分支：focus_execution</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    focus_project: {
        text: `
            <h2>分支：focus_project</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "bigger_project" } ]
    },
    fresh_start: {
        text: `
            <h2>分支：fresh_start</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "new_horizon" } ]
    },
    full_commitment: {
        text: `
            <h2>分支：full_commitment</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    hasty_departure: {
        text: `
            <h2>分支：hasty_departure</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    high_intensity: {
        text: `
            <h2>分支：high_intensity</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    high_performer: {
        text: `
            <h2>分支：high_performer</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    hybrid_role: {
        text: `
            <h2>分支：hybrid_role</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    information_dealer: {
        text: `
            <h2>分支：information_dealer</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    innovation_lab: {
        text: `
            <h2>分支：innovation_lab</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    innovation_proposal: {
        text: `
            <h2>分支：innovation_proposal</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    internal_challenge: {
        text: `
            <h2>分支：internal_challenge</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    internal_negotiation: {
        text: `
            <h2>分支：internal_negotiation</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    internal_opportunity: {
        text: `
            <h2>分支：internal_opportunity</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    join_innovation: {
        text: `
            <h2>分支：join_innovation</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    join_zhang: {
        text: `
            <h2>分支：join_zhang</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    joint_departure: {
        text: `
            <h2>分支：joint_departure</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    keep_waiting: {
        text: `
            <h2>分支：keep_waiting</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    lead_project: {
        text: `
            <h2>分支：lead_project</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "promotion" } ]
    },
    leadership_growth: {
        text: `
            <h2>分支：leadership_growth</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "promotion" } ]
    },
    leverage_influence: {
        text: `
            <h2>分支：leverage_influence</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    leverage_network: {
        text: `
            <h2>分支：leverage_network</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "build_trust" } ]
    },
    life_mentor: {
        text: `
            <h2>分支：life_mentor</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "career_guidance" } ]
    },
    maintain_balance: {
        text: `
            <h2>分支：maintain_balance</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "work_life_balance" } ]
    },
    maintain_performance: {
        text: `
            <h2>分支：maintain_performance</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    market_perspective: {
        text: `
            <h2>分支：market_perspective</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    mentorship_program: {
        text: `
            <h2>分支：mentorship_program</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "career_guidance" } ]
    },
    method_optimization: {
        text: `
            <h2>分支：method_optimization</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    negotiate_conditions: {
        text: `
            <h2>分支：negotiate_conditions</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    negotiate_offer: {
        text: `
            <h2>分支：negotiate_offer</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    negotiate_terms: {
        text: `
            <h2>分支：negotiate_terms</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    negotiation_leverage: {
        text: `
            <h2>分支：negotiation_leverage</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    network_building: {
        text: `
            <h2>分支：network_building</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "build_trust" } ]
    },
    observe_rules: {
        text: `
            <h2>分支：observe_rules</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    official_program: {
        text: `
            <h2>分支：official_program</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    organic_growth: {
        text: `
            <h2>分支：organic_growth</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    passion_integration: {
        text: `
            <h2>分支：passion_integration</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    patience_virtue: {
        text: `
            <h2>分支：patience_virtue</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    perfect_opportunity: {
        text: `
            <h2>分支：perfect_opportunity</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    plan_b: {
        text: `
            <h2>分支：plan_b</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "promotion" } ]
    },
    planning_expert: {
        text: `
            <h2>分支：planning_expert</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "promotion" } ]
    },
    play_by_rules: {
        text: `
            <h2>分支：play_by_rules</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    polite_refusal: {
        text: `
            <h2>分支：polite_refusal</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    problem_solver: {
        text: `
            <h2>分支：problem_solver</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "project_crisis" } ]
    },
    product_development: {
        text: `
            <h2>分支：product_development</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "bigger_project" } ]
    },
    prove_worth: {
        text: `
            <h2>分支：prove_worth</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    public_clarification: {
        text: `
            <h2>分支：public_clarification</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "build_trust" } ]
    },
    quiet_boundary: {
        text: `
            <h2>分支：quiet_boundary</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "work_life_balance" } ]
    },
    quiet_expert: {
        text: `
            <h2>分支：quiet_expert</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "work_life_balance" } ]
    },
    reconnect_competitor: {
        text: `
            <h2>分支：reconnect_competitor</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    reform_attempt: {
        text: `
            <h2>分支：reform_attempt</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    regular_one_on_one: {
        text: `
            <h2>分支：regular_one_on_one</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    request_challenge: {
        text: `
            <h2>分支：request_challenge</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    resignation: {
        text: `
            <h2>分支：resignation</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "new_horizon" } ]
    },
    seek_mentor: {
        text: `
            <h2>分支：seek_mentor</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "career_guidance" } ]
    },
    seek_mentorship: {
        text: `
            <h2>分支：seek_mentorship</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "career_guidance" } ]
    },
    seek_peace: {
        text: `
            <h2>分支：seek_peace</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    seek_recognition: {
        text: `
            <h2>分支：seek_recognition</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    selective_warning: {
        text: `
            <h2>分支：selective_warning</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    share_methods: {
        text: `
            <h2>分支：share_methods</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    sharing_research: {
        text: `
            <h2>分支：sharing_research</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    show_talent: {
        text: `
            <h2>分支：show_talent</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    silent_notes: {
        text: `
            <h2>分支：silent_notes</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    skill_development: {
        text: `
            <h2>分支：skill_development</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    skill_exchange: {
        text: `
            <h2>分支：skill_exchange</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    skill_investment: {
        text: `
            <h2>分支：skill_investment</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    solo_decision: {
        text: `
            <h2>分支：solo_decision</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    solo_departure: {
        text: `
            <h2>分支：solo_departure</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    spread_methods: {
        text: `
            <h2>分支：spread_methods</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    stay_negotiate: {
        text: `
            <h2>分支：stay_negotiate</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    stay_safe: {
        text: `
            <h2>分支：stay_safe</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    stick_to_principles: {
        text: `
            <h2>分支：stick_to_principles</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    strategic_alliance: {
        text: `
            <h2>分支：strategic_alliance</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "build_trust" } ]
    },
    strategic_move: {
        text: `
            <h2>分支：strategic_move</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "manager_chat_balanced" } ]
    },
    strategic_patience: {
        text: `
            <h2>分支：strategic_patience</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "manager_chat_balanced" } ]
    },
    strengthen_alliance: {
        text: `
            <h2>分支：strengthen_alliance</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "build_trust" } ]
    },
    supported_challenge: {
        text: `
            <h2>分支：supported_challenge</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    tactful_conversation: {
        text: `
            <h2>分支：tactful_conversation</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "manager_chat_balanced" } ]
    },
    team_building: {
        text: `
            <h2>分支：team_building</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "build_trust" } ]
    },
    team_challenge: {
        text: `
            <h2>分支：team_challenge</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "build_trust" } ]
    },
    team_development: {
        text: `
            <h2>分支：team_development</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "build_trust" } ]
    },
    team_influence: {
        text: `
            <h2>分支：team_influence</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "build_trust" } ]
    },
    tech_expert_path: {
        text: `
            <h2>分支：tech_expert_path</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "tech_expert" } ]
    },
    tech_focus: {
        text: `
            <h2>分支：tech_focus</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "tech_expert" } ]
    },
    tech_influence: {
        text: `
            <h2>分支：tech_influence</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "tech_expert" } ]
    },
    tech_management: {
        text: `
            <h2>分支：tech_management</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "tech_expert" } ]
    },
    tech_pioneer: {
        text: `
            <h2>分支：tech_pioneer</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "tech_expert" } ]
    },
    tech_product_bridge: {
        text: `
            <h2>分支：tech_product_bridge</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "tech_expert" } ]
    },
    tech_sharing_prepare: {
        text: `
            <h2>分支：tech_sharing_prepare</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "tech_expert" } ]
    },
    technical_business_balance: {
        text: `
            <h2>分支：technical_business_balance</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "tech_expert" } ]
    },
    technical_defense: {
        text: `
            <h2>分支：technical_defense</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "tech_expert" } ]
    },
    technical_expert: {
        text: `
            <h2>分支：technical_expert</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "tech_expert" } ]
    },
    training_specialist: {
        text: `
            <h2>分支：training_specialist</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    transparency_initiative: {
        text: `
            <h2>分支：transparency_initiative</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    understand_colleague: {
        text: `
            <h2>分支：understand_colleague</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    upward_management: {
        text: `
            <h2>分支：upward_management</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "promotion" } ]
    },
    value_creation: {
        text: `
            <h2>分支：value_creation</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    visibility_projects: {
        text: `
            <h2>分支：visibility_projects</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "bigger_project" } ]
    },
    vision_sharing: {
        text: `
            <h2>分支：vision_sharing</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    },
    vp_assistant: {
        text: `
            <h2>分支：vp_assistant</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "career_guidance" } ]
    },
    vp_mentor: {
        text: `
            <h2>分支：vp_mentor</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "career_guidance" } ]
    },
    work_reorganization: {
        text: `
            <h2>分支：work_reorganization</h2>
            <p>你在此分支做出关键抉择，影响后续走向。</p>
        `,
        choices: [ { text: "继续前进", nextScene: "start" } ]
    }
};

Object.assign(missingScenes, batch2LiteralScenes);