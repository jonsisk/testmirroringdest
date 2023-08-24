/* eslint-disable react/no-unknown-property */
import React from "react";
import { getUserDate } from "../../helpers/date.helper";

const Byline = ({ element, showTime = true, websiteDomain }) => {
  const credits = element?.credits?.by;
  const { display_date: displayDate, publish_date: publishDate } = element;
  return (
    <div className="byline">
      <span className="author">
        By&nbsp;
        {credits?.map((author) => {
          return (
            <a key={author.slug} href={`${websiteDomain}/authors/${author.slug}`}>
              {author.name}
            </a>
          );
        })}
      </span>
      <span className="separator">&nbsp;|&nbsp;</span>
      <span className="date">{getUserDate(displayDate ? displayDate : publishDate, showTime)}</span>
    </div>
  );
};

Byline.propTypes = {};

export default Byline;
