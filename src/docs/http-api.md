## HTTP API

> [!WARNING] Advanced
>
> This section is for developers and power users comfortable with REST APIs and tools like curl.

Pogly exposes an HTTP API so external tools - a Stream Deck, a chat bot, a script - can read and control your overlay: spawn and edit elements, switch layouts, manage assets and folders.

### API Tokens

Every request (except `/ping`) is authenticated with an API token. Manage tokens in **Settings → API Access**:

- **Create a token:** give it a label and optionally mark it **read-only** (a read-only token can call every GET route but is rejected on all writes).
- **The secret is shown once.** Tokens look like `pgly_...` - copy the value when it's displayed, because Pogly stores only a hash and can never show it again.
- **Rotate** replaces a token's secret with a new one (shown once, again). The old secret stops working immediately. Rotating a disabled token also re-enables it.
- **Disable / Revoke** temporarily or permanently kill a token.

Who can do what:

- Editors with the **API Access** permission (included in the Producer and Manager roles) and the overlay owner can create and manage their own tokens.
- Editors with **Manage API Access** (Manager role) also see every editor's tokens via the `mine` / `all` toggle at the top of the list.

> [!NOTE]
>
> A token acts with **its owner's permissions**, checked on every request. If your permissions change, your tokens' capabilities change with them - and revoking an editor's whitelist access instantly neuters their tokens.

### Base URL & Authentication

```
https://maincloud.spacetimedb.com/v1/database/<module-identity>/route/<path>
```

`<module-identity>` is your overlay's identity - the same value as the `?module=` parameter in your overlay URL (Settings → General → copy overlay URL).

Send the token in a header, either form works:

```
Authorization: Bearer pgly_xxxxxxxx
X-Pogly-Token: pgly_xxxxxxxx
```

### Routes

IDs and filters always go in the **query string** - there are no path parameters. Reads require the token owner to be a whitelisted editor; each write requires the listed permission (the overlay owner implicitly has all of them).

| Route | Required permission | What it does |
|---|---|---|
| `GET /ping` | none | health check |
| `GET /whoami` | any valid token | token's owner identity, label, read-only flag, and permission list |
| `GET /elements` `?id=` `?layout=` | Whitelisted | list elements (optionally one by id, or filtered by layout) |
| `POST /elements` | Add Elements | spawn a text / image / widget / media element |
| `PATCH /elements?id=` | Update Elements | partially update an element |
| `DELETE /elements?id=` | Delete Elements | delete an element |
| `GET /elementdata` `?id=` `?name=` `?folder=` | Whitelisted | list assets |
| `POST /elementdata` | Add Element Data | create an asset (image / widget / media / text) |
| `PATCH /elementdata?id=` | Update Element Data | update an asset's name, data, size, or folder |
| `DELETE /elementdata` `?id=` or `?name=` | Delete Element Data | delete an asset **and every element using it** |
| `GET /layouts` | Whitelisted | list layouts |
| `POST /layouts` | Add Layouts | create a layout |
| `POST /layouts/duplicate?id=` | Add Layouts | duplicate a layout including its elements |
| `PATCH /layouts?id=` | Update Layouts | rename a layout |
| `POST` or `PUT /layout` `?id=` or `?name=` | Set Active Layout | make a layout active (scene switch) |
| `DELETE /layouts?id=` | Delete Layouts | delete a layout (`?preserveElements=true&preserveLayoutId=N` moves its elements instead of deleting them) |
| `GET /folders` | Whitelisted | list folders |
| `POST /folders` | Add Folders | create a folder |
| `PATCH /folders?id=` | Update Folders | rename a folder / change its icon |
| `DELETE /folders?id=` | Delete Folders | delete a folder (`?preserveElements=false` also deletes the assets inside) |

> [!NOTE]
>
> The Default layout can't be deleted, and updating an image or widget element's underlying *data* through `PATCH /elements` additionally requires the Update Element Data permission.

### Element JSON

`POST /elements` takes a full element description; `PATCH /elements?id=` takes any subset of the same fields (only the fields you send are changed).

Common fields: `x`, `y`, `transform`, `transparency`, `clip`, `locked`, `alwaysLoaded`, `indexLock`, `layoutId` - plus a `type` and its matching type group:

- `"type": "text"` → `"text": { "text", "size", "color", "font", "css" }`
- `"type": "image"` → `"image": { "elementDataId"` or `"url", "width", "height" }`
- `"type": "widget"` → `"widget": { "elementDataId"` or `"rawData", "width", "height" }`
- `"type": "media"` → `"media": { "source", "volume", "width", "height", "autoplay", "loop", "playing", "timestamp" }`

### Examples

In the examples below, `BASE` is `https://maincloud.spacetimedb.com/v1/database/<module-identity>/route`. Switch tabs to see the same request in cURL, JavaScript (`fetch`), or Python (`requests`).

#### Check that your token works

```api-example
@@ curl
curl -H "Authorization: Bearer pgly_xxxxxxxx" \
  "$BASE/whoami"
@@ javascript
const res = await fetch(`${BASE}/whoami`, {
  headers: { Authorization: "Bearer pgly_xxxxxxxx" },
});
const data = await res.json();
console.log(data);
@@ python
import requests

res = requests.get(
    f"{BASE}/whoami",
    headers={"Authorization": "Bearer pgly_xxxxxxxx"},
)
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

#### Switch the active layout by name

Handy for a Stream Deck "scene switch" button.

```api-example
@@ curl
curl -X POST -H "Authorization: Bearer pgly_xxxxxxxx" \
  "$BASE/layout?name=BRB"
@@ javascript
const res = await fetch(`${BASE}/layout?name=BRB`, {
  method: "POST",
  headers: { Authorization: "Bearer pgly_xxxxxxxx" },
});
const data = await res.json();
console.log(data);
@@ python
import requests

res = requests.post(
    f"{BASE}/layout",
    params={"name": "BRB"},
    headers={"Authorization": "Bearer pgly_xxxxxxxx"},
)
print(res.json())
@@ response 200 OK
{
  "ok": true,
  "activeLayout": { "id": 4, "name": "BRB" }
}
```

#### Spawn a text element

```api-example
@@ curl
curl -X POST -H "Authorization: Bearer pgly_xxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{"type":"text","x":100,"y":100,"text":{"text":"New follower!","size":48,"color":"#ffffff"}}' \
  "$BASE/elements"
@@ javascript
const res = await fetch(`${BASE}/elements`, {
  method: "POST",
  headers: {
    Authorization: "Bearer pgly_xxxxxxxx",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    type: "text",
    x: 100,
    y: 100,
    text: { text: "New follower!", size: 48, color: "#ffffff" },
  }),
});
const data = await res.json();
console.log(data.element.id);
@@ python
import requests

res = requests.post(
    f"{BASE}/elements",
    headers={"Authorization": "Bearer pgly_xxxxxxxx"},
    json={
        "type": "text",
        "x": 100,
        "y": 100,
        "text": {"text": "New follower!", "size": 48, "color": "#ffffff"},
    },
)
print(res.json())
@@ response 201 Created
{
  "ok": true,
  "element": {
    "id": 87,
    "transform": "",
    "x": 100,
    "y": 100,
    "transparency": 100,
    "clip": "",
    "locked": false,
    "alwaysLoaded": false,
    "indexLock": false,
    "zIndex": 12,
    "layoutId": 1,
    "placedBy": "api:stream deck",
    "lastEditedBy": "api:stream deck",
    "inRenderBounds": true,
    "type": "text",
    "text": { "text": "New follower!", "size": 48, "color": "#ffffff", "font": "", "css": "" }
  }
}
```

#### Hide an element

Set it fully transparent. `PATCH` changes only the fields you send.

```api-example
@@ curl
curl -X PATCH -H "Authorization: Bearer pgly_xxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{"transparency":0}' \
  "$BASE/elements?id=87"
@@ javascript
const res = await fetch(`${BASE}/elements?id=87`, {
  method: "PATCH",
  headers: {
    Authorization: "Bearer pgly_xxxxxxxx",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ transparency: 0 }),
});
const data = await res.json();
console.log(data);
@@ python
import requests

res = requests.patch(
    f"{BASE}/elements",
    params={"id": 87},
    headers={"Authorization": "Bearer pgly_xxxxxxxx"},
    json={"transparency": 0},
)
print(res.json())
@@ response 200 OK
{ "ok": true }
```

### Errors

Successful responses always include `"ok": true`. Errors use a standard status code and a JSON body with `"ok": false` and a human-readable `error` message:

```json
{ "ok": false, "error": "token owner lacks the AddElement permission" }
```

| Status | Meaning |
|---|---|
| `401` | missing or invalid token, or the token is disabled |
| `403` | the token is read-only (on a write), or its owner lacks the required permission |
| `404` | no element / asset / layout / folder with that id |
| `400` | invalid JSON body or missing required fields |
