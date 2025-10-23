# Pogly 0.3.0 migration

This is written in the context of migrating from version `0.2.2` to `0.3.0` but same steps work for any other future personal or required migration.

<b>If you run into any issues during the migration or require any help at all, PLEASE ASK FOR HELP IN [OUR DISCORD](https://discord.gg/pogly)!</b>

## TL;DR step by step

If you want more in depth or video walk through, scroll down.

1. Connect to your old module in https://standalone.pogly.gg.
2. At the top of the page, press `Settings` ➔ `Advanced` ➔ `Export data`.
3. Select all 3 options and press `Download`.
4. In [Pogly Discord](https://discord.gg/pogly), re-run the `/publish` command.
   - The new module can have the same name or something new.
5. Head over to https://cloud.pogly.gg and authenticate using either Twitch, KICK or google
6. Connect to your <b>_new_</b> module and finish module onboarding.
7. At the top of the page, press `Settings` ➔ `Advanced` ➔ `Improt data`.
8. Select the JSON file you just downloaded from the old module, select `Clear existing data` and press `Upload`.

Your module should now look exactly the same as the old module.

## Video walkthrough

(to-do)

## Exporting your data from 0.2.2

First you must download your data from the older Pogly version. You can do this by connecting to your module in https://standalone.pogly.gg. Once connected, open up the `Settings` menu from top of the page. Under `Advanced` tab, press `Export data`. A new menu will open up with 3 selection options. If you wish to migrate all your data, select all 3 options (`ElementData`, `Elements` and `Layout`). Once you've selected the data you want to migrate, press `Download`. A JSON file should be downloaded on to your computer.

![export guide](../assets/ExportGuide.png)

## Importing your data to 0.3.0

Once you have your data exported, head over to [Pogly Discord](https://discord.gg/pogly) and re-run the `/publish` command. The new module name can be the same name as your old module or something new. Once your new module has been published, head over to https://cloud.pogly.gg and authenticate using either Twitch, KICK or Google and connect to the new module you just created. You will be prompted to finish the new module onboarding. Once you've finished the onboarding, open up `Settings` again and under `Advanced`, select `Import`. A new popup will appear, asking you to select a file. Select the JSON file you just downloaded and press `Clear existing data` and press `Upload`. Your module should now look the same way it did before the migration!

![import guide](../assets/ImportGuide.png)

## What about my old module?

Once migrated, unless you specifically want to use the old module for whatever reason, you can leave it as it is and it will get purged in the future.
