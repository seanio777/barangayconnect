import Icon from "./Icon"
import { usePreferences } from "../context/PreferencesContext"

// Dark mode and English/Filipino buttons
export default function PreferenceControls() {
  const { theme, language, setTheme, setLanguage } = usePreferences()
  const dark = theme === "dark"

  return (
    <div className="preference-controls" aria-label="Display preferences">
      <button
        className="preference-button theme-button"
        onClick={() => setTheme(dark ? "light" : "dark")}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        title={dark ? "Light mode" : "Dark mode"}
      >
        <Icon name={dark ? "sun" : "moon"} size={17} />
      </button>
      <button
        className="preference-button language-button"
        onClick={() => setLanguage(language === "en" ? "fil" : "en")}
        aria-label={language === "en" ? "Gamitin ang Filipino" : "Switch to English"}
        title={language === "en" ? "Filipino" : "English"}
      >
        <Icon name="globe" size={16} />
        <span>{language === "en" ? "FIL" : "EN"}</span>
      </button>
    </div>
  )
}
