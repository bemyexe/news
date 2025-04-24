import {useState} from 'react';
import {CaretDownOutlined} from '@ant-design/icons';
import {Button} from 'antd';

import {IData_SnippetNews} from '../../../../@types/news.dto';
import {parseHighlight} from '../../../utils/parse-highlight';

import {NewsInfo} from './news-info';
import {NewsStats} from './news-stats';
import {NewsTags} from './news-tags';

import './style.scss';

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

  const content = isABExpanded
    ? AB
    : HIGHLIGHTS.map((highlight) => parseHighlight(highlight));

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
      <NewsTags
        KW={KW}
        isTagItemsExpanded={isTagItemsExpanded}
        setIsTagItemsExpanded={setIsTagItemsExpanded}
      />
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
