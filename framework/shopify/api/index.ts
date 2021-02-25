import type { CommerceAPIConfig } from '@commerce/api'
import fetchGraphqlApi from './utils/fetch-graphql-api'

export interface ShopifyConfig extends CommerceAPIConfig {}

const API_URL = process.env.SHOPIFY_STORE_DOMAIN
const API_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

if (!API_URL) {
  console.log(process.env)
  throw new Error(
    `The environment variable SHOPIFY_STORE_DOMAIN is missing and it's required to access your store`
  )
}

if (!API_TOKEN) {
  throw new Error(
    `The environment variable SHOPIFY_STOREFRONT_ACCESS_TOKEN is missing and it's required to access your store`
  )
}

export class Config {
  private config: ShopifyConfig

  constructor(config: ShopifyConfig) {
    this.config = config
  }

  getConfig(userConfig: Partial<ShopifyConfig> = {}) {
    return Object.entries(userConfig).reduce<ShopifyConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<ShopifyConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const config = new Config({
  commerceUrl: API_URL,
  apiToken: API_TOKEN,
  // TODO
  // @ts-ignore
  fetch: fetchGraphqlApi,
  customerCookie: 'SHOP_TOKEN',
})

export function getConfig(userConfig?: Partial<ShopifyConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<ShopifyConfig>) {
  return config.setConfig(newConfig)
}
