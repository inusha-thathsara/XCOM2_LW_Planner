
# XCOM2 Long War 2 Squad Planner

>A modern web app for planning, building, and managing squads for the Long War 2 mod in XCOM 2. Create squads, assign soldiers, plan missions, and optimize your strategy with class stats, mission recommendations, and export features.

## Features

- **Squad Builder:** Create and customize squads with unique names and rosters.
- **Soldier Management:** Add, edit, and remove soldiers with detailed stats and classes.
- **Mission Planner:** Assign squads to missions, set infiltration, threat levels, and notes.
- **Class Overview:** View all available soldier classes and their abilities.
- **Squad Statistics:** Analyze squad health, aim, mobility, will, and class distribution.
- **Export:** Download your squad data for backup or sharing.
- **Persistent Storage:** All data is saved in your browser (localStorage).
- **Responsive UI:** Works great on desktop and mobile.

## Demo

Once deployed, the app will be available at: [https://inusha-thathsara.github.io/XCOM2_LW_Planner/](https://inusha-thathsara.github.io/XCOM2_LW_Planner/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
	```sh
	git clone https://github.com/inusha-thathsara/XCOM2_LW_Planner.git
	cd XCOM2_LW_Planner
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Start the development server:
	```sh
	npm run dev
	```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- **Dashboard:** View recent squads, quick actions, available classes, and tips.
- **Squad Builder:** Create new squads and add soldiers with custom stats and classes.
- **Mission Planner:** Assign squads to missions, set infiltration %, threat level, and notes.
- **Squad Overview:** Analyze squad stats, class distribution, and manage members.
- **Export:** Download your squad data as a file for backup or sharing.

## Deployment (GitHub Pages)

1. Build the app for production:
	```sh
	npm run build
	```
2. Deploy the `dist` folder to the `gh-pages` branch. You can use the [gh-pages](https://www.npmjs.com/package/gh-pages) package or manual steps:
	```sh
	npm install --save-dev gh-pages
	npm run build
	npx gh-pages -d dist
	```
	Or manually copy the contents of `dist` to the `gh-pages` branch and push.

3. In your GitHub repository settings, set GitHub Pages to serve from the `gh-pages` branch (root or `/` folder).

### Vite Config for GitHub Pages

Ensure your `vite.config.ts` has the correct base path:

```ts
// vite.config.ts
export default defineConfig({
  base: '/XCOM2_LW_Planner/',
  // ...other config
});
```

## Contributing

Contributions are welcome! Please open issues or pull requests for new features, bug fixes, or suggestions.

## License

MIT

---
Inspired by XCOM 2: Long War 2. This project is not affiliated with Firaxis or 2K Games.
