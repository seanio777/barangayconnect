import { usePreferences } from "../context/PreferencesContext"
import { translate } from "../i18n/filipino"

export default function PageHeading({ eyebrow, title, description, action }) {
  const { language } = usePreferences()
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{translate(eyebrow, language)}</div>
        <h1>{translate(title, language)}</h1>
        {description && <p>{translate(description, language)}</p>}
      </div>
      {action && <div className="heading-action">{action}</div>}
    </div>
  )
}
