import { getUseTestnet } from '../helpers/env'

const testnetSubsocialConfig = {
  substrateNodeUrl: 'wss://testnet.subsocial.network',
  offchainUrl: 'https://staging.subsocial.network/offchain',
  ipfsNodeUrl: 'https://staging.subsocial.network/ipfs'
}

const mainnetSubsocialConfig = {
  substrateNodeUrl: 'wss://rpc.subsocial.network',
  offchainUrl: 'https://app.subsocial.network/offchain',
  ipfsNodeUrl: 'https://app.subsocial.network/ipfs'
}

const useTestnet = getUseTestnet()
const subsocialConfig = useTestnet
  ? testnetSubsocialConfig
  : mainnetSubsocialConfig
export default subsocialConfig
