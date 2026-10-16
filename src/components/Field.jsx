import { usePreferences } from "../context/PreferencesContext"
import { translate } from "../i18n/filipino"

// A labelled form field. Pass `children` (select, textarea...) to replace the default <input>.
export default function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  defaultValue,
  pattern,
  maxLength,
  inputMode,
  title,
  children,
}) {
  const { language } = usePreferences()
  return (
    <label className="field">
      <span className="field-label">
        {translate(label, language)}
        {required && <span className="required"> *</span>}
      </span>
      {children || (
        <input
          name={name}
          type={type}
          placeholder={placeholder ? translate(placeholder, language) : undefined}
          required={required}
          defaultValue={defaultValue}
          pattern={pattern}
          maxLength={maxLength}
          inputMode={inputMode}
          title={title}
        />
      )}
    </label>
  )
}
