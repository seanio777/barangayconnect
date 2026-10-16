import Icon from "./Icon"
import Badge from "./Badge"
import Empty from "./Empty"
import { useApp } from "../context/AppContext"

// mode: "admin" shows the Resident and Priority columns, "resident" hides them
export default function ReportTable({ rows, mode = "admin" }) {
  const { t, viewReport } = useApp()
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>{t("Report ID")}</th>
            {mode === "admin" && <th>{t("Resident")}</th>}
            <th>{t("Concern")}</th>
            <th>{t("Category")}</th>
            <th>{t("Date")}</th>
            {mode === "admin" && <th>{t("Priority")}</th>}
            <th>{t("Status")}</th>
            <th className="align-right">{t("Action")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="table-id">{r.id}</td>
              {mode === "admin" && <td>{r.resident}</td>}
              <td className="table-strong">{r.title}</td>
              <td>{r.category}</td>
              <td>{r.date}</td>
              {mode === "admin" && (
                <td>
                  <span className={`priority priority-${r.priority.toLowerCase()}`}>{r.priority}</span>
                </td>
              )}
              <td>
                <Badge status={r.status} />
              </td>
              <td className="align-right">
                <button className="table-link" onClick={() => viewReport(r.id)}>
                  {t("View")} <Icon name="arrow" size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <Empty message="Try adjusting your search or filters." />}
    </div>
  )
}
