
import { createWalletClient,createPublicClient, custom, http, getContract, WalletClient,PublicClient } from 'viem';
import { mainnet } from 'viem/chains';
import { fujihalab } from '../contract/network';
import 'viem/window';
import tokenData from '../contract/token.json'; // JSON ファイルのインポート
import { useEffect, useState } from 'react'

const useClient = () => {
    const [publicClient, setPublicClient] = useState<PublicClient>()
    const [walletClient, setWalletClient] = useState<WalletClient>()
    const [tokenContract, setTokenContract] = useState<any>()
    
    useEffect(() => {
      const publicClient:PublicClient = createPublicClient({
        chain: fujihalab,
        transport: http()
      });
      const walletClient: WalletClient = createWalletClient({

        chain: fujihalab,
        transport: custom(window.ethereum)
      })
      const tokenContract = getContract({
        address: tokenData.address as `0x${string}`,
        abi: tokenData.abi,
        walletClient,
        publicClient,
      });

      setPublicClient(publicClient)
      setWalletClient(walletClient)
      setTokenContract(tokenContract)
    }, [])

    return {publicClient, walletClient, tokenContract }
}

export { useClient }




