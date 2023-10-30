import React from "react";
import { getArticleParselyTags } from "../../helpers/article.helper";
import { getDateForMetadata } from "../../helpers/date.helper";

const CivicMetaTags = ({ content, parselyTags, arcSite, websiteUrl, websiteName, pageType }) => {
  switch (pageType) {
    case "article":
      return (
        <>
          <meta name="og:image:width" content="1200" />
          <meta name="og:image:height" content="630" />
          <meta name="og:image:type" content="image/jpeg" />
          <meta
            name="parsely-tags"
            content={getArticleParselyTags(content, parselyTags, arcSite)}
          />

          {content?.credits?.by?.length == 1 && (
            <meta
              name="article:author"
              content={`${websiteUrl}/authors/${content?.credits?.by?.[0]?.slug}`}
            />
          )}
          <meta
            name="article:published_time"
            content={getDateForMetadata(content?.first_publish_date)}
          />
        </>
      );

    case "section":
      return (
        <>
          <link
            type="application/rss+xml"
            rel="alternate"
            title={`${content.name} - ${websiteName}`}
            href={`${websiteUrl}/arc/outboundfeeds/rss/category${content._id}/`}
          ></link>
        </>
      );
    case "author":
      if (content?.authors?.length > 0) {
        const { byline, slug } = content.authors[0];
        return (
          <>
            <link
              type="application/rss+xml"
              rel="alternate"
              title={`${byline} - ${websiteName}`}
              href={`${websiteUrl}/arc/outboundfeeds/rss/author/${slug}/`}
            ></link>
          </>
        );
      }
      return null;
    case "homepage":
      return (
        <>
          <link
            type="application/rss+xml"
            rel="alternate"
            title={websiteName}
            href={`${websiteUrl}/arc/outboundfeeds/rss/`}
          ></link>
        </>
      );
    default:
      return null;
  }
};

export default CivicMetaTags;
