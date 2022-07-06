export const chains = {
  KSM: {
    rpc: 'wss://kusama-rpc.polkadot.io',
    icon: 'https://polkadot.js.org/apps/static/kusama-128.e5f13822..gif',
  },
  SUB: {
    rpc: 'wss://para.subsocial.network',
    icon: 'https://polkadot.js.org/apps/static/subsocialX.a4cdc4e5..svg',
  },
  KAR: {
    rpc: 'wss://karura-rpc-0.aca-api.network',
    icon: 'https://polkadot.js.org/apps/static/karura.6540c949..svg',
  },
}

export type TokenTickers = keyof typeof chains
