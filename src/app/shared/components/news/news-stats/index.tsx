import {BorderOutlined} from '@ant-design/icons';
import {Tag} from 'antd';
import {format} from 'date-fns';

import {IData_SnippetNews} from '../../../../../@types/news.dto';
import {getAbbreviation, toPercentage} from '../../../../utils';

import './style.scss';

interface Props
  extends Pick<IData_SnippetNews, 'DP' | 'REACH' | 'SENT' | 'TRAFFIC'> {
  className?: string;
}

const SANTIMENT_TAG: Record<string, string> = {
  positive: 'lime',
  negative: 'red',
};

export const NewsStats = ({DP, REACH, SENT, TRAFFIC}: Props) => {
  return (
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
  );
};
