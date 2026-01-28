import axios, { AxiosRequestConfig } from 'axios';

export interface QueryProps<T> {
  method?: 'get' | 'post' | 'patch' | 'delete';
  id?: string;
  data?: Partial<T>;
}

export async function axiosCall<T>(props: QueryProps<T>) {
  try {
    const { method = 'get', data, id } = props;
    if (!method) throw new Error('Method is missing');

    const url = `/api/todo${id ? '/' + id : ''}`;

    const config: AxiosRequestConfig<Partial<T>> = {
      method,
      maxBodyLength: Infinity,
      url,
      data,
      withCredentials: true,
    };

    const { data: response } = await axios.request(config);
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error?.response?.data?.message ||
          error.message ||
          'Something went wrong'
      );
    }
    throw new Error('Something went wrong');
  }
}
