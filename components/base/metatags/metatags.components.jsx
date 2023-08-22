import React from "react";
import { getArticleParselyTags } from "../../helpers/article.helper";
import { getDateForMetadata } from "../../helpers/date.helper";

const CivicMetaTags = ({ content, parselyTags, arcSite, websiteUrl }) => {
  if (content?.type !== "story") return null;

  return (
    <>
      <meta name="og:image:width" content="1200" />
      <meta name="og:image:height" content="630" />
      <meta name="og:image:type" content="image/jpeg" />
      <meta name="parsely-tags" content={getArticleParselyTags(content, parselyTags, arcSite)} />

      {content?.credits?.by?.length == 1 && (
        <meta
          name="article:author"
          content={`${websiteUrl}/authors/${content?.credits?.by?.[0]?.slug}`}
        />
      )}
      <meta name="article:published_time" content={getDateForMetadata(content?.display_date)} />
    </>
  );
};

export default CivicMetaTags;
