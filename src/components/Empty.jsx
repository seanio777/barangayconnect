import Icon from "./Icon"
import { usePreferences } from "../context/PreferencesContext"
import { translate } from "../i18n/filipino"

export default function Empty({ message }) {
  const { language } = usePreferences()
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <Icon name="file" size={25} />
      </span>
      <h3>{language === "fil" ? "Wala pa rito" : "Nothing here yet"}</h3>
      <p>{translate(message, language)}</p>
    </div>
  )
}
