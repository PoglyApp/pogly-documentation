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
- Search for animated GIFs via KLIPY

### Media Player Elements

Embed a video or audio player directly on your overlay. Provide a URL and Pogly automatically detects the media type and renders the appropriate player - YouTube, Twitch, Vimeo, TikTok, Spotify, and Wistia embeds, plus direct video/audio file URLs and HLS/DASH streams.

Playback is synchronized in real time between all editors and the live overlay. See the **Media Players** section for the full guide: supported sources, default settings, playback sync, and audio display.

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
| Always Loaded | Keeps the element loaded on the live overlay even when it sits outside the visible frame - useful for off-screen music or timer widgets. Toggled with the power icon in the Details panel. |
| Z-Order Lock | Stops the element from automatically jumping to the front when someone selects or moves it. Reordering it by hand in the Elements panel still works. |

### Selecting and Editing

- Click an element on the canvas to select it and open its properties on the right
- Double-click a text element to open the text editor
- Drag the corner handles to resize; hold Shift to keep the original proportions
- Click empty canvas space to deselect everything

### Pasting Onto the Canvas

Ctrl+V is the fastest way to get things onto the canvas. Depending on what's in your clipboard, Pogly creates the right element automatically:

1. **A copied Pogly element** - pastes as a duplicate of that element
2. **An image URL (or image data)** - becomes an Image element
3. **A playable media URL** (YouTube link, mp3 file, etc.) - becomes a Media Player element using your media default settings
4. **Plain text** - becomes a Text element
