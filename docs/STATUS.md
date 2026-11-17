# Status

Update this at the end of every working session. Newest first.

## 2026-11-17: project started (session 1, Andrew's Fedora VM)

Andrew asked for a version of Tropic Video for a second service, called
Steamboat, and for the repository and documents to be set up and work begun.

### Done

- The repository holds Tropic Video's code at v0.1.1, renamed, with the
  service-specific parts replaced (see `DECISIONS.md`): start address,
  allowlist, empty adapter, guard wording, notice, rule check.
- Found on the live sign-in page and fixed: the allowlist lacked the login
  host the page sends the window to, so there was no form; and the on-screen
  keyboard covered the email field. **The keyboard change is to shared code
  and has not been made in Tropic Video.**
- A new original icon.
- Documents written for this service: `CLAUDE.md`, the README, design,
  architecture, guardrails, roadmap, decisions, VM setup.
- Version is 0.0.1. Nothing is released.

### Verified, and how

| Claim | Evidence |
|---|---|
| Type-checks, unit tests pass, bundles build, rule check passes | `npm run check` on the VM |
| The real shell runs the layer on invented pages: navigation, pop-ups, player keys, on-screen keyboard, guard, notices | `npm run e2e` on the VM's Wayland desktop, all steps ok |
| The Widevine component installs in this app's own data folder | terminal log of a `--spike` run: version 4.10.3112.0 |
| The live site loads in the shell signed out, under `--automation` | DevTools: document on the service's host at `/en-ca`, `readyState` complete, about 4,400 elements, the layer's overlay present; viewport 962x541 |
| CI and the package build run on GitHub | `gh run list`: CI green on each push; "Build packages" run 44120490371 green |
| The user agent sent is the real Chromium on Linux with no app token | read from the page in that run |
| The site shows a privacy-choices pop-up first, and the remote works in it | screenshot looked at, then deleted; Down and Right moved focus between its links and three buttons and never left it. **No choice was made** (it is Andrew's) |
| The sign-in page opens and shows its email form | DevTools under `--automation`: window on the login host, one visible text field, no refused navigation in the log. The page was opened by address, because the privacy pop-up covers the home page's log-in button |
| The remote reaches the email field and the keyboard opens clear of it | Down twice: focus on the close button, then the field; screenshot looked at, then deleted: keyboard at the top, field visible below. **Nothing was typed** (Hard rule 9) |

### NOT verified

- **Protected playback. Nothing has been played.** Whether the service gives
  this shell a licence on Linux is unknown and is the first thing to find out.
- Sign-in in the shell, the profile picker, and everything signed in: home,
  title pages, search, the player, its keys, Back.
- Every sign-in step after the email field: the password or one-time-code
  page, whether the keyboard is clear of those fields, and whether any step
  sends the window to a host the allowlist refuses.
- The privacy pop-up's buttons (none was pressed), and whether it comes back.
- The purchase guard's wording against the real site. It is guesswork.
- The packages themselves. The "Build packages" workflow ran green on GitHub
  and produced the artifact `steamboat-linux-x64` (about 336 MB), but it was
  not downloaded and nothing in it was launched. The release workflow has not
  run.
- Everything Tropic Video lists as unverified about shared code (a physical
  game controller, X11 and gamescope sleep inhibition, a real 1080p TV).

### Next actions

1. **Andrew:** in the VM, run `npm run spike` in `~/Steamboat`, answer the
   privacy pop-up, sign in, pick a profile, start any title and let it run a
   minute, then quit with Ctrl+Q. Say whether picture and sound were right,
   and whether anything was refused on the way ("Blocked: that link goes to
   another site").
2. Agent: read `spike-report.json`; record the result in `DECISIONS.md`. If
   the service refuses, build the installed-Chromium fallback.
3. Agent, once signed in: walk home, a title page, search and the player with
   `--automation`; capture outlines; fix what the generic rules miss.
