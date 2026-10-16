import { usePreferences } from "../context/PreferencesContext"
import { translate } from "../i18n/filipino"

export default function Badge({ status }) {
  const { language } = usePreferences()
  return (
    <span className={`badge badge-${status.toLowerCase().replace(/ /g, "-")}`}>
      <span className="badge-dot" />
      {translate(status, language)}
    </span>
  )
}
