import subsocialConfig from '#/lib/config/subsocial-api'
import { newFlatSubsocialApi } from '@subsocial/api'
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import { createContext, useContext, useEffect, useState } from 'react'

export type SubsocialApiState = FlatSubsocialApi | null
export const SubsocialApiContext = createContext<SubsocialApiState>(null)

export const SubsocialApiContextProvider = ({
  children
}: {
  children: any
}) => {
  const [subsocialApi, setSubsocialApi] = useState<SubsocialApiState>(null)

  useEffect(() => {
    async function connectToSubsocialApi() {
      const api = await newFlatSubsocialApi({
        ...subsocialConfig,
        useServer: {
          httpRequestMethod: 'get'
        }
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
