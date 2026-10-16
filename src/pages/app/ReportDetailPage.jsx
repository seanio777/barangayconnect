import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import Badge from "../../components/Badge"
import Field from "../../components/Field"
import PageHeading from "../../components/PageHeading"
import SectionTitle from "../../components/SectionTitle"
import { STATUSES } from "../../data/constants"

export default function ReportDetailPage() {
  const { role, report, canManageBarangay, navigate, updateReport } = useApp()
  return (
    <>
      <button
        className="back-link detail-back"
        onClick={() =>
          navigate(role === "resident" ? "my-reports" : "reports")
        }
      >
        <Icon name="back" size={17} /> Back to reports
      </button>
      <PageHeading
        eyebrow={`REPORT / ${report.id}`}
        title={report.title}
        description={`Submitted on ${report.date} by ${report.resident}`}
        action={<Badge status={report.status} />}
      />
      <div className="detail-grid">
        <div className="detail-main">
          <div className="panel detail-panel">
            <SectionTitle title="Concern details" />
            <div className="detail-fields">
              <div>
                <span>Report ID</span>
                <strong>{report.id}</strong>
              </div>
              <div>
                <span>Category</span>
                <strong>{report.category}</strong>
              </div>
              <div>
                <span>Location</span>
                <strong>{report.location}</strong>
              </div>
              <div>
                <span>Date submitted</span>
                <strong>{report.date}</strong>
              </div>
            </div>
            <div className="detail-description">
              <span>Description</span>
              <p>{report.description}</p>
            </div>
            <div className="detail-description">
              <span>Uploaded photo</span>
              {report.photo ? (
                <img
                  className="report-photo"
                  src={report.photo}
                  alt="Uploaded concern"
                />
              ) : (
                <div className="no-photo">
                  <Icon name="photo" size={20} /> No photo attached
                </div>
              )}
            </div>
            <button
              className="text-action detail-map-link"
              onClick={() => navigate("map")}
            >
              <Icon name="pin" size={17} /> View this location on the
              report map <Icon name="arrow" size={16} />
            </button>
          </div>
          <div className="panel remarks-panel">
            <SectionTitle title="Barangay remarks" />
            <div className="remarks-content">
              <span className="remarks-avatar">
                <Icon name="users" size={19} />
              </span>
              <p>
                {report.remarks ||
                  "No remarks yet. Check back for updates from the barangay team."}
              </p>
            </div>
          </div>
        </div>
        <div className="detail-aside">
          {role === "resident" ? (
            <div className="panel timeline-panel">
              <SectionTitle
                title="Report progress"
                subtitle="Follow your concern’s journey."
              />
              <div className="timeline">
                {([
                  "Submitted",
                  "Under Review",
                  "In Progress",
                  "Resolved",
                ]).map((step, i) => {
                  const order = [
                    "Pending",
                    "Under Review",
                    "In Progress",
                    "Resolved",
                  ]
                  const current =
                    report.status === "Rejected"
                      ? 0
                      : order.indexOf(report.status)
                  return (
                    <div
                      className={`timeline-step ${
                        i <= current ? "done" : ""
                      }`}
                      key={step}
                    >
                      <span className="timeline-node">
                        {i <= current ? (
                          <Icon name="check" size={14} />
                        ) : (
                          i + 1
                        )}
                      </span>
                      <div>
                        <strong>{step}</strong>
                        <small>
                          {i === 0
                            ? report.date
                            : i < current
                              ? "Completed"
                              : i === current
                                ? "Current stage"
                                : "Upcoming"}
                        </small>
                      </div>
                    </div>
                  )
                })}
              </div>
              {report.status === "Rejected" && (
                <div className="inline-alert error">
                  This report was not approved. See barangay remarks for
                  details.
                </div>
              )}
            </div>
          ) : canManageBarangay && role === "admin" ? (
            <div className="panel update-panel">
              <SectionTitle
                title="Update report"
                subtitle="Keep the resident informed."
              />
              <form onSubmit={updateReport} className="stack-form">
                <Field label="Update status" name="status">
                  <select
                    name="status"
                    defaultValue={report.status}
                    key={report.id + report.status}
                  >
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Admin remarks" name="remarks">
                  <textarea
                    name="remarks"
                    rows={5}
                    defaultValue={report.remarks}
                    key={report.id + report.remarks}
                    placeholder="Write an update for the resident..."
                  />
                </Field>
                <Button type="submit" className="full-width">
                  Save update
                </Button>
              </form>
            </div>
          ) : (
            <div className="tip-card">
              <span className="tip-icon">
                <Icon name="shield" size={22} />
              </span>
              <h3>
                {role === "admin" ? "Read-only access" : "System oversight"}
              </h3>
              <p>
                {role === "admin"
                  ? "Your admin level can view report details. Status updates are reserved for the Punong Barangay."
                  : "Developers can view all reports. Day-to-day status updates are managed by the Punong Barangay."}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
