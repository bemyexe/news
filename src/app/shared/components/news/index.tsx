import {BorderOutlined} from '@ant-design/icons';
import {Tag} from 'antd';
import {format} from 'date-fns';

import {IData_SnippetNews} from '../../../../@types/news.dto';
import {toPercentage} from '../../../utils';

import './style.scss';

const SANTIMENT_TAG: Record<string, string> = {
  positive: 'lime',
  negative: 'red',
};

export const News = ({
  ID,
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
  FAV,
  HIGHLIGHTS,
}: IData_SnippetNews) => {
  return (
    <div className="news-container">
      <div className="news-stats">
        <div className="news-stats__left">
          <span>{format(DP, 'd MMM yyyy')}</span>
          <span>{REACH}K Reach</span>
          <ul className="news-stats__traffic-list">
            <div>Top Traffic:</div>
            {TRAFFIC.map((item) => (
              <li className="news-stats__traffic-item">
                <span>{item.value}</span>
                <span>{toPercentage(item.count)}</span>
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
      </div>
      <h3 className="news-title">{TI}</h3>
    </div>
  );
};
