# Status

Update this at the end of every working session. Newest first.

## 2026-11-17, fifth round: small fixes and a review of the whole project

Andrew asked for the noted small things to be fixed and every choice to be
scrutinised for sense, load on the user's hardware and resilience to the
service changing. The review and its table of changes are in `DECISIONS.md`
("Review of the whole project").

| Claim | Evidence |
|---|---|
| Idle load is lower | CPU time of all the app's processes over 20 s, still on the search page, twice each: about 9.4% of one core before, 5.3% after (VM, software rendering) |
| Up and Down stay inside a player menu | live: eight presses down the subtitles list, each on the next entry, none on the control row |
| One Back from a title page reached from the player goes home | live: paths read after each press |
| Back with a menu open, as before | live: controls, menu, player |
| A newer `adapter.json` in the data folder is used | live: a revision-99 copy without the search selector; the terminal said so, and the saved outline's header named revision 99 with its match counts. File removed afterwards |
| The search key works without its selector | same run: the key still opened the search page with the field focused |
| The build catches a browser that claims E-AC-3 | end-to-end run: new check passes on Electron 42 |
| Tests | 222 unit tests, rule check, end-to-end all ok |

### Not verified in this round

- `hardwareDecode`: the VM has no usable VA-API (`video decode:
  disabled_software` with or without it). Untried on real hardware.
- The game-controller change: no controller here. The loop's start on
  connection is by reading the code.
- The focus ring's new following, by eye. The end-to-end run checks its
  position after moves; smoothness on a TV is Andrew's to judge.
- The banner's second settle pass, and the guard's new words on the live site.

### Next actions

1. **Andrew:** try it (`npm start`, or the AppImage from a new "Build
   packages" run): picture and sound, how the ring follows, and on the TV
   box whether `"hardwareDecode": true` helps.
2. Decide what to do about the two copies of shared code.
3. Agent: Skip intro when an episode with one is at hand; a first release
   when asked.

## 2026-11-17, fourth round: guard, next episode, all three packages

Electron 42 under `--automation`, as before.

| Claim | Evidence |
|---|---|
| Under automation nothing in the profile menu can be pressed (adapter revision 3) | live site: Enter on the menu's Help entry left the page and the open menu unchanged, and no navigation was attempted |
| Back with the settings menu's slider view open | first Back leaves the controls, second closes the view (still in the player), third leaves the player |
| Next episode from the remote | on a series: focus on the player's next button, Enter; a different play page loaded and played; Back returned to the title page |
| The Flatpak bundle runs | from CI run 44132990283: installed for one user with its runtime from Flathub, started with `--automation`: Widevine component fetched inside the sandbox, the signed-out site loaded with the layer on it. It has its own data folder, so nobody is signed in there and **nothing was played**. Uninstalled afterwards, with its runtime and the Flathub remote |
| The tarball build runs | same run: unpacked and started with `--automation`: signed-in home page, remote moved focus. Nothing was played. Removed |
| Tests | 209 unit tests, rule check, end-to-end all ok |

Skip intro is still untested: on a series episode, stepping forward ten
seconds at a time for thirty presses, no Skip button was seen. Whether that
episode has one is unknown.

Side effect on the account: the agent's test plays show up in the profile's
continue-watching row (four titles, one moved on by an episode).

## 2026-11-17, third round: seeking, menus, more pages

Andrew asked for the remaining items. All checks below are on Electron 42
under `--automation`, with a step-by-step tool that reads state after each key.

| Claim | Evidence |
|---|---|
| Left and Right on the picture seek ten seconds | the progress bar's position right after each key: 142, 155, 167, then 158 after Left; the site's own skip buttons gave the same steps (136, 148, then 142) |
| Left and Right on the focused progress bar move it in small steps | position 20, 22, 23 over three presses. That is how the site's bar answers the keys |
| Back with the settings menu open | first Back leaves the controls (menu still open), second closes the menu, third leaves the player for the title page |
| The audio menu opens and its options take focus | walk tool; **no option was chosen** |
| The profile menu opens, walks and closes | Enter opened it (expanded), Down went through four profiles and the options, Back closed it. **No profile was switched** and nothing in it was pressed |
| Movies, Series and Originals pages | six rows down, along a row, and back up to the bar on each |
| Home: the first Down lands on the banner's main button; the banner's dots are no longer targets | walk tool, after the change |
| The CI-built AppImage runs and plays | "Build packages" run 44132990283 (Electron 42): the AppImage was downloaded and started with `--automation`: fullscreen, signed-in home page (it shares the dev build's data folder), remote moved focus, a title played for twenty seconds and Back returned to its page. Removed afterwards. **The tarball and the Flatpak were built and not run** |
| Tests | 208 unit tests, rule check, end-to-end all ok |

A correction to the round before: the video element's clock **is** steady
during playback; it is re-based to about 20 seconds at every seek, which is
why it could not show a seek's size. The progress bar's reported position is
the reverse: right after a seek it is correct, between seeks it goes stale.

### Still not verified

- Andrew's view of picture and sound. Picture above 854x480.
- Skip intro (seen once, reachable, not pressed), the end of an episode, the advertising tier, live streams.
- The Watchlist page with something in it (it showed one tab and the footer).
- Switching profile, a profile PIN, the rest of sign-in by remote.
- Playback inside the Flatpak (it needs its own sign-in); the purchase
  guard's wording beyond the profile menu.

### Found, not fixed

- (Fixed in the fifth round: the extra Back on a title page; a second look
  after the banner turns.)
- Up from the first row passes a small tile button and the banner's watchlist
  button before the bar.

## 2026-11-17, later: signed in, playback proven, player usable from the remote

Andrew signed in by hand and played a title. The agent then drove the signed-in
app under `--automation`. Reasons for each change are in `DECISIONS.md`.

### Changed

- Electron pinned to castLabs 42.11.18 (44 claims an audio codec it cannot
  play on Linux, and titles stopped at the site's Error Code 83).
- http addresses on the service's host are loaded as https; only the window's
  own navigations are checked against the allowlist.
- Navigation follows open shadow roots (the site's player is built from them).
- Back leaves the player by going back a page; adapter revision 1 (row
  arrows); pinned bars no longer catch sideways moves; the first press on a
  page goes to its content; menus opened in the player take focus and scroll.
- **Shared code changed here and not in Tropic Video:** shadow roots, the
  keyboard's position, sideways pinned bars, first press, menu focus and list
  scrolling, own-page Back, the https upgrade, the frame-redirect rule.

### Verified, and how

| Claim | Evidence |
|---|---|
| Sign-in works in the shell (Andrew used a passkey) | his run reached the profile picker and the home page (paths in `spike-report.json`) |
| **Protected playback works (Phase 0)** | Electron 42, `--automation`: media log shows video `h264` CENC 854x480, audio `aac` stereo, CDM attached; the video element had MediaKeys and advancing time, no error. Two titles, one of them the title that failed on 44 |
| Error Code 83 on Electron 44 was the audio codec | media log on 44: audio `eac3` 5.1, both audio decoders refused it; screenshot of the site's error looked at, then deleted. A blank-window check: 44 says it supports `ec-3`, 42 says it does not |
| Signed-in start loads the home page | 42 and 44: `/home`, about 3,100 elements |
| Home: Down goes through the rows' cards, Left and Right run along a row and scroll it, Up returns | walk tool, focus read after each key, twelve cards along one row and back |
| Title page: Play, watchlist, tabs, episode cards, footer, and back up | walk tool. After the change the first Down lands on Play |
| Player: Space and Enter pause and resume | video element state before and after each key (on 44; on 42 only Enter on the pause control was tried, and it paused and resumed) |
| Player: Down or Up shows the controls and every one can be reached: progress bar, back, title, Skip, rewind, play, forward, mute, next, settings, fullscreen | walk tool on 42 |
| Player: settings opens with focus in its menu; the subtitles list walks and scrolls with focus | walk tool on 42: nine entries in order, each on screen. **No option was chosen** |
| Back: first leaves the controls, second leaves the player for the title page | paths read after each press, on 42 |
| Search from the remote | on 42: the search key opened the search page (adapter revision 2: the top bar's search link) with the field focused; two letters picked on the on-screen keyboard reached the field and the results changed (100 cards to 35); Back put the keyboard away; Down, Right walked the results grid |
| Unit tests, rule check, end-to-end on fixtures | 202 tests; e2e all ok on 42 |

### NOT verified

- (Seeking: settled in the third round, above.)
- What Andrew saw and heard in his run. The report shows two play pages with
  audio errors (that was Electron 44) and a third that played.
- Picture above 854x480; the advertising tier; live or scheduled streams.
- The Watchlist, Movies, Series and Originals pages, the profile picker and menu, a profile PIN.
- Skip (seen and reachable, not pressed), next episode, the audio menu.
- The privacy pop-up from the remote beyond moving in it (Andrew answered it
  by hand), and the rest of sign-in with the on-screen keyboard.
- Packages on Electron 42: none built. The earlier CI build was on 44.
- The purchase guard's wording against the signed-in site.

### Found, not fixed

- Home: the first Down lands on the banner's mute button (top right) rather
  than its main button; Up from a row passes the banner's fifteen small dots.
- Down from the lowest visible entry of a player menu can drop onto the
  control row behind it.
- The walk tool's "stopped" line is a false alarm where neighbours look alike.

### Next actions

1. **Andrew:** `git pull`, `npm ci`, `npm start` in `~/Steamboat` and try it
   by hand: was picture and sound right, and do Left and Right seek?
2. Agent: the other browse pages, the profile menu,
   seeking read from the player's own time display, Skip and next episode.
3. Agent: build the packages on Electron 42 and launch one.

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
