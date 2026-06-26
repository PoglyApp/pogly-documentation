## Widget Development

> [!WARNING] Advanced
>
> This section is for developers. You'll need basic knowledge of HTML, CSS, and JavaScript to build widgets.

### What's a Widget?

Widgets are self-contained mini-webpages that run inside your overlay. 

You write them in a built-in IDE using HTML, CSS, and JavaScript. Pogly compiles your code at runtime and renders it in an iframe within the overlay.

Widgets are **deterministic** - they reconstruct the same output identically from the same code and variables - every connected client (editors and the live overlay) shows the exact same result without any network sync needed.

> [!NOTE]
>
> Widgets don't have access to Pogly's internal state or any external network. If you need live data (e.g. a follower count), fetch it inside the widget's JavaScript using a public API or a CORS-enabled endpoint.

### The Widget IDE

Pogly offers a Widget IDE for you to develop your widgets in. 

Create a new widget by clicking the **Widgets** button in the bottom bar. To edit an existing widget, select it and click **Edit Widget** in the Details panel or in the context menu.

The IDE has a sidebar with these tabs:

- **controls** - a user-friendly panel showing your widget's variables as inputs, plus toggles for Twitch Chat, Streamer.bot, and Live Variables integrations. Non-developers can adjust everything here without touching code.
- **preview** - a live iframe preview that updates as you type. This is your primary feedback loop.
- **html** - the `<body>` content
- **css** - your styles
- **js** - JavaScript that runs after the DOM loads
- **header** - injected into `<head>` - use for external script imports and meta tags
- **variables** - define the configurable variables for your widget
- **import / export** - share widgets as JSON files

### Code Sections

Load external libraries in the **header** tab:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

Write your layout in the **html** tab:

```html
<div id="counter">0</div>
```

Style it in the **css** tab. Note the `{textColor}` variable substitution:

```css
body {
  margin: 0;
  background: transparent;
}

#counter {
  font-size: 48px;
  color: {textColor};
  font-family: sans-serif;
}
```

Add logic in the **js** tab:

```javascript
let count = 0;

setInterval(() => {
  document.getElementById('counter').textContent = count++;
}, 1000);
```

### Variables

Variables let non-technical editors customize a widget without touching its code. Define them in the **variables** tab, then reference them anywhere in your code with `{variableName}` - the value is substituted at compile time.

| Type | ID | Control shown in "controls" tab |
|---|---|---|
| String / Number | 1 | Text input - accepts any text or number |
| Boolean | 2 | Checkbox - true or false |
| Toggle | 3 | Button that fires once per click - use in JS to trigger an action |
| Color | 4 | Color picker - returns a hex value like #ff0000 |
| Image | 5 | Image selector - returns a URL to the chosen image |

Variable substitution works in any code tab - html, css, js, or header:

```html
<!-- html tab -->
<img src="{teamLogo}" alt="Team Logo" />
```

```css
/* css tab */
body { color: {textColor}; }
```

```javascript
// js tab
const label = '{displayName}';
```

### Built-in Variables

These variables are injected automatically. You can use them in your code but cannot override them with a user-defined variable of the same name.

| Variable | Value |
|---|---|
| `{widget_width}` | Width of the widget element in pixels (set when the element was placed) |
| `{widget_height}` | Height of the widget element in pixels |
| `{is_overlay}` | true when running in the live overlay, false in the editor preview |

```javascript
// Check if running in the live overlay (not the editor preview)
if ({is_overlay}) {
  document.getElementById('debug-panel').style.display = 'none';
}

// Size the canvas to match the element dimensions
const canvas = document.getElementById('myCanvas');
canvas.width  = {widget_width};
canvas.height = {widget_height};
```

> [!TIP]
>
> Use `{is_overlay}` to hide developer-facing debug panels or watermarks in the live overlay while keeping them visible in the editor preview.

### Import & Export

Widgets are stored as JSON. Use the **export** tab to copy your widget as a JSON blob, and the **import** tab to load one. This makes it easy to share widgets with other streamers or move them between overlays.

```json
{
  "widgetName": "Sub Counter",
  "widgetWidth": 400,
  "widgetHeight": 100,
  "headerTag": "",
  "bodyTag": "<div id=\"count\">0</div>",
  "styleTag": "body { margin: 0; background: transparent; } #count { font-size: 64px; color: {textColor}; }",
  "scriptTag": "let n = {startCount}; setInterval(() => document.getElementById('count').textContent = n++, 1000);",
  "variables": [
    { "name": "textColor", "type": 4, "value": "#ffffff" },
    { "name": "startCount", "type": 1, "value": "0" }
  ]
}
```

### Live Variables

Because widgets are deterministic by default, changing a variable value causes the widget to fully recompile and restart - resetting any runtime state like counters, animations, or timers. 

**Live variables** skip the recompile: the new value is sent directly into the running widget via `postMessage`, keeping everything else running uninterrupted.

To mark a variable as live, check the **Live** checkbox next to it in the **variables** tab. Toggle variables cannot be live - they always trigger a full recompile.

```javascript
// Define this function in your js tab to receive live updates
function onLiveVariableUpdate(name, value) {
  // 'name'  - the variable name as a string
  // 'value' - the new value as a string
  if (name === 'textColor') {
    document.getElementById('title').style.color = value;
  }
}
```

Live variables that are marked also appear in the **Details panel** on the right side of the canvas editor, so editors can tweak values on the fly without opening the widget IDE at all.

> [!TIP]
>
> Live variables are ideal for things like text labels, colors, or numeric thresholds that editors want to adjust during a stream without interrupting the widget's animation or counter state.

### Twitch Chat Integration

Enable Twitch Chat Integration in the **controls** tab to receive live chat messages inside your widget. 

Pogly connects to your Twitch channel's chat and forwards each message into the widget via `postMessage`.

> [!NOTE]
>
> Requires the streaming platform to be set to Twitch in **Owner Settings → Stream config**.

Define this function in your **js** tab to receive messages:

```javascript
function onTwitchMessage(data) {
  // data.username    - display name of the chatter
  // data.message     - the chat message text
  // data.color       - the user's chat color (string or null)
  // data.isAction    - true if this is a /me action
  // data.isMod       - true if the user is a moderator
  // data.isSubscriber - true if the user is a subscriber
  // data.badges      - object of badge names to their version strings
  // data.userId      - the chatter's Twitch user ID

  console.log(data.username + ': ' + data.message);
}
```

### Streamer.bot Integration

Enable Streamer.bot Integration in the **controls** tab to receive events from a local [Streamer.bot](https://streamer.bot) instance. Over 180 event types are supported across Twitch, YouTube, Kick, OBS, hardware integrations, and more.

Configure the connection in the collapsible config section inside the controls tab:

- **Host** - default `127.0.0.1`
- **Port** - default `8080`

> [!NOTE]
>
> For security purposes, the Host is hard-coded to localhost, and only the port is changeable at this time. 
>
> This means the streamer must be running Streamer.bot on the same computer that OBS/Streamlabs is running on.

Define these functions in your **js** tab:

```javascript
// Called once when the connection to Streamer.bot is established
function onStreamerBotConnect(data) {
  console.log('Connected to Streamer.bot');
}

// Called for every event that fires in Streamer.bot
function onStreamerBotEvent(data) {
  // data contains the full event payload from Streamer.bot
  if (data.event?.source === 'Twitch' && data.event?.type === 'Follow') {
    showFollowAlert(data.data?.user_name);
  }
}
```

Use the **Generate** button next to any event in the event list to automatically create the handler code for it. Events are organized by source (Twitch, YouTube, OBS, etc.) and are searchable by name.

### Best Practices

- Always set `body { margin: 0; background: transparent; }` in your CSS so the widget blends seamlessly into the overlay.
- Test with both values of `{is_overlay}` - use the preview tab (editor mode) and check your live overlay (overlay mode).
- Give variables clear names and sensible default values so other editors can use the controls tab without reading your code.
- Keep widget dimensions in sync with your element size using `{widget_width}` and `{widget_height}` instead of hardcoded values.

> [!WARNING]
>
> Avoid using While(), and other loops in your widget js code. These can endlessly loop causing your overlay to become inaccessible.
