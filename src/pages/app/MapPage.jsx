import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import Badge from "../../components/Badge"
import PageHeading from "../../components/PageHeading"
import SectionTitle from "../../components/SectionTitle"
import Empty from "../../components/Empty"
import NeighborhoodMap from "../../components/NeighborhoodMap"
import { STATUSES } from "../../data/constants"

export default function MapPage() {
  const { role, mapZoom, statusFilter, setSelectedReport, setMapZoom, setStatusFilter, filteredMapReports, activeMapReport, navigate, viewReport } = useApp()
  return (
    <>
      <PageHeading
        eyebrow="CONCERNS / LOCATIONS"
        title="Report map"
        description={
          role === "resident"
            ? "See where your concerns were reported. Select a pin to view its progress."
            : "Explore reported concerns in Jose Panganiban, Camarines Norte. Select a pin to see the details."
        }
        action={
          role === "resident" ? (
            <Button
              icon="plusSquare"
              onClick={() => navigate("submit")}
            >
              Report a concern
            </Button>
          ) : undefined
        }
      />
      <div className="map-overview panel">
        <div className="map-overview-head">
          <div>
            <strong>Jose Panganiban, Camarines Norte</strong>
            <span>
              <Icon name="pin" size={14} /> {filteredMapReports.length}{" "}
              mapped{" "}
              {filteredMapReports.length === 1 ? "report" : "reports"}
            </span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter map by status"
          >
            <option>All statuses</option>
            {STATUSES.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="map-main-stage">
          <NeighborhoodMap
            markers={filteredMapReports}
            selectedId={activeMapReport?.id}
            onSelect={setSelectedReport}
            zoom={mapZoom}
          />
          <div
            className="map-zoom-controls"
            aria-label="Map zoom controls"
          >
            <button
              onClick={() =>
                setMapZoom(Math.min(19, mapZoom + 1))
              }
              disabled={mapZoom >= 19}
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              onClick={() =>
                setMapZoom(Math.max(10, mapZoom - 1))
              }
              disabled={mapZoom <= 10}
              aria-label="Zoom out"
            >
              −
            </button>
          </div>
        </div>
        <div className="map-legend">
          <span>
            <i className="map-legend-dot pending" />
            Pending
          </span>
          <span>
            <i className="map-legend-dot progress" />
            In progress
          </span>
          <span>
            <i className="map-legend-dot resolved" />
            Resolved
          </span>
          <span className="map-legend-help">
            Demo report pins are approximate. New reports use the selected map location.
          </span>
        </div>
      </div>
      <div className="map-results">
        <div className="panel map-selected-card">
          <SectionTitle
            title="Selected concern"
            subtitle="A closer look at this location."
          />
          {activeMapReport ? (
            <>
              <span className="map-report-id">
                {activeMapReport.id}
              </span>
              <h3>{activeMapReport.title}</h3>
              <div className="map-selected-meta">
                <Icon name="pin" size={16} />
                {activeMapReport.location}
              </div>
              <div className="map-selected-bottom">
                <Badge status={activeMapReport.status} />
                <Button
                  variant="outline"
                  onClick={() => viewReport(activeMapReport.id)}
                  icon="arrow"
                >
                  View details
                </Button>
              </div>
            </>
          ) : (
            <Empty message="No reports match this status yet." />
          )}
        </div>
        <div className="panel map-list-card">
          <SectionTitle
            title={
              role === "resident"
                ? "My mapped reports"
                : "Mapped reports"
            }
            subtitle="Select a report to locate its pin."
          />
          <div className="map-report-list">
            {filteredMapReports.map((item) => (
              <button
                key={item.id}
                className={`map-report-row ${
                  activeMapReport?.id === item.id ? "active" : ""
                }`}
                onClick={() => setSelectedReport(item.id)}
              >
                <span
                  className={`map-row-pin map-row-${item.status.toLowerCase().replace(/ /g, "-")}`}
                >
                  <Icon name="pin" size={17} />
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.location}</small>
                </span>
                <Badge status={item.status} />
              </button>
            ))}
            {filteredMapReports.length === 0 && (
              <Empty message="Try another status to see more pins." />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
