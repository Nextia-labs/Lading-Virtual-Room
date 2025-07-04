// client/src/App.tsx
import { Switch, Route } from "wouter";
import HomePage from "@/pages/home-page-backup";
import NotFound from "@/pages/not-found";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

