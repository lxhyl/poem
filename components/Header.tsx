import { useCallback, useEffect, useMemo, useState } from "react";
import { FluentArrowStepBack20Regular, FluentArrowStepOver20Regular, MaterialSymbolsDarkModeRounded, MaterialSymbolsWbSunnyOutline } from "./Icon";

enum ThemeMode {
    Light = "light",
    Dark = "dark"
}
export default function Header(props: {
    getNextPoem: (step: number) => void
}) {
    const { getNextPoem } = props
    const [currentMode, setCurrentMode] = useState<ThemeMode>()
    useEffect(() => {
        let mode: any = localStorage.getItem("theme_mode")
        if (!mode) {
            mode = ThemeMode.Light
        }
        setCurrentMode(mode)
    }, [])
    useEffect(() => {
        if (currentMode === ThemeMode.Light) {
            document.body.classList.remove("dark")
            localStorage.setItem("theme_mode", ThemeMode.Light)
        } else {
            document.body.classList.add("dark")
            localStorage.setItem("theme_mode", ThemeMode.Dark)
        }
    }, [currentMode])
    return <div className="w-full flex justify-between p-2 items-center ">
        <div className="flex gap-2 items-center justify-center">
            <FluentArrowStepBack20Regular onClick={() => getNextPoem(1)} />
            <FluentArrowStepOver20Regular onClick={() => getNextPoem(-1)} />
        </div>
        {currentMode === ThemeMode.Dark && <MaterialSymbolsDarkModeRounded onClick={() => setCurrentMode(ThemeMode.Light)} />}
        {currentMode === ThemeMode.Light && <MaterialSymbolsWbSunnyOutline onClick={() => setCurrentMode(ThemeMode.Dark)} />}
    </div>
}
