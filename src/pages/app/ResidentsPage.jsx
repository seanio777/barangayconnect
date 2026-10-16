import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Badge from "../../components/Badge"
import PageHeading from "../../components/PageHeading"

export default function ResidentsPage() {
  const { residents, search, setResidents, setSearch, notify } = useApp()
  return (
    <>
      <PageHeading
        eyebrow="PEOPLE / RESIDENTS"
        title="Residents"
        description="View and manage registered community members."
      />
      <div className="panel list-panel">
        <div className="list-toolbar">
          <div className="search-box">
            <Icon name="search" size={18} />
            <input
              placeholder="Search residents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search residents"
            />
          </div>
          <span className="record-count">
            {residents.length} residents
          </span>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Resident ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Status</th>
                <th className="align-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {residents
                .filter((r) =>
                  `${r.id} ${r.name} ${r.email}`
                    .toLowerCase()
                    .includes(search.toLowerCase()),
                )
                .map((r) => (
                  <tr key={r.id}>
                    <td className="table-id">{r.id}</td>
                    <td className="table-strong">{r.name}</td>
                    <td>{r.email}</td>
                    <td>{r.contact}</td>
                    <td>{r.address}</td>
                    <td>
                      <Badge status={r.status} />
                    </td>
                    <td className="align-right">
                      <button
                        className="table-link"
                        onClick={() =>
                          notify(
                            `${r.name} · ${r.email} · ${r.contact} · ${r.address}`,
                          )
                        }
                      >
                        View
                      </button>
                      <button
                        className="table-link subdued"
                        onClick={() => {
                          setResidents(
                            residents.map((p) =>
                              p.id === r.id
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
                            `Resident account ${
                              r.status === "Active"
                                ? "deactivated"
                                : "activated"
                            }.`,
                          )
                        }}
                      >
                        {r.status === "Active"
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
