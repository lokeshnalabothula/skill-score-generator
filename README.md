# AI Resume Analyzer 🚀

An intelligent web application that analyzes resumes using advanced AI technology. Upload your resume, compare it against job requirements, and get instant insights on skill matching, experience analysis, and personalized improvement suggestions.

## ✨ Features

- **🤖 AI-Powered Analysis**: Uses Google Gemini AI for intelligent resume parsing and skill extraction
- **📊 Skill Matching**: Compares your skills against job requirements with detailed match percentage
- **📁 File Upload**: Drag-and-drop or browse to upload TXT resumes (PDF/DOCX parsing coming soon)
- **🎯 Smart Extraction**: Automatically identifies skills, experience, and education
- **💡 Personalized Suggestions**: Get actionable recommendations to improve your resume
- **📈 Visual Results**: Beautiful charts and progress indicators showing match scores
- **🎨 Modern UI**: Clean, professional design with smooth animations
- **📱 Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **🔒 Secure**: All processing happens through secure backend functions

## 🛠️ Technologies Used

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Backend (Lovable Cloud)
- **Supabase Edge Functions** - Serverless backend
- **Lovable AI Gateway** - AI model access (Google Gemini)
- **PostgreSQL** - Database (ready for future features)

### AI/NLP
- **Google Gemini 2.5 Flash** - Advanced language model for resume analysis
- Intelligent skill extraction and matching
- Contextual understanding of job requirements

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd ai-resume-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 📖 How It Works

1. **Upload Resume**: Drag and drop your resume (TXT format) or paste text directly
2. **Define Requirements**: Enter job requirements as comma-separated skills
3. **AI Analysis**: Click "Analyze Resume" - AI extracts and processes information
4. **View Results**: Get detailed insights including:
   - Overall match percentage
   - Matched skills (skills you have that match requirements)
   - Missing skills (required skills you should develop)
   - All extracted skills from your resume
   - Experience and education summaries
   - Personalized improvement suggestions

## 🎯 Use Cases

- **Job Seekers**: Optimize your resume for specific job postings
- **Career Development**: Identify skill gaps and areas for improvement
- **HR Professionals**: Quickly assess candidate resumes
- **Students**: Prepare better resumes for internships and entry-level positions
- **Career Coaches**: Provide data-driven resume feedback

## 📁 Project Structure

```
ai-resume-analyzer/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn UI components
│   │   ├── ResumeUploader.tsx   # File upload & input component
│   │   └── AnalysisResults.tsx  # Results display component
│   ├── pages/
│   │   └── Index.tsx        # Main application page
│   ├── integrations/
│   │   └── supabase/        # Backend client (auto-generated)
│   └── index.css            # Global styles & design system
├── supabase/
│   ├── functions/
│   │   └── analyze-resume/  # AI analysis edge function
│   └── config.toml          # Backend configuration
└── public/                  # Static assets
```

## 🔧 Configuration

The application uses Lovable Cloud (Supabase) for backend services:

- **Edge Functions**: Serverless functions for AI processing
- **AI Gateway**: Pre-configured access to Google Gemini

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
```

**How to get these values:**
1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to Settings → API
4. Copy the `URL` and `anon` `public` key

**Note**: The `LOVABLE_API_KEY` for the edge function should be set in your Supabase project dashboard under Edge Functions settings, not in the `.env` file.

## 🌟 Key Features Explained

### AI-Powered Resume Analysis
The application uses Google Gemini 2.5 Flash model to:
- Extract technical and soft skills
- Identify education details
- Summarize work experience
- Compare against job requirements
- Generate improvement suggestions

### Smart Skill Matching
- Calculates match percentage based on overlap
- Identifies skills you have vs. skills required
- Highlights missing critical skills
- Provides context-aware suggestions

### Professional UI/UX
- Gradient color scheme (professional blue theme)
- Smooth animations and transitions
- Progress indicators for loading states
- Responsive design for all devices
- Accessible components

## 🚧 Future Enhancements

- ✅ PDF and DOCX resume parsing
- ✅ Save analysis history
- ✅ Export results as PDF
- ✅ Multiple job requirement templates
- ✅ Resume builder integration
- ✅ Industry-specific skill databases
- ✅ Resume scoring algorithms
- ✅ Real-time collaborative editing

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - The AI-powered app builder
- Powered by [Google Gemini AI](https://deepmind.google/technologies/gemini/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📧 Contact & Support

For questions, feedback, or support:
- Open an issue in this repository
- Visit [Lovable Documentation](https://docs.lovable.dev/)

---

**Note**: This project demonstrates the integration of modern React development with AI capabilities. It's designed to be educational, practical, and easily extensible for real-world use cases.

## 🎓 Educational Value

This project demonstrates:
- ✅ **Full-stack development** with React and Serverless functions
- ✅ **AI/NLP integration** without complex setup
- ✅ **Modern DevOps** with automated deployment
- ✅ **Clean architecture** with separation of concerns
- ✅ **Professional UI/UX** design patterns
- ✅ **Type-safe development** with TypeScript
- ✅ **Responsive design** principles
- ✅ **Secure backend** implementation

Perfect for:
- Academic projects
- Portfolio demonstrations  
- Learning modern web development
- Understanding AI integration
- Practicing full-stack skills

---

Made with ❤️ using Lovable AI Platform