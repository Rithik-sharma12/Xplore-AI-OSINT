# 🔍 Enhanced DeepRecon OSINT Platform

![DeepRecon](https://img.shields.io/badge/DeepRecon-Enhanced%20OSINT%20Platform-blue?style=for-the-badge&logo=search)

## 🆕 New Features Added

### 🎯 Enhanced Analysis Types

1. **Social Media Enumeration** - Powered by Sherlock
   - Find usernames across 400+ social networks
   - Real-time verification of profile existence
   - Response time tracking
   - Comprehensive social footprint analysis

2. **Domain Intelligence** - Enhanced with WHOIS
   - Complete domain registration information
   - Registrar and contact details
   - Creation, expiration, and update dates
   - Name server information
   - Domain status tracking

3. **Phone Number Investigation** - Powered by Inspector
   - French phone number analysis
   - Social media account detection
   - Carrier information
   - Reputation analysis

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 16+ 
- Python 3.8+
- Git

### 1. Install Dependencies

```bash
# Frontend dependencies (React/Vite)
cd snapshot-web-app
npm install

# Backend API dependencies (Express/Node.js)
cd api
npm install

# Python dependencies for OSINT tools
pip install requests colorama phonenumbers tqdm bs4 trio httpx ignorant
```

### 2. Start the Services

```bash
# Terminal 1: Start the API server (Port 3001)
cd snapshot-web-app/api
npm start

# Terminal 2: Start the frontend (Port 8080)
cd snapshot-web-app
npm run dev
```

### 3. Access the Platform
- Frontend: http://localhost:8080
- API: http://localhost:3001

## 🔧 New Architecture

```
DeepRecon Platform
├── Frontend (React + Vite)
│   ├── OSINT Analyzer UI
│   ├── Results Dashboard
│   └── Analysis Components
├── Backend API (Express.js)
│   ├── Sherlock Integration
│   ├── WHOIS Integration
│   └── Inspector Integration
└── OSINT Tools
    ├── Sherlock (Social Media)
    ├── Inspector (Phone Analysis)
    └── WHOIS (Domain Intelligence)
```

## 📊 Analysis Types

| Type | Description | Tool Integration | Example Input |
|------|-------------|------------------|---------------|
| 🌐 URL/Website | Web analysis & security | Built-in | `https://example.com` |
| 🏢 Domain | Domain intelligence with WHOIS | WHOIS API | `example.com` |
| 🔍 Subdomain | Subdomain enumeration | Built-in | `example.com` |
| 🛡️ IP Address | Network reconnaissance | Built-in | `8.8.8.8` |
| 📧 Email | Email intelligence | Built-in | `user@domain.com` |
| 👤 Username | Basic username lookup | Built-in | `johndoe` |
| 👥 Social Media | Comprehensive social enumeration | **Sherlock** | `username123` |
| 📞 Phone | Phone number investigation | **Inspector** | `+33666666666` |
| 📡 MAC Address | MAC address lookup | Built-in | `00:1B:44:11:3A:B7` |
| 🔐 Hash | File hash analysis | Built-in | `5d41402abc4b...` |

## 🛠️ API Endpoints

### Sherlock Integration
```bash
POST /api/sherlock
{
  "username": "johndoe"
}
```

### WHOIS Integration
```bash
POST /api/whois  
{
  "domain": "example.com"
}
```

### Inspector Integration
```bash
POST /api/inspector
{
  "phone": "+33666666666"
}
```

## 🎨 Enhanced UI Components

- **SocialMediaEnumerationResults**: Dedicated component for Sherlock results
- **Enhanced OSINTAnalyzer**: Updated with new analysis types
- **Real-time Analysis**: Live progress tracking
- **Interactive Results**: Clickable links and detailed breakdowns

## 🔒 Security Features

- API rate limiting
- Input validation and sanitization
- Secure command execution
- Error handling and fallbacks
- CORS protection

## 🐛 Troubleshooting

### Common Issues

1. **Python Dependencies Missing**
   ```bash
   pip install -r requirements.txt
   ```

2. **API Server Not Starting**
   - Check if port 3001 is available
   - Verify Python tools are accessible

3. **Sherlock Not Found**
   - Ensure Sherlock is in `referance/sherlock/` directory
   - Check Python path in API server

4. **Inspector Errors**
   - Verify Inspector is in `referance/Inspector/core/` directory
   - Install Inspector dependencies

## 📈 Performance Optimizations

- Concurrent API calls
- Response caching
- Optimized UI rendering  
- Background processing
- Timeout handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Sherlock Project** - Social media enumeration tool
- **Inspector** - Phone number investigation tool
- **WHOIS Libraries** - Domain intelligence
- **React + Vite** - Frontend framework
- **Express.js** - Backend API framework

---

*Built with ❤️ for the OSINT community*