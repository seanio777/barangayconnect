import { useApp } from "../context/AppContext"
import Icon from "../components/Icon"
import Logo from "../components/Logo"
import { ADMIN_LEVEL_NAMES } from "../data/constants"

export default function Sidebar() {
  const { page, role, reports, sidebarOpen, setModal, setSidebarOpen, setRole, setAdminLevel, myReports, effectiveAdminLevel, roleMenus, navigate, t } = useApp()
  return (
    <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-brand">
        <Logo onClick={() => navigate("dashboard")} />
        <button
          className="mobile-close"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          <Icon name="close" />
        </button>
      </div>
      <div className="workspace-label">
        <span className="workspace-icon">
          <Icon
            name={
              role === "resident"
                ? "heart"
                : role === "admin"
                  ? "users"
                  : "shield"
            }
            size={18}
          />
        </span>
        <span>
          <strong>
            {role === "resident"
              ? t("Resident")
              : role === "admin"
                ? ADMIN_LEVEL_NAMES[effectiveAdminLevel]
                : "Developer"}
          </strong>
          <small>
            {role === "admin"
              ? `Level ${effectiveAdminLevel} · ${t("Workspace")}`
              : t("Workspace")}
          </small>
        </span>
        <Icon name="chevron" size={15} />
      </div>
      <div className="sidebar-caption">{t("Workspace").toUpperCase()}</div>
      <nav className="side-nav" aria-label={`${role} navigation`}>
        {roleMenus.map((item) => (
          <button
            key={item.page}
            className={`side-link ${
              page === item.page ||
              (page === "report-detail" &&
                (item.page === "my-reports" || item.page === "reports"))
                ? "selected"
                : ""
            }`}
            onClick={() => navigate(item.page)}
          >
            <Icon name={item.icon} size={19} />
            <span>{t(item.label)}</span>
            {(item.page === "reports" || item.page === "my-reports") && (
              <span className="nav-count">
                {role === "resident" ? myReports.length : reports.length}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="help-card">
          <span className="help-symbol">
            <Icon name="spark" size={22} />
          </span>
          <strong>{t("Better together.")}</strong>
          <p>{t("Every concern shared helps build a stronger community.")}</p>
        </div>
        <button
          className="side-link logout-link"
          onClick={() => {
            setRole(null)
            setAdminLevel(null)
            setModal(null)
            navigate("home")
          }}
        >
          <Icon name="logout" size={19} /> <span>{t("Log out")}</span>
        </button>
      </div>
    </aside>
  )
}
