/*
  AppContext holds all of the app's state and the functions that change it.
  Pages and components read what they need with:  const { ... } = useApp()

  To connect a backend later, replace the places marked "BACKEND:" with
  fetch() calls.
*/
import { createContext, useContext, useState } from "react"
import { usePreferences } from "./PreferencesContext"
import { translate } from "../i18n/filipino"
import { ADMIN_MENUS, DEVELOPER_ACCESS_PASSWORD, MENUS } from "../data/constants"
import {
  INITIAL_ADMINS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_REPORTS,
  INITIAL_RESIDENTS,
} from "../data/sampleData"

const AppContext = createContext(null)

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used inside <AppProvider>")
  return context
}

const today = () =>
  new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

export function AppProvider({ children }) {
  const { language } = usePreferences()
  const t = (value) => translate(value, language)

  // session
  const [page, setPage] = useState("home")
  const [role, setRole] = useState(null) // "resident" | "admin" | "superadmin" | null
  const [adminLevel, setAdminLevel] = useState(null) // 1 | 2 | 3
  const [name, setName] = useState("Maria Santos")
  const [email, setEmail] = useState("maria@example.com")
  const [contact, setContact] = useState("0917 123 4567")
  const [address, setAddress] = useState("24 Mabini Street, Zone 2")

  // data (BACKEND: load these from your API)
  const [reports, setReports] = useState(INITIAL_REPORTS)
  const [residents, setResidents] = useState(INITIAL_RESIDENTS)
  const [admins, setAdmins] = useState(INITIAL_ADMINS)
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS)
  const [settings, setSettings] = useState({
    barangay: "Jose Panganiban",
    address: "Jose Panganiban, Camarines Norte",
    contact: "(02) 8123 4567",
    email: "hello@barangayconnect.ph",
    system: "BarangayConnect",
    notifications: true,
    maintenance: false,
  })

  // UI
  const [selectedReport, setSelectedReport] = useState(INITIAL_REPORTS[0].id)
  const [draftPosition, setDraftPosition] = useState(null)
  const [mapError, setMapError] = useState("")
  const [mapZoom, setMapZoom] = useState(15)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All statuses")
  const [categoryFilter, setCategoryFilter] = useState("All categories")
  const [notice, setNotice] = useState("")
  // "admin" | "announcement" | "announcement-detail" | "password" | null
  const [modal, setModal] = useState(null)
  const [editingAdmin, setEditingAdmin] = useState(null)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [publicMenuOpen, setPublicMenuOpen] = useState(false)
  const [profileEditing, setProfileEditing] = useState(false)

  // derived values
  const report = reports.find((r) => r.id === selectedReport) || reports[0]
  const myReports = reports.filter((r) => r.resident === name)
  const visibleMapReports = role === "resident" ? myReports : reports
  const filteredMapReports = visibleMapReports.filter(
    (r) => statusFilter === "All statuses" || r.status === statusFilter,
  )
  const activeMapReport =
    filteredMapReports.find((r) => r.id === selectedReport) || filteredMapReports[0]
  const filteredReports = (role === "resident" ? myReports : reports).filter(
    (r) =>
      `${r.id} ${r.title} ${r.resident} ${r.category}`.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "All statuses" || r.status === statusFilter) &&
      (categoryFilter === "All categories" || r.category === categoryFilter),
  )
  const effectiveAdminLevel = adminLevel || 1
  const roleMenus = !role ? [] : role === "admin" ? ADMIN_MENUS[effectiveAdminLevel] : MENUS[role]
  const canManageBarangay = role === "superadmin" || (role === "admin" && effectiveAdminLevel === 3)
  const canGenerateReports = role === "superadmin" || (role === "admin" && effectiveAdminLevel >= 2)

  // actions
  function navigate(next) {
    if (next === "submit") {
      setDraftPosition(null)
      setMapError("")
    }
    setPublicMenuOpen(false)
    setPage(next)
    setNotice("")
    setSidebarOpen(false)
    setProfileEditing(false)
    setSearch("")
    setStatusFilter("All statuses")
    setCategoryFilter("All categories")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // show a message at the top of the page
  function notify(message) {
    setNotice(message)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function loginAs(nextRole, nextName, nextEmail, nextAdminLevel = null) {
    setRole(nextRole)
    setAdminLevel(nextRole === "admin" ? nextAdminLevel || 1 : null)
    setName(nextName)
    setEmail(nextEmail)
    setContact(nextRole === "resident" ? "0917 123 4567" : "0917 555 0101")
    setAddress(nextRole === "resident" ? "24 Mabini Street, Zone 2" : "Barangay San Isidro")
    navigate("dashboard")
  }

  function handleLogin(e) {
    // BACKEND: POST /auth/login
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const entered = String(data.get("email")).trim().toLowerCase()
    const enteredPassword = String(data.get("password"))
    if (entered === "superadmin@barangayconnect.ph") {
      if (enteredPassword !== DEVELOPER_ACCESS_PASSWORD) {
        notify("Developer access only. The supplied credentials are not valid.")
        return
      }
      loginAs("superadmin", "BarangayConnect Developer", entered)
    } else {
      const administrator = admins.find((a) => a.email.toLowerCase() === entered && a.status === "Active")
      const person = residents.find((r) => r.email.toLowerCase() === entered && r.status === "Active")
      if (administrator) {
        loginAs("admin", administrator.name, entered, administrator.level || 1)
        setContact(administrator.contact)
        setAddress(administrator.address)
      } else if (person) {
        loginAs("resident", person.name, entered)
        setContact(person.contact)
        setAddress(person.address)
      } else {
        notify("Account not found. Create a resident account or try one of the demo roles below.")
      }
    }
  }

  function handleRegister(e) {
    // BACKEND: POST /auth/register
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const registrationEmail = String(data.get("email")).trim().toLowerCase()
    const registrationContact = String(data.get("contact")).trim()
    if (!/^[a-z0-9._%+-]+@gmail\.com$/i.test(registrationEmail)) {
      notify("Please use a valid Gmail address ending in @gmail.com.")
      return
    }
    if (!/^\d{11}$/.test(registrationContact)) {
      notify("Contact number must contain exactly 11 digits.")
      return
    }
    if (data.get("password") !== data.get("confirm")) {
      notify("Passwords do not match. Please try again.")
      return
    }
    const person = {
      id: `RES-${String(residents.length + 1).padStart(3, "0")}`,
      name: String(data.get("name")),
      email: registrationEmail,
      contact: registrationContact,
      address: String(data.get("address")),
      status: "Active",
    }
    setResidents([person, ...residents])
    loginAs("resident", person.name, person.email)
    setContact(person.contact)
    setAddress(person.address)
    setNotice("Your account has been created. Welcome to BarangayConnect!")
  }

  function submitConcern(e) {
    // BACKEND: POST /reports (send the photo as multipart/form-data)
    e.preventDefault()
    if (!draftPosition) {
      setMapError("Choose a spot on the map to place your report pin.")
      return
    }
    const data = new FormData(e.currentTarget)
    const photo = data.get("photo")
    const newReport = {
      id: `BC-2025-${String(42 + reports.length - INITIAL_REPORTS.length).padStart(3, "0")}`,
      title: String(data.get("title")),
      category: String(data.get("category")),
      description: String(data.get("description")),
      location: String(data.get("location")),
      date: today(),
      status: "Pending",
      resident: name,
      priority: "Medium",
      remarks: "",
      position: draftPosition,
      photo: photo instanceof File && photo.size ? URL.createObjectURL(photo) : undefined,
    }
    setReports([newReport, ...reports])
    setSelectedReport(newReport.id)
    setDraftPosition(null)
    navigate("map")
    setNotice("Your concern has been submitted successfully.")
  }

  function updateReport(e) {
    // BACKEND: PATCH /reports/:id
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setReports(
      reports.map((r) =>
        r.id === selectedReport
          ? { ...r, status: String(data.get("status")), remarks: String(data.get("remarks")) }
          : r,
      ),
    )
    notify("Report update saved successfully.")
  }

  function saveAdmin(e) {
    // BACKEND: POST /admins or PATCH /admins/:id
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const person = {
      id: editingAdmin?.id || `ADM-${String(admins.length + 1).padStart(3, "0")}`,
      name: String(data.get("name")),
      email: String(data.get("email")),
      contact: String(data.get("contact")),
      address: String(data.get("address")),
      level: Number(data.get("level") || editingAdmin?.level || 1),
      status: editingAdmin?.status || "Active",
      date: editingAdmin?.date || today(),
    }
    setAdmins(editingAdmin ? admins.map((a) => (a.id === editingAdmin.id ? person : a)) : [person, ...admins])
    setModal(null)
    setEditingAdmin(null)
    notify(editingAdmin ? "Admin details updated." : "New admin account created.")
  }

  function saveAnnouncement(e) {
    // BACKEND: POST /announcements
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setAnnouncements([
      {
        id: Date.now(),
        title: String(data.get("title")),
        category: String(data.get("category")),
        description: String(data.get("description")),
        date: today(),
      },
      ...announcements,
    ])
    setModal(null)
    notify("Announcement published successfully.")
  }

  function saveProfile(e) {
    // BACKEND: PATCH /me
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const nextName = String(data.get("name"))
    const nextEmail = String(data.get("email"))
    const nextContact = String(data.get("contact"))
    const nextAddress = String(data.get("address"))
    if (role === "resident") {
      setResidents(
        residents.map((r) =>
          r.email === email ? { ...r, name: nextName, email: nextEmail, contact: nextContact, address: nextAddress } : r,
        ),
      )
      setReports(reports.map((r) => (r.resident === name ? { ...r, resident: nextName } : r)))
    }
    setName(nextName)
    setEmail(nextEmail)
    setContact(nextContact)
    setAddress(nextAddress)
    setProfileEditing(false)
    notify("Profile changes saved successfully.")
  }

  function viewReport(id) {
    setSelectedReport(id)
    navigate("report-detail")
  }

  function exportReports() {
    const rows = [
      ["Report ID", "Resident", "Concern", "Category", "Date", "Status"],
      ...reports.map((r) => [r.id, r.resident, r.title, r.category, r.date, r.status]),
    ]
    // a leading ' stops spreadsheet apps from running cells that start with = + - @
    const safe = (cell) => (/^[=+\-@\t\r]/.test(cell) ? "'" + cell : cell)
    const csv = rows.map((row) => row.map((cell) => `"${safe(String(cell)).replace(/"/g, '""')}"`).join(",")).join("\n")
    const url = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }))
    const link = document.createElement("a")
    link.href = url
    link.download = "barangayconnect-reports.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  const value = {
    // translation
    t,
    language,
    // session
    page, role, adminLevel, name, email, contact, address,
    setRole, setAdminLevel,
    // data
    reports, residents, admins, announcements, settings,
    setReports, setResidents, setAdmins, setAnnouncements, setSettings,
    // ui
    selectedReport, draftPosition, mapError, mapZoom, search, statusFilter, categoryFilter,
    notice, modal, editingAdmin, selectedAnnouncement, sidebarOpen, publicMenuOpen, profileEditing,
    setSelectedReport, setDraftPosition, setMapError, setMapZoom, setSearch, setStatusFilter,
    setCategoryFilter, setNotice, setModal, setEditingAdmin, setSelectedAnnouncement,
    setSidebarOpen, setPublicMenuOpen, setProfileEditing,
    // derived
    report, myReports, visibleMapReports, filteredMapReports, activeMapReport, filteredReports,
    effectiveAdminLevel, roleMenus, canManageBarangay, canGenerateReports,
    // actions
    navigate, notify, loginAs, handleLogin, handleRegister, submitConcern, updateReport,
    saveAdmin, saveAnnouncement, saveProfile, viewReport, exportReports,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
