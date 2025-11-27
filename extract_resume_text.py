import PyPDF2

def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text += page.extract_text()
    return text

# Path to the resume PDF
pdf_path = r'd:\\Projects\\React\\protfolio-best-react\\Gourav-Barnwal-Resume.pdf'

# Extract and print text
try:
    resume_text = extract_text_from_pdf(pdf_path)
    print("Resume Content:")
    print("-" * 50)
    print(resume_text[:2000])  # Print first 2000 characters
    print("-" * 50)
    print("\nTotal characters:", len(resume_text))
    
    # Save to a text file for easier review
    with open('resume_content.txt', 'w', encoding='utf-8') as f:
        f.write(resume_text)
    print("\nFull resume content saved to 'resume_content.txt'")
    
except Exception as e:
    print(f"Error: {str(e)}")
