import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { WagmiConfig, createConfig, configureChains, mainnet, } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { createPublicClient, http } from 'viem'
import { publicProvider } from "wagmi/providers/public";
import { useEffect } from "react";
import { fujihalab } from "../contract/network";
import "@rainbow-me/rainbowkit/styles.css";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import {
  connectorsForWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  walletConnectWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";


// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [fujihalab],
//   [publicProvider()],
// )
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [fujihalab],
  [
    publicProvider(),
  ]
);


const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ chains }),
    ],
  },
]);


const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
  webSocketPublicClient,


})


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <WagmiConfig config={config} >
      <RainbowKitProvider theme={darkTheme()} chains={chains}>
        <ChakraProvider>
          <Layout >
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;