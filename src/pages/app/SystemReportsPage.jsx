import { useApp } from "../../context/AppContext"
import Button from "../../components/Button"
import PageHeading from "../../components/PageHeading"
import SectionTitle from "../../components/SectionTitle"
import StatCard from "../../components/StatCard"
import { STATUSES, CATEGORIES } from "../../data/constants"

export default function SystemReportsPage() {
  const { reports, exportReports } = useApp()
  return (
    <>
      <PageHeading
        eyebrow="INSIGHTS / SYSTEM REPORTS"
        title="System reports"
        description="A simple overview of community concerns across the system."
        action={
          <Button icon="download" onClick={exportReports}>
            Export report
          </Button>
        }
      />
      <div className="stat-grid four">
        {[
          {
            label: "Total Reports",
            value: reports.length,
            icon: "file",
            tone: "green",
          },
          {
            label: "Pending",
            value: reports.filter((r) => r.status === "Pending").length,
            icon: "clock",
            tone: "yellow",
          },
          {
            label: "In Progress",
            value: reports.filter((r) => r.status === "In Progress")
              .length,
            icon: "chart",
            tone: "blue",
          },
          {
            label: "Resolved",
            value: reports.filter((r) => r.status === "Resolved")
              .length,
            icon: "check",
            tone: "green",
          },
        ].map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
      <div className="insight-grid">
        <div className="panel insight-panel">
          <SectionTitle
            title="Reports by category"
            subtitle="What residents are reporting."
          />
          <div className="bar-list">
            {CATEGORIES.map((c) => {
              const count = reports.filter(
                (r) => r.category === c,
              ).length
              return (
                <div className="bar-row" key={c}>
                  <span>{c}</span>
                  <div className="bar-track">
                    <div
                      style={{
                        width: `${
                          reports.length
                            ? (count / reports.length) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <strong>{count}</strong>
                </div>
              )
            })}
          </div>
        </div>
        <div className="panel insight-panel">
          <SectionTitle
            title="Reports by status"
            subtitle="Progress at a glance."
          />
          <div className="bar-list">
            {STATUSES.map((s) => {
              const count = reports.filter((r) => r.status === s).length
              return (
                <div className="bar-row" key={s}>
                  <span>{s}</span>
                  <div className="bar-track">
                    <div
                      style={{
                        width: `${
                          reports.length
                            ? (count / reports.length) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <strong>{count}</strong>
                </div>
              )
            })}
          </div>
        </div>
        <div className="panel insight-panel month-panel">
          <SectionTitle
            title="Reports by month"
            subtitle="Submission activity over time."
          />
          <div className="month-chart">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(
              (month, i) => {
                const count = reports.filter((r) =>
                  r.date.startsWith(month),
                ).length
                return (
                  <div className="month-col" key={month}>
                    <div
                      className="month-bar"
                      style={{
                        height: `${Math.max(8, (count / Math.max(reports.length, 1)) * 100)}%`,
                      }}
                    />
                    <span>{month}</span>
                  </div>
                )
              },
            )}
          </div>
        </div>
      </div>
    </>
  )
}
