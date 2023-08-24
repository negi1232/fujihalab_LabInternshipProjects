import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { WagmiConfig, createConfig, configureChains, mainnet, } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { createPublicClient, http } from 'viem'
import { publicProvider } from "wagmi/providers/public";
import { useEffect } from "react";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: polygonMumbai,
    transport: http()
  }),
})

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()],
)

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <WagmiConfig config={config}>
      <ChakraProvider>
        <Layout >
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </WagmiConfig>
  );
}

export default MyApp;