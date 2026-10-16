# BarangayConnect (React)

React version of the BarangayConnect UI/UX design. Plain JavaScript (`.jsx`), plain CSS, built with Vite.

## Run it
You need Node.js 18 or newer.

```
npm install
npm run dev
```

Then open the address shown in the terminal (usually http://localhost:5173).

Other commands:
- `npm run build` makes the production files in `dist/`
- `npm run preview` serves the built files

The map and fonts need an internet connection.

## Folder guide
```
src/
  main.jsx                 starts React
  App.jsx                  picks the public site or the logged-in app
  index.css                all styles (light and dark theme)
  context/
    AppContext.jsx         all app state and actions (login, reports, admins...)
    PreferencesContext.jsx dark mode and English/Filipino
  data/
    sampleData.js          sample reports, residents, admins, announcements
    constants.js           menus, statuses, categories, map center
  i18n/filipino.js         Filipino translations
  components/              Button, Field, Badge, Icon, ReportTable, NeighborhoodMap...
    modals/                admin, announcement, password modals
  layout/                  AppShell, Sidebar, Topbar
  pages/
    public/                landing page, login and register, public header
    app/                   dashboards, reports, map, announcements, people, settings, profile
```

## How it works
- `AppContext.jsx` keeps all state. Any component can read it with `const { ... } = useApp()`.
- The data is in memory only, so a refresh resets everything.
- To connect a backend, search for `BACKEND:` in `AppContext.jsx`. Each one marks where a `fetch()` call should go.

## Demo accounts
- Resident: `maria@example.com` (any password)
- Admin Level 3: `admin@barangayconnect.ph` (any password)
- Admin Level 1: `lea@barangayconnect.ph`, Level 2: `paolo@barangayconnect.ph`
- Super admin: `superadmin@barangayconnect.ph` / `dev-access-only`

These logins are for the prototype only. Real login must be checked on the server.
