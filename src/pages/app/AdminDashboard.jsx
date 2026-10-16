import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import PageHeading from "../../components/PageHeading"
import SectionTitle from "../../components/SectionTitle"
import StatCard from "../../components/StatCard"
import ReportTable from "../../components/ReportTable"

export default function AdminDashboard() {
  const { reports, residents, navigate } = useApp()
  return (
    <>
      <PageHeading
        eyebrow="OVERVIEW / ADMIN"
        title="Barangay Admin Dashboard"
        description="Manage concerns and keep your community moving forward."
        action={
          <Button onClick={() => navigate("reports")} icon="arrow">
            Manage reports
          </Button>
        }
      />
      <div className="stat-grid four">
        {[
          {
            label: "Total Residents",
            value: residents.length,
            icon: "users",
            tone: "green",
          },
          {
            label: "New Reports",
            value: reports.filter((r) => r.status === "Pending")
              .length,
            icon: "file",
            tone: "blue",
          },
          {
            label: "Pending Reports",
            value: reports.filter(
              (r) =>
                r.status === "Pending" ||
                r.status === "Under Review",
            ).length,
            icon: "clock",
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
      <div className="panel recent-panel">
        <SectionTitle
          title="Recent reports"
          subtitle="The latest concerns submitted by residents."
          action={
            <button
              className="text-action"
              onClick={() => navigate("reports")}
            >
              View all reports <Icon name="arrow" size={16} />
            </button>
          }
        />
        <ReportTable rows={reports.slice(0, 5)} />
      </div>
    </>
  )
}
