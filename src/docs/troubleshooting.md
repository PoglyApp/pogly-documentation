## Troubleshooting & FAQ

Quick answers to the most common questions and problems. If your issue isn't listed here, use the search bar at the top - most features have their own detailed section.

### My overlay in OBS shows nothing

Work through these in order:

1. **Check the URL.** Re-copy it from Settings → General → copy overlay URL and paste it into the Browser Source again. The URL must contain a `?module=...` parameter.
2. **Check the active layout.** The overlay shows whichever layout is marked Active (checkmark in the Layouts panel). If the active layout is empty, the overlay is correctly showing nothing.
3. **Check element positions.** Elements outside the 1920×1080 frame don't render on the overlay (see below).
4. **Force a refresh.** In Settings → General, use the **Refresh** overlay command - or **Hard Refresh** if a normal one doesn't help. In OBS you can also right-click the Browser Source and choose "Refresh cache of current page".

### An element shows in the editor but not on the overlay

The overlay only receives elements that are inside (or near) the visible 1920×1080 frame - anything parked far off-screen is not sent to it at all. This is intentional: editors often keep notes, spare elements, and works-in-progress off-screen, and those stay private.

- The dotted box around the stream frame in the editor marks the **preload area** - elements inside it are already loaded by the overlay so they appear instantly when moved into frame.
- Newly added elements intentionally spawn just **below** the preload area, so nothing pops up on stream before you've positioned it.
- If you need an off-screen element to stay live on the overlay (background music, a timer widget), enable **Always Loaded** in the Details panel.

Also check the element's opacity (Page Down sets it to 0%) and whether the correct layout is active.

### The overlay went blank for a moment / does it refresh itself?

No. If the connection drops, the overlay keeps showing its last state and reconnects silently in the background - it retries forever, so it recovers on its own after network hiccups or a computer waking from sleep.

### A YouTube player is frozen or loading forever

This can happen when several YouTube players run at once and one gets deleted. Pogly detects the stall and reloads the affected player automatically within a few seconds. If it keeps happening, YouTube may be temporarily rate limiting you - Pogly keeps retrying in the background and playback resumes once YouTube allows it.

### Media plays but has no sound in OBS

- Check the element's volume in the Details panel - it may have been created with a low default (your defaults are in the Media tab of the element picker).
- Make sure the media is actually playing: the overlay mirrors the editor's play/pause state.
- In OBS, check that the Browser Source's audio isn't muted in the Audio Mixer ("Control audio via OBS" changes where the sound is routed).

### I see "Restoring session" or keep getting sent to the login page

Your login session expires periodically and Pogly renews it automatically in the background - "Restoring session" is that renewal in progress and normally resolves in a second or two. If you land back on the login screen, the renewal failed (for example after the browser was closed for a long time) - just sign in again; your overlay and settings are unaffected.

### A new editor can't join my overlay

1. They must be on the **whitelist**: Settings → Editors, add their platform + username with a role.
2. The username must match their **login platform** - a user who logs in with Twitch must be whitelisted as Twitch + their Twitch name.
3. If you've written **editor guidelines** (Owner settings), they must accept them on first join before they can edit.

### My API token gets 403 errors

- A token has exactly the permissions of **the editor who created it** - if that editor can't delete layouts in the UI, their token can't either. Permissions are checked live on every request.
- Read-only tokens are rejected on every write route.
- A disabled token, or one whose owner was removed from the whitelist, stops working immediately. See the HTTP API section.

### GIF search shows nothing

An empty search box shows the current trending feed; type to search. Pogly filters out adult content, so some searches simply have no results. If GIFs never load at all, your overlay may not have GIF search enabled yet - it's rolled out per overlay.

### I don't see the profile / DMs tabs in chat

Social features are rolling out gradually and may not be enabled on your account yet. The instance chat tab works for everyone. If the tabs are visible but greyed out, social features are switched off for your account - see Chat & Social.

### Where is my overlay data stored, and how do I back it up?

Everything lives in your overlay's own database in the cloud. You can download a full backup (and restore it later) from **Settings → Data Management** - see the Backup & Restore section for details.

### Why does my overlay URL look like a long random code?

Newer overlays are identified by a unique identity code instead of a name - that's the `?module=...` value. Older overlays keep their name-based URLs; both keep working. Renaming your overlay only changes its display name and never breaks the URL.

### Does Pogly cost anything?

Pogly is free. The only paid feature is the optional **PoglyCDN** subscription, which enables uploading image files directly to Pogly instead of hosting them elsewhere - see the Assets section.
