# React Code Editor

A modern, feature-rich code editor built with React, Monaco Editor, and TailwindCSS. This project provides a sleek and intuitive interface for writing and editing code with syntax highlighting and other advanced features.

## 🚀 Features

- Modern and responsive UI with dark mode support
- Syntax highlighting for multiple programming languages
- File management system
- Customizable editor settings
- Sidebar navigation with multiple tools
- Share and collaboration features
- Settings panel for customization

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Code Editor:** Monaco Editor (VS Code's editor)
- **Styling:** TailwindCSS
- **Build Tool:** Vite
- **Package Manager:** npm
- **HTTP Client:** Axios

## 📁 Project Structure

```
react-code-editor/
├── public/              # Static assets
├── src/                 # Source files
│   ├── components/      # React components
│   │   └── CodeEditor/  # Main code editor component
│   │   └── App.jsx         # Main application component
│   └── main.jsx        # Application entry point
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # TailwindCSS configuration
├── postcss.config.js   # PostCSS configuration
└── vite.config.js      # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/react-code-editor.git
   cd react-code-editor
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🎨 UI Components

The application features a modern UI with the following main components:

- **Header/Navbar:** Contains File, Settings, and Share buttons
- **Sidebar:** Navigation icons for various tools and features
- **Main Editor:** Monaco Editor instance with syntax highlighting
- **Settings Panel:** Customizable editor settings

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses ESLint for code linting. Run the linter with:

```bash
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
