# BarangayConnect

**Connect with your barangay.** BarangayConnect is a web app where residents report community concerns, track their progress, and read barangay announcements. Barangay officials use it to review reports, update their status, and manage the community.

> **Prototype notice:** This is a front-end prototype. Data is kept in the browser only and resets when you refresh the page. There is no real login or database yet.

## Table of contents

- [Features](#features)
- [Try it](#try-it)
- [How to use the website](#how-to-use-the-website)
- [Run it on your computer](#run-it-on-your-computer)
- [Tech used](#tech-used)
- [Project structure](#project-structure)
- [Current limitations](#current-limitations)

## Features

**For everyone**

- Landing page with a short guide and the latest announcements
- Create a resident account and log in
- English and Filipino language switch
- Light and dark mode
- Works on desktop, tablet and phone

**For residents**

- Dashboard with a summary of your reports
- Report a concern: title, category, location, description, a pin on the map, and an optional photo
- My Reports list with search and filters
- Report details with a progress timeline and barangay remarks
- Report Map that shows where your reports are
- Announcements from the barangay
- Edit your profile

**For barangay admins** (three levels, each with more access)

- Dashboard with totals for residents and reports
- Review all reports, with search and filters
- Report Map of every concern
- Update a report's status and write remarks for the resident (Level 3)
- System reports with charts and CSV export (Level 2 and 3)
- Manage admins, view and activate residents, post announcements, and edit settings (Level 3)

**For the super admin (developer)**

- Overview of admins, residents and reports
- Manage admins and residents
- System reports and settings
- Change password

## Try it

Open the website and click **Log in**. Use one of these accounts:

| Role                             | Email                           | Password          |
| -------------------------------- | ------------------------------- | ----------------- |
| Resident                         | `maria@example.com`             | any               |
| Admin, Level 3 (Punong Barangay) | `admin@barangayconnect.ph`      | any               |
| Admin, Level 2 (Secretary)       | `paolo@barangayconnect.ph`      | any               |
| Admin, Level 1 (Barangay Tanod)  | `lea@barangayconnect.ph`        | any               |
| Super admin                      | `superadmin@barangayconnect.ph` | `dev-access-only` |

You can also click the **Resident** or **Admin** buttons under "Explore the prototype" on the login page.

To create your own resident account, click **Get started**. You need a Gmail address and an 11-digit contact number (for example `09171234567`).

## How to use the website

### Language and theme

At the top of every page there are two small buttons:

- The moon or sun button switches between dark and light mode.
- The **FIL / EN** button switches between Filipino and English.

### Before you log in

- Use the top menu to go to **Home**, **About** or **Announcements**.
- Click **Read more** on an announcement to open it.
- Click **Log in** or **Get started** to sign in or create an account.
- On the login page, **Forgot password?** shows how a reset would work. No email is sent in this prototype.

### As a resident

Use the menu on the left. On a phone, tap the menu icon at the top left.

| Menu item          | What you can do                                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| **Dashboard**      | See how many reports you have, and which are pending, in progress or resolved. Read the latest community notes. |
| **Submit Concern** | Report a problem. See the steps below.                                                                          |
| **My Reports**     | See all your reports. Search by title or ID, and filter by status or category. Click **View** to open one.      |
| **Report Map**     | See your reports as pins on the map. Click a pin or a list item to see its details. Filter by status.           |
| **Announcements**  | Read news and notices from the barangay.                                                                        |
| **Profile**        | See your details. Click **Edit profile** to change your name, email, contact number or address.                 |

**How to report a concern**

1. Click **Submit Concern**.
2. Enter a short title, choose a category, and type the location.
3. Describe what is happening.
4. Find the spot on the map and click it to drop a pin. You can also move the map and click **Pin map center**. A pin is required.
5. Add a photo if you want (JPG or PNG, up to 5 MB).
6. Click **Submit report**. You will see your new report on the Report Map.

**How to follow a report**
Open **My Reports**, click **View**, and check the **Report progress** timeline. The stages are Submitted, Under Review, In Progress and Resolved. Any message from the barangay appears under **Barangay remarks**.

### As an admin

What you see in the menu depends on your level.

| Menu item                        | Level 1 | Level 2 | Level 3 |
| -------------------------------- | :-----: | :-----: | :-----: |
| Dashboard                        |   Yes   |   Yes   |   Yes   |
| Reports (view)                   |   Yes   |   Yes   |   Yes   |
| Report Map                       |   Yes   |   Yes   |   Yes   |
| System Reports                   |         |   Yes   |   Yes   |
| Update report status and remarks |         |         |   Yes   |
| Manage Admins                    |         |         |   Yes   |
| Residents                        |         |         |   Yes   |
| Announcements (post and remove)  |         |         |   Yes   |
| Settings                         |         |         |   Yes   |
| Profile                          |   Yes   |   Yes   |   Yes   |

**Reviewing and updating a report**

1. Click **Reports** in the menu.
2. Search, or filter by status or category.
3. Click **View** on a report.
4. Level 3 admins use the **Update report** box to choose a new status, write remarks, and click **Save update**. Levels 1 and 2 can read the report only.

**Other admin tasks (Level 3)**

- **Manage Admins:** click **Add admin** to create an account and pick a level. Use **Edit** to change details, and **Deactivate** to block an account.
- **Residents:** search residents, click **View** for their details, or **Deactivate** an account.
- **Announcements:** click **New announcement** to post one. Use **Remove** to delete one.
- **Settings:** change the barangay information and system options, then click **Save changes**.

**System reports (Level 2 and 3)**
See how many reports there are by category, status and month. Click **Export report** to download all reports as a CSV file that opens in Excel.

### As the super admin

The super admin can manage admins and residents, read all reports, open system reports and settings, and view the map. The super admin can read reports but does not update their status. Open **Profile** and click **Change password** to change the password.

## Run it on your computer

You need [Node.js](https://nodejs.org) version 18 or newer.

```bash
# 1. Download the project
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY

# 2. Install what the project needs
npm install

# 3. Start it
npm run dev
```

Open the address shown in the terminal (usually http://localhost:5173).

Other commands:

- `npm run build` creates the final website files in the `dist` folder.
- `npm run preview` shows the built website locally.

The map and fonts need an internet connection.

## Tech used

- [React](https://react.dev) for the pages and components
- [Vite](https://vite.dev) for running and building the project
- [Leaflet](https://leafletjs.com) and OpenStreetMap for the maps
- Plain CSS for the design

## Project structure

```
src/
  main.jsx                  starts the app
  App.jsx                   shows the public site or the logged-in app
  index.css                 all styles, including dark mode
  context/                  app state and actions (AppContext), language and theme
  data/                     sample data, menus, statuses and categories
  i18n/                     Filipino translations
  components/               buttons, form fields, tables, map, modals
  layout/                   sidebar, top bar and page frame
  pages/
    public/                 landing page, login, register
    app/                    dashboards and all other pages after login
docs/screenshots/           images used in this README
```

## Current limitations

- Data is not saved. Refreshing the page brings back the sample data.
- Login is for demonstration only and does not check real passwords.
- Reset-password emails are not sent.
- New reports and photos exist only until you refresh the page.
- Sample report locations are approximate.

## Next steps

- Connect a backend and database (the places to change are marked `BACKEND:` in `src/context/AppContext.jsx`).
- Real login with secure passwords.
- Email or SMS notifications when a report status changes.
