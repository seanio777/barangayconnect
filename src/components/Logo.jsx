export default function Logo({ onClick, light = false }) {
  return (
    <button className={`logo ${light ? "logo-light" : ""}`} onClick={onClick} aria-label="BarangayConnect home">
      <span className="logo-mark">
        <span className="logo-roof" />
        <span className="logo-window" />
        <span className="logo-door" />
      </span>
      <span>
        barangay<span className="logo-emphasis">connect</span>
        <span className="logo-dot">.</span>
      </span>
    </button>
  )
}
