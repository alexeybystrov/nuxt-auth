import { H3Event /* , getCookie */ } from 'h3';

export const useApiFetch = async <T>(
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any;
    query?: Record<string, any>;
    headers?: HeadersInit;
    credentials?: RequestCredentials;
    event?: H3Event;
  } = {},
): Promise<T> => {
  const config = useRuntimeConfig();

  // const token = options.event
  //   ? getCookie(options.event, 'token')
  //   : useCookie<string | null>('token').value;

  try {
    const result = await $fetch<T>(url, {
      baseURL: config.public.apiBaseUrl || '',
      method: options.method || 'GET',
      body: options.body,
      query: options.query,
      credentials: options.credentials || 'include',
      headers: {
        ...options.headers,
        // ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return result as T;
  } catch (error: any) {
    if (error?.data) {
      throw error.data;
    }
    throw error;
  }
};
