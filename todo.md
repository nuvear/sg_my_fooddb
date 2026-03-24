# FoodDB PWA — Project TODO

## Core Features (Completed)
- [x] Food search engine with 2,557 SG/MY foods
- [x] Cultural dimension filters (ethnic, occasion, region, generation, dietary)
- [x] Food detail page with full nutritional breakdown
- [x] Restaurants & hawker venues page (17 venues, AI dish icons)
- [x] CSV/ZIP import for HPB data
- [x] Paste HPB entry tool
- [x] Local DB browser
- [x] Photo analysis (Analyse page)
- [x] Agents pipeline page (background enrichment)
- [x] Background scraper agent (3-agent pipeline, daily cron)
- [x] Dish image enrichment agent (Agent 3 v2)
- [x] Full-stack upgrade (db, server, user auth)

## Personal Experience Features (Completed)
- [x] Database schema: user_profiles, meal_logs, daily_summaries, ai_suggestions tables
- [x] tRPC procedures: profile.get/save/calculateTargets, meals.add/delete/getForDate
- [x] tRPC procedures: calendar.getDaySummary/getMonthSummaries, ai.generateSuggestion
- [x] User profile onboarding wizard (4 steps: basics, goals, diet, review)
- [x] Health objectives: weight loss, weight gain, balanced, low-sodium, high-protein, vegetarian, diabetes-friendly, heart-healthy
- [x] TDEE/BMR calculator using Mifflin-St Jeor equation
- [x] Food Calendar — day view (meal logging by type, progress rings, AI suggestions)
- [x] Food Calendar — week view (7-day progress bars)
- [x] Food Calendar — month view (calendar grid with daily kcal fill)
- [x] Calorie Calculator (TDEE, BMI with Asian cutoffs, macro targets)
- [x] Sodium Calculator (daily intake tracker, SG/MY food reference table)
- [x] AI Suggestion Engine (per-meal LLM suggestions based on goals and remaining budget)
- [x] Navigation update (My Profile, Food Plan, Calculator added to sidebar)
- [x] Vitest tests for all new tRPC procedures (6 tests passing)

## Next Phase
- [ ] Wire SCRAPED_DISHES into Restaurants page dish cards
- [ ] Hotel venue data layer (next phase)
- [ ] Dish detail modal with radar chart
- [ ] Map view for hawker centre discovery
- [ ] "Last enriched" timestamp badge on restaurant cards

## Phase 3 Features (Completed)
- [x] Regenerate higher-quality dish icons (photorealistic flat-art style)
- [x] Admin section: dashboard, restaurant approval workflow, agent monitoring
- [x] Move Restaurants page under admin-only view (/admin/restaurants)
- [x] Credits & Disclaimer page (/credits)
- [x] Help & Data Interpretation guide (/help)
- [x] MCP API page (/api-docs)
- [x] Admin role-based access control for admin routes
- [x] Nav restructured: Database / Personal / Info / Admin collapsible sections

## Phase 4 — Bug Fixes & Enhancements
- [ ] Fix AI photo recognition — improve LLM vision prompt to identify non-SG/MY dishes (e.g. Goya Champuru)
- [ ] Add nutritional fallback when dish not in FoodDB — estimate from recipe ingredients or URL
- [ ] Show identified dish name + confidence even when not in database
- [ ] Logo: transparent background or mix-blend-mode fix for Innuir logo on dark sidebar

## Phase 4 — Pending
- [ ] Wire REST endpoints for /api/foods/search and /api/foods/:crId (for MCP/external apps)
- [ ] Wire /api/mcp/call server endpoint
- [ ] Restaurant public view shows only admin-approved venues
- [ ] Dish icon CDN URLs updated in restaurantData.ts with new photorealistic images
- [ ] Hotel venue data layer (next phase)
- [ ] Dish detail modal with radar chart
- [ ] Map view for hawker centre discovery

## Phase 5 — MCP Server for Innuir Health Integration
- [x] Install @modelcontextprotocol/sdk (v1.27.1)
- [x] Implement server/mcp.ts with 7 MCP tools:
  - [x] search_foods — full-text food search with nutrient filters
  - [x] get_food_detail — full nutrient profile with net_carbs and glycemic_load
  - [x] decompose_dish — AI decomposition into typed components
  - [x] estimate_nutrition — structured estimate with confidence intervals
  - [x] get_meal_log — retrieve user meal log for date range
  - [x] get_daily_summary — pre-computed daily aggregates
  - [x] get_glycemic_load — meal-level GL with protein/fat/fibre buffering
- [x] Mount MCP endpoint at POST /api/mcp in server/_core/index.ts
- [ ] Write vitest tests for MCP tools
- [ ] Add MCP endpoint documentation to /api-docs page
- [ ] Add API key authentication to /api/mcp for production security
