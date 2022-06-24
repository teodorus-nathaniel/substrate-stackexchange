function checkEnv(
  data: string | undefined,
  envName: string,
  throwError = false
) {
  if (data === undefined && throwError) {
    throw new Error(`env ${envName} is not set`)
  }
  return data
}

export function getUseTestnet() {
  const useTestnet = checkEnv(
    process.env['NEXT_PUBLIC_USE_TESTNET'],
    'NEXT_PUBLIC_USE_TESTNET'
  )
  return useTestnet === 'true'
}
