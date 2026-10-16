import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import SectionTitle from "../../components/SectionTitle"
import StatCard from "../../components/StatCard"
import ReportTable from "../../components/ReportTable"

export default function ResidentDashboard() {
  const { name, announcements, setModal, setSelectedAnnouncement, myReports, navigate, t, language } = useApp()
  return (
    <>
      <div className="dashboard-hero resident-hero">
        <div>
          <div className="eyebrow">
            {language === "fil"
              ? "IYONG KOMUNIDAD, IYONG LUGAR"
              : "YOUR COMMUNITY, YOUR SPACE"}
          </div>
          <h1>
            {t("Welcome back,")} <em>{name.split(" ")[0]}.</em>
          </h1>
          <p>
            {t(
              "Here’s what’s happening with your community concerns.",
            )}
          </p>
          <Button
            variant="secondary"
            icon="arrow"
            onClick={() => navigate("submit")}
          >
            Report a concern
          </Button>
        </div>
        <div className="dashboard-hero-art">
          <span className="circle-a" />
          <span className="circle-b" />
          <span className="hero-art-icon">
            <Icon name="heart" size={54} strokeWidth={1.2} />
          </span>
          <span className="spark-one">✳</span>
          <span className="spark-two">✳</span>
        </div>
      </div>
      <div className="stat-grid four">
        {[
          {
            label: "My Reports",
            value: myReports.length,
            icon: "file",
            tone: "green",
          },
          {
            label: "Pending",
            value: myReports.filter((r) => r.status === "Pending")
              .length,
            icon: "clock",
            tone: "yellow",
          },
          {
            label: "In Progress",
            value: myReports.filter(
              (r) =>
                r.status === "In Progress" ||
                r.status === "Under Review",
            ).length,
            icon: "chart",
            tone: "blue",
          },
          {
            label: "Resolved",
            value: myReports.filter((r) => r.status === "Resolved")
              .length,
            icon: "check",
            tone: "green",
          },
        ].map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
      <div className="dashboard-grid">
        <div className="panel recent-panel">
          <SectionTitle
            title="Recent reports"
            subtitle="Keep tabs on the concerns you’ve shared."
            action={
              <button
                className="text-action"
                onClick={() => navigate("my-reports")}
              >
                View all <Icon name="arrow" size={16} />
              </button>
            }
          />
          <ReportTable rows={myReports.slice(0, 3)} mode="resident" />
        </div>
        <div className="panel announcements-widget">
          <SectionTitle
            title="Community notes"
            subtitle="Latest from your barangay."
          />
          {announcements.slice(0, 2).map((a) => (
            <button
              className="mini-announcement"
              key={a.id}
              onClick={() => {
                setSelectedAnnouncement(a)
                setModal("announcement-detail")
              }}
            >
              <span className="mini-announcement-icon">
                <Icon name="megaphone" size={18} />
              </span>
              <span>
                <strong>{a.title}</strong>
                <small>{a.date}</small>
              </span>
              <Icon name="chevron" size={16} />
            </button>
          ))}
          <button
            className="text-action widget-bottom"
            onClick={() => navigate("announcements")}
          >
            See all announcements <Icon name="arrow" size={16} />
          </button>
        </div>
      </div>
    </>
  )
}
