import { useEffect } from "react"
import { PreferencesProvider } from "./context/PreferencesContext"
import { AppProvider, useApp } from "./context/AppContext"
import PublicSite from "./pages/public/PublicSite"
import AppShell from "./layout/AppShell"

function AppContent() {
  const { role, page, navigate } = useApp()
  const isPublicPage = page === "home" || page === "login" || page === "register"

  // a visitor who is not logged in can only see the public pages
  useEffect(() => {
    if (!role && !isPublicPage) navigate("home")
  }, [role, isPublicPage])

  if (!role) return isPublicPage ? <PublicSite /> : null
  return <AppShell />
}

export default function App() {
  return (
    <PreferencesProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </PreferencesProvider>
  )
}
