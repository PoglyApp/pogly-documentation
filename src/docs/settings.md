## Settings

Open Settings by clicking the gear icon in the bottom-right corner of the editor. Settings are organized into tabs on the left side of the settings panel.

### General

- **Copy Overlay URL:** Copies your overlay browser source URL to the clipboard. This is the URL you paste into OBS.
- **Theme:** Choose from 7 visual themes - dark, light, paper, nord, mocha, solarized, matcha.
- **Show cursor names:** Toggle whether other editors' names appear next to their cursors on the canvas.
- **Right-click context menu:** Use a right-click menu on elements for quick actions instead of relying on the Details panel.
- **Fade on hide/show:** Animate element visibility changes with a configurable fade transition instead of an instant snap.
- **Zoom smoothing:** Controls how fluid the zoom animation feels. Options: None, Light, Normal, Heavy.
- **Reverse aspect ratio lock:** Flips which key locks the aspect ratio during resizing.
- **Upload options:** Set URL as default upload method, enable automatic file naming, and choose whether to compress images on upload or paste.
- **Grid:** Toggle a placement grid on the canvas. Choose between dots or lines, set the grid size, line thickness, color, and at what zoom level it fades out.
- **Smoothen interpolation:** Applies smoothing to remote cursor and element position updates for a less jittery appearance. Requires a page refresh to take effect.

### Editor Panels

- **Element Picker Position:** Dock the element picker as a permanent panel on the right side instead of a floating popup.
- **Panel scales:** Adjust the size of each individual UI panel - Layouts, Layers, Properties, Element Picker, User List, footer, and title - from 50% to 150%. Useful for very small or very large screens.
- **Disable panels:** Hide panels you don't use. Hiding a panel collapses it entirely to free up more canvas space.

### Keybinds

Every keyboard shortcut in Pogly can be remapped. Click any shortcut in the Keybinds tab to record a new key combination. Conflicts are highlighted in orange. You can reset any individual shortcut to its default.

### Channel Emotes

- Enable or disable individual emote providers: Twitch, 7TV, BetterTTV, FrankerFaceZ
- Toggle between channel-specific emotes and global emotes from each provider
- Set a custom username for 7TV emote lookups (useful if your stream name differs from your 7TV name)

### Stream Preview

When a streaming platform and channel are configured (see Owner Settings), Pogly shows a live embed of your stream in the center of the canvas.

- **Stream Quality:** Choose the playback quality of the embedded stream (1080p60, 720p60, 360p, 160p)
- **Stream Interactable:** When enabled, mouse clicks pass through to the stream embed, enabling you adjust volume, play/pause, and change other settings.

### Nicknames

Set a custom display name for each overlay you own or manage. This is what's shown to other editors as your name in the user list and cursor label.

### Owner Settings

> [!NOTE]
>
> These settings are only visible to the overlay owner. Other editors will not see this tab.

- **Stream config:** Set your streaming platform (Twitch, YouTube, Kick) and channel name to enable the stream preview feature for all editors.
- **Editor Guidelines:** Write custom instructions or rules in Markdown that editors see when they first connect to your overlay. They must click "Accept" before they can start editing.
- **Overlay rename:** Change the overlay's name. This also changes the overlay URL, so update your OBS Browser Source after renaming.
- **Delete Overlay:** Permanently deletes the overlay and all its data. Requires two-step confirmation including re-entering the overlay name.

### Data Management

> [!WARNING]
>
> These options are destructive and cannot be undone. Use with caution.

- **Export Backup:** Download a full backup of your overlay as a SQLite database file. You can choose which data to include: elements, element data (images/widgets), and layouts.
- **Import Backup:** Upload a previously exported `.sqlite` backup file to restore your overlay. You can optionally clear existing data before importing.
- **Delete all elements / element data:** Removes everything from the canvas (or all uploaded assets).

### Changelog

View the full release history for Pogly, including what changed in each version.
