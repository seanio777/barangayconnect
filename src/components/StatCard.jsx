import Icon from "./Icon"
import { usePreferences } from "../context/PreferencesContext"
import { translate } from "../i18n/filipino"

export default function StatCard({ label, value, icon, tone }) {
  const { language } = usePreferences()
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span className={`stat-icon tone-${tone}`}>
          <Icon name={icon} size={21} />
        </span>
        <Icon name="dots" size={19} />
      </div>
      <strong>{value.toString().padStart(2, "0")}</strong>
      <span>{translate(label, language)}</span>
    </div>
  )
}
