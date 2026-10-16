import Icon from "./Icon"
import { usePreferences } from "../context/PreferencesContext"
import { translate } from "../i18n/filipino"

// variant: "primary" | "secondary" | "outline" | "text" | "danger"
export default function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  icon,
  disabled = false,
  className = "",
}) {
  const { language } = usePreferences()
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`btn btn-${variant} ${className}`}>
      {typeof children === "string" ? translate(children, language) : children}
      {icon && <Icon name={icon} size={17} />}
    </button>
  )
}
