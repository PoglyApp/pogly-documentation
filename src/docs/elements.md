## Elements

Elements are the building blocks of your overlay. Everything you see in the editor is an element - a piece of text, an image, a media player, or a custom widget.

### Text Elements

Display any text on your overlay - player names, scores, event titles, or anything else.

- Supports basic [Markdown formatting](<https://gist.github.com/cuonggt/9b7d08a597b167299f0d>): `**bold**`, `*italic*`, etc.
- Choose from built-in fonts - or paste a custom font URL from Google Fonts
- Set font size, color, drop shadow, and text outline
- Advanced users can apply custom CSS for extra styling control
- Edit by double-clicking on the canvas or clicking the edit button in the Details panel

### Image Elements

Upload and display any image on your overlay.

- Upload images from your computer (with a PoglyCDN subscription), or paste a direct image URL
- Search and use emotes from Twitch, 7TV, BetterTTV, and FrankerFaceZ
- Search for animated GIFs via Klipy

### Media Player Elements

Embed a video or audio player directly on your overlay. Provide a direct-URL and Pogly automatically detects the media type and renders the appropriate player.

- **YouTube:** Paste any standard YouTube URL - the video embeds automatically using the YouTube player
- **Video files:** MP4, WebM, and other browser-supported formats via direct URL
- **Audio files:** MP3, WAV, OGG, FLAC, AAC, M4A, and Opus via direct URL
- Resize, rotate, and layer the player just like any other element

### Widget Elements

Widgets are custom mini-webpages you build with HTML, CSS, and JavaScript. They run inside your overlay and can do anything a webpage can - countdown timers, goal trackers, animated alerts, live chat displays, and more.

> [!NOTE]
>
> Widgets are an advanced feature aimed at developers. If you just need text and images, you don't need widgets at all. See the Widget Development section for the full guide.

### Common Properties

Every element - regardless of type - has these properties, shown in the Details panel on the right when an element is selected:

| Property | What it does |
|---|---|
| Position | Where the element sits on the canvas, measured in pixels (X / Y) from the top-left corner |
| Size | Width and height in pixels |
| Rotation | Angle in degrees - drag the handle above the selection or type a number |
| Opacity | How visible the element is - 100% is fully visible, 0% is completely invisible |
| Lock | Prevents the element from being accidentally moved or edited by anyone |

### Selecting and Editing

- Click an element on the canvas to select it and open its properties on the right
- Double-click a text element to open the text editor
- Drag the corner handles to resize; hold Shift to keep the original proportions
- Click empty canvas space to deselect everything
