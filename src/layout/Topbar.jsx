import { useApp } from "../context/AppContext"
import Icon from "../components/Icon"
import PreferenceControls from "../components/PreferenceControls"

export default function Topbar() {
  const { page, name, setSidebarOpen, roleMenus, navigate, t } = useApp()
  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Icon name="menu" />
        </button>
        <span className="breadcrumb-parent">{t("Workspace")}</span>
        <Icon name="chevron" size={14} />
        <span className="breadcrumb-current">
          {page === "report-detail"
            ? t("Report Details")
            : t(
                roleMenus.find((m) => m.page === page)?.label || "Dashboard",
              )}
        </span>
      </div>
      <div className="topbar-right">
        <span className="today-date">
          <Icon name="calendar" size={16} />
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <span className="topbar-divider" />
        <PreferenceControls />
        {roleMenus.some((item) => item.page === "announcements") && (
          <button
            className="topbar-bell"
            onClick={() => navigate("announcements")}
            title="Announcements"
          >
            <Icon name="bell" size={19} />
            <i />
          </button>
        )}
        <button
          className="topbar-profile"
          onClick={() => navigate("profile")}
          title="My profile"
        >
          <span className="avatar small-avatar">
            {name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </span>
          <span>{name.split(" ")[0]}</span>
          <Icon name="chevron" size={14} />
        </button>
      </div>
    </header>
  )
}
