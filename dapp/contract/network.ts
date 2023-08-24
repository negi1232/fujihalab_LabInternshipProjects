
  import { Chain } from '@wagmi/core'
 
  export const fujihalab = {
    id: 78950,
    name:"Fujihalab Chain",
    network:"fujihalab",
    nativeCurrency: {
        decimals:18,
        name:'FUJIHALAB',
        symbol:'FUJI'
    },
    rpcUrls: {
      public: { http: ['https://ik1-206-76848.vs.sakura.ne.jp'] },
      default: { http: ['https://ik1-206-76848.vs.sakura.ne.jp'] },
    },
    blockExplorers: {
      etherscan: { name: '', url: '' },
      default: { name: '', url: '' },
    },
    contracts: {
      
    },
  } as const satisfies Chain
  