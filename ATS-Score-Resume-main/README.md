# ATS Resume Analyzer

A modern, interactive web application that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS). Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Multi-format Resume Upload** - Support for DOCX and TXT files
- **Job Description Analysis** - Paste or upload job descriptions
- **ATS Score Calculation** - Get a percentage match score
- **Keyword Analysis** - See which keywords match and which are missing
- **Skill Matching** - Compare technical and soft skills
- **Detailed Suggestions** - Get actionable improvement tips
- **Beautiful UI** - Modern, responsive design with animations
- **Dark/Light Mode** - Toggle between themes

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **File Parsing**: Mammoth.js (DOCX), native text parsing
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rahbarpathan/ATS-Score-Resume.git
   cd ATS-Score-Resume
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🎯 How to Use

1. **Upload Resume**: Drag and drop or select your resume file (DOCX or TXT)
2. **Add Job Description**: Paste the job description text or upload a file
3. **Analyze**: Click "Analyze Resume" to get your ATS score
4. **Review Results**: See detailed analysis including:
   - ATS Score with visual chart
   - Keyword matches and gaps
   - Skill analysis
   - Improvement suggestions
   - Resume structure analysis

## 📊 Analysis Features

### ATS Score
- Percentage-based match score
- Visual donut chart representation
- Score range indicators (Poor/Fair/Good)

### Keyword Analysis
- Found keywords with frequency counts
- Missing important keywords
- Keyword importance levels

### Skill Matching
- Technical skills comparison
- Soft skills analysis
- Match status indicators

### Suggestions
- Score-based improvement tips
- Missing keyword recommendations
- Resume structure suggestions
- Length and content optimization

## 🔧 Development

### Project Structure
```
src/
├── components/
│   ├── analyze/          # Analysis result components
│   ├── layout/           # Header and layout components
│   └── upload/           # File upload components
├── hooks/                # Custom React hooks
├── pages/                # Page components
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── App.tsx              # Main application component
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌟 Key Features

- **Client-side Processing** - All analysis happens in your browser for privacy
- **Real-time Analysis** - Instant results as you upload files
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Accessibility** - Built with accessibility in mind
- **Modern UI/UX** - Beautiful animations and interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for better ATS optimization tools
- Designed for job seekers worldwide

---

**Made with ❤️ for job seekers everywhere**
