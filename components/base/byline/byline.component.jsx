/* eslint-disable react/no-unknown-property */
import React from "react";
import { getUserDate } from "../../helpers/date.helper";

const Byline = ({ element, showTime = false, websiteDomain, showBorder }) => {
  const credits = element?.credits?.by;

  const { display_date: displayDate, publish_date: publishDate } = element;

  return (
    <div className={showBorder === false ? "bylineNotice" : "byline"}>
      <span className="author">
        By&nbsp;
        {credits?.map((author) => {
          if (author.slug) {
            return (
              <div key={author.slug} className="Page-byline">
                <div className="Page-authors">
                  <a href={`${websiteDomain}/authors/${author.slug}`}>{author.name}</a>
                </div>
              </div>
            );
          } else {
            return author.name;
          }
        })}
      </span>
      {displayDate && <span className="date"> {getUserDate(displayDate, showTime)}</span>}
      {publishDate && showTime && (
        <span className="date"> | Updated: {getUserDate(publishDate, showTime)}</span>
      )}
    </div>
  );
};

Byline.propTypes = {};

export default Byline;
