"""
AI-Powered Resume Analyzer - Flask Backend
Uses spaCy for NLP-based resume analysis
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import spacy
import re
from typing import List, Dict, Any
import base64
from io import BytesIO
try:
    from PyPDF2 import PdfReader
    PDF_SUPPORT = True
except ImportError:
    try:
        from pypdf2 import PdfReader
        PDF_SUPPORT = True
    except ImportError:
        PDF_SUPPORT = False

app = Flask(__name__, static_folder='static')
CORS(app)  # Enable CORS for frontend access

# Load spaCy model (English)
try:
    nlp = spacy.load("en_core_web_sm")
    print("✓ spaCy model loaded successfully")
except OSError:
    print("⚠️ spaCy model not found. Please install: python -m spacy download en_core_web_sm")
    nlp = None

# Common skills database for matching
COMMON_SKILLS = {
    'technical': [
        'python', 'java', 'javascript', 'react', 'node.js', 'sql', 'mongodb',
        'docker', 'kubernetes', 'aws', 'git', 'linux', 'html', 'css',
        'typescript', 'angular', 'vue', 'django', 'flask', 'spring',
        'machine learning', 'data science', 'tensorflow', 'pytorch',
        'rest api', 'graphql', 'microservices', 'ci/cd'
    ],
    'soft': [
        'leadership', 'communication', 'teamwork', 'problem-solving',
        'time management', 'adaptability', 'creativity', 'critical thinking',
        'project management', 'collaboration', 'negotiation', 'presentation'
    ]
}


def extract_skills(text: str) -> List[str]:
    """
    Extract skills from resume text using spaCy NLP
    """
    if not nlp:
        # Fallback: simple keyword extraction if spaCy not available
        text_lower = text.lower()
        found_skills = []
        all_skills = COMMON_SKILLS['technical'] + COMMON_SKILLS['soft']
        
        for skill in all_skills:
            if skill.lower() in text_lower:
                found_skills.append(skill)
        return found_skills
    
    doc = nlp(text.lower())
    skills = []
    
    # Extract technical skills (common tech terms)
    tech_patterns = [
        r'\b(python|java|javascript|react|node\.?js?|sql|mongodb|docker|kubernetes|aws|git|linux)\b',
        r'\b(html|css|typescript|angular|vue|django|flask|spring)\b',
        r'\b(machine learning|data science|tensorflow|pytorch)\b',
        r'\b(rest api|graphql|microservices|ci/cd)\b'
    ]
    
    for pattern in tech_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        skills.extend([m if isinstance(m, str) else m[0] for m in matches])
    
    # Extract entities that might be skills (ORG, PRODUCT entities)
    for ent in doc.ents:
        if ent.label_ in ['ORG', 'PRODUCT']:
            if len(ent.text.split()) <= 2:  # Short entity likely to be a skill
                skills.append(ent.text)
    
    # Extract soft skills using keyword matching
    soft_skills_text = ' '.join(COMMON_SKILLS['soft'])
    for skill in COMMON_SKILLS['soft']:
        if skill.lower() in text.lower():
            skills.append(skill)
    
    # Remove duplicates and normalize
    skills = list(set([s.strip().title() for s in skills if s.strip()]))
    return skills


def extract_experience(text: str) -> str:
    """
    Extract work experience summary using NLP
    """
    if not nlp:
        # Simple extraction if spaCy not available
        lines = text.split('\n')
        experience_lines = []
        for line in lines:
            if any(word in line.lower() for word in ['experience', 'work', 'employment', 'position', 'role']):
                experience_lines.append(line.strip())
        return ' '.join(experience_lines[:3]) if experience_lines else "Experience details found in resume"
    
    doc = nlp(text)
    
    # Find sentences with experience-related keywords
    exp_sentences = []
    keywords = ['experience', 'worked', 'position', 'role', 'responsibility', 'achieved', 'developed']
    
    for sent in doc.sents:
        if any(keyword in sent.text.lower() for keyword in keywords):
            exp_sentences.append(sent.text.strip())
    
    return '. '.join(exp_sentences[:3]) if exp_sentences else "Work experience details found in resume"


def extract_education(text: str) -> str:
    """
    Extract education details using NLP
    """
    if not nlp:
        # Simple extraction
        lines = text.split('\n')
        education_lines = []
        for line in lines:
            if any(word in line.lower() for word in ['education', 'degree', 'bachelor', 'master', 'phd', 'university', 'college']):
                education_lines.append(line.strip())
        return ' '.join(education_lines[:2]) if education_lines else "Education details found in resume"
    
    doc = nlp(text)
    
    # Find education-related sentences
    edu_sentences = []
    keywords = ['education', 'degree', 'bachelor', 'master', 'phd', 'university', 'college', 'diploma']
    
    for sent in doc.sents:
        if any(keyword in sent.text.lower() for keyword in keywords):
            edu_sentences.append(sent.text.strip())
    
    return '. '.join(edu_sentences[:2]) if edu_sentences else "Education details found in resume"


def calculate_match_percentage(resume_skills: List[str], required_skills: List[str]) -> float:
    """
    Calculate skill match percentage
    """
    if not required_skills:
        return 0.0
    
    # Normalize skills for comparison
    resume_skills_normalized = [s.lower().strip() for s in resume_skills]
    required_skills_normalized = [s.lower().strip() for s in required_skills]
    
    # Find matches (fuzzy matching for similar skills)
    matched = 0
    for req_skill in required_skills_normalized:
        # Exact match
        if req_skill in resume_skills_normalized:
            matched += 1
        # Partial match (skill contains or is contained)
        else:
            for res_skill in resume_skills_normalized:
                if req_skill in res_skill or res_skill in req_skill:
                    matched += 1
                    break
    
    percentage = (matched / len(required_skills_normalized)) * 100
    return round(percentage, 2)


def generate_suggestions(resume_skills: List[str], required_skills: List[str], match_percentage: float) -> List[str]:
    """
    Generate improvement suggestions based on skill gaps
    """
    suggestions = []
    
    resume_skills_lower = [s.lower() for s in resume_skills]
    missing_skills = [skill for skill in required_skills if skill.lower() not in resume_skills_lower]
    
    if match_percentage < 60:
        suggestions.append("Consider developing more skills that match the job requirements.")
    
    if missing_skills:
        suggestions.append(f"Focus on learning: {', '.join(missing_skills[:3])}")
    
    if match_percentage >= 80:
        suggestions.append("Great match! Highlight your relevant skills more prominently.")
    elif match_percentage >= 60:
        suggestions.append("Good match. Consider adding a few more relevant skills to strengthen your profile.")
    else:
        suggestions.append("Consider taking courses or projects in the missing skill areas.")
    
    suggestions.append("Ensure all relevant skills are clearly mentioned in your resume.")
    suggestions.append("Quantify your achievements and experience for better impact.")
    
    return suggestions[:5]  # Return top 5 suggestions


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'spacy_loaded': nlp is not None,
        'pdf_support': PDF_SUPPORT,
        'message': 'AI-Powered Resume Analyzer API is running'
    })


@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file upload and extract text"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        filename = file.filename.lower()
        
        # Handle TXT files
        if filename.endswith('.txt'):
            text = file.read().decode('utf-8')
            return jsonify({'text': text, 'status': 'success'}), 200
        
        # Handle PDF files
        elif filename.endswith('.pdf'):
            if not PDF_SUPPORT:
                return jsonify({'error': 'PDF support not available. Install pypdf2: pip3 install pypdf2'}), 400
            
            try:
                pdf_file = BytesIO(file.read())
                reader = PdfReader(pdf_file)
                text = ''
                for page in reader.pages:
                    text += page.extract_text() + '\n'
                return jsonify({'text': text, 'status': 'success'}), 200
            except Exception as e:
                return jsonify({'error': f'Error reading PDF: {str(e)}'}), 400
        
        # Handle DOC/DOCX (not supported yet)
        elif filename.endswith('.doc') or filename.endswith('.docx'):
            return jsonify({
                'error': 'Word documents require additional libraries. Please convert to TXT or copy text and paste.',
                'suggestion': 'Open the document, copy all text, and paste it in the text area.'
            }), 400
        
        else:
            return jsonify({'error': 'Unsupported file type. Please use TXT or PDF.'}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/analyze', methods=['POST'])
def analyze_resume():
    """
    Main endpoint for resume analysis
    Expects JSON: { "resumeText": "...", "jobRequirements": "skill1, skill2, ..." }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        resume_text = data.get('resumeText', '')
        job_requirements_str = data.get('jobRequirements', '')
        
        if not resume_text:
            return jsonify({'error': 'Resume text is required'}), 400
        
        # Parse job requirements
        required_skills = [s.strip() for s in job_requirements_str.split(',') if s.strip()]
        
        # Extract information using NLP
        extracted_skills = extract_skills(resume_text)
        experience_summary = extract_experience(resume_text)
        education_summary = extract_education(resume_text)
        
        # Find matched and missing skills
        resume_skills_lower = [s.lower() for s in extracted_skills]
        matched_skills = []
        missing_skills = []
        
        for req_skill in required_skills:
            req_skill_lower = req_skill.lower()
            if req_skill_lower in resume_skills_lower:
                # Find the exact match from extracted skills
                for skill in extracted_skills:
                    if skill.lower() == req_skill_lower:
                        matched_skills.append(skill)
                        break
            else:
                # Check for partial matches
                found = False
                for skill in extracted_skills:
                    if req_skill_lower in skill.lower() or skill.lower() in req_skill_lower:
                        matched_skills.append(skill)
                        found = True
                        break
                if not found:
                    missing_skills.append(req_skill)
        
        # Calculate match percentage
        match_percentage = calculate_match_percentage(extracted_skills, required_skills)
        
        # Generate suggestions
        suggestions = generate_suggestions(extracted_skills, required_skills, match_percentage)
        
        # Return analysis results
        result = {
            'extractedSkills': extracted_skills,
            'matchedSkills': list(set(matched_skills)),
            'missingSkills': missing_skills,
            'matchPercentage': match_percentage,
            'suggestions': suggestions,
            'experienceSummary': experience_summary,
            'educationSummary': education_summary
        }
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/', methods=['GET'])
def index():
    """Serve the web interface"""
    return send_from_directory('static', 'index.html')


@app.route('/api/info', methods=['GET'])
def api_info():
    """API info endpoint"""
    return jsonify({
        'name': 'AI-Powered Resume Analyzer',
        'version': '1.0.0',
        'description': 'Flask + spaCy NLP-based resume analysis API',
        'endpoints': {
            '/health': 'GET - Health check',
            '/analyze': 'POST - Analyze resume',
            '/': 'GET - Web interface',
            '/api/info': 'GET - API information'
        }
    })


if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5001))  # Use 5001 as default (5000 often used by AirPlay on macOS)
    app.run(host='0.0.0.0', port=port, debug=True)

