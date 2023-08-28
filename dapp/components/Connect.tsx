
import { useMounted } from '../hooks/useMounted'
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Connect() {
  const isMounted = useMounted()

  return (

    <div >
      <ConnectButton />
      aaa

    </div>
  )
}