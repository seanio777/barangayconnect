import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import Field from "../../components/Field"

export default function ResetPasswordModal() {
  const { setNotice, setModal } = useApp()
  return (
    <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
      <div
        className="modal-panel small"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Reset password"
      >
        <button className="modal-close" onClick={() => setModal(null)}>
          <Icon name="close" />
        </button>
        <span className="modal-icon">
          <Icon name="lock" />
        </span>
        <h2>Reset your password</h2>
        <p>
          Enter your email address and we’ll help you get back into your
          account.
        </p>
        <form
          className="stack-form"
          onSubmit={(e) => {
            e.preventDefault()
            setModal(null)
            setNotice(
              "Password reset request received. This is a prototype, so no email was sent.",
            )
          }}
        >
          <Field
            label="Email address"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
          <Button type="submit" className="full-width">
            Send reset link
          </Button>
        </form>
      </div>
    </div>
  )
}
