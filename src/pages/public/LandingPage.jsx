import { useApp } from "../../context/AppContext"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import Logo from "../../components/Logo"

export default function LandingPage() {
  const { announcements, setModal, setSelectedAnnouncement, navigate, t } = useApp()
  return (
    <>
      <main>
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="tiny-star">✳</span>{" "}
              {t("A better way to stay connected")}
            </div>
            <h1>
              {t("Connect with your")}
              <br />
              <em>barangay.</em>
            </h1>
            <p>
              {t(
                "Report community concerns, track your requests, and stay updated with your barangay.",
              )}
            </p>
            <div className="hero-actions">
              <Button onClick={() => navigate("login")} icon="arrow">
                Report a concern
              </Button>
              <Button variant="outline" onClick={() => navigate("login")}>
                Log in to your account
              </Button>
            </div>
            <div className="hero-trust">
              <span className="avatar-stack">
                <span>MS</span>
                <span>JD</span>
                <span>AR</span>
              </span>
              <span>
                {t("Built for neighbors, by neighbors.")}
                <br />
                <strong>{t("Making every voice count.")}</strong>
              </span>
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="Illustration of a connected neighborhood"
            role="img"
          >
            <div className="art-glow" />
            <div className="art-grid" />
            <div className="art-sun" />
            <div className="art-cloud art-cloud-one" />
            <div className="art-cloud art-cloud-two" />
            <div className="art-hill art-hill-back" />
            <div className="art-hill art-hill-front" />
            <div className="art-house art-house-left">
              <div className="house-roof" />
              <div className="house-body">
                <span />
                <span />
                <i />
              </div>
            </div>
            <div className="art-house art-house-center">
              <div className="house-roof" />
              <div className="house-body">
                <span />
                <span />
                <i />
              </div>
            </div>
            <div className="art-house art-house-right">
              <div className="house-roof" />
              <div className="house-body">
                <span />
                <span />
                <i />
              </div>
            </div>
            <div className="art-tree tree-one">
              <i />
              <span />
            </div>
            <div className="art-tree tree-two">
              <i />
              <span />
            </div>
            <div className="art-path" />
            <div className="art-float art-float-top">
              <span className="float-icon">
                <Icon name="check" size={18} />
              </span>
              <div>
                <strong>{t("Concern resolved")}</strong>
                <small>{t("Just now · Zone 2")}</small>
              </div>
            </div>
            <div className="art-float art-float-bottom">
              <span className="float-icon yellow">
                <Icon name="megaphone" size={17} />
              </span>
              <div>
                <strong>{t("Stronger together")}</strong>
                <small>{t("A community that cares")}</small>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="features-section">
          <div className="container">
            <div className="section-intro">
              <div className="eyebrow">{t("HOW IT WORKS")}</div>
              <h2>
                {t("Good things happen when")}
                <br />
                <em>{t("we stay connected.")}</em>
              </h2>
              <p>
                {t(
                  "Simple tools to help you make a difference in your neighborhood.",
                )}
              </p>
            </div>
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Icon name="plusSquare" size={26} />
                </div>
                <span className="feature-number">01 / SPEAK UP</span>
                <h3>{t("Report a concern")}</h3>
                <p>
                  See something that needs attention? Share it with your
                  barangay in just a few steps.
                </p>
                <button onClick={() => navigate("login")}>
                  Get started <Icon name="arrow" size={16} />
                </button>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <Icon name="chart" size={26} />
                </div>
                <span className="feature-number">02 / STAY INFORMED</span>
                <h3>{t("Track your report")}</h3>
                <p>
                  Follow the progress of your concern from submission to
                  resolution, every step of the way.
                </p>
                <button onClick={() => navigate("login")}>
                  Track a report <Icon name="arrow" size={16} />
                </button>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <Icon name="megaphone" size={26} />
                </div>
                <span className="feature-number">
                  03 / BE IN THE KNOW
                </span>
                <h3>{t("Stay updated")}</h3>
                <p>
                  Never miss a community announcement, upcoming event, or
                  important local update.
                </p>
                <button
                  onClick={() =>
                    document
                      .getElementById("public-announcements")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  See announcements <Icon name="arrow" size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="public-announcements"
          className="public-updates container"
        >
          <div className="section-intro left">
              <div className="eyebrow">{t("FROM YOUR BARANGAY")}</div>
            <h2>
                {t("What’s happening")} <em>{t("around you.")}</em>
            </h2>
          <p>{t("The latest news and notices from your community.")}</p>
          </div>
          <div className="public-update-grid">
            {announcements.slice(0, 2).map((a) => (
              <article className="public-update" key={a.id}>
                <span className="update-category">{a.category}</span>
                <h3>{a.title}</h3>
                <p>{a.description}</p>
                <div className="update-foot">
                  <span>
                    <Icon name="calendar" size={15} /> {a.date}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedAnnouncement(a)
                      setModal("announcement-detail")
                    }}
                  >
                  {t("Read more")} <Icon name="arrow" size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="cta-band">
          <div className="container cta-inner">
            <div>
            <div className="eyebrow">{t("A PLACE FOR EVERY VOICE")}</div>
              <h2>
                Let's make our community
                <br />
                <em>better, together.</em>
              </h2>
            </div>
            <Button
              variant="secondary"
              onClick={() => navigate("register")}
              icon="arrow"
            >
              Join your community
            </Button>
          </div>
        </section>
      </main>
      <footer className="public-footer container">
        <Logo onClick={() => navigate("home")} />
        <span>{t("Connecting people. Strengthening communities.")}</span>
        <span>© 2025 BarangayConnect</span>
      </footer>
    </>
  )
}
