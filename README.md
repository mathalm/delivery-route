# 🚚 Delivery Route

<img width="1919" height="927" alt="image" src="https://github.com/user-attachments/assets/009c0779-e998-4c24-bb9b-896e7f76651f" />



Plan multi-stop driving routes on an interactive map. Pick locations, see **alternative paths** from [OSRM](https://project-osrm.org/), compare **time** and **distance**, and highlight stops as you explore the list.

---

## ✨ Features

| | |
| :--- | :--- |
| 🗺️ | **Map-first UI** — pan, zoom, and compass controls centered on NYC |
| 📍 | **Multi-select stops** — autocomplete over preset New York locations |
| 🛣️ | **Route alternatives** — OSRM returns several options; click to focus the active route |
| ⏱️ | **Side panel** — duration, distance, and a “Fastest” badge on the primary option |
| ✨ | **Hover preview** — temporarily highlight a location on the map while browsing suggestions |

---

## 🧱 Tech stack

| Piece | Role |
| :--- | :--- |
| [**Next.js**](https://nextjs.org/) | App framework & dev server |
| [**React**](https://react.dev/) | UI |
| [**Tailwind CSS**](https://tailwindcss.com/) | Styling |
| [**shadcn**](https://ui.shadcn.com/) (UI kit) | Components & patterns |
| [**mapcn**](https://mapcn.dev/) / **MapLibre** | Map, markers, routes, controls |
| [**OSRM**](https://router.project-osrm.org/) (public demo router) | Driving directions & geometry |
| [**Bun**](https://bun.sh/) | Fast install & `bun dev` (npm/pnpm/yarn work too) |

---

## 🚀 Quick start

```bash
# install
bun install

# dev server → http://localhost:3000
bun dev
```

Open [http://localhost:3000](http://localhost:3000), use the location combobox to add stops, and watch routes update on the map.

---

## 📁 Where things live

| Path | What |
| :--- | :--- |
| `app/page.tsx` | Main screen: map, OSRM fetch, route state, autocomplete |
| `components/ui/map.tsx` | Map primitives (routes, markers, controls) |
| `components/Autocomplete.tsx` | Location search / multi-select |
| `components/location.ts` | Preset coordinates & names |

---

## 🏗️ Build & lint

```bash
bun run build
bun run lint
```

---

## 📚 Learn more

- [Next.js docs](https://nextjs.org/docs) — routing, App Router, deployment
- [OSRM HTTP API](http://project-osrm.org/docs/v5.24.0/api/) — `route` service options used by the app

---
