import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import Field from "../../components/Field"
import PageHeading from "../../components/PageHeading"
import SectionTitle from "../../components/SectionTitle"
import NeighborhoodMap from "../../components/NeighborhoodMap"
import { CATEGORIES } from "../../data/constants"

export default function SubmitConcernPage() {
  const { draftPosition, mapError, setDraftPosition, setMapError, navigate, notify, submitConcern } = useApp()
  return (
    <>
      <PageHeading
        eyebrow="MAKE YOUR VOICE HEARD"
        title="Report a concern"
        description="Tell us what’s happening. Your barangay is here to help."
      />
      <div className="form-layout">
        <div className="panel form-panel">
          <SectionTitle
            title="Concern details"
            subtitle="Please provide as much detail as you can."
          />
          <form onSubmit={submitConcern} className="stack-form">
            <Field
              label="Concern title"
              name="title"
              placeholder="e.g. Broken streetlight on Mabini Street"
              required
            />
            <div className="form-grid">
              <Field label="Category" name="category" required>
                <select name="category" required defaultValue="">
                  <option value="" disabled>
                    Select a category
                  </option>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field
                label="Location"
                name="location"
                placeholder="Street, zone, or landmark"
                required
              />
            </div>
            <Field label="Description" name="description" required>
              <textarea
                name="description"
                rows={5}
                placeholder="Describe the concern and any useful details..."
                required
              />
            </Field>
            <div className="field">
              <span className="field-label">
                Pin the location <span className="required">*</span>
              </span>
              <p className="map-field-hint">
                Find the location in Jose Panganiban, then tap the map to place your pin.
                You can pan and zoom to pinpoint the spot. Your report will appear on the map when submitted.
              </p>
              <div className="map-picker">
                <NeighborhoodMap
                  draft={draftPosition}
                  onPick={(position) => {
                    setDraftPosition(position)
                    setMapError("")
                  }}
                />
              </div>
              <div
                className={`map-picker-feedback ${
                  mapError ? "map-picker-error" : ""
                }`}
                role="status"
              >
                <Icon
                  name={draftPosition ? "check" : "pin"}
                  size={16}
                />
                {mapError ||
                  (draftPosition
                    ? "Location pinned. Tap the map again to move it."
                    : "No location pinned yet")}
              </div>
            </div>
            <label className="field">
              <span className="field-label">
                Upload photo{" "}
                <span className="optional">(optional)</span>
              </span>
              <span className="upload-box">
                <Icon name="upload" size={25} />
                <strong>Click to upload a photo</strong>
                <small>JPG or PNG, up to 5 MB</small>
                <input
                  type="file"
                  name="photo"
                  accept="image/png,image/jpeg"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f && f.size > 5 * 1024 * 1024) {
                      e.target.value = ""
                      notify("Please choose a photo under 5 MB.")
                    }
                  }}
                />
              </span>
            </label>
            <div className="form-actions">
              <Button type="submit" icon="arrow">
                Submit report
              </Button>
              <Button
                variant="text"
                onClick={() => navigate("dashboard")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
        <div className="tip-card">
          <span className="tip-icon">
            <Icon name="spark" size={22} />
          </span>
          <h3>A little detail goes a long way.</h3>
          <p>
            A clear description and location help your barangay team
            understand and respond to your concern more quickly.
          </p>
          <div className="tip-divider" />
          <span>
            <Icon name="lock" size={16} /> Only you and barangay staff
            can see your report.
          </span>
        </div>
      </div>
    </>
  )
}
