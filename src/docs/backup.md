## Backup & Restore

Pogly can export your whole overlay to a single file and restore it later - handy for backups, moving an overlay between accounts, or duplicating a setup. Everything lives in **Settings → Data Management**.

### Exporting a Backup

Any editor can export. Under **export data**, tick the parts you want to include, then click **export data** to download a `.sqlite` file (named with the date and your channel name).

| Option | What it includes |
|---|---|
| ElementData | Your assets - uploaded images and widget code |
| Elements | The elements placed on the canvas (their positions, transforms, and settings) |
| Layouts | Your layouts (scenes) |

> [!NOTE]
>
> Elements reference ElementData, so if you include **Elements** you must also include **ElementData** - Pogly ticks it for you automatically. For a complete backup, select all three.

### Importing a Backup

> [!NOTE]
>
> Importing is only available to the overlay **owner**.

Under **import data**:

1. Click **select .sqlite backup** and choose a backup file (it must be a `.sqlite` file exported from Pogly)
2. Optionally tick **clear existing data before import** to wipe the current overlay first, so you get an exact copy of the backup instead of a merge
3. Click **import data**

Older backups still work - if a backup was made before a feature existed, the missing parts are simply skipped rather than causing an error.

> [!WARNING]
>
> Importing without "clear existing data" **adds** the backup's contents on top of what's already there, which can create duplicates. Tick the box when you want the overlay to match the backup exactly.

### Deleting Data

> [!WARNING]
>
> These actions are only available to the owner, apply immediately, and cannot be undone. Export a backup first if there's any chance you'll want the data back.

Under **delete data**:

- **Delete all Elements** - clears every element off the canvas (across all layouts). Click once, then click again to confirm. Your assets (ElementData) are kept.
- **Delete all ElementData** - removes every uploaded asset. Because placed elements depend on their assets, this also clears all elements. This one asks you to confirm several times before it runs.
