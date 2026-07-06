## Collaboration

Pogly is built for real-time collaboration. Multiple editors can be on the canvas at the same time, seeing each other's changes as they happen instantly. 

### How Real-Time Editing Works

Every change - moving an element, editing text, switching a layout - is applied for everyone the moment it happens. There is no save button and no refresh needed: all editors and the live overlay always show the same state. If two editors grab the same element, the most recent change wins.

### Inviting Editors

Editors need to be added to your overlay's whitelist before they can join. 

Go to **Settings → Editors**, type their Twitch (or YouTube/Kick) username, choose a role, and click Add. 

They'll be able to join the next time they log in and navigate to your overlay. What each editor is allowed to do is controlled by their role - see the Permissions section.

> [!TIP]
>
> As the owner, you can write **editor guidelines** (Owner settings) - your own rules or instructions that every editor must read and accept before they can start editing.

### Seeing Other Editors

When another editor is connected, you'll see their cursor moving around the canvas in real time with their name next to it. You can also see which element they have selected - it's highlighted with their color.

- Each editor gets a unique color assigned automatically
- Cursor names can be turned on or off in Settings → General
- The user list at the top right of screen shows everyone currently connected
- If remote cursors look jittery, enable **smoothen interpolation** in Settings → General

### Talking to Each Other

The built-in chat window (chat button in the bottom bar) gives all connected editors a shared room to coordinate in - with emotes, mentions, and more. You can also add other editors as friends and message them directly even when you're not in the same overlay. See the **Chat & Social** section.

### Nicknames

Your display name defaults to your platform username. You can set a different nickname per overlay in **Settings → Nicknames** - that's the name other editors see on your cursor, in the user list, and in chat.

### Kicking Users

Editors with the **Kick Guest** permission (Manager role) can disconnect a connected user from **Settings → Editors** - useful for removing stuck "ghost" connections. Kicking doesn't remove anyone from the whitelist; to revoke access permanently, remove them from the whitelist instead.
