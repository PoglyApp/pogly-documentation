## Getting Started
Pogly is a free, real-time collaborative overlay editor that runs entirely in your browser. 

Think of it like a shared drawing board for your stream - multiple people can make changes at the same time, and everything appears live on your stream the moment it's moved, resized, or updated.

### Requirements

- A web browser - Chrome or Firefox work best
- OBS Studio (or any streaming software that supports a Browser Source)
- A Twitch, YouTube, or Kick account to log in

### Setup

Setup is simple, and can be done in under 60 seconds. 
1. Go to https://cloud.pogly.gg/
2. Click `create an overlay for free` button
3. Complete the initial setup
   * Enter the channel name
   * (optional) invite collaborators
   * Copy your overlay URL via the button on the final step
4. Create a `Browser Source` in OBS/StreamLabs/IRLToolkit/etc and paste the overlay URL
   * Set width to `1920`
   * Set height to `1080`
   * Leave everything else default
5. You're done!

> [!TIP]
>
> If your stream resolution is larger than `1920x1080`, simply right click the browser source -> transform -> stretch to screen.

> [!NOTE]
>
> Your overlay URL contains a `?module=` code that identifies your overlay. Newer overlays use a long identity code; older ones use a name - both work, and renaming your overlay never changes the URL. The overlay background is transparent by default; add `&transparent=0` to the URL if you want a solid background instead.

### Interface

First impressions are important! Your first time connecting to Pogly might be a bit overwhelming, but it's fairly intuitive once you're familiar with the interface. 

Let's break down the Pogly interface into sections with brief explanations:

#### Center Screen
The center of your screen will be the Stream Preview. It's purpose is to give you a visual aid when placing elements, and to check up on what's going on in the stream, without having to tab out of Pogly.

#### Left Edge
The collapsible Layouts and Elements sub-menus are pinned to the left edge of your screen. These two menus relate to the current "scene", which is referred to as a Layout in Pogly. The Layouts sub-menu is for selecting the active layout, and the Elements sub-menu shows all elements currently on the selected layout.

#### Right Edge
When an element is selected, the Details sub-menu will appear. This sub-menu exists to provide you with specific in-depth detail about the selected element. You can change various element properties in this menu.

#### Bottom Bar
Centered at the bottom of your screen is the Element Picker menu. This is where your library of images, emotes, and widgets live. Clicking on any image, emote, widget or text in this menu will cause that element to spawn on screen.

Phew! Not so complicated... right?
