## Canvas & Editing

The editor canvas is your workspace. Here's everything you need to know about navigating it and working with elements.

### Navigating the Canvas

- **Zoom:** Scroll the mouse wheel up or down, or scroll with two fingers on a trackpad. 
- **Pan:** Hold the middle mouse button and drag, or hold CTRL and drag with the right mouse button, or use WASD to move the canvas with the keyboard.

> [!TIP]
>
> If zooming feels too fast or too slow, adjust the Zoom Smoothing setting in Settings → General. Options are None, Light, Normal, and Heavy.

### Selecting Elements

- Click an element to select it
- Click empty canvas space to deselect everything
- Hold Shift while clicking to select multiple elements, or
- Click and drag on empty space to draw a selection box around multiple elements at once

### Moving and Resizing

- **Move:** Drag the element. Hold **Shift** while dragging to lock movement to a single axis.
- **Resize:** Drag the corner or edge handles. Hold **Shift** to maintain the original aspect ratio.
- **Rotate:** Drag the circular handle that appears above the selected element, or type a number directly into the Rotation field in the Details panel.
- **Fine-tune position/size:** Use the X, Y, W, H, and R inputs in the Details panel on the right for exact values. You can also use the arrow keys to nudge an element, or shift arrow keys to big-nudge an element.

### Advanced Transforms

- **Warp:** Distort the element's perspective by dragging its four corners independently. Useful for making elements look like they're on an angled surface.
- **Crop:** Drag the edge handles inward to crop the element without resizing it. Only the cropped area is visible.
- **Flip:** In the context menu, you can flip an element. Horizontal or vertical.
- **Reset:** In the details menu, you can reset an element. You can reset size, rotation, crop, warp, or all transforms at once independently.

### Working with Multiple Elements

When multiple elements are selected, move, resize, and rotate operations apply to all of them simultaneously. This makes it easy to reposition a group of elements while keeping their relative spacing intact.

### Element Search / Spotlight

Press **Ctrl+K** or **Ctrl+Space** (Cmd on Mac) to open the Spotlight search. Type to search all your uploaded images, emotes, and widgets. Click any result to instantly add it to the center of the canvas. This is the fastest way to add elements.

### Context Menu

Select any element on the canvas for a menu of quick actions:

- Delete / Duplicate
- Lock / Unlock (prevents accidental changes)
- Hide / Show (sets opacity to 0% or 100%)
- Flip horizontal or vertical
- Swap image source (for image elements)
- Edit element (opens the text or widget editor)

### Live Variables Panel

When a widget element is selected and it has **live variables** defined, those variables appear directly in the Details panel. Editors can adjust values on the fly and the widget updates instantly without restarting.

- String / number variables appear as text inputs - press Enter to apply
- Boolean variables appear as a checkbox - updates immediately on toggle
- Color variables appear as a color swatch and hex input
- Image and toggle variables must be edited inside the widget IDE

### Undo & Redo

Pogly keeps up to 25 steps of history. Undo and redo using the keyboard shortcuts below, or use the history panel in the bottom right to see a list of past actions and jump directly to any point.

### Fade Effects

When hiding or showing elements (setting opacity to 0% or 100%), you can enable a smooth fade animation instead of an instant change. Configure the duration and enable keyboard hotkeys for this in **Settings → General**.

### Keyboard Shortcuts

| Key | Action |
|---|---|
| Delete | Deletes the currently selected element(s) |
| CTRL+X | Deletes the currently selected element, but saves it to your clipboard |
| CTRL+C | Copies the currently selected element to your clipboard |
| CTRL+V | Pastes from your clipboard, if it's an image URL, it automatically parses out the image. If it's an element, it pastes the element. If it's text, it pastes the text. |
| CTRL+D | Duplicates the currently selected element |
| Home | Centers the camera on the stream preview |
| CTRL+Space/K | Opens the element spotlight search modal |
| WASD | Moves the camera around the canvas |
| SHIFT + Resize | Keep aspect ratio during element scaling |
| SHIFT+W | Sets the selected element to "Warp" mode |
| SHIFT+C | Sets the selected element to "Crop" mode |
| SHIFT+S | Sets the selected element to "Scale" mode |
| Page Up | Sets transparency to 100 on the currently selected element(s) |
| Page Down | Sets transparency to 0 on the currently selected element(s) |
| SHIFT+F | Vertically flips the currently selected element |
| CTRL+F | Horizontally flips the currently selected element |
| Arrow Keys | Nudge currently selected element in that direction *Can only move in 1 direction at a time |
| Shift + Arrow Keys | Big nudge currently selected element in that direction *Can only move in 1 direction at a time |

> [!TIP]
>
> Every keyboard shortcut can be customized in Settings → General → Keybinds. Click any shortcut to record a new key combination.
