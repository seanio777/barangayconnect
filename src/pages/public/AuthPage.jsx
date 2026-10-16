import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import Field from "../../components/Field"

export default function AuthPage() {
  const { page, notice, setModal, navigate, loginAs, handleLogin, handleRegister, t } = useApp()
  return (
    <main className="auth-page">
      <div className="auth-side">
        <div className="auth-side-inner">
          <div className="eyebrow">YOUR COMMUNITY STARTS HERE</div>
          <h2>
            Every voice makes
            <br />a <em>difference.</em>
          </h2>
          <p>
            A simple space for neighbors to connect, speak up, and build a
            better barangay together.
          </p>
          <div className="auth-side-card">
            <span className="auth-card-icon">
              <Icon name="heart" size={22} />
            </span>
            <span>Small actions. Stronger communities.</span>
          </div>
        </div>
        <div className="auth-shape auth-shape-one" />
        <div className="auth-shape auth-shape-two" />
      </div>
      <div className="auth-form-wrap">
        <div className="auth-form-inner">
          <button className="back-link" onClick={() => navigate("home")}>
            <Icon name="back" size={17} /> {t("Back to home")}
          </button>
          {page === "login" ? (
            <>
              <div className="eyebrow">{t("WELCOME BACK")}</div>
              <h1>
                {t("Good to see you")} <em>{t("again.")}</em>
              </h1>
              <p className="auth-description">
                {t("Log in to stay connected with your community.")}
              </p>
              {notice && (
                <div className="inline-alert error">{notice}</div>
              )}
              <form onSubmit={handleLogin} className="stack-form">
                <Field
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
                <Field
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="forgot-link"
                  onClick={() => setModal("password")}
                >
                  {t("Forgot password?")}
                </button>
                <Button type="submit" className="full-width" icon="arrow">
                  Log in
                </Button>
              </form>
              <div className="auth-switch">
                New to BarangayConnect?{" "}
                <button onClick={() => navigate("register")}>
                  Create an account
                </button>
              </div>
              <div className="demo-logins">
                <span className="demo-label">EXPLORE THE PROTOTYPE</span>
                <p>
                  Try a role to see its workspace. Any password works.
                </p>
                <div className="demo-options">
                  <button
                    onClick={() =>
                      loginAs(
                        "resident",
                        "Maria Santos",
                        "maria@example.com",
                      )
                    }
                  >
                    <Icon name="user" size={17} /> Resident
                  </button>
                  <button
                    onClick={() =>
                      loginAs(
                        "admin",
                        "Elena Cruz",
                        "admin@barangayconnect.ph",
                        3,
                      )
                    }
                  >
                    <Icon name="users" size={17} /> Admin
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="eyebrow">JOIN YOUR COMMUNITY</div>
              <h1>
                Let’s get you <em>connected.</em>
              </h1>
              <p className="auth-description">
                Create your resident account in just a moment.
              </p>
              <form onSubmit={handleRegister} className="stack-form">
                <Field
                  label="Full name"
                  name="name"
                  placeholder="e.g. Maria Santos"
                  required
                />
                <Field
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="you@gmail.com"
                  pattern="[A-Za-z0-9._%+\-]+@gmail\.com"
                  title="Use a Gmail address ending in @gmail.com"
                  required
                />
                <Field
                  label="Contact number"
                  name="contact"
                  type="tel"
                  placeholder="09XXXXXXXXX"
                  pattern="[0-9]{11}"
                  maxLength={11}
                  inputMode="numeric"
                  title="Enter exactly 11 digits"
                  required
                />
                <Field
                  label="Address"
                  name="address"
                  placeholder="House no., street, zone"
                  required
                />
                <div className="form-grid">
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Create password"
                    required
                  />
                  <Field
                    label="Confirm password"
                    name="confirm"
                    type="password"
                    placeholder="Confirm password"
                    required
                  />
                </div>
                {notice && (
                  <div className="inline-alert error">{notice}</div>
                )}
                <Button type="submit" className="full-width" icon="arrow">
                  Create account
                </Button>
              </form>
              <div className="auth-switch">
                {t("Already have an account?")}{" "}
                <button onClick={() => navigate("login")}>
                  {t("Log in")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
