## Media Players

Media elements let you play videos, music, and streams directly on your overlay - a hype video during a break, background music, or a co-stream embed. 

Paste a link, and Pogly figures out the right player automatically.

### Adding Media

There are two ways to add a media element:

1. Click the **Media** button in the bottom bar, paste a URL into the input, and click add
2. Copy a media URL and paste it (Ctrl+V) directly onto the canvas - Pogly detects that it's a playable link and spawns a media element for it

### What You Can Play

| Source type | Supported |
|---|---|
| Embeds | YouTube, Twitch streams, Vimeo, TikTok, Spotify, Wistia |
| Video files | mp4, webm, mov (direct URL) |
| Audio files | mp3, ogg, wav, aac (direct URL) |
| Live streams | HLS (`.m3u8`), DASH (`.mpd`) |

> [!TIP]
>
> The Media tab in the element picker shows this same "what you can play" list, so you don't need to memorize it.

### Default Settings

The Media tab has a **default settings** card with three options that are applied to every media element you create:

- **Volume** - starting volume (default 100%)
- **Autoplay** - whether new media elements start playing on their own (default off)
- **Loop** - whether playback restarts from the beginning when it ends (default off)

These are your personal defaults for new elements - changing them doesn't affect media elements that already exist. Each element's own volume, autoplay, and loop can be changed at any time from the Details panel.

### Playback Controls

When you select a media element in the editor, it shows a playback bar with play/pause, a seek bar, time display, volume, and loop controls. 

The playback bar is **editor-only** - it never appears on the live overlay in OBS.

Play, pause, and seeking are synchronized in real time: when one editor presses play, playback starts for every connected editor **and** on the live overlay.

### Everyone Stays In Sync

Media playback is designed so that all viewers of the overlay see the same thing:

- Play, pause, and seek actions from any editor apply everywhere instantly
- Anyone who connects late - a new editor, or an overlay browser source that just loaded - automatically jumps to the correct current position of media that's already playing
- **Autoplay** elements are treated as "playing" from the moment they're created, so they sync the same way. Pausing an autoplay element keeps it paused for everyone, including people who join afterwards.

### Audio Display

Audio files don't have a picture, so Pogly renders a compact card instead: a music-note icon, the track name (taken from the file name), and the elapsed / total time. The card scales with the element size, and audio elements spawn at a compact size by default.

> [!NOTE]
>
> Spotify embeds show only the music-note icon - Spotify's player doesn't expose the track name or playback time to Pogly.

### Keeping Off-Screen Media Playing

Normally, an element that sits outside the visible 1920×1080 frame is unloaded from the overlay entirely (see Canvas & Editing → The Preload Area). If you want background music or any media parked off-screen to keep playing on stream, enable **Always Loaded** on the element - the power-icon toggle in the Details panel.

### Troubleshooting

- **A YouTube player froze or loads forever:** this can happen when several YouTube players run at once and one of them is deleted. Pogly detects the stall and reloads the affected player automatically within a few seconds - no action needed. If a player stays stuck, it usually means YouTube is rate limiting you, and it will recover by itself; Pogly keeps retrying in the background.
- **No sound on the overlay in OBS:** check the element's volume (it may have been created with a low volume default), and make sure the media is actually playing - the overlay follows the editor's play/pause state.
- **The playback bar shows on my overlay:** it can't - playback controls are hidden on the overlay. If you see controls, you have the editor open in that browser source, not the overlay URL.
