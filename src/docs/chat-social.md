## Chat & Social

Pogly has a built-in chat so editors can talk to each other without leaving the editor - plus profiles, friends, and direct messages that work across overlays.

Open the chat by clicking the **chat button** in the bottom bar. It opens as a floating window that you can drag by its title bar and resize from the corner - its position and size are remembered.

> [!NOTE]
>
> Social features (the profile and DMs tabs) are rolling out gradually and may not be enabled on your account yet. The instance chat tab works for every editor.

### Instance Chat

The **chat** tab is a room shared by everyone connected to the same overlay. Anyone who can edit the overlay can chat.

> [!NOTE]
>
> Chat messages are ephemeral - they exist on screen only while you're connected and are never stored anywhere. Closing the window doesn't lose messages from your current session, but refreshing the page starts you with a clean slate.

What the chat can do:

- **Emotes:** type `:emoteName:` (or just the emote name) and it renders as the emote image. The smiley button opens a searchable emote picker. Emotes come from the same providers configured in Settings → GIFs & Emotes. If you don't want bare emote names auto-converting, turn that off in Settings → Canvas.
- **Mentions:** type `@` to get a list of connected editors, or click any name in chat to mention that person. Mentions are highlighted - extra brightly when someone mentions you.
- **Multi-line messages:** press **Shift+Enter** for a new line; plain Enter sends.
- **Code:** wrap text in single backticks for inline code, or triple backticks for a code block - just like Discord.
- **Links and images:** URLs become clickable links. Links to images display the image below the message. Wrap a link in angle brackets - `<https://example.com/image.png>` - to keep it as a plain link with no image preview.
- **Unread badges:** the chat button and each tab show a count of messages you haven't seen yet.

To avoid spam, chat limits how fast you can send: minimum ~half a second between messages, at most 5 messages per 7 seconds, and no identical message twice in a row within 5 seconds.

### See-Through Mode

The eye button in the chat title bar makes the whole window semi-transparent so you can keep an eye on chat without it blocking the canvas. Adjust how transparent it gets with the **chat window transparency** slider in Settings → Canvas.

### Your Profile

The **profile** tab (far left of the tab strip) shows your avatar and name, and contains:

- **Your handle** - shown as `nickname#platform` (for example `pogly#Twitch`). This is what friends use to add you; click the copy icon to copy it.
- **Social features toggle** - turns your participation in the social layer on or off. While off, you can't send or receive friend requests or messages, but nothing is deleted - existing friends and conversations pick up where they left off when you re-enable it.
- **Bio** - a short text about you, visible to others.

### Friends

Add friends from the profile tab in two ways:

- **By handle:** type their `nickname#platform` handle into the add-friend form (pasting a full handle fills both fields automatically)
- **From this overlay:** below the form is a list of the current overlay's editors - add anyone with one click

Incoming and outgoing friend requests appear in the profile tab, where you can accept, decline, or cancel them. Friends can be messaged or unfriended from your friends list.

> [!NOTE]
>
> Both people need social features enabled for a friend request to go through. If a handle lookup says the user doesn't exist, they may simply have social features turned off.

### Direct Messages & Groups

The **dms** tab holds your conversations:

- **DMs:** message any friend directly. DMs require an active friendship - if you unfriend someone, the conversation remains but no new messages can be sent.
- **Groups:** create a group chat and invite friends. You can only invite people you're friends with, and any member can add their own friends or leave the group.

DMs and groups work across overlays - you don't need to be connected to the same overlay as your friend. Like instance chat, messages are ephemeral and not stored.
