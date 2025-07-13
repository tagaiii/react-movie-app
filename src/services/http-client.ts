import { config } from '../config';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${config.API_KEY}`,
};

export const httpClient = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${config.BASE_URL}/${url}`, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};
