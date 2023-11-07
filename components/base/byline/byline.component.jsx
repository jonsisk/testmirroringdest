/* eslint-disable react/no-unknown-property */
import React from "react";
import { getUserDate, isDateAfter } from "../../helpers/date.helper";
import Author from "./author.component";

const Byline = ({
  element,
  showTime = true,
  showDate = true,
  websiteDomain,
  showBorder,
  type = null,
}) => {
  const credits = element?.credits?.by;

  const { first_publish_date: firstPublishDate, display_date: displayDate } = element;

  //Render all authors for a story
  const renderAuthors = (authorsList) => {
    return authorsList.map((author, index) => {
      if (index === 0) {
        return <Author key={index} author={author} websiteDomain={websiteDomain} />;
      } else if (index === authorsList.length - 1) {
        return (
          <>
            <span className="and">and</span>
            <Author key={index} author={author} websiteDomain={websiteDomain} />
          </>
        );
      } else {
        return (
          <>
            <span className="coma">,</span>
            <Author key={index} author={author} websiteDomain={websiteDomain} />
          </>
        );
      }
    });
  };

  return (
    <div className={showBorder === false ? "bylineNotice" : "byline"}>
      <span className="author">
        By&nbsp;
        {credits?.length === 1 && <Author author={credits[0]} websiteDomain={websiteDomain} />}
        {credits?.length === 2 && (
          <>
            <Author author={credits[0]} websiteDomain={websiteDomain} />
            <span className="and">and</span>
            <Author author={credits[1]} websiteDomain={websiteDomain} />
          </>
        )}
        {credits?.length === 3 && (
          <>
            <Author author={credits[0]} websiteDomain={websiteDomain} />{" "}
            <span className="coma">,</span>
            <Author author={credits[1]} websiteDomain={websiteDomain} />
            <span className="and">and</span>
            <Author author={credits[2]} websiteDomain={websiteDomain} />
          </>
        )}
        {credits?.length >= 4 &&
          (type === "story" ? (
            renderAuthors(credits)
          ) : (
            <>
              <Author author={credits[0]} websiteDomain={websiteDomain} />{" "}
              <span className="coma">,</span>
              <Author author={credits[1]} websiteDomain={websiteDomain} />
              <span className="and">{` and ${credits?.length - 2} more`}</span>
            </>
          ))}
      </span>
      {showDate && firstPublishDate && <span className="separator">&nbsp;|&nbsp;</span>}
      {showDate && firstPublishDate && (
        <span className="date">{getUserDate(firstPublishDate, showTime)}</span>
      )}

      {/* print only if publishDate is after displayDate */}
      {showDate && isDateAfter(displayDate, firstPublishDate) && showTime && (
        <>
          <span className="separator">&nbsp;&nbsp;</span>
          <span className="date">Updated: {getUserDate(displayDate, showTime)}</span>
        </>
      )}
    </div>
  );
};

Byline.propTypes = {};

export default Byline;
