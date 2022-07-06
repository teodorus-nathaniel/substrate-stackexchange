export const chains = {
  KSM: {
    rpc: 'wss://kusama-rpc.polkadot.io',
  },
  SUB: {
    rpc: 'wss://para.subsocial.network',
  },
  KAR: {
    rpc: 'wss://karura-rpc-0.aca-api.network',
  },
}

export type TokenTickers = keyof typeof chains
