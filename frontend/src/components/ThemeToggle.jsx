import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";

  const saved = window.localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;

  // Default to dark for this portfolio.
  return "dark";
}

export default function ThemeToggle({ variant = "ghost", className = "" }) {
  const [theme, setTheme] = React.useState(getInitialTheme);

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  // Ensure we apply the default theme on first mount.
  React.useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
  }, []);

  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant={variant}
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      className={`theme-toggle ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="ml-2 hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </Button>
  );
}
