# 🏁 Async Race Project

### Deployed UI Link: https://my-async-race-epam.netlify.app/
### Score: 400 / 400 pts

---

## 🛠 Checklist

### 🚀 UI Deployment & Repository Requirements
- [x] **UI Deployment** — Successfully deploy the UI on one of the following platforms: GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a similar service.
- [x] **Commit guidelines compliance** — Ensure that all commits follow the specified commit guidelines, promoting a clear and consistent commit history with meaningful messages.
- [x] **Checklist included in README.md** — Include the project's checklist in the README.md file, marking all implemented features.
- [x] **Score calculation** — Use this checklist to calculate your score and put it at the top of the README.md.
- [x] **UI Deployment link** — Place the link to the deployed UI at the top of the README.md file, alongside the calculated score.

---

### 📦 Basic Structure (80 points)
- [x] **Two Views (10 pts)** — Implement two primary views: "Garage" and "Winners".
- [x] **Garage View Content (30 pts)** — The "Garage" view must display: Name of view, car creation and editing panel, race control panel, and the garage section.
- [x] **Winners View Content (10 pts)** — The "Winners" view should display: Name of view ("Winners"), winners table, and pagination.
- [x] **Persistent State (30 pts)** — Ensure the view state remains consistent when navigating between views (preserving page numbers, input states, etc.).

---

### 🚗 Garage View (90 points)
- [x] **CRUD Operations (20 pts)** — Enable users to create, update, and delete cars (attributes: "name" and "color"). Handle empty and too long names. Deleting a car must remove it from both the "garage" and "winners" tables.
- [x] **Color Selection (10 pts)** — Allow color selection from an RGB palette, displaying the selected color on the car's image along with its name.
- [x] **Random Car Creation (20 pts)** — Provide a button to create random cars (100 cars per click). Names must be assembled from two random parts (at least 10 different names for each part) with a randomly generated color.
- [x] **Car Management Buttons (10 pts)** — Provide buttons near each car's image for updating its attributes or deleting it.
- [x] **Pagination (10 pts)** — Implement pagination for the "Garage" view, displaying 7 cars per page.
- [x] **EXTRA - Empty Garage (10 pts)** — Handle an empty garage with a user-friendly message like "No Cars" or similar.
- [x] **EXTRA - Empty Garage Page (10 pts)** — If you remove the last car on a page, you should be automatically moved to the previous page to hide the empty one.

---

### 🏆 Winners View (50 points)
- [x] **Display Winners (15 pts)** — After a car wins, it should be displayed in the "Winners view" table.
- [x] **Pagination for Winners (10 pts)** — Implement pagination for the "Winners" view, with 10 winners per page.
- [x] **Winners Table (15 pts)** — Include columns for car's №, image, name, number of wins, and best time in seconds. If the same car wins again, increment wins and save the time only if it is better than the stored one.
- [x] **Sorting Functionality (10 pts)** — Allow users to sort the table by the number of wins and best time, in ascending or descending order.

---

### 🏎 Race (170 points)
- [x] **Start Engine Animation (20 pts)** — Clicking start waits for the velocity API answer, animates the car, and requests to drive. If the API returns a 500 error, the car animation must stop.
- [x] **Stop Engine Animation (20 pts)** — Clicking stop waits for the API response, stops the animation, and returns the car to its initial place.
- [x] **Responsive Animation (30 pts)** — Ensure car animations are fluid and responsive on screens as small as 500px.
- [x] **Start Race Button (10 pts)** — Start button starts the race for all cars on the current page.
- [x] **Reset Race Button (15 pts)** — Reset button returns all cars on the current page to their starting positions.
- [x] **Winner Announcement (5 pts)** — After a car finishes first, display a message containing the winning car's name.
- [x] **Button States (20 pts)** — Start engine button is disabled if the car is driving. Stop engine button is disabled when the car is at its initial place.
- [x] **Actions during the race (50 pts)** — Control actions during a race (e.g., blocking buttons, stopping the race, or freezing page/view switching) to ensure predictable application operation.

---

### 🎨 Prettier and ESLint Configuration (10 points)
- [x] **Prettier Setup (5 pts)** — Prettier is correctly set up with two scripts in package.json: `format` for auto-formatting and `ci:format` for checking issues.
- [x] **ESLint Configuration (5 pts)** — ESLint is configured with the Airbnb style guide. A `lint` script runs checks. Configuration files reflect strict TypeScript settings as per tsconfig.json.

---

### 🌟 Overall Code Quality (100 points)

- [ ] Modular Design (API interaction, UI rendering, state management layers).
- [ ] Function Modularization (Small functions under 40 lines, common logic moved to helpers).
- [ ] Code Duplication and Magic Numbers minimized.
- [ ] Readability (Clear variable, function, and module names).
- [ ] Extra features (e.g., Custom hooks, Portals, React Router)