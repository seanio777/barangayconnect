import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import Field from "../../components/Field"

export default function AdminModal() {
  const { editingAdmin, setModal, saveAdmin } = useApp()
  return (
    <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
      <div
        className="modal-panel"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={editingAdmin ? "Edit admin" : "Add admin"}
      >
        <button
          className="modal-close"
          onClick={() => setModal(null)}
          aria-label="Close"
        >
          <Icon name="close" />
        </button>
        <div className="eyebrow">ADMIN MANAGEMENT</div>
        <h2>
          {editingAdmin ? "Edit administrator" : "Add an administrator"}
        </h2>
        <p>
          {editingAdmin
            ? "Update the details for this admin account."
            : "Create an account for a barangay administrator."}
        </p>
        <form className="stack-form" onSubmit={saveAdmin}>
          <Field
            label="Full name"
            name="name"
            defaultValue={editingAdmin?.name}
            required
          />
          <Field
            label="Email address"
            name="email"
            type="email"
            defaultValue={editingAdmin?.email}
            required
          />
          <Field label="Admin level" name="level" required>
            <select
              name="level"
              defaultValue={String(editingAdmin?.level || 1)}
              required
            >
              <option value="1">Level 1 · Barangay Tanod</option>
              <option value="2">Level 2 · Secretary</option>
              <option value="3">Level 3 · Punong Barangay</option>
            </select>
          </Field>
          <div className="form-grid">
            <Field
              label="Contact number"
              name="contact"
              defaultValue={editingAdmin?.contact}
              required
            />
            <Field
              label="Barangay / Area"
              name="address"
              defaultValue={editingAdmin?.address}
              required
            />
          </div>
          <div className="form-actions">
            <Button type="submit">
              {editingAdmin ? "Save changes" : "Create admin"}
            </Button>
            <Button variant="text" onClick={() => setModal(null)}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
