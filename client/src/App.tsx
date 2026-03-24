// FoodDB — Tropical Bauhaus design system
// Routes: / (home/search), /food/:crId (detail), /analyse (photo upload), /import (paste import), /db (local records), /restaurants (hawker & restaurant discovery)

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
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/food/:crId" component={FoodDetail} />
        <Route path="/analyse" component={Analyse} />
        <Route path="/import" component={ImportPaste} />
        <Route path="/upload" component={UploadCSV} />
        <Route path="/db" component={LocalDB} />
        <Route path="/restaurants" component={Restaurants} />
        <Route path="/restaurants/:id" component={Restaurants} />
        <Route path="/agents" component={Agents} />
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
