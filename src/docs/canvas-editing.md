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

### Aligning Elements

The Details panel has an **align** button that opens a small 9-point alignment grid. Click an anchor to snap the selected element to that spot - corners, edge centers, or dead center. Each anchor positions the element on both axes at once (for example, "left" means flush left *and* vertically centered).

Next to the grid is a **relative to** selector:

- **stream preview** - align within the 1920×1080 stream frame (the usual choice)
- **viewport** - align within your current browser window view of the canvas

### Working with Multiple Elements

When multiple elements are selected, move, resize, and rotate operations apply to all of them simultaneously. This makes it easy to reposition a group of elements while keeping their relative spacing intact.

### Layer Order & Z-Order Lock

Selecting or moving an element normally brings it to the front automatically. For elements that must stay behind others - a background frame, for example - enable **z-order lock** from the toolbar that appears next to a selected element. A z-order-locked element can be selected, moved, and resized without its stacking position changing. Dragging elements into a new order in the Elements panel still works and applies to locked elements too.

### Always Loaded

Elements far outside the stream frame are not sent to the live overlay at all (see The Preload Area below). The **Always Loaded** toggle - the power icon in the Details panel - opts an element out of this, keeping it loaded and running on the overlay no matter where it sits. Use it for off-screen background music or widgets that need to keep running (timers, sound alerts).

> [!WARNING]
>
> An Always Loaded element is sent to the overlay even while off-screen, so don't use it on elements with content you keep off-frame for privacy.

### The Preload Area

The dotted box around the stream frame in the editor is the **element preload area**. The live overlay only receives elements inside this area - the stream frame plus a margin on every side:

- Elements inside the margin are loaded by the overlay before they enter the frame, so they appear instantly when slid on-screen
- Elements parked far off-screen (notes, spares, works in progress) are never sent to the overlay and stay private to editors
- New elements intentionally spawn just below the preload area, so nothing appears on stream before you've placed it

You can adjust the preload area's visibility with the **preload area opacity** slider in Settings → Canvas.

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
- Slider variables appear as a draggable range slider
- Dropdown variables appear as a select menu
- Date/time variables appear as a date-time input
- Button variables appear as a clickable button that fires its action in the widget
- Toggle variables appear in their own toggles section above the live variables
- Image variables must be edited inside the widget IDE

### Undo & Redo

Pogly keeps up to 25 steps of history. Undo and redo using the keyboard shortcuts below, or use the history panel in the bottom right to see a list of past actions and jump directly to any point.

### Fade Effects

When hiding or showing elements (setting opacity to 0% or 100%), you can enable a smooth fade animation instead of an instant change. Configure the duration and enable keyboard hotkeys for this in **Settings → General**.

### Keyboard Shortcuts

Pogly has shortcuts for nearly everything - undo/redo, copy/paste, transforms, nudging, panning, and Spotlight - and they're all customizable. See the **Keyboard Shortcuts** section for the full reference and how to remap them.
