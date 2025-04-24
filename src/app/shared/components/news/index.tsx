import {ReactNode, useState} from 'react';
import ReactCountryFlag from 'react-country-flag';
import {
  BorderOutlined,
  CaretDownOutlined,
  GlobalOutlined,
  ReadOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {Button, Tag} from 'antd';
import {format} from 'date-fns';

import {IData_SnippetNews} from '../../../../@types/news.dto';
import {getAbbreviation, toPercentage} from '../../../utils';

import './style.scss';

const SANTIMENT_TAG: Record<string, string> = {
  positive: 'lime',
  negative: 'red',
};

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
      <aside className="news-stats">
        <div className="news-stats__left">
          <div className="news-stats__left-date">
            <span className="white">{format(DP, 'd')}</span>
            <span>{format(DP, 'MMM yyyy')}</span>
          </div>
          <div className="news-stats__left-reach">
            <span className="white">{REACH}K</span>
            <span>Reach</span>
          </div>

          <ul className="news-stats__traffic-list">
            <div>Top Traffic:</div>
            {TRAFFIC.map((item) => (
              <li className="news-stats__traffic-item">
                <span>{getAbbreviation(item.value)}</span>
                <span className="white">{toPercentage(item.count)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="news-stats__right">
          <Tag color={SANTIMENT_TAG[SENT]} className="news-sentiment">
            {SENT}
          </Tag>
          <BorderOutlined />
          <BorderOutlined />
        </div>
      </aside>
      <h3 className="news-title">{TI}</h3>
      <div className="news-info">
        <div className="news-info__block">
          <GlobalOutlined />
          <a
            href={'https://' + DOM}
            target="_blank"
            className="news-info__block-link">
            {DOM}
          </a>
        </div>
        <div className="news-info__block">
          <ReactCountryFlag countryCode={CNTR_CODE} svg />
          <span>{CNTR}</span>
        </div>
        <div className="news-info__block">
          <ReadOutlined />
          <span>{LANG[0].toUpperCase() + LANG.slice(1)}</span>
        </div>
        {AU.length > 0 && (
          <div className="news-info__block">
            <TeamOutlined />
            <span>{AU.join(', ')}</span>
          </div>
        )}
      </div>
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
