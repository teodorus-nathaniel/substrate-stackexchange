import subsocialConfig from '#/lib/config/subsocial-api'
import { SubsocialApi } from '@subsocial/api'
import { createContext, useContext, useEffect, useState } from 'react'

export type SubsocialApiState = SubsocialApi | null
export const SubsocialApiContext = createContext<SubsocialApiState>(null)

export const SubsocialApiContextProvider = ({
  children,
}: {
  children: any
}) => {
  const [subsocialApi, setSubsocialApi] = useState<SubsocialApiState>(null)

  useEffect(() => {
    async function connectToSubsocialApi() {
      const api = await SubsocialApi.create({
        ...subsocialConfig,
      })
      setSubsocialApi(api)
    }
    connectToSubsocialApi()
  }, [])

  return (
    <SubsocialApiContext.Provider value={subsocialApi}>
      {children}
    </SubsocialApiContext.Provider>
  )
}

export function useSubsocialApiContext() {
  return useContext(SubsocialApiContext)
}
