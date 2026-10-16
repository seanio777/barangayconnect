import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import PageHeading from "../../components/PageHeading"

export default function AnnouncementsPage() {
  const { role, announcements, setAnnouncements, setModal, setSelectedAnnouncement, notify } = useApp()
  return (
    <>
      <PageHeading
        eyebrow="STAY IN THE KNOW"
        title="Announcements"
        description="News, events, and updates from your barangay."
        action={
          role === "admin" ? (
            <Button
              icon="plusSquare"
              onClick={() => setModal("announcement")}
            >
              New announcement
            </Button>
          ) : undefined
        }
      />
      <div className="announcement-grid">
        {announcements.map((a) => (
          <article className="panel announcement-card" key={a.id}>
            <span className="announcement-icon">
              <Icon name="megaphone" size={23} />
            </span>
            <div className="announcement-meta">
              <span className="update-category">{a.category}</span>
              <span>
                <Icon name="calendar" size={15} />
                {a.date}
              </span>
            </div>
            <h2>{a.title}</h2>
            <p>{a.description}</p>
            <button
              className="text-action"
              onClick={() => {
                setSelectedAnnouncement(a)
                setModal("announcement-detail")
              }}
            >
              Read more <Icon name="arrow" size={16} />
            </button>
            {role === "admin" && (
              <button
                className="remove-link"
                onClick={() => {
                  if (window.confirm("Remove this announcement?")) {
                    setAnnouncements(
                      announcements.filter((item) => item.id !== a.id),
                    )
                    notify("Announcement removed.")
                  }
                }}
              >
                Remove
              </button>
            )}
          </article>
        ))}
      </div>
    </>
  )
}
