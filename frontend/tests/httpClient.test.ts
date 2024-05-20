import axios from 'axios';
import { HttpClient } from '../src/utils';

vi.mock('axios');

describe('HttpClient', () => {
  let httpClient: HttpClient;
  const baseURL = 'https://api.example.com';

  it('fetches data successfully with GET request', async () => {
    const mockData = { data: 'Success!' };

    vi.mocked(axios.create).mockReturnThis();
    vi.mocked(axios.get).mockResolvedValueOnce(mockData);

    httpClient = new HttpClient(baseURL);

    const response = await httpClient.get('/data');

    expect(response).toEqual(mockData.data);
    expect(axios.get).toHaveBeenCalledOnce();
    expect(axios.get).toHaveBeenCalledWith('/data', undefined);
  });

  it('throws HTTPError in case of an upstream error', async () => {
    const mockData = { response: { status: 400, statusText: 'Error' } };

    vi.mocked(axios.create).mockReturnThis();
    vi.mocked(axios.isAxiosError).mockResolvedValueOnce(true);
    vi.mocked(axios.get).mockRejectedValueOnce(mockData);

    httpClient = new HttpClient(baseURL);

    await expect(() => httpClient.get('/data')).rejects.toThrowErrorMatchingInlineSnapshot(
      '[HttpError: Error]'
    );
  });

  it('throws InternalError in case of an unforeseen error', async () => {
    const mockData = { response: { status: 400, statusText: 'Error' } };

    vi.mocked(axios.create).mockReturnThis();
    vi.mocked(axios.isAxiosError).mockResolvedValueOnce(false);
    vi.mocked(axios.get).mockRejectedValueOnce(mockData);

    httpClient = new HttpClient(baseURL);

    await expect(() => httpClient.get('/data')).rejects.toThrowErrorMatchingInlineSnapshot(
      '[HttpError: Error]'
    );
  });
});
