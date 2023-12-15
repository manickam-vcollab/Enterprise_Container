const serverURL = "";//(process.env.REACT_APP_SUPABASE_URL as string)
const apiKey = "";//(process.env.REACT_APP_SUPABASE_KEY as string)

export class ServerLocation {
    static serverURL: string = serverURL;
    static apiKey: string = apiKey;
    static updateServerURL(url : string) {
        this.serverURL = url;
    }
    static updateApiKey(apiKey : string) {
        this.apiKey = apiKey;
    }
}