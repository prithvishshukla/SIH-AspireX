# AyurSutra - Panchakarma Management System

A comprehensive web application for managing Ayurvedic Panchakarma therapies, built with React, TypeScript, and Tailwind CSS. This system provides role-based dashboards for patients, practitioners, and administrators to streamline therapy scheduling, progress tracking, and wellness management.

## 🌿 About

AyurSutra is designed to digitize and simplify the management of Panchakarma treatments - one of the most important therapeutic procedures in Ayurveda. The platform offers:

- **Smart Scheduling** - Efficient appointment booking and management
- **Progress Tracking** - Monitor patient wellness and therapy outcomes  
- **Care Guidance** - Evidence-based recommendations and insights
- **Multi-Role Support** - Tailored experiences for patients, practitioners, and admins

## 🚀 Features

### For Patients
- View and book therapy appointments
- Track wellness progress and goals
- Access personalized care recommendations
- Monitor therapy schedules and history

### For Practitioners  
- Manage patient appointments and schedules
- Track patient progress across sessions
- Access patient health metrics and analytics
- Coordinate with other practitioners

### For Administrators
- Oversee entire clinic operations
- Generate analytics and reports
- Manage user accounts and permissions
- Monitor system activities and audit trails

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Backend**: Python CGI (for prototype)
- **Data Storage**: JSON files (prototype only)
- **Styling**: Tailwind CSS with custom gradient themes

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── Analytics.tsx    # Analytics dashboard
│   │   ├── Dashboard.tsx    # Main dashboard
│   │   ├── Header.tsx       # Navigation header
│   │   ├── HeroSection.tsx  # Landing page
│   │   ├── Login.tsx        # Authentication
│   │   ├── NotificationCenter.tsx
│   │   ├── PatientTracking.tsx
│   │   ├── TherapyScheduling.tsx
│   │   └── UserProfile.tsx
│   ├── lib/
│   │   └── storage.ts       # Local storage utilities
│   ├── services/
│   │   └── bookings.ts      # Booking services
│   └── types/
│       └── app.ts           # TypeScript type definitions
├── cgi-bin/                 # Python backend (prototype)
│   ├── api.py              # Main API endpoints
│   └── safe_io.py          # Safe file I/O utilities
├── data/                    # JSON data storage (prototype)
│   ├── appointments.json
│   ├── users.json
│   ├── admin_actions.json
│   └── audit_log.json
├── frontend/               # Static HTML pages
│   ├── dashboard.html
│   └── login.html
└── tests/                  # Test files
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Python 3.x (for backend prototype)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open your browser to `http://localhost:5173`
   - The main React application will be available

### Alternative: Prototype Demo with Backend

For full functionality including data persistence:

1. **Start Python CGI server**
   ```bash
   python -m http.server --cgi 8000
   ```

2. **Access static prototype**
   - Login page: `http://localhost:8000/frontend/login.html`
   - Dashboard: `http://localhost:8000/frontend/dashboard.html`

## 🔐 Demo Credentials

**⚠️ Prototype Only - Not for Production Use**

The system includes seeded demo users for testing:

- **Admin**: Phone: `9990001111`, Password: `admin123`
- **Practitioner**: Phone: `9990002222`, Password: `pract123`  
- **Patient**: Phone: `9990003333`, Password: `patient123`

*All demo accounts have DOB: 2007-09-06*

## 🏗 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 UI/UX Design

The application features a modern, clean design with:

- **Color Scheme**: Emerald and teal gradients reflecting nature and wellness
- **Typography**: Clean, readable fonts with proper hierarchy
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Proper contrast ratios and semantic HTML
- **Icons**: Lucide React for consistent iconography

## 🔧 Configuration

### Tailwind CSS
Configured with custom colors and utilities for the Ayurvedic theme.

### TypeScript
Strict type checking enabled with proper configurations for React and Vite.

### ESLint
Modern ESLint configuration with React and TypeScript support.

## 📊 Data Management

### Current Implementation (Prototype)
- JSON file-based storage in `/data` directory
- Simple Python CGI for API endpoints
- Client-side authentication (demo only)

### Production Considerations
- Replace JSON storage with proper database (PostgreSQL/MongoDB)
- Implement secure authentication and authorization
- Add API rate limiting and security middleware
- Encrypt sensitive health data
- Add data backup and recovery systems

## 🔒 Security Notice

**⚠️ IMPORTANT**: This is a prototype system with no production-grade security:

- Passwords stored in plain text
- No encryption for sensitive data
- Client-side only authentication
- No API security measures

**DO NOT USE IN PRODUCTION** without implementing proper security measures.

## 🧪 Testing

Run the test suite:

```bash
python tests/test_prototype.py
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@ayursutra.com or create an issue in the repository.

## 🗺 Roadmap

- [ ] Production-ready authentication system
- [ ] Database integration (PostgreSQL)
- [ ] Advanced analytics and reporting
- [ ] Mobile app development
- [ ] Integration with medical devices
- [ ] Telemedicine capabilities
- [ ] Multi-language support
- [ ] Insurance integration

---

*AyurSutra - Bridging ancient Ayurvedic wisdom with modern technology for better health outcomes.*
