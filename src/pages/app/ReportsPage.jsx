import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import PageHeading from "../../components/PageHeading"
import ReportTable from "../../components/ReportTable"
import { STATUSES, CATEGORIES } from "../../data/constants"

export default function ReportsPage() {
  const { role, reports, search, statusFilter, categoryFilter, setSearch, setStatusFilter, setCategoryFilter, myReports, filteredReports, navigate } = useApp()
  return (
    <>
      <PageHeading
        eyebrow={
          role === "resident" ? "YOUR CONCERNS" : "COMMUNITY CONCERNS"
        }
        title={role === "resident" ? "My reports" : "Manage reports"}
        description={
          role === "resident"
            ? "See every concern you’ve shared, all in one place."
            : "Review, track, and respond to concerns from your community."
        }
        action={
          role === "resident" ? (
            <Button
              onClick={() => navigate("submit")}
              icon="plusSquare"
            >
              New report
            </Button>
          ) : undefined
        }
      />
      <div className="panel list-panel">
        <div className="list-toolbar">
          <div className="search-box">
            <Icon name="search" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                role === "resident"
                  ? "Search your reports..."
                  : "Search reports or residents..."
              }
              aria-label="Search reports"
            />
          </div>
          <div className="filter-group">
            <span className="filter-label">
              <Icon name="filter" size={17} /> Filter
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
            >
              <option>All statuses</option>
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter by category"
            >
              <option>All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <ReportTable rows={filteredReports} mode={role === "resident" ? "resident" : "admin"} />
        <div className="table-footer">
          Showing {filteredReports.length} of{" "}
          {role === "resident" ? myReports.length : reports.length}{" "}
          reports
        </div>
      </div>
    </>
  )
}
