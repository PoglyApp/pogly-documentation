## Permissions

You control exactly what each editor can and can't do in your overlay. 

Access is managed through a combination of a Whitelist (who can join) and Permissions (what they can do once they're in).

### How It Works

1. You add someone's platform+username to the **Whitelist** (Settings → Editor → Editors tab)
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
| Producer | Everything in Editor, plus create, rename, switch, and delete layouts. Manage asset folders. |
| Manager | Everything in Producer, plus kick connected users, manage other editors' permissions, modify the whitelist, and send overlay refresh commands. |

### Custom Roles

If the pre-built roles don't fit your needs, you can create custom roles with exactly the permissions you want. Go to **Settings → Editor → Roles tab** and click Create Role. You'll see a full list of available permissions to pick from.

### Managing the Whitelist

Go to **Settings → Editor → Editors tab** to:

- Add editors by platform+username and assign a role
- Change an editor's permissions at any time
- Remove editors from the whitelist (they'll lose access immediately)

### Overlay Commands

Editors with the **Issue Overlay Command** permission (included in the Manager role) can trigger two commands that affect all connected overlay browser sources:

- **Refresh:** Reloads the overlay page - useful if something looks stuck or out of sync
- **Hard Refresh:** Clears stored data and reloads - use this if a regular refresh doesn't fix the issue

These commands are found in **Settings → General → Overlay**.
