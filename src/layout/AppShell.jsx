import { useEffect } from "react"
import { useApp } from "../context/AppContext"
import Icon from "../components/Icon"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import DashboardPage from "../pages/app/DashboardPage"
import MapPage from "../pages/app/MapPage"
import SubmitConcernPage from "../pages/app/SubmitConcernPage"
import ReportsPage from "../pages/app/ReportsPage"
import ReportDetailPage from "../pages/app/ReportDetailPage"
import AnnouncementsPage from "../pages/app/AnnouncementsPage"
import ResidentsPage from "../pages/app/ResidentsPage"
import AdminsPage from "../pages/app/AdminsPage"
import SystemReportsPage from "../pages/app/SystemReportsPage"
import SettingsPage from "../pages/app/SettingsPage"
import ProfilePage from "../pages/app/ProfilePage"
import AdminModal from "../components/modals/AdminModal"
import AnnouncementModal from "../components/modals/AnnouncementModal"
import AnnouncementDetailModal from "../components/modals/AnnouncementDetailModal"
import PasswordModal from "../components/modals/PasswordModal"

// Layout for logged-in users: sidebar, top bar, the current page, and modals
export default function AppShell() {
  const {
    page, role, notice, setNotice, modal, sidebarOpen, setSidebarOpen, selectedAnnouncement,
    roleMenus, effectiveAdminLevel, canManageBarangay, canGenerateReports, navigate,
  } = useApp()

  // only allow pages that are in this role's menu
  const allowed = roleMenus.some((item) => item.page === page) || page === "report-detail"
  useEffect(() => {
    if (!allowed) navigate("dashboard")
  }, [allowed])
  if (!allowed) return null

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Topbar />
        <main className="workspace-content">
          {notice && (
            <div className="inline-alert success" role="status">
              <Icon name="check" size={19} />
              {notice}
              <button onClick={() => setNotice("")} aria-label="Dismiss">
                <Icon name="close" size={17} />
              </button>
            </div>
          )}
          {page === "dashboard" && <DashboardPage />}
          {page === "map" && <MapPage />}
          {page === "submit" && role === "resident" && <SubmitConcernPage />}
          {(page === "my-reports" || page === "reports") && <ReportsPage />}
          {page === "report-detail" && <ReportDetailPage />}
          {page === "announcements" && <AnnouncementsPage />}
          {page === "residents" && role !== "resident" && <ResidentsPage />}
          {page === "admins" && canManageBarangay && <AdminsPage />}
          {page === "system-reports" && canGenerateReports && <SystemReportsPage />}
          {page === "settings" && canManageBarangay && <SettingsPage />}
          {page === "profile" && <ProfilePage />}
        </main>
      </div>
      {sidebarOpen && <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />}
      {modal === "admin" && canManageBarangay && <AdminModal />}
      {modal === "announcement" && role === "admin" && effectiveAdminLevel === 3 && <AnnouncementModal />}
      {modal === "announcement-detail" && selectedAnnouncement && <AnnouncementDetailModal />}
      {modal === "password" && <PasswordModal />}
    </div>
  )
}
