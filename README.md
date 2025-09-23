# Project Template Setup with TanStack Table, TanStack React Query, JSON Server, and Shadcn/UI

This project is a modern React template that integrates key libraries for building data-rich applications:

- **TanStack Table** (formerly React Table): Headless UI for building powerful tables with sorting, pagination, filtering, infinite scroll, and virtualization
- **TanStack React Query**: Server state management for handling asynchronous operations, caching, and pagination
- **JSON Server**: Mock API server with built-in pagination, sorting, and filtering
- **Shadcn/UI**: Collection of accessible, styled React components that work seamlessly with TanStack Table

## Technology Stack

- React 18+
- TypeScript
- Vite (build tool)
- TanStack Table v8+
- TanStack React Query v4+
- JSON Server
- Shadcn/UI
- Tailwind CSS (for styling)

## Project Structure

```
project-template/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── UserTable.tsx
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   └── queryClient.ts
│   │   ├── hooks/
│   │   │   └── useUsers.ts
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
├── server/
│   ├── db.json
│   └── server.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies in the client directory:
   ```bash
   cd client
   npm install
   ```

2. Start the development server:
   ```bash
   cd client
   npm run dev
   ```

3. Start the JSON server:
   ```bash
   cd server
   node server.js
   ```

### Features

- Column sorting
- Global filtering
- Pagination
- Row selection
- Column visibility toggling
- Responsive design

## Available Scripts

In the client directory, you can run:

- `npm run dev`: Starts the development server
- `npm run build`: Builds the app for production
- `npm run preview`: Previews the built app

In the server directory, you can run:

- `node server.js`: Starts the JSON server

## Learn More

To learn more about the technologies used in this project:

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TanStack Table Documentation](https://tanstack.com/table)
- [TanStack React Query Documentation](https://tanstack.com/query)
- [JSON Server Documentation](https://github.com/typicode/json-server)
- [Shadcn/UI Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)