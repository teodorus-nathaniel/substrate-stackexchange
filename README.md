# Subsocial StackExchange

Made for Polkadot NA Hackaton 2022.

## Summary

This project is a forum for developers Q&A regarding substrate development.
The difference between this and current Substrate StackExchange is the fact that this one uses Subsocial SDK, making it decentralized and all the posts and interactions are saved in blockchain and IPFS.

# Try it out

This project is served at [https://substrate-stackexchange.vercel.app/](https://substrate-stackexchange.vercel.app/)
The indexing service is served at [https://108.136.47.177/](https://108.136.47.177/)
Note: to enable the reputation feature, as the indexing service is served with self-signed certificate, you need to allow it in your browser by enabling [chrome://flags/#allow-insecure-localhost](chrome://flags/#allow-insecure-localhost).

## How to Run

1. Setup Env Variables.
2. Run script below.

```zsh
$ npm run dev
```

## Env Variables

1. ANALYZE = true/false
   Acts as bundle visualizer to detect large sizes in build.
2. NEXT_PUBLIC_USE_TESTNET = true/false
   To toggle between mainnet and testnet RPCs
3. NEXT_PUBLIC_SPACE_ID = number
   This is the `space id` used for the project. All posts are made to that specific space.
   If you didn't have any space before, you can create one in /devs/space page after you run the project.
4. NEXT_PUBLIC_ADDRESS_PREFIX = number
   This is the address prefix that is needed for polkadot based address. Each parachain has their own address prefix.
   This prefix is what made your polkadot address in each parachain different, while having the same private key.
   e.g. Subsocial has prefix of 28.
