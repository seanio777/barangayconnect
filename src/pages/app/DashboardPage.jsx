import { useApp } from "../../context/AppContext"
import ResidentDashboard from "./ResidentDashboard"
import AdminDashboard from "./AdminDashboard"
import SuperAdminDashboard from "./SuperAdminDashboard"

export default function DashboardPage() {
  const { role } = useApp()
  if (role === "resident") return <ResidentDashboard />
  if (role === "admin") return <AdminDashboard />
  return <SuperAdminDashboard />
}
