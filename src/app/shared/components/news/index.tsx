import {ReactNode, useState} from 'react';
import {CaretDownOutlined} from '@ant-design/icons';
import {Button, Tag} from 'antd';

import {IData_SnippetNews} from '../../../../@types/news.dto';

import {NewsInfo} from './news-info';
import {NewsStats} from './news-stats';

import './style.scss';

const DEFAULT_TAG_ITEAMS_COUNT = 6;

export const News = ({
  TI,
  AB,
  URL,
  DOM,
  DP,
  LANG,
  REACH,
  KW,
  AU,
  CNTR,
  CNTR_CODE,
  SENT,
  TRAFFIC,
  HIGHLIGHTS,
}: IData_SnippetNews) => {
  const [isABExpanded, setIsABExpanded] = useState(false);
  const [isTagItemsExpanded, setIsTagItemsExpanded] = useState(false);

  const parseHighlight = (text: string): ReactNode => {
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

  const content = isABExpanded
    ? AB
    : HIGHLIGHTS.map((highlight) => parseHighlight(highlight));

  const filterKW = isTagItemsExpanded
    ? KW
    : KW.slice(0, DEFAULT_TAG_ITEAMS_COUNT);

  return (
    <div className="news-container">
      <NewsStats DP={DP} REACH={REACH} SENT={SENT} TRAFFIC={TRAFFIC} />
      <h3 className="news-title">{TI}</h3>
      <NewsInfo
        CNTR={CNTR}
        CNTR_CODE={CNTR_CODE}
        DOM={DOM}
        LANG={LANG}
        AU={AU}
      />
      <div className="news-content">
        {content}
        <Button
          color="primary"
          variant="text"
          onClick={() => setIsABExpanded(!isABExpanded)}>
          {isABExpanded ? 'Hide' : 'Show more '}
          <CaretDownOutlined className={isABExpanded ? 'expand-arrow' : ''} />
        </Button>
      </div>
      <div className="news-tags-container">
        {KW.length > 0 && (
          <ul className="news-tags">
            {filterKW.map(({value, count}) => (
              <li key={value}>
                <Tag className="news-tags__item">
                  <span>{value}</span>
                  <span className="white">{count}</span>
                </Tag>
              </li>
            ))}
          </ul>
        )}
        {KW.length > DEFAULT_TAG_ITEAMS_COUNT && (
          <Button
            color="primary"
            variant="text"
            onClick={() => setIsTagItemsExpanded(!isTagItemsExpanded)}>
            {isTagItemsExpanded
              ? 'Show Less'
              : `Show All + ${KW.length - DEFAULT_TAG_ITEAMS_COUNT}`}
          </Button>
        )}
      </div>
      <Button
        color="primary"
        variant="text"
        className="news-original-source-button">
        <a href={URL} target="_blank">
          Original Source
        </a>
      </Button>
    </div>
  );
};
