"use client";

import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";
import { Sun, Moon, Loader2 } from "lucide-react";

interface ThemeButtonProps {}

const ThemeButton: FC<ThemeButtonProps> = ({}) => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Loader2 className="animate-spin" />;
  }
  return (
    <button
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeButton;
