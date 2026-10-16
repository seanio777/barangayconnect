import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import Badge from "../../components/Badge"
import PageHeading from "../../components/PageHeading"
import { ADMIN_LEVEL_NAMES } from "../../data/constants"

export default function AdminsPage() {
  const { admins, search, setAdmins, setSearch, setModal, setEditingAdmin, notify } = useApp()
  return (
    <>
      <PageHeading
        eyebrow="PEOPLE / ADMINISTRATORS"
        title="Manage admins"
        description="Manage the people who support your barangay communities."
        action={
          <Button
            icon="plusSquare"
            onClick={() => {
              setEditingAdmin(null)
              setModal("admin")
            }}
          >
            Add admin
          </Button>
        }
      />
      <div className="panel list-panel">
        <div className="list-toolbar">
          <div className="search-box">
            <Icon name="search" size={18} />
            <input
              placeholder="Search admins..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search admins"
            />
          </div>
          <span className="record-count">
            {admins.length} administrators
          </span>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Admin ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin level</th>
                <th>Barangay / Area</th>
                <th>Status</th>
                <th>Date Created</th>
                <th className="align-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {admins
                .filter((a) =>
                  `${a.id} ${a.name} ${a.email} ${a.address}`
                    .toLowerCase()
                    .includes(search.toLowerCase()),
                )
                .map((a) => (
                  <tr key={a.id}>
                    <td className="table-id">{a.id}</td>
                    <td className="table-strong">{a.name}</td>
                    <td>{a.email}</td>
                    <td>
                      <span className="admin-level-label">
                        Level {a.level || 1} ·{" "}
                        {ADMIN_LEVEL_NAMES[a.level || 1]}
                      </span>
                    </td>
                    <td>{a.address}</td>
                    <td>
                      <Badge status={a.status} />
                    </td>
                    <td>{a.date}</td>
                    <td className="align-right">
                      <button
                        className="table-link"
                        onClick={() => {
                          setEditingAdmin(a)
                          setModal("admin")
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="table-link subdued"
                        onClick={() => {
                          setAdmins(
                            admins.map((p) =>
                              p.id === a.id
                                ? {
                                    ...p,
                                    status:
                                      p.status === "Active"
                                        ? "Inactive"
                                        : "Active",
                                  }
                                : p,
                            ),
                          )
                          notify(
                            `Admin account ${
                              a.status === "Active"
                                ? "deactivated"
                                : "activated"
                            }.`,
                          )
                        }}
                      >
                        {a.status === "Active"
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
