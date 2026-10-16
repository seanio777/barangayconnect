import { createContext, useContext, useEffect, useState } from "react"

const PreferencesContext = createContext({
  theme: "light",
  language: "en",
  setTheme: () => undefined,
  setLanguage: () => undefined,
})

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState("light") // "light" | "dark"
  const [language, setLanguage] = useState("en") // "en" | "fil"

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.lang = language === "fil" ? "fil" : "en"
    document.documentElement.style.colorScheme = theme
  }, [theme, language])

  return (
    <PreferencesContext.Provider value={{ theme, language, setTheme, setLanguage }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  return useContext(PreferencesContext)
}
