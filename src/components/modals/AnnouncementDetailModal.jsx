import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"

export default function AnnouncementDetailModal() {
  const { selectedAnnouncement, setModal } = useApp()
  return (
    <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
      <div
        className="modal-panel"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={selectedAnnouncement.title}
      >
        <button
          className="modal-close"
          onClick={() => setModal(null)}
          aria-label="Close"
        >
          <Icon name="close" />
        </button>
        <span className="update-category">
          {selectedAnnouncement.category}
        </span>
        <h2>{selectedAnnouncement.title}</h2>
        <p className="muted">{selectedAnnouncement.date}</p>
        <p>{selectedAnnouncement.description}</p>
        <Button variant="outline" onClick={() => setModal(null)}>
          Close
        </Button>
      </div>
    </div>
  )
}
