import {Button, Tag} from 'antd';

import {IData_SnippetNews} from '../../../../../@types/news.dto';

import './style.scss';

interface Props extends Pick<IData_SnippetNews, 'KW'> {
  isTagItemsExpanded: boolean;
  setIsTagItemsExpanded: (value: boolean) => void;
  className?: string;
}

const DEFAULT_TAG_ITEAMS_COUNT = 6;

export const NewsTags = ({
  KW,
  isTagItemsExpanded,
  setIsTagItemsExpanded,
}: Props) => {
  const filterKW = isTagItemsExpanded
    ? KW
    : KW.slice(0, DEFAULT_TAG_ITEAMS_COUNT);
  return (
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
  );
};
