# Pogly user authentication

## What is SpacetimeAuth?

SpacetimeAuth is the authentication and identity-management subsystem built into [SpacetimeDB](https://spacetimedb.com/docs/spacetimeauth). (The backend Pogly uses)

It allows us to manage who is connected to your module and ensures that every connected user has a unique, verifiable identity. Instead of writing OIDC login solution of our own, SpacetimeAuth lets us plug in third-party providers like Twitch, KICK, or Google into Pogly without any larger hassle. When users sign in with one of these platforms, SpacetimeAuth uses their platform-issued OpenID Connect (OIDC) or OAuth2 tokens to verify who they are and creates a secure identity inside the database.

## How SpacetimeAuth Works

1. User chooses a login provider
2. They log in on that platform
   - The provider (e.g. Twitch) authenticates the user and returns a secure token called a JWT (JSON Web Token)
3. SpacetimeAuth uses the token to create unique SpacetimeAuth user in it's database
4. SpacetimeAuth returns its own secure JWT to Pogly

   - Pogly sends this token to SpacetimeDB backend server
   - SpacetimeDB backend server checks:

     - Is the token valid?
     - Did it come from the correct provider (Twitch, KICK or Google)?
     - Has it expired?

   - It does this by looking at the token’s issuer (iss) and subject (sub) claims and verifying the digital signature using the provider’s OIDC configuration.

5. A user identity is created, and sent back to Pogly
   - Once verified, SpacetimeDB creates or reuses a user identity based on that token.

## What Information does Pogly get?

Pogly only requires the very basic information like `User ID`, `Username` and `Profile picture` and `Email`.

## How does Pogly use my information?

- User ID

  - Pogly uses your Twitch/KICK/Google user ID to fetch basic <b>public</b> information about your account using the streaming platform's public APIs, like channel emotes.

- Username

  - Username is used to display your identity inside the app in any situation where you are referenced in. (Audit log, module chat, user bubble, member list)

- Profile picture

  - Profile picture is displayed in the members list and connected users list.

- Email
  - Pogly itself does not use your email for anything. SpacetimeAuth, however, uses your email and selected OAuth provider as the primary key for your unique SpacetimeAuth user profile. If this would ever change in the future, you will be notified prior and we will require you to manually consent to it first. 

## I want Pogly to delete my user information

You can request any data deletion by emailing us at `hello@pogly.gg`.

## I have more questions

If you have questions or concerns about SpacetimeAuth or how Pogly handles your data, please pop by our [Discord](https://discord.gg/pogly). We're more than happy to discuss any of your concerns!

## I have even more questions and authentication and authorization are really cool and I want to learn more

Check out this awesome blog post written by our friends at SpacetimeDB - [Who are you? Who am I to you?](https://spacetimedb.com/blog/who-are-you).
