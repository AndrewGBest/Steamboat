# Decision log

Newest last. Each entry: date, decision, reason, and what would reopen it.
Decisions made for Tropic Video before 2026-11-17 apply here unless an entry
below says otherwise; they are in
[its log](https://github.com/AndrewGBest/Tropic-Video/blob/main/docs/DECISIONS.md).

## 2026-11-17: Steamboat starts as a copy of Tropic Video's code

**Decision:** the repository begins with Tropic Video's source at v0.1.1
(commit `a9c0686`), renamed, with the service-specific parts replaced: start
address, allowlist, adapter (emptied), guard wording, notice, rule check and
documents. Its captured outlines were not copied; they are evidence about
another site.
**Reason:** Andrew asked for "a Disney+ version of Tropic Video". Nearly all
of the code is service-neutral, and both projects are his under GPL-3.0.
**Not done:** a shared library. Two copies will drift; a fix to shared code
has to be made twice.
**Reopen if:** keeping the two in step becomes a burden; then split the shell
and layer into a package both use.

## 2026-11-17: Name and icon

**Decision (Andrew):** the project is called "Steamboat". The app ID is
`io.github.andrewgbest.Steamboat`. The icon is original: a side-wheel river
boat with a play mark on its paddle wheel, and no character of any kind.
**Risk recorded, not argued:** the name alludes to a 1928 cartoon whose title
and character are still trademarks. See `LEGAL-GUARDRAILS.md`, "The name".
No trademark register was searched.
**Rule that follows:** no mouse, ears, whistle, ship's wheel with a figure, or
anything else from that film, in the icon, the app or the documents.
**Reopen:** before promoting the project publicly, have the name cleared.

## 2026-11-17: The allowlist is the service's domain and one login host

**Decision:** the window may go to `disneyplus.com` and its subdomains, and
to the single host `login.disney.com`. Not `disney.com` as a whole.
**Reason:** the first version allowed the service's domain only, because
`/login` redirects to `/identity/login` on the same host (seen with `curl`).
In the shell that page then sent the window to `login.disney.com/authorize`;
the app refused it, logged it, and the page was left without a form. With
that host allowed the email form appears (both seen on 2026-11-17).
**Not known:** whether the later steps (password, one-time code, a partner or
bundle sign-in) send the window anywhere else. The agent stops at the email
field. If they do, the app refuses the page, says so on screen and logs the
host.
**Reopen if:** Andrew's sign-in is refused; add exactly the host the log
names, with a test.

## 2026-11-17: The on-screen keyboard moves to the top when it would cover its field

**Decision:** the keyboard sits at the bottom of the screen unless it would
cover more of the field being typed into there than at the top
(`oskDock` in `src/shared/osk.ts`, unit-tested).
**Reason:** on the sign-in page the email field is in the lower half of the
screen and the keyboard hid it completely, so nothing typed could be seen.
Checked on that page in the shell: the keyboard is at the top and the field
is clear below it.
**Shared code:** Tropic Video has the same keyboard and has not been given
this change.
**Reopen if:** a field in the middle of a screen is still half covered; then
scroll the page as well.

## 2026-11-17: Purchase-guard wording for this service is a guess

**Decision:** the spend-word list gained plan, bundle, add-on and
restart-subscription wording, and the URL pattern gained `billing`,
`subscription`, `/commerce` and `/plan`. Tropic Video's service-specific
phrase was removed.
**Reason:** scripted runs must not be able to change what Andrew pays for
(Hard rule 10), and this service sells plan changes and add-ons from inside
the signed-in site. The words are guesses at its wording; the guard errs
toward blocking.
**Reopen when:** the signed-in site has been seen; replace guesses with what
is there, and guard specific controls through the adapter with outlines.

## 2026-11-17: The agent does not answer the privacy-choices pop-up

**Decision:** on first load the site asks what data it and its partners may
use. That choice is Andrew's. The agent walks the pop-up to check the remote
works in it and leaves it unanswered.
**Reopen if:** never; it is a choice about his data.

## 2026-11-17: Agent-driven runs on the live site are short and input-only

**Decision:** as in Tropic Video, the agent may drive the signed-in app under
`--automation` to check navigation: key presses, reading where focus is, a
screenshot to look at and then delete. It records structure and positions,
never titles, text or pictures, and downloads nothing.
**Reason:** the subscriber agreement forbids automated means in a clause that,
as summarised, is about copying and scraping. Reading that as not covering a
remote-control check is the agent's interpretation, not something Andrew was
asked. He was told in the session report.
**Reopen if:** Andrew prefers that only he drives the live site.

## 2026-11-17: Phase 0 passed, on castLabs Electron 42, not 44

**Result:** protected playback works in the shell in Andrew's Fedora VM.
Andrew signed in by hand and played a title; the agent then played two more
under `--automation`. Evidence from the browser's own media log and the video
element: Widevine component 4.10.3112.0, a CDM attached, video `h264` marked
CENC at 854x480, audio `aac` stereo, playback advancing, no error.
**But not on Electron 44.** With castLabs 44.10.1 (Tropic Video's version)
some titles stopped at the site's "Error Code 83". The media log showed why:
the site sent `eac3` 5.1 audio and no decoder accepted it ("audio decoder
initialization failed"). That build answers `true` to
`MediaSource.isTypeSupported('audio/mp4; codecs="ec-3"')` and has nothing on
Linux to decode it with. castLabs enabled (E)AC-3 at build time from v43 and
say Linux support is uncertain (their issue 221).
**Decision:** pin `electron` to castLabs **v42.11.18+wvcus** (Chromium 148,
released 2026-10-24), which answers `false`; the site then sends AAC and the
title that had failed plays. No runtime switch was found that turns the claim
off in 44 (five feature names tried). Nothing about the page is changed: the
browser simply no longer claims a codec it cannot play.
**Costs:** an older Chromium, and the 42 line will stop getting releases at
some point. Tropic Video stays on 44; its service has not shown this.
**Not shown:** anything above 854x480 for protected video; Andrew's view of
picture and sound (he has not said); bare metal.
**Reopen when:** castLabs fixes the claim on Linux or ships a decoder (re-run
the one-line check in a blank window), or the 42 line ends. Reporting it to
castLabs is Andrew's call.

## 2026-11-17: A plain-http address on an allowed host is loaded as https

**Seen:** signed in, the service's front page redirects to `http://` on its
own host. The app refused it and showed "This page was blocked".
**Decision:** such an address is loaded in its https form instead
(`httpsUpgrade`, unit-tested). Plain http is still never loaded. The log and
the blocked notice now show the scheme when it is not https, since that can
be the whole reason.

## 2026-11-17: Only the window's own navigations are checked against the allowlist

**Seen:** in Andrew's signed-in run the app refused redirects inside the
site's measurement frames (two advertising hosts) and logged them.
**Decision:** `will-redirect` is checked for the main frame only. What frames
inside the page load is the site's business; cancelling them is filtering its
traffic (Hard rule 4), and it put a "blocked" message up for something nobody
pressed. The window itself still cannot leave the allowlist.
**Checked:** a signed-in run under `--automation` logged no refusals. That run
did not include signing in, where the frames were first seen.

## 2026-11-17: Navigation sees through open shadow roots

**Seen:** every control of the site's player is inside nested open shadow
roots, where the document's own queries do not reach; the remote could reveal
the controls but not focus one.
**Decision:** candidate search, visibility, containment and "what has focus"
follow open shadow roots (`src/layer/spatial/deep.ts`, unit-tested). Closed
roots are left closed. This is shared code Tropic Video does not have.

## 2026-11-17: Back leaves a player that is a page of its own by going back

**Seen:** the site's player lives at its own address and ignores Escape, so
Tropic Video's "send Escape" did nothing.
**Decision:** when the address differs from the one the user was browsing at
when playback started, Back goes back one page (`playerIsOwnPage`). A player
laid over its page is still closed with Escape. No selector is involved.
**Checked:** from the player, Back twice (controls, then player) returned to
the title page.

## 2026-11-17: Smaller navigation rules added from the live site

- **Adapter revision 2:** the top bar's search link as `searchOpen`
  (`home-nav.txt`); the search key did nothing without it. The search page's
  field is found by the generic rules.
- **Adapter revision 1:** the row arrows (`arrow-left`, `arrow-right`), shown
  by `test/fixtures/outlines/home-rows.txt`. Without it Down landed on each
  row's arrow instead of a card.
- **Sideways moves ignore a pinned bar** lying across a scrolling row (the
  home page's section tabs caught Left and Right).
- **The first press on a page goes to page content**, not the pinned top bar,
  unless the press is Up.
- **A menu that opens from a player control takes focus**, and a list that
  scrolls by itself is scrolled to its focused entry.

## 2026-11-17: Third-round navigation rules, each from the live site

- **Back in the player closes an open menu first** (the site's Escape), and
  only then leaves a player that is a page of its own.
- **Left and Right on the progress bar are sent as the seek keys** instead of
  looking for a neighbour; the site's bar answers with its own small steps.
- **The first press goes to the page's main control even when it starts just
  below the screen**, and never to a small square icon when there is anything
  else (the home banner's mute button was first in reading order).
- **Controls under ten pixels in either dimension are not targets** (the
  banner's dots).
- **Focus on a control that has been put away counts as no focus.**
**Reopen if:** a site has a real control that small, or a page whose main
control is an icon.

## 2026-11-17: Under automation nothing in the profile menu can be pressed

**Decision:** adapter revision 3 lists the profile menu's entries as guarded
controls (`profile-menu.txt` is the outline). A scripted run can open and
walk the menu and cannot switch profile, add or edit one, open account or
app settings, or log out.
**Reason:** the site is one page that changes its address without loading, so
the guard's check on addresses never sees a move to the account pages; only
the check on the control pressed does. Account and profile changes are
Andrew's alone (`VM-SETUP.md`).
**Checked:** on the live site, Enter on the menu's Help entry under
`--automation` left the page and the menu as they were.
**Cost:** an agent cannot test profile switching. A person is not affected.

## 2026-11-17: Review of the whole project

Andrew asked for every choice to be looked at again: is it smart, is it light
on the user's hardware, will it survive the service changing. What follows is
what was kept, what was changed, and what stays a risk.

### Kept, with the reason

- **Wrapping the website with a generic layer.** Almost everything works by
  general rules (geometry, roles, what is visible), not by knowing this
  site. The adapter holds four selectors. That is the main protection
  against the service changing, and it held: the same code drives two
  services.
- **Fresh candidates on every key press, no cache between presses.** A cache
  would be faster and would be wrong whenever the site re-renders, which it
  does constantly. Within a press the work was trimmed instead (below).
- **Player control by key presses and pointer movement only.** Slower to get
  right than calling the video element, and it is why seeking, pausing and
  menus still follow the site's own rules (and will follow its changes).
- **One window, sandboxed page, no API exposed, allowlisted navigation.**
- **Page zoom for the TV scale.** The site lays itself out; nothing of its
  styling is rewritten, so a redesign cannot break a stylesheet of ours.
- **Electron 42.** See its own entry. It is the weakest point: an older
  browser on a release line that will end.

### Changed in the review

| Was | Is | Why |
|---|---|---|
| The focus ring measured its target and wrote four styles on every frame, for as long as anything had focus | Followed frame by frame for 0.7 s after it or the page last moved, then looked at twice a second | A still screen kept the page awake 60 times a second |
| The game-controller loop ran every frame whether or not a controller existed | Runs only while one is connected | Same |
| Timers that look after the player ran while the window was hidden | They return at once when hidden, and tell the shell playback stopped | So sleep is not held off by a hidden window |
| Each candidate asked for the style of up to twelve ancestors; containment was checked parent by parent | Ancestor answers are shared within a move and go all the way up; containment is one native check per shadow root | Most of a move's cost on a long page |
| The profile menu was guarded under automation by selector only | Also by words (log out, account, edit profiles...) | The guard must not rest on the site keeping its markup |
| The search key needed the adapter's selector | Falls back to a link whose address says search | Checked live with the selector taken out |
| A site change needed a new build | A newer `adapter.json` in the data folder is used instead; never downloaded | Checked live |
| Nothing stopped an Electron upgrade from bringing the audio problem back | The end-to-end run fails if the browser claims E-AC-3 on Linux | Runs in CI |
| A saved outline said nothing about the adapter | Its second line counts what each selector matches | A renamed control shows as zero in a bug report |
| A refused link put a message up every time it was tried | At most once in five seconds | |

**Measured:** the app sitting still on the search page with focus on a card,
all its processes, twenty seconds, twice each, in the VM (software
rendering): about 9.4% of one core before, about 5.3% after. Not measured: a
move's duration on a long page, memory, anything on real hardware.

### Risks that remain, and what would be done

- **The service asks for a verified platform, or stops serving Linux
  browsers.** Then this shell cannot play. Fallback already designed: drive
  the user's installed Chrome or Chromium and inject the same layer.
- **The 42 release line ends, or the site refuses an old browser.** Move to
  the then-current castLabs line if it has stopped claiming E-AC-3 on Linux
  (the end-to-end check answers that), or to the fallback above.
- **The site closes its shadow roots.** The player's controls would be out
  of reach again. Play, pause and seek keys would still work; menus would
  need the pointer.
- **Test ids are renamed.** Rows' arrows take focus again and the profile
  guard falls back to words. Usable; fixed by a new adapter file.
- **Software video decoding on a weak box.** `hardwareDecode` is an opt-in
  switch that has not been tried on real hardware. The site's background
  previews are the largest load and are the site's to switch off.
- **Two copies of the shared code.** Steamboat is now well ahead of Tropic
  Video (shadow roots, idle behaviour, a dozen navigation rules). The longer
  this lasts the harder the merge. A shared package, or porting back, is
  Andrew's decision.
- **Disney's terms** on modified clients and automated use: unchanged from
  `LEGAL-GUARDRAILS.md`, still unreviewed by a lawyer.
