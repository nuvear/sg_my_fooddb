// FoodDB — Tropical Bauhaus design system
// Routes: / (home/search), /food/:crId (detail), /analyse, /import, /db, /agents
//         /profile, /calendar, /calculator, /credits, /help, /api-docs
//         /contribute, /my-contributions
//         /admin (admin only), /admin/restaurants (admin only)

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import FoodDetail from "./pages/FoodDetail";
import Analyse from "./pages/Analyse";
import ImportPaste from "./pages/ImportPaste";
import LocalDB from "./pages/LocalDB";
import UploadCSV from "./pages/UploadCSV";
import Restaurants from "./pages/Restaurants";
import Agents from "./pages/Agents";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import Calculator from "./pages/Calculator";
import Credits from "./pages/Credits";
import Help from "./pages/Help";
import McpApi from "./pages/McpApi";
import Admin from "./pages/Admin";
import Contribute from "./pages/Contribute";
import MyContributions from "./pages/MyContributions";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Layout>
      <Switch>
        {/* ── Public routes ── */}
        <Route path="/" component={Home} />
        <Route path="/food/:crId" component={FoodDetail} />
        <Route path="/analyse" component={Analyse} />
        <Route path="/import" component={ImportPaste} />
        <Route path="/upload" component={UploadCSV} />
        <Route path="/db" component={LocalDB} />
        <Route path="/agents" component={Agents} />

        {/* ── Personal planner routes ── */}
        <Route path="/profile" component={Profile} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/calculator" component={Calculator} />

        {/* ── Info pages ── */}
        <Route path="/help" component={Help} />
        <Route path="/credits" component={Credits} />
        <Route path="/api-docs" component={McpApi} />

        {/* ── Contribution routes ── */}
        <Route path="/contribute" component={Contribute} />
        <Route path="/my-contributions" component={MyContributions} />

        {/* ── Admin routes (role check inside each page) ── */}
        <Route path="/admin" component={Admin} />
        <Route path="/admin/restaurants" component={Restaurants} />
        <Route path="/admin/restaurants/:id" component={Restaurants} />

        {/* ── Fallback ── */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster richColors position="top-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
