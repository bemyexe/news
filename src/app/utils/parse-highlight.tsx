import {ReactNode} from 'react';
import {Tag} from 'antd';

export const parseHighlight = (text: string): ReactNode => {
  const parts = text.split(/(<kw>.*?<\/kw>)/g);

  return parts.map((part, index) => {
    if (part.startsWith('<kw>') && part.endsWith('</kw>')) {
      const keyword = part.replace(/<\/?kw>/g, '');
      return (
        <Tag color="blue" key={index}>
          {keyword}
        </Tag>
      );
    }
    return <span key={index}>{part}</span>;
  });
};
