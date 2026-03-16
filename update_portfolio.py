import json
import os

# Fath's absolute path to the database
PROJECTS_FILE = r"C:\Users\tkg\Documents\Projects\fathsporto\src\app\projects.json"

def deploy_project():
    print("\n>>> CYBERPUNK CMS: INITIALIZING PROJECT UPLOAD <<<")
    
    with open(PROJECTS_FILE, 'r', encoding='utf-8') as f:
        projects = json.load(f)
        
    new_id = max([p['id'] for p in projects]) + 1
    
    title = input("\nProject Title: ")
    category = input("Category (HR Analytics, Automation, BI & Dashboards, Others): ")
    summary = input("Short Summary: ")
    tech_stack = input("Tech Stack (comma separated, e.g., Python, SQL, Pandas): ").split(',')
    tech_stack = [t.strip() for t in tech_stack]
    url = input("Project URL (or # if none): ")
    
    # Auto-assign Cyberpunk styling based on category
    styles = {}
    if category == "HR Analytics":
        styles = {"text": "text-neon-orange", "border": "hover:border-neon-orange/50", "pulse": "pulse-orange", "shadow": "hover:shadow-[0_0_30px_#FF6600_inset]", "line": "via-neon-orange"}
    elif category == "Automation":
        styles = {"text": "text-neon-red", "border": "hover:border-neon-red/50", "pulse": "pulse-red", "shadow": "hover:shadow-[0_0_30px_#FF003C_inset]", "line": "via-neon-red"}
    elif category == "BI & Dashboards":
        styles = {"text": "text-cyan", "border": "hover:border-cyan/50", "pulse": "pulse-cyan", "shadow": "hover:shadow-[0_0_30px_#00F0FF_inset]", "line": "via-cyan"}
    else:
        styles = {"text": "text-white", "border": "hover:border-white/50", "pulse": "pulse-white", "shadow": "hover:shadow-[0_0_30px_#FFFFFF_inset]", "line": "via-white"}

    print("\n>>> INPUT PARALLAX WINDOW DETAILS <<<")
    details = []
    for i in range(1, 4): 
        print(f"\n--- Segment 0{i} ---")
        subtitle = input("Subtitle (e.g., The Context) [Press Enter to finish]: ")
        if not subtitle: break
        content = input("Content: ")
        image = input("Image Filename in public folder (e.g., /my_chart.png) [Press Enter to use gradient]: ")
        
        detail = {"subtitle": subtitle, "content": content}
        if image:
            detail["image"] = image
        else:
            detail["gradient"] = "from-abyss via-white/5 to-abyss"
        details.append(detail)
        
    new_project = {
        "id": new_id,
        "title": title,
        "category": category,
        "styles": styles,
        "summary": summary,
        "techStack": tech_stack,
        "projectUrl": url,
        "details": details
    }
    
    projects.append(new_project)
    
    with open(PROJECTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=2)
        
    print(f"\n✅ SUCCESS: '{title}' injected into database. Your UI has hot-reloaded.")

if __name__ == "__main__":
    deploy_project()