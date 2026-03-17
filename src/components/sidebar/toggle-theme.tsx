"use client";
import { Moon, Sun, MonitorSmartphone } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ToggleTheme() {
  const { setTheme, theme } = useTheme();

  const activeDark = theme === "dark" ? "bg-muted/50" : "bg-transparent";
  const activeLight = theme === "light" ? "bg-muted/50" : "bg-transparent";
  const activeSystem = theme === "system" ? "bg-muted/50" : "bg-transparent";

  return (
    <div className="grid grid-cols-3 gap-1">
      <Button
        variant="ghost"
        className={`${activeDark}`}
        size={"sm"}
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        className={`${activeLight}`}
        onClick={() => setTheme("light")}
        size={"sm"}
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        className={`${activeSystem}`}
        onClick={() => setTheme("system")}
        size={"sm"}
      >
        <MonitorSmartphone className="h-4 w-4" />
      </Button>
    </div>
  );
}
