import ReactCountryFlag from 'react-country-flag';
import {GlobalOutlined, ReadOutlined, TeamOutlined} from '@ant-design/icons';

import {IData_SnippetNews} from '../../../../../@types/news.dto';

import './style.scss';

interface Props
  extends Pick<
    IData_SnippetNews,
    'CNTR' | 'CNTR_CODE' | 'DOM' | 'LANG' | 'AU'
  > {
  className?: string;
}

export const NewsInfo = ({CNTR, CNTR_CODE, DOM, LANG, AU}: Props) => {
  return (
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
  );
};
