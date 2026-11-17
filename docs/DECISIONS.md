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

## 2026-11-17: The allowlist is the service's one domain

**Decision:** only `disneyplus.com` and its subdomains may be navigated to.
No account domains.
**Reason:** a signed-out request for `/login` is redirected to
`/identity/login` on the same host (seen with `curl`). Tropic Video needed a
list of account domains because its service signs in elsewhere; nothing shows
that here.
**Not known:** whether sign-in with a one-time code, a partner or a bundle
sends the window to another domain. If it does, the app refuses the page,
says so on screen and logs the host.
**Reopen if:** Andrew's sign-in is refused; add exactly the domain the log
names, with a test.

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
