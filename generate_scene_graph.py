import os
import re
import json
from collections import defaultdict

# 场景文件夹和模式
scene_dir = 'src'
scene_file_pattern = r'scenes_.*\.js'

# 正则表达式模式
scene_def_pattern = re.compile(r'(?:var\s+\w+\s*=\s*{|window\.\w+\s*=\s*{)(.*?)};', re.DOTALL)
scene_id_pattern = re.compile(r'(\w+)\s*:\s*{', re.DOTALL)
nextscene_pattern = re.compile(r'nextScene\s*:\s*[\'"]([^\'"]+)[\'"]', re.DOTALL)
scene_text_pattern = re.compile(r'text\s*:\s*`.*?<h2>(.*?)</h2>', re.DOTALL)

# 场景类型分类
scene_categories = {
    'intro': ['start', 'training_', 'onboarding_'],
    'office_politics': ['office_', 'politics_', 'meeting_', 'conflict_'],
    'projects': ['project_', 'task_', 'deadline_', 'feature_'],
    'dramatic': ['dramatic_', 'crisis_', 'emergency_'],
    'hr': ['hr_', 'promotion_', 'performance_'],
    'endings': ['burnout', 'layoff', 'promotion', 'work_life_balance', 'political_master', 'tech_expert', 'entrepreneur']
}

def get_scene_category(scene_id):
    """确定场景所属的类别"""
    for category, patterns in scene_categories.items():
        for pattern in patterns:
            if pattern in scene_id:
                return category
    return 'misc'  # 默认类别

def extract_scenes_from_file(file_path):
    """从JS文件中提取场景定义"""
    scenes = {}
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
        # 提取场景定义块
        scene_blocks = scene_def_pattern.findall(content)
        
        for block in scene_blocks:
            # 提取场景ID
            scene_ids = scene_id_pattern.findall(block)
            
            for scene_id in scene_ids:
                # 查找这个场景ID在原始内容中的位置
                scene_start = content.find(f'{scene_id}:')
                if scene_start == -1:
                    continue
                
                # 找到场景块的开始和结束
                brace_count = 0
                scene_content_start = content.find('{', scene_start)
                scene_content_end = scene_content_start + 1
                
                for i in range(scene_content_start, len(content)):
                    if content[i] == '{':
                        brace_count += 1
                    elif content[i] == '}':
                        brace_count -= 1
                        if brace_count == 0:
                            scene_content_end = i + 1
                            break
                
                scene_content = content[scene_content_start:scene_content_end]
                
                # 提取场景标题
                title_match = scene_text_pattern.search(scene_content)
                title = title_match.group(1) if title_match else scene_id
                
                # 提取nextScene值
                next_scenes = nextscene_pattern.findall(scene_content)
                
                # 存储场景信息
                scenes[scene_id] = {
                    'next_scenes': next_scenes,
                    'title': title,
                    'category': get_scene_category(scene_id)
                }
    
    return scenes

def generate_scene_graph():
    """生成场景路径图"""
    all_scenes = {}
    
    # 遍历src目录下的所有场景文件
    for file in os.listdir(scene_dir):
        if re.match(scene_file_pattern, file):
            file_path = os.path.join(scene_dir, file)
            scenes = extract_scenes_from_file(file_path)
            all_scenes.update(scenes)
    
    # 创建dot文件内容
    dot_content = ['digraph GameScenes {']
    dot_content.append('  // 图形设置')
    dot_content.append('  graph [fontname="SimHei", rankdir=LR, overlap=false, splines=true, bgcolor="#FFFFFF"];')
    dot_content.append('  node [shape=box, style=filled, fontname="SimHei", fontsize=12, margin="0.2,0.1"];')
    dot_content.append('  edge [fontname="SimHei", fontsize=10];')
    
    # 添加子图，按类别分组
    categories = {
        'intro': {'color': '#9ED3FF', 'label': '入职培训'},
        'office_politics': {'color': '#FFC09E', 'label': '办公室政治'},
        'projects': {'color': '#C9E4DE', 'label': '项目管理'},
        'dramatic': {'color': '#FFCDAB', 'label': '戏剧性事件'},
        'hr': {'color': '#E6E6FA', 'label': 'HR互动'},
        'endings': {'color': '#FFABAB', 'label': '游戏结局'},
        'misc': {'color': '#E2E2E2', 'label': '其他场景'}
    }
    
    # 为每个类别创建子图
    for category, info in categories.items():
        dot_content.append(f'  subgraph cluster_{category} {{')
        dot_content.append(f'    label="{info["label"]}";')
        dot_content.append('    style=filled;')
        dot_content.append(f'    color="{info["color"]}";')
        dot_content.append('    fontsize=16;')
        
        # 将此类别的所有节点添加到子图
        for scene_id, scene_info in all_scenes.items():
            if scene_info['category'] == category:
                label = scene_info['title']
                # 截断过长的标题
                if len(label) > 20:
                    label = label[:18] + '...'
                
                # 特殊节点样式
                if scene_id == 'start':
                    dot_content.append(f'    {scene_id} [label="{label}", fillcolor="#90EE90", style="filled,bold"];')
                elif scene_id in scene_categories['endings']:
                    dot_content.append(f'    {scene_id} [label="{label}", fillcolor="#FF7F7F", style="filled,bold"];')
                else:
                    dot_content.append(f'    {scene_id} [label="{label}", fillcolor=white];')
        
        dot_content.append('  }')
    
    # 添加边
    dot_content.append('\n  // 场景连接')
    for scene_id, scene_info in all_scenes.items():
        for next_scene in scene_info['next_scenes']:
            if next_scene not in all_scenes:
                # 标记未定义的场景
                if next_scene not in ['start', 'refresh_page']:
                    dot_content.append(f'  {next_scene} [label="{next_scene}", fillcolor="#FFFF99", style="filled,dashed"];')
            
            if next_scene == 'start':
                # 返回起点的边使用灰色虚线
                dot_content.append(f'  {scene_id} -> {next_scene} [color=gray, style=dotted, constraint=false];')
            else:
                dot_content.append(f'  {scene_id} -> {next_scene};')
    
    dot_content.append('}')
    
    # 写入dot文件
    with open('output/scene_graph.dot', 'w', encoding='utf-8') as f:
        f.write('\n'.join(dot_content))
    
    print("场景图DOT文件已生成到 output/scene_graph.dot")
    
    # 尝试使用不同的布局引擎生成PNG图
    os.system('dot -Tpng -Gdpi=150 output/scene_graph.dot -o output/scene_graph_dot.png')
    os.system('fdp -Tpng -Gdpi=150 output/scene_graph.dot -o output/scene_graph_fdp.png')
    os.system('neato -Tpng -Gdpi=150 output/scene_graph.dot -o output/scene_graph_neato.png')
    print("场景图PNG已生成，使用了多种布局引擎 (如果系统安装了Graphviz工具)")

if __name__ == "__main__":
    generate_scene_graph() 