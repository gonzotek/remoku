# Remoku Developer Guide & Multi-Repo Deployment Guardrails

## 1. Project Overview & Identity

Remoku is a web-based remote control for Roku streaming players. It allows users to control Roku devices from any web browser on their local network without needing native mobile apps.

- **Author**: A. Cassidy Napoli (`gonzotek`)
- **Author Email**: `gonzotek@gmail.com`
- **Primary Codebase Branch**: `gh-pages`
- **Architecture**: Static Web Application (Vanilla HTML5, CSS3, JavaScript ES6+)
- **Zero Build Step**: Native browser execution without bundlers or transpilers.

---

## 2. Multi-Repo Deployment Topography & Cloudflare DNS

Remoku source code is developed in the central repository and deployed across multiple target repositories within the `remoku-web` GitHub organization.

| Target Role | GitHub Repository | Custom Domain (CNAME) | Cloudflare DNS Config |
| :--- | :--- | :--- | :--- |
| **Development** | `gonzotek/remoku` (branch: `gh-pages`) | N/A | N/A |
| **Staging / Test** | `remoku-web/remoku-staging` | `test.remoku.tv` | `CNAME test -> remoku-web.github.io` (DNS only during cert issue) |
| **Production (Apex)** | `remoku-web/remoku-web.github.io` | `remoku.tv` | `CNAME @ -> remoku-web.github.io` |
| **Production (WWW)** | `remoku-web/www-remoku-web` | `www.remoku.tv` | `CNAME www -> remoku-web.github.io` |
| **Help Portal** | `remoku-web/remoku-help` | `help.remoku.tv` | `CNAME help -> remoku-web.github.io` |

### Git Identity & SSH Host Alias
All Git operations, commits, and deploy scripts in this repository are strictly locked to:
```ini
[user]
    name = A. Cassidy Napoli
    email = gonzotek@gmail.com
```
SSH operations use the dedicated SSH host alias configured in `~/.ssh/config`:
```ini
Host github.com-gonzotek
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_gonzotek
    IdentitiesOnly yes
```

Deployment is orchestrated via `./scripts/deploy.sh {staging|production|help}`.

---

## 3. System Architecture & File Structure

| File / Directory | Purpose |
| :--- | :--- |
| `index.html` | Application markup, layout, UI screens (Remote, Goodies, Channels, Settings, About). |
| `js/transport.js` | Adaptive ECP transport client (Google Chrome LNA `targetAddressSpace: 'private'` + legacy form POST fallback). |
| `remoku-gui.js` | Core application logic, event listeners, local network discovery, macro execution, keyboard handling, and `localStorage` state persistence. |
| `remoku-gui.css` | UI styling, responsive layout for desktop/mobile, D-pad layout, button skins, themes. |
| `color-utils.js` | Helper utility functions for color conversion and color manipulation. |
| `cp/` | Color picker library widget (`colorPicker.js` and associated assets). |
| `images/` | Remote control button icons, sprites, D-pad directional graphics, corners, and touch icons. |
| `scripts/` | Tooling and deployment scripts (`deploy.sh`, `setup-identity.sh`). |

---

## 4. Roku External Control Protocol (ECP) & Transport

Remoku interacts with Roku devices over the local network via HTTP REST endpoints on port `8060`.

### Key Endpoints
- **Keypress**: `POST http://<roku-ip>:8060/keypress/<KEY>` (e.g. `Home`, `Rev`, `Fwd`, `Play`, `Select`, `Left`, `Right`, `Down`, `Up`, `Back`, `InstantReplay`, `Info`, `Backspace`, `Search`, `Enter`, `VolumeDown`, `VolumeMute`, `VolumeUp`, `PowerOff`)
- **Keydown / Keyup**: `POST http://<roku-ip>:8060/keydown/<KEY>` and `POST http://<roku-ip>:8060/keyup/<KEY>`
- **Type Text (Literal)**: `POST http://<roku-ip>:8060/keypress/Lit_<URL_ENCODED_CHAR>`
- **App Query**: `GET http://<roku-ip>:8060/query/apps` (Returns XML list of installed channels)
- **App Launch**: `POST http://<roku-ip>:8060/launch/<APP_ID>`
- **App Install**: `POST http://<roku-ip>:8060/install/<APP_ID>`
- **Device Info**: `GET http://<roku-ip>:8060/query/device-info`
- **Active App**: `GET http://<roku-ip>:8060/query/active-app`

### Adaptive Transport Architecture & Browser Security Boundaries

1. **Google Chrome Local Network Access (LNA)**:
   - Modern Chromium browsers require a **Secure Context (HTTPS or `http://localhost`)** to issue Local Network Access requests.
   - Chrome allows HTTPS web origins to communicate with private network endpoints (e.g. `http://<roku-ip>:8060`) when explicitly requested via `fetch(url, { method: 'POST', mode: 'no-cors', targetAddressSpace: 'private' })`.
   - Chrome handles the private network boundary and permission prompts without triggering traditional mixed content errors.

2. **HTTPS vs. Mixed Content on Legacy / Non-LNA Browsers**:
   - On browsers lacking LNA support (older Safari, Firefox, legacy Chrome), serving Remoku over HTTPS causes the browser to treat subresource calls and hidden iframe form submissions to `http://<roku-ip>:8060` as **Mixed Content** (insecure HTTP requested from secure HTTPS).
   - Modern Firefox and Safari may block mixed form submissions or iframe navigation to insecure targets.

3. **Fallback & Compatibility Strategy**:
   - **Modern Browsers (Chrome / Edge / Opera / Brave)**: Use LNA Fetch (`targetAddressSpace: 'private'`) over HTTPS.
   - **Local / Self-Hosted Access**: When accessed via `http://localhost:8080` or a local IP on the LAN, Remoku operates as a pure HTTP origin with no mixed content restrictions.
   - **Legacy Form POST Fallback**: For older mobile Safari, Android WebKit, and desktop browsers, Remoku falls back to hidden `<form method="POST" target="rokuresponse">` submissions.
   - **Companion Browser Extension**: For browsers where HTTPS strictly blocks private network calls, a lightweight WebExtension companion (with `http://*/*` host permissions) can bridge commands from HTTPS web origins to local Roku devices without mixed content restrictions.

---

## 5. Modernization Roadmap & Milestone Tracker

```
[x] Milestone 1: Identity Lock, AGENTS.md, Deployment Tooling & LNA Transport
    [x] 1.1 Generate dedicated SSH key for gonzotek (Human)
    [x] 1.2 Add public key to GitHub under gonzotek (Human)
    [x] 1.3 Lock repo-local Git identity to A. Cassidy Napoli <gonzotek@gmail.com> (Agent)
    [x] 1.4 Overhaul AGENTS.md with full architecture & topography (Agent)
    [x] 1.5 Create scripts/deploy.sh with multi-remote & identity protection (Agent)
    [x] 1.6 Implement js/transport.js (Google LNA fetch + legacy fallback) (Agent)
    [ ] 1.7 Create Cloudflare DNS CNAME for test.remoku.tv (Human)
    [x] 1.8 Create remoku-web/remoku-staging repository on GitHub & push initial build (Human + Agent)

[ ] Milestone 2: Remote Themes & Modern Responsive Layout Engine
    [ ] 2.1 Test UI responsiveness across mobile/tablet viewports (Human)
    [ ] 2.2 Semantic HTML5 & CSS Grid / Flexbox remote layout (Agent)
    [ ] 2.3 Minimalist Touch Screen Theme (48px+ touch targets) (Agent)
    [ ] 2.4 Gesture / Swipe Pad Mode (touch & pointer swipe navigation) (Agent)
    [ ] 2.5 Classic Roku Hardware Skins & OLED Dark Theme (Agent)

[ ] Milestone 3: Advanced Macros & Deep-Launch Engine
    [ ] 3.1 Test macros with physical Roku hardware (Human)
    [ ] 3.2 Visual Macro Timeline Builder & Runner (Agent)
    [ ] 3.3 Roku Diagnostic & Secret Screens Macro Library (Agent)
    [ ] 3.4 Channel Deep-Launch Parameter Engine & Favorites Grid (Agent)

[ ] Milestone 4: Modern Discovery & Progressive Web App (PWA)
    [ ] 4.1 Test 'Add to Home Screen' PWA on iOS / Android (Human)
    [ ] 4.2 Fast concurrent subnet discovery scanner (Agent)
    [ ] 4.3 Service Worker & Web App Manifest (replacing AppCache) (Agent)

[ ] Milestone 5: Help Site Modernization (help.remoku.tv / remoku-help)
    [ ] 5.1 Configure permissions on remoku-web/remoku-help repo (Human)
    [ ] 5.2 Build fast static documentation site (Agent)
    [ ] 5.3 Author Roku setup, LNA permissions & Macro reference guides (Agent)
    [ ] 5.4 Deploy to help.remoku.tv (Agent)
```

---

## 6. Development Guardrails

1. **Simplicity & Zero Build Step**:
   - Native browser execution. Favor standard Web APIs over external dependencies.
   - Do not add complex bundlers (Webpack, Vite, Tailwind, etc.) unless explicitly requested.
2. **Surgical Edits**:
   - Preserve existing button mappings, keyboard navigation shortcuts, and layout quirks that support legacy devices.
   - Maintain backwards compatibility with older browsers/tablets where possible.
3. **State Management**:
   - Device IPs, saved remotes, macros, and preferences are stored in `localStorage`. Ensure state migrations do not wipe user settings.
4. **Git Identity**:
   - Always commit as `A. Cassidy Napoli <gonzotek@gmail.com>`.

---

## 7. Local Development & Verification

To run and test Remoku locally:

```bash
# Start local HTTP server
cd /Users/cassidy/github/remoku
python3 -m http.server 8080
```

Open `http://localhost:8080` in your web browser.
