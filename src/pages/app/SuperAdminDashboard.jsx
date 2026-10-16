import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import PageHeading from "../../components/PageHeading"
import SectionTitle from "../../components/SectionTitle"
import StatCard from "../../components/StatCard"

export default function SuperAdminDashboard() {
  const { reports, residents, admins, setModal, setEditingAdmin, navigate } = useApp()
  return (
    <>
      <PageHeading
        eyebrow="OVERVIEW / SUPER ADMIN"
        title="BarangayConnect Super Admin"
        description="A clear view of your entire community network."
        action={
          <Button
            onClick={() => {
              setEditingAdmin(null)
              setModal("admin")
            }}
            icon="plusSquare"
          >
            Add admin
          </Button>
        }
      />
      <div className="stat-grid four">
        {[
          {
            label: "Total Admins",
            value: admins.length,
            icon: "shield",
            tone: "green",
          },
          {
            label: "Total Residents",
            value: residents.length,
            icon: "users",
            tone: "blue",
          },
          {
            label: "Total Reports",
            value: reports.length,
            icon: "file",
            tone: "yellow",
          },
          {
            label: "Resolved Reports",
            value: reports.filter((r) => r.status === "Resolved")
              .length,
            icon: "check",
            tone: "green",
          },
        ].map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
      <div className="dashboard-grid super-grid">
        <div className="panel">
          <SectionTitle
            title="Reports overview"
            subtitle="Where community concerns stand today."
            action={
              <button
                className="text-action"
                onClick={() => navigate("system-reports")}
              >
                Full report <Icon name="arrow" size={16} />
              </button>
            }
          />
          <div className="overview-layout">
            <div
              className="donut-chart"
              style={{
                background: `conic-gradient(#315e48 0 ${(reports.filter((r) => r.status === "Resolved").length / reports.length) * 100}%, #c9ad6c 0 ${(reports.filter((r) => r.status === "Resolved" || r.status === "Pending").length / reports.length) * 100}%, #8caab1 0 ${(reports.filter((r) => r.status !== "In Progress" && r.status !== "Rejected").length / reports.length) * 100}%, #a4765c 0)`,
              }}
            >
              <div>
                <strong>{reports.length}</strong>
                <small>Total reports</small>
              </div>
            </div>
            <div className="chart-legend">
              {[
                "Pending",
                "Under Review",
                "In Progress",
                "Resolved",
              ].map((s) => (
                <div key={s}>
                  <span
                    className={`legend-dot legend-${s.toLowerCase().replace(/ /g, "-")}`}
                  />
                  <span>{s}</span>
                  <strong>
                    {reports.filter((r) => r.status === s).length}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="panel activity-panel">
          <SectionTitle
            title="Recent system activity"
            subtitle="What’s new across the system."
          />
          <div className="activity-list">
            {[
              {
                icon: "shield",
                title: "New admin created",
                detail: "Lea Garcia joined the team",
                date: "May 22",
              },
              {
                icon: "user",
                title: "New resident registered",
                detail: "A new neighbor joined",
                date: "May 21",
              },
              {
                icon: "file",
                title: "New report submitted",
                detail: "Streetlight concern received",
                date: "May 21",
              },
              {
                icon: "check",
                title: "Report resolved",
                detail: "Sidewalk concern closed",
                date: "May 20",
              },
            ].map((a) => (
              <div className="activity-item" key={a.title}>
                <span className="activity-icon">
                  <Icon name={a.icon} size={17} />
                </span>
                <div>
                  <strong>{a.title}</strong>
                  <small>{a.detail}</small>
                </div>
                <time>{a.date}</time>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
