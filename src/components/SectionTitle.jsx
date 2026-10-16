import { usePreferences } from "../context/PreferencesContext"
import { translate } from "../i18n/filipino"

export default function SectionTitle({ title, subtitle, action }) {
  const { language } = usePreferences()
  return (
    <div className="section-title">
      <div>
        <h2>{translate(title, language)}</h2>
        {subtitle && <p>{translate(subtitle, language)}</p>}
      </div>
      {action}
    </div>
  )
}
