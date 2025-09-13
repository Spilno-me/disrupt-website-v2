# Frontend Development Guide

Complete guide to the React frontend architecture, components, and development workflow for the Disrupt website.

## 🏗️ Architecture Overview

### Technology Stack
- **React 18** - Modern React with concurrent features
- **TypeScript** - Type-safe development 
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - High-quality, accessible component library
- **Zustand** - Lightweight state management
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation
- **Lucide React** - Beautiful icon library

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── forms/           # Form components
│   ├── layout/          # Layout components (Header, Footer)
│   ├── sections/        # Page sections (Hero, Features, Contact)
│   └── ui/              # ShadCN UI components
├── hooks/               # Custom React hooks
├── i18n/               # Internationalization system
├── pages/              # Page components
├── schemas/            # Zod validation schemas
├── services/           # API services
├── stores/             # Zustand state stores
├── utils/              # Utility functions
├── constants/          # Application constants
├── assets/             # Static assets (images, fonts)
├── App.tsx             # Root application component
├── main.tsx            # Application entry point
└── input.css           # Tailwind CSS entry
```

## 📚 Key Features

### Multi-language Support (5 Languages)
- English, Spanish, Italian, Arabic (RTL), French
- Zustand-powered state management with persistence
- Lazy loading of translation files
- Automatic RTL layout switching

### Modern Component Architecture  
- ShadCN UI components with Tailwind CSS
- Type-safe props with TypeScript
- Accessible design patterns
- Mobile-first responsive design

### Form Handling & Validation
- React Hook Form for performance
- Zod schema validation
- Multi-language error messages
- Real-time validation feedback