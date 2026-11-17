# Legal guardrails

This explains the reasoning behind the Hard rules in `CLAUDE.md`. It is a risk
map written by a non-lawyer, not legal advice. Before a wide public release,
have a lawyer review it. Items marked **[Guess]** are reasoning without a
source. The rules are Tropic Video's, carried over; what is specific to this
service is the terms section and the note on the name.

## The position this project takes

Steamboat is a web browser with a different remote control. It loads the
service's public website in a Chromium engine, the user signs in on the
service's own page, and video plays through the browser's standard protected
media path. On top, the app draws its own focus ring and on-screen keyboard
and turns controller presses into ordinary focus changes, clicks and key
presses.

Everything risky that similar projects do is deliberately absent: no bundled
scripts, fonts, logos or DRM library from anyone, no service name in the app's
name, no invented device identity.

## Rule by rule

| Rule | Risk it avoids | Basis |
|---|---|---|
| 1. No third-party material | Copyright infringement by redistribution | Copying another party's code, fonts, artwork or characters into a public repo is reproduction and distribution of their work. |
| 2. DRM left alone | Anti-circumvention law; the service's terms | Canada's Copyright Act prohibits circumventing technological protection measures (s. 41.1); its interoperability exception (s. 41.12) is narrow. The US has a comparable prohibition (17 USC 1201; from general knowledge, not re-checked). The service's subscriber agreement forbids circumventing or disabling "any content protection system or digital rights management technology" (clause 3b(i), Canadian edition). The project never circumvents. |
| 3. Honest identity | Misrepresentation to obtain service not offered to this device class | Posing as a TV or another OS to get a better stream would be the kind of workaround rule 2 forbids. **[Guess]** on how a court would see it; the rule avoids the question. |
| 4. No modification of the service | Terms breach; interference claims | The subscriber agreement forbids disguising location and blocking or impairing advertising, and forbids modifying the service (clause 3c, as summarised from the Canadian edition; see "What remains uncertain"). |
| 5. No trademarks in name or icon | Trademark infringement, confusion about origin | The subscriber agreement forbids using the service "in a manner that suggests an association with our products, services or brands" (clause 3c(iii)). Naming compatibility in plain text with a non-affiliation notice is the usual nominative-use approach; a lawyer should confirm the wording. |
| 6. Familiar layout, original material | Copyright in artwork, icons, fonts and text; confusion about who made the app | Andrew's decision for Tropic Video (2026-11-14), kept here. In practice the layer draws almost nothing: the interface on screen is the service's own website. |
| 7. Evidence-based selectors | None legal; reliability | Guessed selectors silently break. |
| 8. No reverse engineering of apps | Terms breach; anti-circumvention | The agreement forbids decompiling or reverse-engineering the service. Reading the structure of a page your browser was sent, in order to move focus on it, is ordinary browser behaviour **[Guess]**; decompiling a TV app is not. |
| 9. Credentials untouched | Privacy harm, account compromise | The app never needs them; the cookie jar stays on the user's disk. |
| 10. Automation never spends | Unauthorised charges on a real account | Enforced in the layer and by URL in the main process. |
| 11. No telemetry | Privacy law exposure; user trust | Nothing leaves the machine except traffic to the service itself. |
| 12. Least privilege | Security of the user's machine | The page is untrusted code; it gets no path into the app. |

## What the service's terms say (read 2026-11-17)

Source: the Disney+ Subscriber Agreement, Canadian edition, in its "updates
side by side" form. It was read through a summarising tool that quotes only
short fragments, so the wording below is fragments and summaries, **not the
full clauses**. Nobody has read the agreement in full for this project.

- 3b(i): not to "circumvent or disable any content protection system or
  digital rights management technology".
- 3c(i): not to decompile or reverse-engineer the service.
- 3c(ii): not to "modify the Disney+ Service", including by removing notices.
- 3c(iii): not to use it "in a manner that suggests an association with our
  products, services or brands".
- 3c(vi): not to "bypass, modify, defeat, tamper with or circumvent any of
  the functions or protections" of the service, including by disguising
  location.
- 3c(viii): not to use "a robot, spider, script or other automated means";
  the summary says this is about copying, scraping and building data sets.
- A further item forbids blocking or impairing advertising.
- 4a: use "requires compatible devices"; supported devices and browsers are
  listed in the Help Center. 4f: devices or platforms may be removed.

## What remains uncertain

- **Is this a permitted way to use the service?** Unconfirmed. "Modify the
  service" could be read to cover a user style and a focus ring drawn over the
  page. **[Guess]**: it is the same class of activity as a browser extension
  or a user stylesheet, changes nothing the service sends or receives, and
  removes nothing. The service decides, and account risk sits with each user;
  the README says so.
- **Is Linux a compatible device?** The Help Center's device list could not be
  read from here (the page returned nothing to the fetch tool). Press coverage
  from December 2019 says the service started working in Linux browsers after
  a DRM setting was relaxed; that is old and second-hand.
- **Agent-driven test runs.** An agent pressing keys in a signed-in window is
  "automated means" in the plain sense of 3c(viii). **[Guess]**: the clause is
  aimed at copying and scraping, and a walk that presses arrow keys and
  records where focus went (no titles, no text, no downloads) is not that.
  Runs are kept short and to what a check needs. This is Andrew's account and
  his call; it is recorded in `DECISIONS.md`.
- **The name.** "Steamboat" is an ordinary word and names no Disney mark, but
  with an app for this service it plainly nods at the 1928 cartoon. That film
  is reported to be in the US public domain since 2024 (general knowledge, not
  re-checked), yet its title and its character remain trademarks in use.
  **[Guess]**: an ordinary word, an icon with a boat and no character, and the
  non-affiliation notice keep the risk low. No trademark register was
  searched. A lawyer should look before the project is promoted.
- **Look and feel, jurisdiction, takedown:** as in Tropic Video's guardrails.
  If the rights holder objects, the project responds promptly and in good
  faith; the README lists the contact route.

## Required wording

Every release, the README and the About screen carry:

> Steamboat is an unofficial, independent project. It is not affiliated
> with, endorsed by or supported by Disney. Disney+ and Disney are
> trademarks of Disney Enterprises, Inc. or its affiliates. A valid subscription is
> required. Steamboat does not provide, unlock or bypass access to any
> content and does not remove or work around DRM.

The trademark owner's name in that notice is from general knowledge and has
not been checked against a register.

## Sources

- Disney+ Subscriber Agreement, Canadian edition, side-by-side update: https://www.disneyplus.com/en-ca/welcome/subscriber-agreement-side-by-side
- Copyright Act (Canada), s. 41.12: https://laws-lois.justice.gc.ca/eng/acts/C-42/section-41.12.html
- OMG! Ubuntu, 2019, on the service and Linux: https://www.omgubuntu.co.uk/2019/10/happily-never-after-heres-why-disney-doesnt-support-linux
- BetaNews, December 2019, "Linux users can now enjoy Disney+": https://betanews.com/2019/12/09/linux-users-can-now-enjoy-disney
- Tropic Video's guardrails, for the reasoning carried over: https://github.com/AndrewGBest/Tropic-Video/blob/main/docs/LEGAL-GUARDRAILS.md
