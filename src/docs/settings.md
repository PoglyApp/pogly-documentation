## Settings

Open Settings by clicking the gear icon in the bottom-right corner of the editor. Settings are organized into tabs on the left side of the settings panel.

### General

- **Copy Overlay URL:** Copies your overlay browser source URL to the clipboard. This is the URL you paste into OBS.
- **Overlay commands:** Send a **Refresh** or **Hard Refresh** to all connected overlay browser sources (requires the Issue Overlay Command permission) - see the Permissions section.
- **Theme:** Choose from 7 visual themes - dark, light, paper, nord, mocha, solarized, matcha.
- **Show cursor names:** Toggle whether other editors' names appear next to their cursors on the canvas.
- **Right-click context menu:** Use a right-click menu on elements for quick actions instead of relying on the Details panel.
- **Fade on hide/show:** Animate element visibility changes with a configurable fade transition instead of an instant snap.
- **Zoom smoothing:** Controls how fluid the zoom animation feels. Options: None, Light, Normal, Heavy.
- **Reverse aspect ratio lock:** Flips which key locks the aspect ratio during resizing.
- **Upload options:** Set URL as default upload method, enable automatic file naming, and choose whether to compress images on upload or paste.
- **Grid:** Toggle a placement grid on the canvas. Choose between dots or lines, set the grid size, line thickness, color, and at what zoom level it fades out.
- **Smoothen interpolation:** Applies smoothing to remote cursor and element position updates for a less jittery appearance. Requires a page refresh to take effect.

### Canvas

- **Element Picker Position:** Dock the element picker as a permanent panel on the right side instead of a floating popup.
- **Widget editor transparency:** How see-through the widget IDE window becomes when its see-through toggle is active.
- **Chat window transparency:** How see-through the chat window becomes when its see-through toggle is active.
- **Chat emote names:** When enabled, bare emote names in chat turn into emote images; when off, only `:name:` style codes convert.
- **Preload area opacity:** Visibility of the dotted element preload area shown around the stream frame.
- **Panel scales:** Adjust the size of each individual UI panel - Layouts, Layers, Properties, Element Picker, User List, footer, and title - from 50% to 150%. Useful for very small or very large screens.
- **Disable panels:** Hide panels you don't use. Hiding a panel collapses it entirely to free up more canvas space.

### Editors

Manage who can access your overlay and what they're allowed to do - the whitelist, roles, and connected users (including kicking stuck connections). Covered in detail in the **Permissions** and **Collaboration** sections.

### Stream Preview

When a streaming platform and channel are configured (see Owner Settings), Pogly shows a live embed of your stream in the center of the canvas.

- **Stream Quality:** Choose the playback quality of the embedded stream (1080p60, 720p60, 360p, 160p)
- **Stream Interactable:** When enabled, mouse clicks pass through to the stream embed, enabling you adjust volume, play/pause, and change other settings.

### GIFs & Emotes

- **GIFs per row:** Choose how many columns the GIF search grid uses.
- Enable or disable individual emote providers: Twitch, 7TV, BetterTTV, FrankerFaceZ
- Toggle between channel-specific emotes and global emotes from each provider
- Set a custom username for 7TV emote lookups (useful if your stream name differs from your 7TV name)

### Keybinds

Every keyboard shortcut in Pogly can be remapped. Click any shortcut in the Keybinds tab to record a new key combination. Conflicts are highlighted in orange. You can reset any individual shortcut to its default. See the **Keyboard Shortcuts** section for the full list of default bindings.

### API Access

Create and manage API tokens for controlling your overlay from external tools (Stream Deck, bots, scripts). Visible to editors with the API Access or Manage API Access permission, and to the owner. See the **HTTP API** section for the full guide.

### Data Management

Export your overlay to a `.sqlite` backup, restore one, or bulk-delete data. Exporting is available to any editor; importing and the delete-all actions are owner-only. See the **Backup & Restore** section for the full walkthrough.

> [!WARNING]
>
> The delete actions here are destructive and cannot be undone - export a backup first.

### Nicknames

Set a custom display name for each overlay you own or manage. This is what's shown to other editors as your name in the user list and cursor label.

### Subscription

View and manage your PoglyCDN subscription - the optional paid feature that enables direct file uploads (see the Assets section). This tab shows your billing status and opens the subscription checkout or management portal.

### Owner Settings

> [!NOTE]
>
> These settings are only visible to the overlay owner. Other editors will not see this tab.

- **Stream config:** Set your streaming platform (Twitch, YouTube, Kick) and channel name to enable the stream preview feature for all editors.
- **Editor Guidelines:** Write custom instructions or rules in Markdown that editors see when they first connect to your overlay. They must click "Accept" before they can start editing.
- **Overlay rename:** Change the overlay's display name. This only changes the label shown in menus - your overlay URL stays the same, so OBS doesn't need updating.
- **Delete Overlay:** Permanently deletes the overlay and all its data. Requires two-step confirmation including re-entering the overlay name.

### Debug

Developer-facing diagnostics (logs and connection details). You'll rarely need this tab - support may ask you to open it when investigating an issue.

### Changelog

View the full release history for Pogly, including what changed in each version.
