import PyPDF2
import json

def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text() + "\n"
    return text

def extract_projects(resume_text):
    # Look for project sections in the resume
    projects = []
    
    # Split the text into sections
    sections = resume_text.split('\n\n')
    
    current_project = None
    
    for section in sections:
        lines = [line.strip() for line in section.split('\n') if line.strip()]
        if not lines:
            continue
            
        # Look for project titles (usually in all caps or followed by a colon)
        if any(word in lines[0].lower() for word in ['project', 'experience', 'work']) or ':' in lines[0]:
            if current_project:
                projects.append(current_project)
            current_project = {
                'title': lines[0].split(':')[0].strip(),
                'description': ' '.join(lines[1:]) if len(lines) > 1 else '',
                'technologies': []
            }
        elif current_project:
            # Add to current project description
            current_project['description'] += ' ' + ' '.join(lines)
    
    if current_project:
        projects.append(current_project)
    
    return projects

# Path to the resume PDF
pdf_path = r'd:\Projects\React\protfolio-best-react\Gourav-Barnwal-Resume.pdf'

# Extract text from PDF
try:
    resume_text = extract_text_from_pdf(pdf_path)
    projects = extract_projects(resume_text)
    
    # Print the extracted projects
    print("Extracted Projects:")
    for i, project in enumerate(projects, 1):
        print(f"\nProject {i}:")
        print(f"Title: {project['title']}")
        print(f"Description: {project['description']}")
        
except Exception as e:
    print(f"Error processing PDF: {str(e)}")
