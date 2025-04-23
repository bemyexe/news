import {IData_SnippetNews} from '../@types/news.dto';

const BASE_API = '/data.json';

export const fetchData = async (): Promise<IData_SnippetNews[]> => {
  const response = await fetch(BASE_API);
  const data = await response.json();
  return data;
};
