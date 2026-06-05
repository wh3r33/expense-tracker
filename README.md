# Personal Expense Tracker

A production-ready static web application for tracking personal expenses in the browser. It uses HTML5, CSS3, vanilla JavaScript, Chart.js, and localStorage only, so it can be deployed directly to GitHub Pages without a backend.

## Features

- Add, edit, and delete expenses without reloading the page.
- View total spending and category breakdowns.
- Filter data by Last Week, Last Month, or All Time.
- Responsive Chart.js pie chart by category.
- Export the current filtered view to CSV.
- Set category spending limits and see warning badges when limits are exceeded.
- Track expenses in KZT, USD, EUR, and RUB.
- Choose a base currency for summaries, category totals, limits, and charts.
- Upload a custom hero background image that stretches correctly with `background-size: cover`.
- Customize category emoji icons in a Notion-style settings panel.
- Switch between two themes: Soft and Night.
- Switch the interface language between English and Russian.
- Fullscreen welcome screen with live time, weekday, and a 10-second countdown on every page load.
- Fully client-side persistence with localStorage.
- Mobile-first responsive layout with accessible form labels, keyboard focus states, and semantic HTML.

## Project Structure

```text
/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
```

## Installation

No build step is required.

1. Clone or download this project.
2. Open `index.html` in a browser.

For local development with a static server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## GitHub Pages Deployment

1. Push the project files to a GitHub repository.
2. Open the repository settings.
3. Go to **Pages**.
4. Select the branch that contains `index.html`.
5. Select the root folder `/`.
6. Save the configuration.

GitHub Pages can serve this project directly because it is a static site.

## Screenshots

Add screenshots here after deployment or local testing.

Suggested screenshots:

- Welcome screen
- Expense dashboard
- Category limits
- Mobile layout

## localStorage

All expense data is stored as JSON in the browser using localStorage. No backend, database, API, or cloud storage is used.

Expense records use this structure:

```json
[
  {
    "id": "123",
    "category": "Food",
    "amount": 5000,
    "currency": "KZT",
    "date": "2026-06-05",
    "description": "Lunch"
  }
]
```

The application stores:

- Expenses
- Category spending limits, normalized internally to KZT so changing the base currency preserves the same real limit value
- Selected base currency
- Selected theme and language
- Custom category emoji icons
- Optional hero background image as a local data URL

Data persists after refreshes, browser restarts, and tab closing as long as the browser's localStorage is not cleared.

## CSV Export

The **Export CSV** button downloads the currently filtered expense list. The CSV includes these columns:

- Date
- Category
- Amount
- Currency
- Description

The file is generated locally in the browser with no server upload.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript ES6+
- Chart.js
- localStorage

## Notes

Currency conversion uses static rates in `script.js`:

- KZT: 1
- USD: 470 KZT
- EUR: 510 KZT
- RUB: 5.2 KZT

These rates are intentionally static to avoid external APIs.
