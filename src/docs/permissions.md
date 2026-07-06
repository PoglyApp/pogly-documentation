## Permissions

You control exactly what each editor can and can't do in your overlay. 

Access is managed through a combination of a Whitelist (who can join) and Permissions (what they can do once they're in).

### How It Works

1. You add someone's platform+username to the **Whitelist** (Settings → Editors → Editors tab)
2. You choose a **Role** for them - either a pre-built role or a custom one you created
3. Their role is a set of permissions which determines which actions they're allowed to perform in your overlay

> [!NOTE]
>
> The overlay owner always has full access to everything, regardless of any permission settings.

### Pre-Built Roles

Pogly comes with four ready-to-use roles. Each one includes all the permissions of the role below it:

| Role | What they can do |
|---|---|
| Default | Move, resize, add, and delete elements on the canvas. The baseline for any editor. |
| Editor | Everything in Default, plus upload new images and widgets, and update or delete existing ones. |
| Producer | Everything in Editor, plus create, rename, switch, and delete layouts, manage asset folders, send overlay commands, and use the HTTP API. |
| Manager | Everything in Producer, plus kick connected users, manage other editors' permissions, modify the whitelist, edit the editor guidelines, and manage everyone's API tokens. |

### API Access Permissions

Two permissions govern the HTTP API (see the HTTP API section):

- **API Access** - create and manage your own API tokens. Included in the Producer and Manager roles.
- **Manage API Access** - view and manage every editor's API tokens. Included in the Manager role.

### Custom Roles

If the pre-built roles don't fit your needs, you can create custom roles with exactly the permissions you want. Go to **Settings → Editors → Roles tab** and click Create Role. You'll see a full list of available permissions to pick from.

> [!NOTE]
>
> The pre-built roles are set up once when an overlay is created. If a Pogly update adds a new permission (such as API Access), overlays created before that update keep their original role definitions - the new permission won't appear in their pre-built roles automatically. Add it manually by editing the role or an editor's permissions.

### Managing the Whitelist

Go to **Settings → Editors → Editors tab** to:

- Add editors by platform+username and assign a role
- Change an editor's permissions at any time
- Remove editors from the whitelist (they'll lose access immediately)

### Overlay Commands

Editors with the **Issue Overlay Command** permission (included in the Producer and Manager roles) can trigger two commands that affect all connected overlay browser sources:

- **Refresh:** Reloads the overlay page - useful if something looks stuck or out of sync
- **Hard Refresh:** Clears stored data and reloads - use this if a regular refresh doesn't fix the issue

These commands are found in **Settings → General → Overlay**.
