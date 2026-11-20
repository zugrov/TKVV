import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Business, Connect, Consent, Contacts, Documents, Home, NotFound, Pay, Privacy, Support, Tariffs } from "./pages/PublicPages";

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/tariffs" component={Tariffs} />
    <Route path="/connect" component={Connect} />
    <Route path="/pay" component={Pay} />
    <Route path="/support" component={Support} />
    <Route path="/business" component={Business} />
    <Route path="/contacts" component={Contacts} />
    <Route path="/documents" component={Documents} />
    <Route path="/privacy" component={Privacy} />
    <Route path="/consent" component={Consent} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
