import UserGridView from '#/containers/UserGridView'
import { useWalletContext } from '#/contexts/WalletContext'
import { useGetFollowers } from '#/services/subsocial/queries'

export default function FollowersPage() {
  const [wallet] = useWalletContext()
  const { data } = useGetFollowers({ address: wallet?.address })

  return <UserGridView users={data ?? []} />
}
