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
