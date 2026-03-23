# FoodDB — Local Deployment Guide

This guide covers running the full FoodDB stack locally on your machine (macOS, Linux, or Windows WSL).

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Your Machine                            │
│                                                             │
│  ┌──────────────────┐    ┌──────────────────────────────┐  │
│  │  FoodDB PWA      │    │  MCP Server                  │  │
│  │  (React + Vite)  │    │  (Node.js stdio)             │  │
│  │  Port 4000       │    │  sg_my_fooddb/mcp-server/    │  │
│  └────────┬─────────┘    └──────────────┬───────────────┘  │
│           │                             │                   │
│           │ proxies                     │ reads             │
│           ▼                             ▼                   │
│  ┌──────────────────┐    ┌──────────────────────────────┐  │
│  │  HPB SG FoodID   │    │  Local JSON data files       │  │
│  │  API (internet)  │    │  sg_my_fooddb/data/          │  │
│  └──────────────────┘    └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | ≥ 18 | https://nodejs.org |
| pnpm | ≥ 8 | `npm install -g pnpm` |
| Python | ≥ 3.9 | https://python.org (for scraper only) |
| Git | any | https://git-scm.com |

---

## Part 1 — FoodDB PWA App Server

### 1. Clone the repository

```bash
git clone https://github.com/nuvear/sg_my_fooddb.git
cd sg_my_fooddb
```

The PWA source is in the `fooddb-pwa/` subdirectory (or clone it separately if provided as a separate repo).

### 2. Install dependencies

```bash
cd fooddb-pwa
pnpm install
```

### 3a. Development mode (hot reload)

```bash
pnpm dev
```

Opens at **http://localhost:5173**

> In development mode, the Vite dev server runs. The app fetches food data from the CDN-hosted JSON files and uses a CORS proxy for live HPB API queries.

### 3b. Production mode (local server with API proxy)

Build the app first:

```bash
pnpm build
```

Then start the local server:

```bash
node local-server/server.mjs
```

Opens at **http://localhost:4000**

> In production mode, the local server proxies all HPB API calls server-side, eliminating CORS issues entirely.

### 4. Environment variables (optional)

Create a `.env.local` file in `fooddb-pwa/`:

```env
# Override the local server port (default: 4000)
PORT=4000

# Point the app to use the local proxy instead of CORS proxy
VITE_API_BASE=http://localhost:4000/api/hpb
VITE_LOCAL_DATA=http://localhost:4000/api/local
```

---

## Part 2 — MCP Server

The MCP (Model Context Protocol) server exposes the SG/MY food database to AI assistants like Claude Desktop, Cursor, or any MCP-compatible client.

### 1. Navigate to the MCP server directory

```bash
cd sg_my_fooddb/mcp-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build

```bash
npm run build
```

### 4. Configure your MCP client

#### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

```json
{
  "mcpServers": {
    "fooddb": {
      "command": "node",
      "args": ["/absolute/path/to/sg_my_fooddb/mcp-server/dist/index.js"],
      "env": {
        "FOODDB_DATA_DIR": "/absolute/path/to/sg_my_fooddb/data"
      }
    }
  }
}
```

#### Cursor / VS Code (MCP extension)

Add to your MCP settings:

```json
{
  "name": "fooddb",
  "command": "node",
  "args": ["/absolute/path/to/sg_my_fooddb/mcp-server/dist/index.js"],
  "env": {
    "FOODDB_DATA_DIR": "/absolute/path/to/sg_my_fooddb/data"
  }
}
```

### 5. Available MCP Tools

| Tool | Description |
|------|-------------|
| `search_foods` | Search by name, food group, or keyword |
| `get_food_detail` | Get full 41-nutrient profile by crId |
| `list_food_groups` | List all food group categories |
| `get_foods_by_group` | Get all foods in a specific group |
| `calculate_nutrients` | Scale nutrients to a custom weight |
| `compare_foods` | Compare nutrients across multiple foods |
| `get_database_stats` | Summary statistics of the database |

---

## Part 3 — Scraping the Full SG FoodID Database

The scraper fetches all 2,557 foods from the HPB SG FoodID API.

### Run the scraper

```bash
cd sg_my_fooddb
pip3 install requests
python3 scraper/scrape_fast.py
```

This will:
1. Fetch all 103 list pages (2,557 foods)
2. Fetch detailed nutritional data for each food (8 parallel threads)
3. Save progress every 25 items to `data/progress_generic.json`
4. Output final data to `data/sgfoodid_generic.json`

**Estimated time:** 15–25 minutes (depends on network speed)

### Resume interrupted scraping

The scraper automatically resumes from where it left off — just re-run the same command.

---

## Part 4 — Uploading Your Own CSV Data

### Single CSV file

1. Open the app at http://localhost:4000
2. Click **Upload** in the sidebar
3. Drag & drop a `.csv` file or click Browse
4. Review the parsed nutrients in the preview
5. Click **Save to My DB**

### ZIP file with multiple CSVs

Same process — drag & drop a `.zip` file containing multiple CSV files.

### CSV format

Each CSV file follows the HPB SG FoodID export format:

```csv
Food Name,"100 Plus (any flavour)"
Description,"Carbonated isotonic beverage"
Food Group,"Beverages"
Food Subgroup,"Electrolyte/Energy drinks"
Edible Portion,"100%"
Default Serving Size,"1 can = 325ml"
Alternative Serving Size(s),"1 bottle = 500ml"
Source of Data,"NIP"
Last Updated,"2025"
,Per 100ml,Per Serving (325ml)
Energy (kcal),25,81
Protein (g),0,0
Total Fat (g),0,0
...
```

---

## Part 5 — PWA Installation

The app is a Progressive Web App and can be installed on any device:

- **Desktop (Chrome/Edge):** Click the install icon in the address bar
- **iOS Safari:** Share → Add to Home Screen
- **Android Chrome:** Menu → Add to Home Screen

Once installed, the app works offline using the cached CDN data (420+ foods).

---

## Troubleshooting

### "Cannot find module" errors
```bash
cd fooddb-pwa && pnpm install
cd sg_my_fooddb/mcp-server && npm install
```

### Port already in use
```bash
PORT=4001 node local-server/server.mjs
```

### Scraper stalls / network timeout
The scraper has automatic retry with exponential backoff. If it stalls completely:
```bash
# Kill any existing scraper
pkill -f scrape_fast.py
# Restart — it will resume from saved progress
python3 scraper/scrape_fast.py
```

### MCP server not connecting
Verify the absolute path in your MCP config and that the `dist/index.js` file exists after building.

---

## Directory Structure

```
sg_my_fooddb/
├── data/
│   ├── progress_generic.json    ← Scraper progress (auto-saved)
│   └── sgfoodid_generic.json    ← Final scraped data (2,557 foods)
├── mcp-server/
│   ├── src/index.ts             ← MCP server source
│   ├── dist/index.js            ← Built MCP server (run this)
│   └── package.json
├── scraper/
│   ├── scrape_fast.py           ← Fast parallel scraper (recommended)
│   └── scrape_resume.py         ← Sequential scraper (fallback)
└── README.md

fooddb-pwa/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx         ← Food search
│   │   │   ├── FoodDetail.tsx   ← 41-nutrient detail view
│   │   │   ├── Analyse.tsx      ← AI photo recognition
│   │   │   ├── UploadCSV.tsx    ← CSV/ZIP upload ← NEW
│   │   │   ├── ImportPaste.tsx  ← HPB paste import
│   │   │   └── LocalDB.tsx      ← Local database manager
│   │   ├── lib/
│   │   │   ├── api.ts           ← API client + local DB
│   │   │   ├── csvParser.ts     ← CSV parser ← NEW
│   │   │   └── nutrients.ts     ← 41 nutrient definitions
│   │   └── components/
│   │       ├── Layout.tsx       ← Sidebar + mobile nav
│   │       └── NutrientTable.tsx
├── local-server/
│   └── server.mjs               ← Local production server ← NEW
└── LOCAL_DEPLOYMENT.md          ← This file
```
