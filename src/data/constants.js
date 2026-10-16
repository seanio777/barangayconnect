export const STATUSES = ["Pending", "Under Review", "In Progress", "Resolved", "Rejected"];

export const CATEGORIES = ["Garbage", "Road Damage", "Streetlight", "Water", "Safety", "Other"];

/* Sidebar menus. Each admin level (1-3) gets a different menu. */
export const MENUS = {
  resident: [
    { label: "Dashboard", page: "dashboard", icon: "grid" },
    { label: "Submit Concern", page: "submit", icon: "plusSquare" },
    { label: "My Reports", page: "my-reports", icon: "file" },
    { label: "Report Map", page: "map", icon: "pin" },
    { label: "Announcements", page: "announcements", icon: "megaphone" },
    { label: "Profile", page: "profile", icon: "user" },
  ],
  superadmin: [
    { label: "Dashboard", page: "dashboard", icon: "grid" },
    { label: "Manage Admins", page: "admins", icon: "shield" },
    { label: "Residents", page: "residents", icon: "users" },
    { label: "Reports", page: "reports", icon: "file" },
    { label: "Report Map", page: "map", icon: "pin" },
    { label: "System Reports", page: "system-reports", icon: "chart" },
    { label: "Settings", page: "settings", icon: "settings" },
    { label: "Profile", page: "profile", icon: "user" },
  ],
};

export const ADMIN_MENUS = {
  1: [
    { label: "Dashboard", page: "dashboard", icon: "grid" },
    { label: "Reports", page: "reports", icon: "file" },
    { label: "Report Map", page: "map", icon: "pin" },
    { label: "Profile", page: "profile", icon: "user" },
  ],
  2: [
    { label: "Dashboard", page: "dashboard", icon: "grid" },
    { label: "Reports", page: "reports", icon: "file" },
    { label: "Report Map", page: "map", icon: "pin" },
    { label: "System Reports", page: "system-reports", icon: "chart" },
    { label: "Profile", page: "profile", icon: "user" },
  ],
  3: [
    { label: "Dashboard", page: "dashboard", icon: "grid" },
    { label: "Manage Admins", page: "admins", icon: "shield" },
    { label: "Residents", page: "residents", icon: "users" },
    { label: "Reports", page: "reports", icon: "file" },
    { label: "Report Map", page: "map", icon: "pin" },
    { label: "System Reports", page: "system-reports", icon: "chart" },
    { label: "Announcements", page: "announcements", icon: "megaphone" },
    { label: "Settings", page: "settings", icon: "settings" },
    { label: "Profile", page: "profile", icon: "user" },
  ],
};

export const ADMIN_LEVEL_NAMES = { 1: "Barangay Tanod", 2: "Secretary", 3: "Punong Barangay" };

/* PROTOTYPE ONLY: replace with real server-side authentication. */
export const DEVELOPER_ACCESS_PASSWORD = "dev-access-only";

/* Map center: Jose Panganiban, Camarines Norte */
export const JOSE_PANGANIBAN = [14.2903434, 122.691494];
