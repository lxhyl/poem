import { useEffect, useState } from "react";
import { CiDot01Xs, FluentArrowStepBack20Regular, FluentArrowStepOver20Regular, MaterialSymbolsDarkModeRounded, MaterialSymbolsWbSunnyOutline } from "./Icon";

enum ThemeMode {
    Light = "light",
    Dark = "dark"
}
export default function Header(props: {
    getNextPoem: (step: number) => void
}) {
    const { getNextPoem } = props
    const [currentMode, setCurrentMode] = useState<ThemeMode>()
    const [dotClass, setDotClass] = useState<string>()
    useEffect(() => {
        let mode: any = localStorage.getItem("theme_mode")
        if (!mode) {
            mode = ThemeMode.Light
        }
        setCurrentMode(mode)
    }, [])
    useEffect(() => {
        if (!currentMode) return
        if (currentMode === ThemeMode.Light) {
            document.body.classList.remove("dark")
            localStorage.setItem("theme_mode", ThemeMode.Light)
        } else {
            document.body.classList.add("dark")
            localStorage.setItem("theme_mode", ThemeMode.Dark)
        }
    }, [currentMode])
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>
        if (dotClass) {
            timer = setTimeout(() => {
                setDotClass('')
                clearTimeout(timer)
            }, 1500)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [dotClass])
    return <div className="w-full flex justify-between p-2 items-center cursor-pointer">
        <div className="flex gap-2 items-center justify-center">
            <FluentArrowStepBack20Regular onClick={() => {
                getNextPoem(1)
                setDotClass('animate-bounce')
            }} />
            <CiDot01Xs key="dot" className={`mt-2 transition-all duration-1000 ease-in-out ${dotClass}`} />
            <FluentArrowStepOver20Regular onClick={() => {
                getNextPoem(-1)
                setDotClass('animate-bounce')
            }} />
        </div>
        {currentMode === ThemeMode.Dark && <MaterialSymbolsDarkModeRounded onClick={() => setCurrentMode(ThemeMode.Light)} />}
        {currentMode === ThemeMode.Light && <MaterialSymbolsWbSunnyOutline onClick={() => setCurrentMode(ThemeMode.Dark)} />}
    </div>
}
