"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface ThemeProp {
    btnSize: number;
}

export default function ThemeToggle({
    btnSize,
}: ThemeProp) {

    const { resolvedTheme } = useTheme();

    return resolvedTheme === "dark"

        ? <Sun size={btnSize} />

        : <Moon size={btnSize} />;

}