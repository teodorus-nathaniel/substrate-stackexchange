import { chains } from '../constants/chains'
import { getUseTestnet } from '../helpers/env'

const testnetSubsocialConfig = {
  substrateNodeUrl: 'wss://testnet.subsocial.network',
  offchainUrl: 'https://staging.subsocial.network/offchain',
  ipfsNodeUrl: 'https://staging.subsocial.network/ipfs',
}

const mainnetSubsocialConfig = {
  substrateNodeUrl: 'wss://para.subsocial.network',
  ipfsNodeUrl: 'https://ipfs.subsocial.network',
}

const useTestnet = getUseTestnet()

export const mainTokenTicker: keyof typeof chains = useTestnet ? 'SOON' : 'SUB'

const subsocialConfig = useTestnet
  ? testnetSubsocialConfig
  : mainnetSubsocialConfig
export default subsocialConfig
