# 🔍 DeepRecon - Xplore AI OSINT Platform

![DeepRecon](https://img.shields.io/badge/DeepRecon-OSINT%20Platform-blue?style=for-the-badge&logo=search)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## 🚀 **Advanced OSINT Intelligence Platform**

DeepRecon is a comprehensive Open Source Intelligence (OSINT) platform powered by AI, featuring advanced reconnaissance tools including **Social Media Hunter** with Sherlock integration, URL analysis, subdomain enumeration, and much more.

### ✨ **Key Features**

#### 🎯 **Social Media Hunter (NEW!)**
- **Comprehensive Enumeration**: Powered by Sherlock methodology
- **15+ Platforms**: Twitter, Instagram, GitHub, LinkedIn, Reddit, YouTube, TikTok, and more
- **Professional Results**: Detailed analysis with confidence scoring
- **Privacy Assessment**: Risk scoring and exposure level detection
- **Interactive UI**: Working profile links and copy functionality

#### 🌐 **Multi-Domain Analysis**
- **URL/Website Analysis**: Comprehensive web intelligence
- **Subdomain Enumeration**: Discover hidden subdomains
- **IP Address Investigation**: Network reconnaissance
- **Email Intelligence**: Email verification and breach detection
- **Phone Number Analysis**: Telecom intelligence gathering

#### 🛡️ **Security Features**
- **Threat Intelligence**: Real-time malware and reputation scoring
- **Privacy Scoring**: Digital footprint assessment
- **Risk Assessment**: Automated security recommendations
- **Data Breach Detection**: Historical breach analysis

## 🛠️ **Technology Stack**

- **Frontend**: React 18 + TypeScript
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Styling**: Tailwind CSS + CSS Modules

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ and npm
- Git

### **Installation**

```bash
# Clone the repository
git clone https://github.com/Rithik-sharma12/Xplore-AI-OSINT.git

# Navigate to project directory
cd Xplore-AI-OSINT

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5173
```

### **Using Docker**

```bash
# Build Docker image
docker build -t deeprecon-osint .

# Run container
docker run -p 3000:3000 deeprecon-osint
```

## 📖 **Usage Guide**

### **Social Media Hunter**
1. Select "Social Media Hunter" from analysis types
2. Enter target username (e.g., "johndoe", "elonmusk")
3. Click "Analyze" for comprehensive enumeration
4. Review results with confidence scores and privacy assessment

### **URL Analysis**
1. Choose "URL/Website" analysis type
2. Enter target URL or domain
3. Get comprehensive web intelligence including:
   - SSL certificate analysis
   - Server information
   - Security headers
   - Technology stack detection

### **Subdomain Enumeration**
1. Select "Subdomain Enumeration"
2. Enter target domain
3. Discover active subdomains with detailed metrics

## 🏗️ **Architecture**

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── OSINTAnalyzer.tsx   # Main analyzer interface
│   ├── SocialMediaResults.tsx  # Social media results template
│   ├── URLAnalysisResults.tsx   # URL analysis results
│   └── SubdomainAnalysisResults.tsx
├── utils/
│   └── osintAnalyzer.ts    # Core analysis logic
├── types/
│   └── osint.ts           # TypeScript definitions
└── hooks/
    └── use-toast.ts       # Toast notifications
```

## 🔧 **Configuration**

### **Environment Variables**
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_ENABLE_DEBUG=true
```

### **API Integration**
The platform is designed to integrate with various OSINT APIs:
- VirusTotal API
- Shodan API
- Breach databases
- Social media APIs

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📋 **Roadmap**

- [ ] **Real Sherlock Integration**: Direct API calls to actual platforms
- [ ] **Machine Learning**: AI-powered pattern recognition
- [ ] **Dark Web Monitoring**: Deep web intelligence gathering
- [ ] **API Marketplace**: External intelligence source integration
- [ ] **Collaboration Tools**: Team-based investigations
- [ ] **Mobile App**: React Native mobile application
- [ ] **Enterprise Features**: Advanced reporting and analytics

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Sherlock Project**: Social media enumeration methodology
- **shadcn/ui**: Beautiful UI components
- **Lucide Icons**: Comprehensive icon library
- **Tailwind CSS**: Utility-first CSS framework

## ⚠️ **Disclaimer**

This tool is intended for legitimate security research and authorized penetration testing only. Users are responsible for complying with applicable laws and regulations. The authors assume no liability for misuse of this tool.

---

**Built with ❤️ for the OSINT community**

For questions, feature requests, or support, please [open an issue](https://github.com/Rithik-sharma12/Xplore-AI-OSINT/issues).
