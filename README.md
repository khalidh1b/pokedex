## Pokedex

## 🌟 Overview

Pokedex is a web application that allows users to search, filter, and explore Pokémon with detailed information, including types, abilities, and official artwork. It provides an intuitive UI with smooth animations and a responsive design.

## 🚀 Features

🔍 Search for any Pokémon by name or type

🎨 View Pokémon details, including images, abilities, and base stats

📋 Filter Pokémon by type using a sliding filter panel

🔄 Real-time data fetching from the PokéAPI

⚡ Optimized performance with efficient state management

🌙 Dark mode support (if applicable)

## 🛠️ Tech Stack

Frontend: React, TypeScript, Tailwind CSS

State Management: React Context API

Animations: Framer Motion

Data Source: PokéAPI

📂 Folder Structure

```js
📦 pokedex
├── 📂 public          # Static assets (favicons, images, etc.)
├── 📂 src             # Main source code
│   ├── 📂 components  # Reusable UI components (Card, Header, etc.)
│   ├── 📂 context     # React Context API for state management
│   ├── 📂 hooks       # Custom hooks (e.g., useSearchPokemon)
│   ├── 📂 layout      # Layout of the application
│   ├── 📂 routes      # Routes for all routing
│   ├── 📂 utils       # Utility functions and helpers
│   ├── App.tsx       # Main application component
│   ├── main.tsx      # Entry point
│   ├── types.ts      # TypeScript interfaces and types
├── 📜 package.json    # Project dependencies and scripts
├── 📜 README.md       # Project documentation
├── 📜 tsconfig.json   # TypeScript configuration
└── 📜 .gitignore      # Files to ignore in Git
```

## 📦 Installation

```bash
Clone the repository:

git clone https://github.com/iamkhalidhussein/pokedex.git
cd pokedex

Install dependencies:

pnpm install

Run the development server:

pnpm run dev
```

Open in browser:
Visit http://localhost:5173 to see the app in action.

## 🎮 Usage

Use the search bar to find Pokémon by name.

Click on a Pokémon card to view more details.

Click the Filter button to open a side panel and refine your search by type.

## 📜 License

This project is open-source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the app, follow these steps:

Fork the repository

Create a new branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add new feature')

Push to the branch (git push origin feature-name)

Open a Pull Request

## 📬 Contact

For any questions or suggestions, feel free to reach out:

```bash
📧 Email: [mdkhalidhossen10@gmail.com]

🐦 Twitter: @yourhandle

Made with ❤️ by Khalid
```