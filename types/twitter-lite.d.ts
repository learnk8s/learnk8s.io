declare module 'twitter-lite' {
  interface Options {
    consumer_key: string
    consumer_secret: string
    access_token_key: string
    access_token_secret: string
    subdomain: string
    bearer_token: string
  }

  export default class Twitter {
    get(resource: string, parameters?: Record<string, string | number>): Promise<Record<string, any>>
    post(resource: string, body?: Record<string, string | number>): Promise<Record<string, any>>
    constructor(options: Partial<Options>)
  }
}
