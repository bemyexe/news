import {useEffect, useState} from 'react';

import {IData_SnippetNews} from '../@types/news.dto';
import {fetchData} from '../services/fetchData';

import {News} from './shared/components/news';

export const App = () => {
  const [data, setData] = useState<IData_SnippetNews[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchData();
        setData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data.map((item) => (
        <li key={item.ID}>
          <News {...item} />
        </li>
      ))}
    </ul>
  );
};
