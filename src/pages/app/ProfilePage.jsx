import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import Badge from "../../components/Badge"
import Field from "../../components/Field"
import PageHeading from "../../components/PageHeading"
import SectionTitle from "../../components/SectionTitle"
import { ADMIN_LEVEL_NAMES } from "../../data/constants"

export default function ProfilePage() {
  const { role, name, email, contact, address, residents, profileEditing, setModal, setProfileEditing, effectiveAdminLevel, saveProfile } = useApp()
  return (
    <>
      <PageHeading
        eyebrow="ACCOUNT / PROFILE"
        title="My profile"
        description="Your personal details, all in one place."
      />
      <div className="profile-layout">
        <div className="panel profile-card">
          <div className="profile-cover" />
          <span className="avatar profile-avatar">
            {name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </span>
          <h2>{name}</h2>
          <p>
            {role === "resident"
              ? "Community Resident"
              : role === "admin"
                ? `Level ${effectiveAdminLevel} · ${ADMIN_LEVEL_NAMES[effectiveAdminLevel]}`
                : "Developer Administrator"}
          </p>
          <Badge status="Active" />
          <div className="profile-divider" />
          <div className="profile-id">
            <span>
              {role === "resident"
                ? "Resident ID"
                : role === "admin"
                  ? "Admin ID"
                  : "Account ID"}
            </span>
            <strong>
              {role === "resident"
                ? residents.find((r) => r.email === email)?.id ||
                  "RES-001"
                : role === "admin"
                  ? "ADM-001"
                  : "SA-001"}
            </strong>
          </div>
        </div>
        <div className="panel form-panel">
          <SectionTitle
            title="Personal information"
            subtitle="Keep your contact information up to date."
            action={
              !profileEditing && (
                <Button
                  variant="outline"
                  icon="edit"
                  onClick={() => setProfileEditing(true)}
                >
                  Edit profile
                </Button>
              )
            }
          />
          <form onSubmit={saveProfile} className="stack-form">
            <div className="form-grid">
              <Field
                label="Full name"
                name="name"
                defaultValue={name}
                required
              >
                <input
                  name="name"
                  defaultValue={name}
                  required
                  disabled={!profileEditing}
                />
              </Field>
              <Field
                label="Email address"
                name="email"
                defaultValue={email}
                required
              >
                <input
                  name="email"
                  type="email"
                  defaultValue={email}
                  required
                  disabled={!profileEditing}
                />
              </Field>
              <Field label="Contact number" name="contact">
                <input
                  name="contact"
                  defaultValue={contact}
                  disabled={!profileEditing}
                />
              </Field>
              <Field
                label={role === "resident" ? "Address" : "Role / Area"}
                name="address"
              >
                <input
                  name="address"
                  defaultValue={address}
                  disabled={!profileEditing}
                />
              </Field>
            </div>
            {profileEditing && (
              <div className="form-actions">
                <Button type="submit">Save changes</Button>
                <Button
                  variant="text"
                  onClick={() => setProfileEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
            {role === "superadmin" && !profileEditing && (
              <div className="profile-password">
                <button
                  className="text-action"
                  onClick={() => setModal("password")}
                  type="button"
                >
                  <Icon name="lock" size={17} /> Change password{" "}
                  <Icon name="arrow" size={16} />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
