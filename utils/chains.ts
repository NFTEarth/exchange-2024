import { Currency } from '@reservoir0x/reservoir-kit-ui'
import { reservoirChains } from '@reservoir0x/reservoir-sdk'
import { zeroAddress } from 'viem'
import {
  arbitrum,
  mainnet,
  polygon,
  optimism,
  Chain,
  bsc,
  avalanche,
  polygonZkEvm,
  zkSync,
  linea,
  zora,
  base,
  arbitrumNova,
  scroll,
} from 'wagmi/chains'
import usdcContracts from './usdcContracts'

//CONFIGURABLE: The default export controls the supported chains for the marketplace. Removing
// or adding chains will result in adding more or less chains to the marketplace.
// They are an extension of the wagmi chain objects

export type ReservoirChain = Chain & {
  lightIconUrl: string
  darkIconUrl: string
  reservoirBaseUrl: string
  proxyApi?: string
  routePrefix: string
  apiKey?: string
  coingeckoId?: string
  collectionSetId?: string
  community?: string
  wssUrl?: string
  listingCurrencies?: Currency[]
  oracleBidsEnabled?: boolean
  checkPollingInterval?: number
}

const nativeCurrencyBase = {
  contract: zeroAddress,
  symbol: 'ETH',
  decimals: 18,
  coinGeckoId: 'ethereum',
}

const usdcCurrencyBase = {
  contract: '',
  symbol: 'USDC',
  decimals: 6,
  coinGeckoId: 'usd-coin',
}

export const DefaultChain: ReservoirChain = {
  ...optimism,
  // Any url to display the logo of the chain in light mode
  lightIconUrl: '/icons/optimism-icon-dark.svg',
  // Any url to display the logo of the chain in dark mode
  darkIconUrl: '/icons/optimism-icon-light.svg',
  // The base url of the reservoir api, this is used in the app when
  // directly interacting with the reservoir indexer servers (in the api proxy for example)
  // or when prefetching server side rendered data
  reservoirBaseUrl: 'https://api-optimism.reservoir.tools',
  // Used on the client side portions of the marketplace that need an api key added
  // Prevents the api key from being leaked in the clientside requests
  // If you'd like to disable proxying you can just change the proxyApi to the reservoirBaseUrl
  // Doing so will omit the api key unless further changes are made
  proxyApi: '/api/reservoir/optimism',
  // A prefix used in the asset specific routes on the app (tokens/collections)
  routePrefix: 'optimism',
  // Reservoir API key which you can generate at https://reservoir.tools/
  // This is a protected key and displays as 'undefined' on the browser
  // DO NOT add NEXT_PUBLIC to the key or you'll risk leaking it on the browser
  apiKey: process.env.RESERVOIR_API_KEY,
  // Coingecko id, used to convert the chain's native prices to usd. Can be found here:
  // https://www.coingecko.com/en/api/documentation#operations-coins-get_coins_list
  coingeckoId: 'optimism',
  collectionSetId: process.env.NEXT_PUBLIC_OPTIMISM_COLLECTION_SET_ID,
  community: process.env.NEXT_PUBLIC_OPTIMISM_COMMUNITY,
}

type NFTBridge = {
  proxy: `0x${string}`
  ERC721Factory?: `0x${string}`
  ERC1155Factory?: `0x${string}`
}

export const NFT_BRIDGE : Record<number, NFTBridge> = {
  [mainnet.id]: {
    proxy: '0x90aEC282ed4CDcAab0934519DE08B56F1f2aB4d7',
  },
  [optimism.id]: {
    proxy: '0x653b58c9D23De54E44dCBFbD94C6759CdDa7f93D',
    ERC721Factory: '0xc2106ca72996e49bBADcB836eeC52B765977fd20'
  }
}

export type OFTChain = {
  id: number
  lzId: number
  name: string
  routePrefix?: string
  address: `0x${string}`
  LPNFTE?: `0x${string}`
  veNFTE?: `0x${string}`
  uniProxy?: `0x${string}`
  feeDistributor?: `0x${string}`
  lightIconUrl: string
  darkIconUrl: string
  coingeckoNetworkId: string
}

export const DefaultOFTChain: OFTChain = {
  id: base.id,
  lzId: 184,
  name: base.name,
  routePrefix: 'base',
  address: '0xc2106ca72996e49bBADcB836eeC52B765977fd20',
  LPNFTE: '0xd00CD4363bCF7DC19E84fDB836ce28D24F00716c',
  veNFTE: '0xc526C83849Fb4424e4563A3b609a4eBf916cf6d0',
  feeDistributor: '0x99032fD0727dEd2a579dcB447e85359ddE9223B6',
  /*uniProxy: '0x82FcEB07a4D01051519663f6c1c919aF21C27845',*/
  lightIconUrl: '/icons/base-icon-dark.svg',
  darkIconUrl: '/icons/base-icon-light.svg',
  coingeckoNetworkId: 'base'
}

export const OFT_CHAINS : OFTChain[] = [
  DefaultOFTChain,
  /*{
    id: arbitrumNova.id,
    lzId: 175,
    name: arbitrumNova.name,
    address: '0x90aec282ed4cdcaab0934519de08b56f1f2ab4d7',
    lightIconUrl: '/icons/arbitrum-nova-icon-dark.svg',
    darkIconUrl: '/icons/arbitrum-nova-icon-light.svg',
    coingeckoNetworkId: 'arbitrum-nova'
  },*/
  {
    id: polygon.id,
    lzId: 109,
    name: polygon.name,
    address: '0x492Fa53b88614923937B7197C87E0F7F8EEb7B20',
    lightIconUrl: '/icons/polygon-icon-dark.svg',
    darkIconUrl: '/icons/polygon-icon-light.svg',
    coingeckoNetworkId: 'polygon-pos'
 },
  {
    id: mainnet.id,
    lzId: 101,
    name: mainnet.name,
    address: '0x8c223a82E07feCB49D602150d7C2B3A4c9630310',
    lightIconUrl: '/icons/eth-icon-dark.svg',
    darkIconUrl: '/icons/eth-icon-light.svg',
    coingeckoNetworkId: 'ethereum'
  },
  {
    id: optimism.id,
    lzId: 111,
    name: optimism.name,
    address: '0x8637725aDa78db0674a679CeA2A5e0A0869EF4A1',
    lightIconUrl: '/icons/optimism-icon-dark.svg',
    darkIconUrl: '/icons/optimism-icon-light.svg',
    coingeckoNetworkId: 'optimistic-ethereum'
  },
  /* {
     id: bsc.id,
     lzId: 102,
     name: bsc.name,
     address: '0x1912A3504E59d1C1B060bf2d371DEB00b70E8796',
     lightIconUrl: '/icons/bsc-icon-dark.svg',
     darkIconUrl: '/icons/bsc-icon-light.svg',
     coingeckoNetworkId: 'binance-smart-chain'
   },
  {
    id: base.id,
    lzId: 184,
    name: base.name,
    address: '0xc2106ca72996e49bBADcB836eeC52B765977fd20',
    lightIconUrl: '/icons/base-icon-dark.svg',
    darkIconUrl: '/icons/base-icon-light.svg',
    coingeckoNetworkId: 'base'
  },*/
  {
     id: linea.id,
     lzId: 183,
     name: linea.name,
     address: '0x2140Ea50bc3B6Ac3971F9e9Ea93A1442665670e4',
     lightIconUrl: '/icons/linea-icon-dark.svg',
     darkIconUrl: '/icons/linea-icon-light.svg',
     coingeckoNetworkId: 'linea'
  },
  { id: arbitrum.id,
  lzId: 110,
  name: arbitrum.name,
  routePrefix: 'arbitrum',
  address: '0x51B902f19a56F0c8E409a34a215AD2673EDF3284',
  LPNFTE: '0x82496243c0a1a39c5c6250bf0115c134Ba76698c',
  veNFTE: '0xE57bd15448C3b2D1dBAD598775DD2F36F93EBf90',
  feeDistributor: '0x9138A2e628f92a42397B3B600E86047AE49aCa98',
  /*uniProxy: '0x82FcEB07a4D01051519663f6c1c919aF21C27845',*/
  lightIconUrl: '/icons/arbitrum-icon-dark.svg',
  darkIconUrl: '/icons/arbitrum-icon-light.svg',
  coingeckoNetworkId: 'arbitrum-one'
  },
  /*{
    id: polygonZkEvm.id,
    lzId: 158,
    name: polygonZkEvm.name,
    address: '0xf1B8982eC774AE84e936Bd63f372280bd534E797',
    lightIconUrl: '/icons/polygon-zkevm-icon-dark.svg',
    darkIconUrl: '/icons/polygon-zkevm-icon-light.svg',
    coingeckoNetworkId: 'zkevm'
  }

  // {
  //   id: 5000,
  //   lzId: 181,
  //   name: 'Mantle',
  //   address: '0x3E173b825ADEeF9661920B91A8d50B075Ad51bA5',
  //   lightIconUrl: '/icons/mantle-icon-dark.svg',
  //   darkIconUrl: '/icons/mantle-icon-light.svg'
  // }*/
]

export const FORTUNE_CHAINS = [
  {
    id: arbitrum.id as number,
    address: '0xB11eD4D3b3D8Ace516Ceae0a8D4764BbF2B08c50',
    priceOracle: '0x896397f72bd5c207cab95740d48ca76acf960b16',
    transferManager: '0xf502c99ebdffd2f5fb92c162ea12d741b98402c2'
  }
]

export const RAFFLE_CHAINS = [
  {
    id: arbitrum.id as number,
    address: '0x8827e1c62a6bc98fb3c19003729c357a311c6e5e',
    priceOracle: '0x896397f72bd5c207cab95740d48ca76acf960b16',
    transferManager: '0xf502c99ebdffd2f5fb92c162ea12d741b98402c2'
  }
]
export const getAlchemyNetworkName = (chainId: number) => {
  let network;
  if (chainId === 1) {
    network = "eth-mainnet";
  } else if (chainId === 10) {
    network = "opt-mainnet";
  } else if (chainId === 137) {
    network = "polygon-mainnet";
  } else if (chainId === 1101) {
    network = "polygonzkevm-mainnet";
  } else if (chainId === 42161) {
    network = "arb-mainnet";
  } else {
    return null;
  }

  return network;
};

export default [
  DefaultChain,
  {
    ...arbitrum,
    lightIconUrl: '/icons/arbitrum-icon-dark.svg',
    darkIconUrl: '/icons/arbitrum-icon-light.svg',
    reservoirBaseUrl: 'https://api-arbitrum.reservoir.tools',
    proxyApi: '/api/reservoir/arbitrum',
    routePrefix: 'arbitrum',
    apiKey: process.env.RESERVOIR_API_KEY,
    coingeckoId: 'ethereum',
    collectionSetId: process.env.NEXT_PUBLIC_ARBITRUM_COLLECTION_SET_ID,
    community: process.env.NEXT_PUBLIC_ARBITRUM_COMMUNITY,
  },
  /*{
    ...arbitrumNova,
    lightIconUrl: '/icons/arbitrum-nova-icon-dark.svg',
    darkIconUrl: '/icons/arbitrum-nova-icon-light.svg',
    reservoirBaseUrl: 'https://api-arbitrum-nova.reservoir.tools',
    proxyApi: '/api/reservoir/arbitrum-nova',
    routePrefix: 'arbitrum-nova',
    apiKey: process.env.RESERVOIR_API_KEY,
    coingeckoId: 'ethereum',
    collectionSetId: process.env.NEXT_PUBLIC_ARBITRUM_NOVA_COLLECTION_SET_ID,
    community: process.env.NEXT_PUBLIC_ARBITRUM_NOVA_COMMUNITY,
  },*/
  {
    ...mainnet,
    name: 'Ethereum',
    lightIconUrl: '/icons/eth-icon-dark.svg',
    darkIconUrl: '/icons/eth-icon-light.svg',
    reservoirBaseUrl: 'https://api.reservoir.tools',
    proxyApi: '/api/reservoir/ethereum',
    routePrefix: 'ethereum',
    apiKey: process.env.RESERVOIR_API_KEY,
    coingeckoId: 'ethereum',
    collectionSetId: process.env.NEXT_PUBLIC_ETH_COLLECTION_SET_ID,
    community: process.env.NEXT_PUBLIC_ETH_COMMUNITY,
  },
   {
     ...polygon,
     lightIconUrl: '/icons/polygon-icon-dark.svg',
     darkIconUrl: '/icons/polygon-icon-light.svg',
     reservoirBaseUrl: 'https://api-polygon.reservoir.tools',
     proxyApi: '/api/reservoir/polygon',
     routePrefix: 'polygon',
     apiKey: process.env.RESERVOIR_API_KEY,
     coingeckoId: 'matic-network',
     collectionSetId: process.env.NEXT_PUBLIC_POLYGON_COLLECTION_SET_ID,
     community: process.env.NEXT_PUBLIC_POLYGON_COMMUNITY,
   },
  /*{
    ...optimism,
    name: 'Optimism',
    lightIconUrl: '/icons/optimism-icon-dark.svg',
    darkIconUrl: '/icons/optimism-icon-light.svg',
    reservoirBaseUrl: 'https://api-optimism.reservoir.tools',
    proxyApi: '/api/reservoir/optimism',
    routePrefix: 'optimism',
    apiKey: process.env.RESERVOIR_API_KEY,
    coingeckoId: 'optimism',
    collectionSetId: process.env.NEXT_PUBLIC_OPTIMISM_COLLECTION_SET_ID,
    community: process.env.NEXT_PUBLIC_OPTIMISM_COMMUNITY,
  },
  // {
  //   ...zora,
  //   name: 'Zora',
  //   lightIconUrl: '/icons/zora-icon-dark.svg',
  //   darkIconUrl: '/icons/zora-icon-light.svg',
  //   reservoirBaseUrl: 'https://api-zora.reservoir.tools',
  //   proxyApi: '/api/reservoir/zora',
  //   routePrefix: 'zora',
  //   apiKey: process.env.RESERVOIR_API_KEY,
  //   coingeckoId: 'ethereum',
  // },
  /* {
     ...bsc,
     lightIconUrl: '/icons/bsc-icon-dark.svg',
     darkIconUrl: '/icons/bsc-icon-light.svg',
     reservoirBaseUrl: 'https://api-bsc.reservoir.tools',
     proxyApi: '/api/reservoir/bsc',
     routePrefix: 'bsc',
     apiKey: process.env.RESERVOIR_API_KEY,
     coingeckoId: 'binancecoin',
     collectionSetId: process.env.NEXT_PUBLIC_BSC_COLLECTION_SET_ID,
     community: process.env.NEXT_PUBLIC_BSC_COMMUNITY,
   },
  {
     ...base,
     lightIconUrl: '/icons/base-icon-dark.svg',
     darkIconUrl: '/icons/base-icon-light.svg',
     reservoirBaseUrl: 'https://api-base.reservoir.tools',
     proxyApi: '/api/reservoir/base',
     routePrefix: 'base',
     apiKey: process.env.RESERVOIR_API_KEY,
     coingeckoId: 'base',
     collectionSetId: process.env.NEXT_PUBLIC_BASE_COLLECTION_SET_ID,
     community: process.env.NEXT_PUBLIC_BASE_COMMUNITY,
   },*/
   {
     ...linea,
     lightIconUrl: '/icons/linea-icon-dark.svg',
     darkIconUrl: '/icons/linea-icon-light.svg',
     reservoirBaseUrl: 'https://api-linea.reservoir.tools',
     proxyApi: '/api/reservoir/linea',
     routePrefix: 'linea',
     apiKey: process.env.RESERVOIR_API_KEY,
     coingeckoId: 'ethereum',
     collectionSetId: process.env.NEXT_PUBLIC_LINEA_COLLECTION_SET_ID,
     community: process.env.NEXT_PUBLIC_LINEA_COMMUNITY,
   },
    /*{
      ...polygonZkEvm,
      lightIconUrl: '/icons/polygon-zkevm-icon-dark.svg',
      darkIconUrl: '/icons/polygon-zkevm-icon-light.svg',
      reservoirBaseUrl: 'https://api-polygon-zkevm.reservoir.tools',
      proxyApi: '/api/reservoir/polygon-zkevm',
      routePrefix: 'polygon-zkevm',
      apiKey: process.env.RESERVOIR_API_KEY,
      coingeckoId: 'ethereum',
      collectionSetId: process.env.NEXT_PUBLIC_POLYGON_ZKEVM_COLLECTION_SET_ID,
      community: process.env.NEXT_PUBLIC_POLYGON_ZKEVM_COMMUNITY,
    },*/
] as ReservoirChain[]

