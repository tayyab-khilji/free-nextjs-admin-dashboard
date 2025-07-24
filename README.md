# Simple NextJS Admin Dashboard

A clean and simple admin dashboard built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🔐 Simple authentication (no database required)
- 🌙 Dark/Light theme toggle
- 📱 Responsive design
- 🎨 Clean and modern UI
- ⚡ Fast and lightweight

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd free-nextjs-admin-dashboard
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Copy environment variables:
```bash
cp env.example .env
```

4. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Credentials

For testing the application, use these demo credentials:

- **Email:** admin@example.com
- **Password:** password

or

- **Email:** demo@example.com  
- **Password:** demo

## Project Structure

```
src/
├── app/                 # Next.js 13+ app directory
├── components/          # Reusable components
├── context/             # React contexts (Theme, Sidebar)
├── hooks/               # Custom React hooks
├── icons/               # SVG icons
├── layout/              # Layout components
└── lib/                 # Utilities and configurations
```

## Built With

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [React](https://reactjs.org/) - UI library

## Authentication

The application uses NextAuth.js with a simple credentials provider. No database is required for the demo version. In production, you should:

1. Set up a proper database
2. Implement secure password hashing
3. Add proper session management
4. Configure OAuth providers if needed

## Customization

### Themes
The app supports light and dark themes. Toggle between them using the theme switcher in the header.

### Layout
- Collapsible sidebar on desktop
- Mobile-responsive navigation
- Smooth transitions and animations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
