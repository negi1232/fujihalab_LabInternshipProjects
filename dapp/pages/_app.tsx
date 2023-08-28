import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { WagmiConfig, createConfig, configureChains, mainnet, } from 'wagmi'
import { publicProvider } from "wagmi/providers/public";
import { fujihalab } from "../contract/network";
import "@rainbow-me/rainbowkit/styles.css";
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

import {
  connectorsForWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  walletConnectWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";

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
      metaMaskWallet({ chains, projectId: "" }),
    ],
  },
]);


const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
  webSocketPublicClient,
})

const chakraConfig: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({ chakraConfig });


function MyApp({ Component, pageProps }: AppProps) {


  return (
    <WagmiConfig config={config} >
      <RainbowKitProvider chains={chains}>
        <ChakraProvider theme={theme}>
          <Layout >
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;