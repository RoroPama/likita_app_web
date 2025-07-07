import AuthService from "./auth_service";

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
  token?: string;
  insertToken?: boolean;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  status: number;
}

export const apiRequest = async <T = unknown>(
  url: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> => {
  const {
    method = "GET",
    headers = {},
    body,
    token,
    insertToken = false,
  } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  } else if (insertToken) {
    const storedToken = AuthService.getToken();
    if (storedToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${storedToken}`,
      };
    }
  }

  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    const jsonDecoded = await response.json();

    return {
      success: response.ok,
      data: response.ok ? jsonDecoded.data : undefined,
      message: jsonDecoded.message,
      error: response.ok
        ? undefined
        : jsonDecoded.message || "Une erreur est survenue",
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur réseau",
      status: 0,
    };
  }
};

export type { FetchOptions, ApiResponse };
