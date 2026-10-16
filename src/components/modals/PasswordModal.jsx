import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import Field from "../../components/Field"

export default function PasswordModal() {
  const { setModal, notify } = useApp()
  return (
    <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
      <div
        className="modal-panel small"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Change password"
      >
        <button
          className="modal-close"
          onClick={() => setModal(null)}
          aria-label="Close"
        >
          <Icon name="close" />
        </button>
        <h2>Change password</h2>
        <p>Update your account password.</p>
        <form
          className="stack-form"
          onSubmit={(e) => {
            e.preventDefault()
            setModal(null)
            notify("Password updated for this prototype session.")
          }}
        >
          <Field
            label="Current password"
            name="current"
            type="password"
            required
          />
          <Field label="New password" name="new" type="password" required />
          <Button type="submit">Save password</Button>
        </form>
      </div>
    </div>
  )
}
