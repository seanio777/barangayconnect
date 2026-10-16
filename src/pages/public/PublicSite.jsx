import { useApp } from "../../context/AppContext"
import PublicHeader from "./PublicHeader"
import LandingPage from "./LandingPage"
import AuthPage from "./AuthPage"
import ResetPasswordModal from "../../components/modals/ResetPasswordModal"
import AnnouncementDetailModal from "../../components/modals/AnnouncementDetailModal"

// Everything a visitor sees before logging in
export default function PublicSite() {
  const { page, modal, selectedAnnouncement } = useApp()
  return (
    <div className="public-site">
      <PublicHeader />
      {page === "home" ? <LandingPage /> : <AuthPage />}
      {modal === "password" && <ResetPasswordModal />}
      {modal === "announcement-detail" && selectedAnnouncement && <AnnouncementDetailModal />}
    </div>
  )
}
