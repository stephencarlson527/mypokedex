# MyPokedex

Welcome to **MyPokedex**, a simple and interactive web application designed to help users explore and learn about Pokémon! Built with [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), and [PokéAPI](https://pokeapi.co/), MyPokedex provides a user-friendly interface to search for Pokémon, view detailed information, and organize your favorite Pokémon. 

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Demo

Check out the live demo here: [MyPokedex Demo](https://mypokedex-bice.vercel.app/)  

## Features

- **Search & Filter**: Quickly search Pokémon by name or ID and filter through generations. - Deployed
- **Pokémon Details**: View detailed stats, abilities, and types for each Pokémon. - Deployed
- **Favorites**: Add Pokémon to your favorites list for easy access. ( In progress )
- **Lazy Loading**: Efficient image loading for smooth performance. ( In QA, Skeleton loading component most recently deployed for demo )
- **Responsive Design**: Optimized for both desktop and mobile devices ( In progress )

## Technologies Used

- **NextJS/React**: Component-based architecture for building user interfaces. Deployed via Vercel
- **TypeScript**: Ensures type safety and improved developer experience.
- **PokéAPI**: Retrieves data on all known Pokémon, abilities, types, and stats.
- **CSS / Styled Components/ Tailwind**: Custom styling for a visually appealing and consistent layout.

## Installation

To set up this project locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mypokedex.git
   cd mypokedex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```

4. **Open in Browser**
   Visit `http://localhost:3000` to view the app in your browser.

## Usage

1. **Search for Pokémon**: Type a Pokémon’s name or ID in the search bar to find specific Pokémon.
2. **Explore Details**: Click on a Pokémon to view its abilities, stats, and other information.
3. **Add to Favorites**: Mark Pokémon as favorites to save them for easy access later.

## Project Structure

Here's a quick overview of the project structure:

```
MyPokedex/
├── public/                  # Public assets, including images and icons
├── src/
│   ├── components/          # Reusable components (e.g., SearchBar, PokemonCard)
│   ├── pages/               # Pages (e.g., Home, PokemonDetail)
│   ├── services/            # API service files
│   ├── utils/               # Utility functions
│   └── App.tsx              # Main app component
└── README.md                # Project README
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork** the repository
2. **Clone** your fork locally
3. Create a **new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/my-new-feature
   ```
4. **Commit** your changes and push to your fork:
   ```bash
   git push origin feature/my-new-feature
   ```
5. **Create a Pull Request** to the main repository

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
