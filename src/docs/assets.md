## Assets

Assets are the images, widgets, and other files stored in your overlay, and are accessible in the bottom bar of the editor.

They're available across all layouts and can be reused by any editor.

### Uploading Images

There are two ways to get an image into Pogly, and which one you use depends on whether you have a PoglyCDN subscription:

- **By URL (free, default)** - you host the image somewhere else (an "intermediate host") and give Pogly the direct link. No subscription needed. This is the default because Pogly doesn't store the file itself, only the link.
- **Direct file upload (requires PoglyCDN)** - upload files straight from your computer and Pogly hosts them for you. This needs a paid PoglyCDN subscription (see below).

Either way, click the **Images** button in the bottom bar to open the image picker, and once added, an image is saved to your overlay and immediately available to all connected editors.

#### Uploading via an intermediate host (no subscription)

An "intermediate host" is any service that gives you a **direct link** to an image - one that ends in an image extension like `.png`, `.jpg`, `.gif`, or `.webp`. Common options include Imgur, PostImages, or any web host you already use.

1. Upload your image to the host of your choice
2. Get the **direct image link** - not the link to the page showing the image. On most sites you can right-click the image and choose **Copy image address**; the result should end in `.png`, `.jpg`, etc.
3. In Pogly, open the **Images** picker and paste the link into the image URL field (or just paste it straight onto the canvas with Ctrl+V)

Pogly stores the link and loads the image from that host, so keep the image up on the host - if it's deleted there, it disappears from your overlay too.

> [!TIP]
>
> If a link opens a webpage instead of showing just the image, it isn't a direct link. Look for the raw image URL (it ends in an image file extension).

#### Uploading files directly (PoglyCDN)

With a PoglyCDN subscription you can skip the intermediate host entirely and upload files straight to Pogly - drag and drop from your computer, paste from your clipboard, or use the file picker. See **PoglyCDN / File Uploads** below.

Enable image compression in Settings → General to reduce file size on upload or paste.

### Emotes

Search and use emotes from four major platforms directly in the image picker:

- **Twitch** - subscriber, follower, and Bits emotes from your channel
- **7TV** - emotes from your 7TV channel
- **BetterTTV (BTTV)** - channel and global BTTV emotes
- **FrankerFaceZ (FFZ)** - channel and global FFZ emotes

Enable or disable each provider in **Settings → GIFs & Emotes**. You can toggle between channel-specific emotes and global emotes from each provider independently. Use a custom 7TV username if your stream name differs from your 7TV profile.

> [!TIP]
>
> You can also search emotes from the Spotlight (Ctrl+K/Ctrl+Space) without opening the full image picker. Just type an emote name and click to add it instantly.

### GIFs

Click the **GIFs** button in the bottom bar to search for animated GIFs, powered by KLIPY.

- Leave the search box empty to browse the current trending GIFs, or type to search
- Click any GIF to place it on the canvas as an image element
- Adult content is filtered out, so some searches may return few or no results
- Choose how many GIFs appear per row with the **GIFs per row** setting in **Settings → GIFs & Emotes**

> [!NOTE]
>
> Search results may occasionally include a sponsored GIF, marked with an "Ad" badge. Clicking it opens the advertiser's link instead of placing it on your canvas.

### Folders

When you have many images and widgets, folders help keep things organized. Create a folder from the image picker using the folder icon, give it a name and an emoji icon, then drag assets into it.

- Rename folders or change their icon at any time
- Delete a folder to move its contents back to the root - the assets themselves are not deleted
- Only editors with the folder management permissions can create, rename, or delete folders

### PoglyCDN / File Uploads

By default, Pogly can't host your files - you add images by URL from an intermediate host (see "Uploading via an intermediate host" above). **PoglyCDN** removes that step by letting Pogly host your files directly.

With an active PoglyCDN subscription you can upload files straight to Pogly:

- Use the upload button in the **Images** picker in the bottom bar
- Drag an image file from your computer straight onto the canvas
- Paste an image from your clipboard

Pogly then hosts the file, so you don't need to keep it anywhere else.

> [!NOTE]
>
> PoglyCDN is an optional feature that requires a paid subscription. Without it, uploading by URL from an intermediate host works fine and is free.
