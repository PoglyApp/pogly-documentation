## HTTP API

The HTTP API lets external programs control your overlay over plain HTTP. Anything an editor can do to elements, assets, layouts, and folders, a script or app can do too — list what's on the canvas, spawn and move elements, restyle them, switch layouts, and more.

Typical uses:

- A **Stream Deck** button that switches your active layout (scene) or toggles an element
- A **chat bot** that spawns an alert or updates a counter on stream
- A **script or dashboard** that automates your overlay from anywhere

> [!NOTE] For developers
>
> This section assumes you're comfortable making HTTP requests (curl, a programming language, or a tool like Stream Deck's Web Requests). If you just want to edit your overlay by hand, use the editor — you don't need any of this.

### What you can do

- **Elements** — list, spawn (text / image / widget / media), update any property, and delete
- **Assets** — list, create from a URL, update, and delete the images and widgets in your library
- **Layouts** — list, create, rename, duplicate, switch the active one, and delete
- **Folders** — list, create, rename, and delete asset folders

Overlay commands, the whitelist, permissions, and chat are **not** exposed — the API is for overlay content only.

### Base URL

Every overlay is backed by its own database, and the API lives under that database's `route` path:

```text
https://maincloud.spacetimedb.com/v1/database/<module>/route/<path>
```

- `<module>` — your overlay's identifier (see **Finding your module** below).
- `<path>` — the route you're calling, e.g. `elements`, `layouts`, `whoami`.

So a full URL looks like:

```text
https://maincloud.spacetimedb.com/v1/database/your-overlay/route/elements
```

#### Finding your module

To get your `<module>`, open the editor's **Settings** and click **Copy Overlay URL** (the same link you paste into OBS). That URL carries a `module` parameter — your module is the value right after `?module=`.

For example, if your overlay URL is `…/?module=your-overlay`, your module is `your-overlay`, making your API base:

```text
https://maincloud.spacetimedb.com/v1/database/your-overlay/route
```

### Authentication

Requests are authenticated with an **API token**, not your login. Create and manage tokens in your editor **Settings → API Access**.

- A token inherits the **permissions of the editor who created it** — it can do exactly what that editor can do, nothing more.
- A token can be **read-only** (can use `GET` routes only) or **full-access** (can also create, update, and delete).
- You're shown the token **once**, when you create it. Copy it then. You can rotate (replace) or revoke a token at any time.

Send the token in a header — either works:

```text
Authorization: Bearer pgly_your_token_here
```

```text
X-Pogly-Token: pgly_your_token_here
```

> [!WARNING]
>
> Treat a token like a password. Anyone holding it can change your overlay (up to that token's permissions). Use a read-only token whenever you only need to read data, and revoke tokens you no longer use.

### Request methods

The API follows REST conventions. The method (or "verb") tells the API what kind of action you want:

| Method | What it does | Example |
|---|---|---|
| `GET` | Reads data. Never changes anything — safe to call anytime. | List your elements |
| `POST` | Creates something new, or triggers an action. | Spawn an element; switch layout |
| `PUT` | Sets something to a specific state. Here it's just an alias for `POST` on the set-active-layout route. | Set the active layout |
| `PATCH` | Updates **part** of something that already exists — only the fields you send change. | Change an element's color |
| `DELETE` | Removes something. | Delete an element |

> [!TIP]
>
> `POST` vs `PATCH` is the key distinction: `POST` creates a brand-new thing, while `PATCH` edits an existing one. With `PATCH` you send only the fields you want to change — everything you leave out keeps its current value.

A **read-only** token can use `GET` only. Every other method needs a full-access token **and** the matching permission (see **Permissions** at the end of this page).

### Responses

Every response is JSON and always includes an `ok` flag.

Success:

```json
{ "ok": true, "elements": [ ... ] }
```

Error — with a matching HTTP status code:

```json
{ "ok": false, "error": "token is read-only" }
```

| Status | Meaning |
|---|---|
| `200` | OK |
| `201` | Created (a `POST` made something new) |
| `400` | Bad request — missing/invalid fields, or a patch that doesn't match the element's type |
| `401` | Missing or invalid token |
| `403` | Token is read-only, or its owner lacks the required permission |
| `404` | The thing you referenced (id/name) doesn't exist |
| `500` | Server error |

### Quick start

Set `BASE` and `TOKEN` once, then reuse them. Switch tabs to see each request in cURL, JavaScript (`fetch`), or Python (`requests`).

```api-example
@@ curl
BASE="https://maincloud.spacetimedb.com/v1/database/your-overlay/route"
TOKEN="pgly_your_token_here"

# Health check (no token needed)
curl "$BASE/ping"

# Confirm your token works and list its permissions
curl -H "Authorization: Bearer $TOKEN" "$BASE/whoami"
@@ javascript
const BASE = "https://maincloud.spacetimedb.com/v1/database/your-overlay/route";
const TOKEN = "pgly_your_token_here";

// Health check (no token needed)
await fetch(`${BASE}/ping`);

// Confirm your token works and list its permissions
const res = await fetch(`${BASE}/whoami`, {
  headers: { Authorization: `Bearer ${TOKEN}` },
});
console.log(await res.json());
@@ python
import requests

BASE = "https://maincloud.spacetimedb.com/v1/database/your-overlay/route"
TOKEN = "pgly_your_token_here"

# Health check (no token needed)
requests.get(f"{BASE}/ping")

# Confirm your token works and list its permissions
res = requests.get(f"{BASE}/whoami", headers={"Authorization": f"Bearer {TOKEN}"})
print(res.json())
@@ response 200 OK
{
  "ok": true,
  "tokenId": 3,
  "label": "stream deck",
  "readOnly": false,
  "identity": "c200e7...f91a",
  "permissions": ["Whitelisted", "AddElement", "UpdateElement", "SetLayoutActive"]
}
```

The examples throughout the rest of this page assume `BASE` and `TOKEN` are defined as above.

### Meta routes

| Route | Auth | Description |
|---|---|---|
| `GET /ping` | none | Health check. Returns `{"ok":true,"service":"pogly","api":"v1"}`. |
| `GET /whoami` | token | Returns the token's owner identity, label, whether it's read-only, and its permission list. |

---

### Elements

An element is one thing on your canvas: text, an image, a widget, or media (video/audio). Every element shares a set of **common** properties and has one **type-specific** group.

| Route | Method | Description |
|---|---|---|
| `/elements` | `GET` | List elements. Filters: `?id=<n>`, `?layout=<n>`. |
| `/elements` | `POST` | Spawn a new element. |
| `/elements?id=<n>` | `PATCH` | Update an element. |
| `/elements?id=<n>` | `DELETE` | Delete an element. |

#### Spawning an element (`POST`)

Send a `type` plus a matching group object. Common fields are optional and have sensible defaults.

Common fields (any type):

| Field | Type | Default | Description |
|---|---|---|---|
| `type` | string | — (required) | `text`, `image`, `widget`, or `media` |
| `x` | number | `0` | X position in pixels |
| `y` | number | `0` | Y position in pixels |
| `transparency` | number | `100` | Opacity, 0–100 |
| `clip` | string | `""` | CSS `clip-path` |
| `layoutId` | number | active layout | Which layout to place it on |
| `transform` | string | from x/y | Raw CSS transform (advanced — usually just use `x`/`y`) |

Type-specific groups:

```jsonc
// text
{ "type": "text", "text": { "text": "GG", "size": 48, "color": "#fff", "font": "Arial", "css": "" } }

// image — reference a stored asset by id, OR give a direct url (with width/height)
{ "type": "image", "image": { "elementDataId": 12 } }
{ "type": "image", "image": { "url": "https://example.com/cat.png", "width": 200, "height": 200 } }

// widget — reference a stored asset by id, OR give inline rawData (with width/height)
{ "type": "widget", "widget": { "elementDataId": 8, "width": 400, "height": 300 } }

// media — video/audio source; autoplay starts it for everyone immediately
{ "type": "media", "media": { "source": "https://youtu.be/...", "width": 640, "height": 360, "autoplay": true, "loop": true } }
```

> [!NOTE]
>
> For an image given as a direct `url`, `width` and `height` are required. Referencing a stored asset by `elementDataId` defaults the size from the asset.

#### Updating an element (`PATCH`)

Send only the fields you want to change. You can mix common fields with the element's type group, but a type group must match the element's actual type (patching `text` on an image returns `400`).

Common fields (any element):

| Field | Type | Description |
|---|---|---|
| `x` | number | X position (px) |
| `y` | number | Y position (px) |
| `transparency` | number | Opacity, 0–100 |
| `clip` | string | CSS `clip-path` |
| `locked` | boolean | Lock/unlock from canvas editing |
| `alwaysLoaded` | boolean | Keep it loaded on the overlay even when off-screen |
| `layoutId` | number | Move it to a different layout |
| `transform` | string | Raw CSS transform (advanced) |

Text elements — `text` object:

| Field | Type | Description |
|---|---|---|
| `text.text` | string | The text content (HTML tags are rejected) |
| `text.size` | number | Font size |
| `text.color` | string | CSS color |
| `text.font` | string | Font family |
| `text.css` | string | Extra CSS, e.g. a text shadow |

Image elements — `image` object:

| Field | Type | Description |
|---|---|---|
| `image.elementDataId` | number | Point at a different stored image asset |
| `image.url` | string | …or set a direct image URL |
| `image.width` | number | Width (px) |
| `image.height` | number | Height (px) |

Widget elements — `widget` object:

| Field | Type | Description |
|---|---|---|
| `widget.elementDataId` | number | Point at a different stored widget asset |
| `widget.rawData` | string | …or set inline widget data |
| `widget.width` | number | Width (px) |
| `widget.height` | number | Height (px) |

Media elements — `media` object:

| Field | Type | Description |
|---|---|---|
| `media.source` | string | Media URL |
| `media.volume` | number | Volume, 0–100 |
| `media.width` | number | Width (px) |
| `media.height` | number | Height (px) |
| `media.autoplay` | boolean | Whether it auto-starts |
| `media.loop` | boolean | Whether it loops |
| `media.playing` | boolean | Play (`true`) or pause (`false`) |
| `media.timestamp` | number | Seek position, in seconds |

**List elements**

```api-example
@@ curl
curl -H "Authorization: Bearer $TOKEN" "$BASE/elements"
@@ javascript
const res = await fetch(`${BASE}/elements`, {
  headers: { Authorization: `Bearer ${TOKEN}` },
});
console.log(await res.json());
@@ python
res = requests.get(f"{BASE}/elements", headers={"Authorization": f"Bearer {TOKEN}"})
print(res.json())
@@ response 200 OK
{
  "ok": true,
  "elements": [
    {
      "id": 5,
      "transform": "translate(100px, 100px)",
      "x": 100,
      "y": 100,
      "transparency": 100,
      "clip": "",
      "locked": false,
      "alwaysLoaded": false,
      "indexLock": false,
      "zIndex": 3,
      "layoutId": 1,
      "placedBy": "api:stream deck",
      "lastEditedBy": "api:stream deck",
      "inRenderBounds": true,
      "type": "text",
      "text": { "text": "Hello!", "size": 48, "color": "#ff0000", "font": "", "css": "" }
    }
  ]
}
```

**Spawn a text element**

```api-example
@@ curl
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"type":"text","x":100,"y":100,"text":{"text":"Hello!","size":48,"color":"#ff0000"}}' \
  "$BASE/elements"
@@ javascript
const res = await fetch(`${BASE}/elements`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    type: "text",
    x: 100,
    y: 100,
    text: { text: "Hello!", size: 48, color: "#ff0000" },
  }),
});
console.log(await res.json());
@@ python
res = requests.post(
    f"{BASE}/elements",
    headers={"Authorization": f"Bearer {TOKEN}"},
    json={
        "type": "text",
        "x": 100,
        "y": 100,
        "text": {"text": "Hello!", "size": 48, "color": "#ff0000"},
    },
)
print(res.json())
@@ response 201 Created
{
  "ok": true,
  "element": {
    "id": 42,
    "transform": "",
    "x": 100,
    "y": 100,
    "transparency": 100,
    "clip": "",
    "locked": false,
    "alwaysLoaded": false,
    "indexLock": false,
    "zIndex": 8,
    "layoutId": 1,
    "placedBy": "api:stream deck",
    "lastEditedBy": "api:stream deck",
    "inRenderBounds": true,
    "type": "text",
    "text": { "text": "Hello!", "size": 48, "color": "#ff0000", "font": "", "css": "" }
  }
}
```

**Update an element** — only the fields you send change (here: move it and make it half-transparent).

```api-example
@@ curl
curl -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"x":960,"y":540,"transparency":50}' "$BASE/elements?id=5"
@@ javascript
const res = await fetch(`${BASE}/elements?id=5`, {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ x: 960, y: 540, transparency: 50 }),
});
console.log(await res.json());
@@ python
res = requests.patch(
    f"{BASE}/elements",
    params={"id": 5},
    headers={"Authorization": f"Bearer {TOKEN}"},
    json={"x": 960, "y": 540, "transparency": 50},
)
print(res.json())
@@ response 200 OK
{ "ok": true }
```

**Delete an element**

```api-example
@@ curl
curl -X DELETE -H "Authorization: Bearer $TOKEN" "$BASE/elements?id=5"
@@ javascript
const res = await fetch(`${BASE}/elements?id=5`, {
  method: "DELETE",
  headers: { Authorization: `Bearer ${TOKEN}` },
});
console.log(await res.json());
@@ python
res = requests.delete(
    f"{BASE}/elements",
    params={"id": 5},
    headers={"Authorization": f"Bearer {TOKEN}"},
)
print(res.json())
@@ response 200 OK
{ "ok": true }
```

---

### Assets

Assets (also called *element data*) are the images and widgets in your library. Spawning an `image`/`widget` element by `elementDataId` points at one of these. The API works with URL/data assets — direct file uploads (PoglyCDN) aren't available over the API.

| Route | Method | Description |
|---|---|---|
| `/elementdata` | `GET` | List assets. Filters: `?id=<n>`, `?name=<name>`, `?folder=<n>`. |
| `/elementdata` | `POST` | Create an asset from a URL or data string. |
| `/elementdata?id=<n>` | `PATCH` | Update an asset. |
| `/elementdata?id=<n>` or `?name=<name>` | `DELETE` | Delete an asset **and every element using it**. |

Create (`POST`) fields:

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Asset name |
| `type` | string | yes | `image`, `widget`, `media`, or `text` |
| `data` | string | yes | The URL or asset data |
| `width` | number | yes | Width (px) |
| `height` | number | yes | Height (px) |
| `folderId` | number | no | Place it in a folder |

Update (`PATCH`) — send any subset:

| Field | Type | Description |
|---|---|---|
| `name` | string | Rename the asset |
| `data` | string | Change the URL/data |
| `width` | number | Width (px) |
| `height` | number | Height (px) |
| `folderId` | number | Move it to a folder |

**Add an image asset**

```api-example
@@ curl
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"logo","type":"image","data":"https://example.com/logo.png","width":128,"height":128}' \
  "$BASE/elementdata"
@@ javascript
const res = await fetch(`${BASE}/elementdata`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "logo",
    type: "image",
    data: "https://example.com/logo.png",
    width: 128,
    height: 128,
  }),
});
console.log(await res.json());
@@ python
res = requests.post(
    f"{BASE}/elementdata",
    headers={"Authorization": f"Bearer {TOKEN}"},
    json={
        "name": "logo",
        "type": "image",
        "data": "https://example.com/logo.png",
        "width": 128,
        "height": 128,
    },
)
print(res.json())
@@ response 201 Created
{
  "ok": true,
  "elementData": {
    "id": 12,
    "name": "logo",
    "type": "image",
    "data": "https://example.com/logo.png",
    "width": 128,
    "height": 128,
    "folderId": 0,
    "createdBy": "api:stream deck",
    "hasByteArray": false
  }
}
```

**Rename an asset and move it to a folder**

```api-example
@@ curl
curl -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"main-logo","folderId":3}' "$BASE/elementdata?id=12"
@@ javascript
const res = await fetch(`${BASE}/elementdata?id=12`, {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "main-logo", folderId: 3 }),
});
console.log(await res.json());
@@ python
res = requests.patch(
    f"{BASE}/elementdata",
    params={"id": 12},
    headers={"Authorization": f"Bearer {TOKEN}"},
    json={"name": "main-logo", "folderId": 3},
)
print(res.json())
@@ response 200 OK
{ "ok": true }
```

**Delete an asset by name**

```api-example
@@ curl
curl -X DELETE -H "Authorization: Bearer $TOKEN" "$BASE/elementdata?name=main-logo"
@@ javascript
const res = await fetch(`${BASE}/elementdata?name=main-logo`, {
  method: "DELETE",
  headers: { Authorization: `Bearer ${TOKEN}` },
});
console.log(await res.json());
@@ python
res = requests.delete(
    f"{BASE}/elementdata",
    params={"name": "main-logo"},
    headers={"Authorization": f"Bearer {TOKEN}"},
)
print(res.json())
@@ response 200 OK
{ "ok": true }
```

> [!WARNING]
>
> Deleting an asset also deletes every element that references it. There's no undo over the API.

---

### Layouts

Layouts are like scenes — each holds its own set of elements, and exactly one is **active** (shown on the overlay) at a time.

| Route | Method | Description |
|---|---|---|
| `/layouts` | `GET` | List layouts (`id`, `name`, `active`). |
| `/layouts` | `POST` | Create a layout. Body: `{"name":"...", "active"?:false}`. |
| `/layouts/duplicate?id=<n>` | `POST` | Copy a layout and its elements into a new one. |
| `/layouts?id=<n>` | `PATCH` | Rename. Body: `{"name":"..."}`. |
| `/layout?id=<n>` or `?name=<name>` | `POST` / `PUT` | Set the active layout (scene switch). |
| `/layouts?id=<n>` | `DELETE` | Delete a layout. |

Update (`PATCH`) fields:

| Field | Type | Description |
|---|---|---|
| `name` | string | New layout name |

Deleting a layout:

- The default layout (`id` 1) can't be deleted.
- Deleting the **active** layout also requires the permission to switch layouts (since the overlay has to change scene).
- By default a deleted layout's elements are removed with it. Add `?preserveElements=true` to re-home them instead (to layout 1, or `?preserveLayoutId=<n>`).

**Switch the active layout** — the headline Stream Deck use case.

```api-example
@@ curl
curl -X POST -H "Authorization: Bearer $TOKEN" "$BASE/layout?name=BRB"
@@ javascript
const res = await fetch(`${BASE}/layout?name=BRB`, {
  method: "POST",
  headers: { Authorization: `Bearer ${TOKEN}` },
});
console.log(await res.json());
@@ python
res = requests.post(
    f"{BASE}/layout",
    params={"name": "BRB"},
    headers={"Authorization": f"Bearer {TOKEN}"},
)
print(res.json())
@@ response 200 OK
{
  "ok": true,
  "activeLayout": { "id": 4, "name": "BRB" }
}
```

**Create a layout**

```api-example
@@ curl
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"BRB"}' "$BASE/layouts"
@@ javascript
const res = await fetch(`${BASE}/layouts`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "BRB" }),
});
console.log(await res.json());
@@ python
res = requests.post(
    f"{BASE}/layouts",
    headers={"Authorization": f"Bearer {TOKEN}"},
    json={"name": "BRB"},
)
print(res.json())
@@ response 201 Created
{
  "ok": true,
  "layout": { "id": 4, "name": "BRB", "active": false }
}
```

**Duplicate a layout** (copies its elements into a new one)

```api-example
@@ curl
curl -X POST -H "Authorization: Bearer $TOKEN" "$BASE/layouts/duplicate?id=1"
@@ javascript
const res = await fetch(`${BASE}/layouts/duplicate?id=1`, {
  method: "POST",
  headers: { Authorization: `Bearer ${TOKEN}` },
});
console.log(await res.json());
@@ python
res = requests.post(
    f"{BASE}/layouts/duplicate",
    params={"id": 1},
    headers={"Authorization": f"Bearer {TOKEN}"},
)
print(res.json())
@@ response 201 Created
{
  "ok": true,
  "layout": { "id": 5, "name": "Default", "active": false }
}
```

> [!TIP]
>
> Layout names with spaces must be URL-encoded in the query string — e.g. `?name=Just%20Chatting`. Switching by `id` avoids the issue.

---

### Folders

Folders organize your assets. They hold element data (assets), not placed elements.

| Route | Method | Description |
|---|---|---|
| `/folders` | `GET` | List folders. |
| `/folders` | `POST` | Create a folder. Body: `{"name":"...", "icon"?:"..."}`. |
| `/folders?id=<n>` | `PATCH` | Rename and/or re-icon. |
| `/folders?id=<n>` | `DELETE` | Delete a folder. |

Update (`PATCH`) — send name, icon, or both:

| Field | Type | Description |
|---|---|---|
| `name` | string | New folder name |
| `icon` | string | New icon (emoji) |

By default, deleting a folder keeps its assets (they return to the root). Add `?preserveElements=false` to delete the folder's assets too.

**Create a folder**

```api-example
@@ curl
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"Alerts","icon":"🔔"}' "$BASE/folders"
@@ javascript
const res = await fetch(`${BASE}/folders`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "Alerts", icon: "🔔" }),
});
console.log(await res.json());
@@ python
res = requests.post(
    f"{BASE}/folders",
    headers={"Authorization": f"Bearer {TOKEN}"},
    json={"name": "Alerts", "icon": "🔔"},
)
print(res.json())
@@ response 201 Created
{
  "ok": true,
  "folder": { "id": 4, "name": "Alerts", "icon": "🔔", "createdBy": "api:stream deck" }
}
```

**Rename a folder**

```api-example
@@ curl
curl -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"Stream Alerts"}' "$BASE/folders?id=4"
@@ javascript
const res = await fetch(`${BASE}/folders?id=4`, {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "Stream Alerts" }),
});
console.log(await res.json());
@@ python
res = requests.patch(
    f"{BASE}/folders",
    params={"id": 4},
    headers={"Authorization": f"Bearer {TOKEN}"},
    json={"name": "Stream Alerts"},
)
print(res.json())
@@ response 200 OK
{ "ok": true }
```

---

### Permissions

A token can do exactly what its creating editor can do — so the same roles and permissions that govern the editor (see the **Permissions** page) govern the API. Reading (any `GET`) just requires being an editor; each write needs the matching permission:

| You want to… | Needs (role that grants it) |
|---|---|
| Read anything (`GET`) | Any editor |
| Spawn, move, or delete elements | **Default** |
| Change an element's image/widget **data**, or manage assets | **Editor** |
| Create, rename, switch, or delete layouts; manage folders | **Producer** |

A read-only token is blocked from **all** writes regardless of its owner's permissions, returning `403`. The overlay owner always has full access.

> [!NOTE]
>
> Permission is checked on every request. If an editor's role changes or they're removed from the whitelist, their tokens immediately reflect that — no need to revoke them separately (though you still can).
