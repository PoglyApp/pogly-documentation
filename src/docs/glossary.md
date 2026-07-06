## Glossary

Plain-language definitions for terms you'll encounter in Pogly and throughout these docs.

| Term | What it means |
|---|---|
| Overlay | Your Pogly workspace - think of it like a project file or a shared folder. All your layouts, elements, and assets live inside an overlay. |
| Layout | A scene inside an overlay, similar to scenes in OBS. Each layout has its own set of elements. You can switch between layouts instantly. |
| Active Layout | The layout that is currently shown on the live overlay. Only one layout can be active at a time. |
| Element | Anything placed on the canvas - a piece of text, an image, or a widget. |
| Element Data | The underlying asset (an image file or widget code) that an element displays. One asset can be used by multiple elements. |
| Widget | A custom element built with HTML, CSS, and JavaScript. It runs as a mini-webpage inside the overlay. |
| Overlay URL | The browser source URL you paste into OBS to display your Pogly overlay on stream. |
| Browser Source | A feature in OBS (and similar streaming software) that displays a webpage as a video source. This is how Pogly overlays work. |
| Whitelist | The list of platform+usernames that are allowed to connect to and edit your overlay. |
| Role | A named set of permissions assigned to an editor. For example, the 'Producer' role allows layout management. |
| SpacetimeDB | The real-time database technology that powers Pogly's live collaboration. Changes sync instantly across all connected editors. You don't need to know anything about this to use Pogly. |
| OIDC | The login protocol Pogly uses to verify your streaming account identity. All you see is the 'Sign In' button - this is what happens behind the scenes. |
| CDN | Content Delivery Network - a global system for serving files quickly from servers close to the viewer. An optional feature for Pogly image hosting. |
| Spotlight | The Pogly command palette. Press Ctrl+K (Cmd+K on Mac) to open it and quickly search for images, emotes, or widgets to add to the canvas. |
| Interpolation | A smoothing technique that makes remote cursor positions and element movements appear fluid rather than jumping. Enabled in Settings → General. |
| Media Element | An element that plays video, audio, or a stream embed on your overlay (YouTube, Spotify, mp4/mp3 files, and more). |
| Module Identity | The unique code that identifies your overlay - the `?module=` value in your overlay URL. Newer overlays use an identity code instead of a name. |
| Handle | Your social identifier, written as `nickname#platform` (e.g. `pogly#Twitch`). Others use it to add you as a friend. |
| Instance Chat | The real-time chat shared by everyone connected to the same overlay. |
| Preload Area | The zone around the stream frame (shown as a dotted box in the editor) within which elements are loaded by the live overlay. Elements far outside it aren't sent to the overlay. |
| Always Loaded | A per-element option that keeps an element loaded on the overlay even when it's off-screen - used for off-screen audio or timer widgets. |
| Z-Order Lock | A per-element option that stops the element from auto-jumping to the front when selected or moved. |
| API Token | A secret key (`pgly_...`) that lets external tools control your overlay over the HTTP API, acting with its creator's permissions. |
| KLIPY | The GIF search provider that powers Pogly's GIF tab. |
