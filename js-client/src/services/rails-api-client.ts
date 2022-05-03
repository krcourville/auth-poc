export interface RailsApiClientConfig {
  baseUrl?: string;
  jwtProvider: () => Promise<string>;
}

export interface ApiClientResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * HTTP Client for rails-api
 */
export default class RailsApiClient {
  private jwtPromise: Promise<string>;

  constructor(private config: RailsApiClientConfig) {
    this.config = config ?? {};
    this.config.baseUrl = this.config.baseUrl ?? "http://localhost:3030/api";
    this.jwtPromise = this.config.jwtProvider();
  }

  getPublic(): Promise<ApiClientResponse> {
    return this.get("/public");
  }

  getPrivate(): Promise<ApiClientResponse> {
    return this.get("/private");
  }

  getPrivateScoped(): Promise<ApiClientResponse> {
    return this.get("/private-scoped");
  }

  getPrivatePermissionBased(): Promise<ApiClientResponse> {
    return this.get("/private-permissionbased");
  }

  private async get(path: string): Promise<ApiClientResponse> {
    const url = `${this.config.baseUrl}${path}`;
    const jwt = await this.jwtPromise;
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        return {
          success: true,
          data,
        };
      } else {
        console.error("HTTP REQUEST FAILED", res);
        return {
          success: false,
          error: res.statusText,
        };
      }
    } catch (err: unknown) {
      console.error(err);

      return {
        success: false,
        error: (err as Error)?.message,
      };
    }
  }
}
