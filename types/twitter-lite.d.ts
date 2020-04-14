declare module 'twitter-lite' {
  export default class Twitter {
    get(resource: string, parameters?: Record<string, string>): Promise<Record<string, any>>
    post(resource: string, body?: Record<string, string>): Promise<Record<string, any>>
    constructor(options: {
      consumer_key: string | null
      consumer_secret: string | null
      access_token_key: string | null
      access_token_secret: string | null
      subdomain?: string
      bearer_token?: string
    })
  }
}
