# GymAdmin - Gym Management System

GymAdmin is a modern web application built with React and Laravel, designed for comprehensive gym management. It enables efficient management of members, classes, trainers, memberships, and generates insightful reports.

## 🚀 Key Features

- Member and membership management
- Class scheduling and control
- Trainer administration
- Reporting and analytics system
- Secure authentication with Laravel Sanctum
- Modern and responsive interface

## 🏗 Architecture and Design Patterns

### Frontend (React)

The application is structured following a modular architecture, with the following features:

#### Folder Structure

```
src/
├── core/               # Core application components and utilities
│   ├── components/     # Shared components
│   └── layouts/       # Main layouts
├── modules/           # Application modules
│   ├── auth/          # Authentication module
│   ├── classes/       # Classes module
│   ├── members/       # Members module
│   └── ...
└── shared/           # Shared utilities
    ├── services/     # Shared services
    └── types/        # Shared TypeScript types
```

#### Implemented Patterns

- **Module Pattern**: Independent module organization
- **Container/Presenter Pattern**: Separation of logic and presentation
- **Render Props & Composition**: For reusable components
- **Custom Hooks**: For reusable logic
- **Service Layer Pattern**: For backend communication

## 🛠 Technologies and Dependencies

### Frontend

- **React**: Main framework
- **TypeScript**: Static typing
- **TailwindCSS**: Styling framework
- **@tanstack/react-query**: Server state management and caching
- **@headlessui/react**: Accessible UI components
- **@heroicons/react**: SVG icons
- **axios**: HTTP client
- **react-router-dom**: Routing
- **clsx**: Conditional class utility

### Backend

- **Laravel**: PHP framework
- **Laravel Sanctum**: Authentication
- **MySQL**: Database
- See more [here](https://github.com/gualberto7/gym-management-api)

## 🚦 Development Status

The project is in active development, with the following features implemented:

- ✅ User authentication
- ✅ Base modular structure
- ✅ Responsive main layout
- ✅ Classes module
- 🚧 Members module (in development)
- 🚧 Trainers module (in development)
- 🚧 Reporting system (pending)

## 🔒 Security

- Cookie-based authentication with Laravel Sanctum
- CSRF protection
- Protected routes with AuthGuard
- Form validation
- Data sanitization

## 💻 Project Setup

### Prerequisites

- Node.js >= 16.0.0
- PHP >= 8.1
- Composer
- MySQL

### Installation

1. Clone the repository

```bash
git clone [repository-url]
```

2. Install frontend dependencies

```bash
cd react-app
npm install
```

3. Configure environment variables

```bash
cp .env.example .env
```

4. Start development server

```bash
npm run dev
```

## 🎨 Style Guide

The project uses TailwindCSS with a custom design system:

- Custom CSS variables for colors and themes
- Reusable components
- Responsive design
- Built-in accessibility

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 📞 Support

For support and questions, please open an issue in the repository.
