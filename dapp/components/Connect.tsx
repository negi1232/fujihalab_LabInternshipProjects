import { Box, Button } from '@chakra-ui/react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useMounted } from '../hooks/useMounted'

export function Connect() {
  const isMounted = useMounted()
  const { connector, isConnected } = useAccount()
  const { connectors, connect, isLoading, pendingConnector } = useConnect({
    connector: new InjectedConnector()
  })
  const { disconnect } = useDisconnect()

  if (!isMounted) {
    return null
  }
  return (
    <Box>
      {!isConnected ? (
        connectors
          .filter((x) => isMounted && x.ready && x.id !== connector?.id)
          .map((x) => (
            <Button
              size="lg"
              colorScheme="teal"
              borderRadius="full"
              key={x.id}
              onClick={() => connect({ connector: x })}
            >
              Connect Wallet
              {isLoading &&
                x.id === pendingConnector?.id &&
                `: ${('Connecting')}`}
            </Button>
          ))
      ) : (

        <Button
          size="lg"
          colorScheme="teal"
          borderRadius="full"
          onClick={() => disconnect()}
        >
          Disconnect Wallet
        </Button>
      )}
    </Box>
  )
}