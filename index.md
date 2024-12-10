# Pogly Standalone Documentation

## Installation
There are several ways to install Pogly Standalone:
- [Pogly Cloud](https://discord.gg/uPQsBaVdB7). You can publish an instance with our Discord bot in our Discord server for free and connect to it through our [web portal](https://standalone.pogly.gg).
- [Self-host an instance](/install/manual.md). This provides data permanence and an optional self-hosted frontend.
- [Run the Docker image](/install/docker.md). This is an all-in-one container for easy deployment.
<!-- - [Publish a module to SpacetimeDB's testnet](/install/testnet.md). This is the simplest and fastest way to get up and running, but has the drawback that any data stored is subject to be wiped at any time without warning. -->

This table shows a more detailed comparison of installation methods. Please note that this is not a comprehensive list, just the ones that make sense.
Data Integrity is explained [here](/install/testnet.md#warning).

| Backend                                       | Frontend                              | Data Integrity     | Difficulty             |
|-----------------------------------------------|---------------------------------------|--------------------|------------------------|
| [Pogly Cloud via Discord](https://discord.gg/uPQsBaVdB7)    | Pogly.gg                              | :heavy_check_mark:               | :green_circle:         |
| [Manual](/install/manual.md)                  | Pogly.gg                              | :heavy_check_mark: | :large_orange_diamond: |
| [Docker](/install/docker.md)                 | [Docker](/install/docker.md)          | :heavy_check_mark: | :large_orange_diamond: |
| [Manual](/install/manual.md#backend)          | [Manual](/install/manual.md#frontend) | :heavy_check_mark: | :small_red_triangle:   |

<!--| [Testnet self published](/install/testnet.md) | Pogly.gg                              | :x:                | :green_circle:         | -->


For assistance with any of the above we are available in our [Discord](https://discord.gg/uPQsBaVdB7).

## What is Pogly Standalone?

Pogly is a real-time collaborative stream overlay. Think Figma, but for your OBS overlay sources. 

With the power of Pogly, you can condense your cluttered OBS overlays into a single, powerful browser source. But wait, how is that like Figma? [SpacetimeDB](https://spacetimedb.com) enables Pogly to communicate in real-time with multiple users; we call them Editors.

Editors can add, edit, and delete overlay elements, with the changes being displayed in real-time while you stream. Why tab over to your OBS to update an overlay when you can have your chat moderators do it for you? While they're at it, perhaps they can add a fun emoji or meme to encourage chat interaction. With Text, Image and Widget elements, the opportunities for creativity are endless.

[Pogly_Standalone_v0.1.0_Reel.webm](https://github.com/user-attachments/assets/24a960a6-f527-4b1a-9c15-7ac2cd4fee2d)

This documentation is for the Standalone version. In the future, we will offer a cloud version where the hosting and scaling is done for you. If this is something that interests you, feel free to sign up for the [waitlist on our website](https://pogly.gg).

## Using Pogly Standalone

We hope to provide in-depth documentation for both the streamers and editors that are going to use Pogly as an integral part of their stream. 

[Click here for detailed documentation on using Pogly Standalone.](/use/index.md)

## Developing Pogly Standalone

In addition to streamer and user documentation, our goal is to provide relatively clean and extensible code for devlopers to modify and extend on to. When that doesn't happen, at lease we have documentation to help? (Hopefully)

While we can't promise your code will be merged, we welcome any/all PR's and greatly appreciate your willingness to help out and contribute! Speaking of contributing, we should have full contribution guidelines... *soon*.

[Click here for detailed documentation on developing in Pogly Standalone.](/develop/index.md)
