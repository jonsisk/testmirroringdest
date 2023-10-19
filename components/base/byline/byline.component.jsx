/* eslint-disable react/no-unknown-property */
import React from "react";
import { getUserDate, isDateAfter } from "../../helpers/date.helper";

const Byline = ({ element, showTime = true, websiteDomain, showBorder }) => {
  const credits = element?.credits?.by;

  //credits[credits.length] = credits[0];
  //credits[credits.length - 1].name = "Elena " + Math.random();

  const { display_date: displayDate, publish_date: publishDate } = element;

  //console.log("---->", credits);

  return (
    <div className={showBorder === false ? "bylineNotice" : "byline"}>
      <span className="author">
        By&nbsp;
        {credits?.map((author) => {
          return (
            <div key={author.slug} className="Page-byline">
              <div className="Page-authors">
                {credits.length > 3 &&
                credits[0].name !== author.name &&
                credits[1].name !== author.name &&
                credits[2].name !== author.name
                  ? " and " + credits.length - 3 + " more "
                  : credits[0].name !== author.name &&
                    credits[credits.length - 1].name !== author.name
                  ? ", "
                  : credits[credits.length - 1].name === author.name && credits.length > 1
                  ? " and "
                  : ""}
                {author.slug ? (
                  <a href={`${websiteDomain}/authors/${author.slug}`}>{author.name}</a>
                ) : (
                  author.name
                )}
              </div>
            </div>
          );
        })}
      </span>
      <span className="separator">&nbsp;|&nbsp;</span>
      {displayDate && <span className="date">{getUserDate(displayDate, showTime)}</span>}

      {/* print only if publishDate is after displayDate */}
      {isDateAfter(publishDate, displayDate) && showTime && (
        <>
          <span className="separator">&nbsp;|&nbsp;</span>
          <span className="date">Updated: {getUserDate(publishDate, showTime)}</span>
        </>
      )}
    </div>
  );
};

Byline.propTypes = {};

export default Byline;
