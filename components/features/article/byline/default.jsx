import { useFusionContext } from "fusion:context";
import React from "react";
import { getUserDate } from "../../../helpers/date.helper";
import "./styles.scss";

/**
 * Displays author name and date for the article
 */
const BylineFeature = () => {
  const { globalContent } = useFusionContext();
  const credits = globalContent?.credits?.by;
  const { display_date: displayDate, publish_date: publishDate } = globalContent;

  return (
    <div className="byline">
      <span className="author">
        By&nbsp;
        {credits.map((author) => {
          return (
            <a key={author.slug} href={`/author/${author.slug}`}>
              {author.name}
            </a>
          );
        })}
      </span>
      <span className="separator">&nbsp;|&nbsp;</span>
      <span className="date">{getUserDate(displayDate ? displayDate : publishDate, true)}</span>
    </div>
  );
};

BylineFeature.label = "Byline - Civic";
BylineFeature.description = "Shows byline and date for the article";

export default BylineFeature;
