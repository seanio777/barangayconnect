/*
  Sample data used by the prototype (kept in React state, not saved).
  Replace the INITIAL_* arrays with API calls when the backend is ready.
*/

export const INITIAL_REPORTS = [
  {
    id: "BC-2025-041",
    title: "Broken streetlight on Mabini Street",
    category: "Streetlight",
    description:
      "The streetlight near the corner of Mabini Street has not been working for several nights. The area gets quite dark in the evening.",
    location: "Mabini Street, near the basketball court",
    date: "May 21, 2025",
    status: "In Progress",
    resident: "Maria Santos",
    priority: "Medium",
    remarks: "Your concern has been forwarded to the maintenance team.",
    position: { lat: 14.2913, lng: 122.6937 },
  },
  {
    id: "BC-2025-038",
    title: "Garbage collection delay",
    category: "Garbage",
    description: "Garbage has not been collected in our street this week.",
    location: "Rizal Street, Zone 2",
    date: "May 19, 2025",
    status: "Under Review",
    resident: "Maria Santos",
    priority: "Low",
    remarks: "We are reviewing your concern.",
    position: { lat: 14.2888, lng: 122.6945 },
  },
  {
    id: "BC-2025-032",
    title: "Pothole near the market",
    category: "Road Damage",
    description: "There is a large pothole by the public market entrance.",
    location: "Market Road, Zone 1",
    date: "May 15, 2025",
    status: "Resolved",
    resident: "Maria Santos",
    priority: "High",
    remarks: "The road has been repaired. Thank you for reporting.",
    position: { lat: 14.2885, lng: 122.6917 },
  },
  {
    id: "BC-2025-029",
    title: "Low water pressure in Zone 3",
    category: "Water",
    description: "Water pressure has been low since Monday morning.",
    location: "Zone 3",
    date: "May 12, 2025",
    status: "Pending",
    resident: "Juan Dela Cruz",
    priority: "Medium",
    remarks: "",
    position: { lat: 14.2878, lng: 122.6962 },
  },
  {
    id: "BC-2025-025",
    title: "Obstructed sidewalk",
    category: "Safety",
    description: "The sidewalk is blocked by debris.",
    location: "Bonifacio Avenue",
    date: "May 10, 2025",
    status: "Resolved",
    resident: "Ana Reyes",
    priority: "Low",
    remarks: "The sidewalk has been cleared.",
    position: { lat: 14.2865, lng: 122.6964 },
  },
]
export const INITIAL_RESIDENTS = [
  {
    id: "RES-001",
    name: "Maria Santos",
    email: "maria@example.com",
    contact: "0917 123 4567",
    address: "24 Mabini Street, Zone 2",
    status: "Active",
  },
  {
    id: "RES-002",
    name: "Juan Dela Cruz",
    email: "juan@example.com",
    contact: "0918 234 5678",
    address: "18 Rizal Street, Zone 3",
    status: "Active",
  },
  {
    id: "RES-003",
    name: "Ana Reyes",
    email: "ana@example.com",
    contact: "0919 345 6789",
    address: "7 Bonifacio Avenue",
    status: "Active",
  },
]
export const INITIAL_ADMINS = [
  {
    id: "ADM-001",
    name: "Elena Cruz",
    email: "admin@barangayconnect.ph",
    contact: "0917 555 0101",
    address: "Barangay San Isidro",
    status: "Active",
    date: "Apr 10, 2025",
    level: 3,
  },
  {
    id: "ADM-002",
    name: "Paolo Mendoza",
    email: "paolo@barangayconnect.ph",
    contact: "0917 555 0102",
    address: "Barangay Mabuhay",
    status: "Active",
    date: "Apr 18, 2025",
    level: 2,
  },
  {
    id: "ADM-003",
    name: "Lea Garcia",
    email: "lea@barangayconnect.ph",
    contact: "0917 555 0103",
    address: "Barangay Maligaya",
    status: "Active",
    date: "May 02, 2025",
    level: 1,
  },
]
export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Community Clean-Up Drive",
    date: "May 24, 2025",
    category: "Community",
    description:
      "Join us this Saturday for our community clean-up activity. Let’s work together to keep our streets clean and welcoming. Meet us at the barangay hall at 7:00 AM.",
  },
  {
    id: 2,
    title: "Free Health Check-Up",
    date: "May 20, 2025",
    category: "Health",
    description:
      "Free basic health consultations and blood pressure checks are available at the barangay health center this Friday, from 9:00 AM to 3:00 PM.",
  },
  {
    id: 3,
    title: "Barangay Hall Holiday Schedule",
    date: "May 16, 2025",
    category: "Notice",
    description:
      "Please note our updated office hours for the upcoming holiday. Regular services will resume on the next business day.",
  },
]
