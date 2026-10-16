import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import Logo from "../../components/Logo"
import PreferenceControls from "../../components/PreferenceControls"

export default function PublicHeader() {
  const { page, publicMenuOpen, setPublicMenuOpen, navigate, t } = useApp()
  return (
    <header className="public-header">
      <div className="public-nav container">
        <Logo onClick={() => navigate("home")} />
        <nav className="desktop-nav" aria-label="Main navigation">
          <button
            onClick={() => navigate("home")}
            className={page === "home" ? "active" : ""}
          >
            {t("Home")}
          </button>
          <button
            onClick={() => {
              navigate("home")
              setTimeout(
                () =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" }),
                50,
              )
            }}
          >
            {t("About")}
          </button>
          <button
            onClick={() => {
              navigate("home")
              setTimeout(
                () =>
                  document
                    .getElementById("public-announcements")
                    ?.scrollIntoView({ behavior: "smooth" }),
                50,
              )
            }}
          >
            {t("Announcements")}
          </button>
        </nav>
        <div className="nav-actions">
          <PreferenceControls />
          <button className="nav-login" onClick={() => navigate("login")}>
            {t("Log in")}
          </button>
          <Button onClick={() => navigate("register")} icon="arrow">
            Get started
          </Button>
          <button
            className="public-menu-trigger"
            onClick={() => setPublicMenuOpen(!publicMenuOpen)}
            aria-label="Open navigation"
            aria-expanded={publicMenuOpen}
          >
            <Icon name={publicMenuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>
      {publicMenuOpen && (
        <nav className="public-mobile-nav" aria-label="Mobile navigation">
          <button onClick={() => navigate("home")}>{t("Home")}</button>
          <button
            onClick={() => {
              navigate("home")
              setTimeout(
                () =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" }),
                50,
              )
            }}
          >
            {t("About")}
          </button>
          <button
            onClick={() => {
              navigate("home")
              setTimeout(
                () =>
                  document
                    .getElementById("public-announcements")
                    ?.scrollIntoView({ behavior: "smooth" }),
                50,
              )
            }}
          >
            {t("Announcements")}
          </button>
          <button onClick={() => navigate("login")}>{t("Log in")}</button>
        </nav>
      )}
    </header>
  )
}
