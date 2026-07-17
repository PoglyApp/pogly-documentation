## Layouts

Layouts are like scenes in OBS - each one is an independent canvas with its own set of elements.

You might have one layout for when you're playing a game, another for a "be right back" screen, and another for chatting with your viewers. You can switch between them instantly.

### Creating a Layout

Click the **+** button at the top of the Layouts panel on the left side of the editor. Give it a name - letters and numbers only, no spaces, up to 20 characters.

### Switching Layouts

Clicking a layout in the list swaps the layout in the editor, allowing you to modify the elements on that layout. To make a layout "go live" on the overlay, click the checkmark button to mark it as **Active**.

> [!WARNING]
>
> Only one layout can be active at a time. Setting a layout as active immediately switches what your stream viewers see - there's no preview step. Make sure the layout looks right before activating it.

### Layout Operations

- **Duplicate:** Right-click a layout and choose Duplicate to create a copy with all the same elements. Great for making variations of an existing scene.
- **Rename:** Right-click a layout to rename it.
- **Delete:** Right-click a layout and choose Delete. You'll be asked whether to also delete its elements or move them to another layout first.

### Overlay URL Parameter

By default, the Browser Source overlay URL always shows whichever layout is currently marked Active.

If you would like to force a specific Pogly Layout, you can, by adding a `&layout=layoutName` to the end of your overlay URL, replacing `layoutName` with the name of your specific Layout.

This is useful if you would like to create multiple Pogly Browser Sources which are locked to specific layouts. The `&layout=` parameter works alongside your overlay's `?module=` code regardless of whether it's an identity-based or name-based URL.
