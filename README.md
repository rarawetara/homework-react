# User Management System

A modern CRUD application built with React, TypeScript, and Vite that allows users to manage a list of users with advanced features like filtering, sorting, and color customization.

## Features

- **CRUD Operations**
  - Create new users
  - Read user data from API
  - Update existing user information
  - Delete users

- **Advanced Features**
  - Filter users by search term
  - Filter users by marital status
  - Sort users by name, username, or email
  - Change card color

## Tech Stack

- **Frontend**
  - React 19
  - TypeScript
  - Vite
  - Styled Components
  - Zustand (State Management)

- **Data Management**
  - Axios for API requests
  - React Query

## Project Structure

```
src/
├── components/        # UI Components
├── services/          # API Services
├── store/             # Zustand Store
├── styles/            # Global and Shared Styles
├── types/             # TypeScript Type Definitions
├── App.tsx            # Main App Component
└── main.tsx           # Entry Point
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd user-management-system
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## API Used

The application uses the following API endpoint for data management:
- `https://68139f6c129f6313e211e01d.mockapi.io/Homework3`

## Build for Production

```bash
npm run build
```

## License

MIT
# homework-react
