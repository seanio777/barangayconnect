import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import Field from "../../components/Field"

export default function AnnouncementModal() {
  const { setModal, saveAnnouncement } = useApp()
  return (
    <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
      <div
        className="modal-panel"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="New announcement"
      >
        <button
          className="modal-close"
          onClick={() => setModal(null)}
          aria-label="Close"
        >
          <Icon name="close" />
        </button>
        <div className="eyebrow">COMMUNITY UPDATE</div>
        <h2>New announcement</h2>
        <p>Share an update with your residents.</p>
        <form className="stack-form" onSubmit={saveAnnouncement}>
          <Field
            label="Title"
            name="title"
            placeholder="Announcement title"
            required
          />
          <Field label="Category" name="category" required>
            <select name="category" required>
              <option>Community</option>
              <option>Health</option>
              <option>Notice</option>
              <option>Event</option>
            </select>
          </Field>
          <Field label="Description" name="description" required>
            <textarea
              name="description"
              rows={5}
              required
              placeholder="Write your announcement..."
            />
          </Field>
          <div className="form-actions">
            <Button type="submit">Publish announcement</Button>
            <Button variant="text" onClick={() => setModal(null)}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
