import { useApp } from "../../context/AppContext"
import Button from "../../components/Button"
import Field from "../../components/Field"
import PageHeading from "../../components/PageHeading"
import SectionTitle from "../../components/SectionTitle"

export default function SettingsPage() {
  const { settings, setSettings, notify } = useApp()
  return (
    <>
      <PageHeading
        eyebrow="SYSTEM / SETTINGS"
        title="Settings"
        description="Manage your barangay information and basic system preferences."
      />
      <form
        className="settings-layout"
        onSubmit={(e) => {
          e.preventDefault()
          const data = new FormData(e.currentTarget)
          setSettings({
            barangay: String(data.get("barangay")),
            address: String(data.get("address")),
            contact: String(data.get("contact")),
            email: String(data.get("email")),
            system: String(data.get("system")),
            notifications: data.get("notifications") === "on",
            maintenance: data.get("maintenance") === "on",
          })
          notify("System settings saved successfully.")
        }}
      >
        <div className="panel form-panel">
          <SectionTitle
            title="Barangay information"
            subtitle="Public contact details for your community."
          />
          <div className="stack-form">
            <Field
              label="Barangay name"
              name="barangay"
              defaultValue={settings.barangay}
              required
            />
            <Field
              label="Address"
              name="address"
              defaultValue={settings.address}
              required
            />
            <div className="form-grid">
              <Field
                label="Contact number"
                name="contact"
                defaultValue={settings.contact}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                defaultValue={settings.email}
              />
            </div>
          </div>
        </div>
        <div className="panel form-panel">
          <SectionTitle
            title="System settings"
            subtitle="Keep things simple and running smoothly."
          />
          <div className="stack-form">
            <Field
              label="System name"
              name="system"
              defaultValue={settings.system}
            />
            <label className="toggle-row">
              <span>
                <strong>Email notifications</strong>
                <small>Send updates when report statuses change.</small>
              </span>
              <input
                type="checkbox"
                name="notifications"
                defaultChecked={settings.notifications}
              />
            </label>
            <label className="toggle-row">
              <span>
                <strong>Maintenance mode</strong>
                <small>Temporarily pause resident access.</small>
              </span>
              <input
                type="checkbox"
                name="maintenance"
                defaultChecked={settings.maintenance}
              />
            </label>
          </div>
        </div>
        <div className="settings-save">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </>
  )
}
