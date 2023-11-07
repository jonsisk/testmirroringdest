import { getDateForRepublish } from "./date.helper";

/**
 * Given an article, it returns a string with the article body, ready to be republished.
 */
export const getRepublishableArticle = (
  article,
  outputType,
  websiteName,
  websiteUrl,
  republishHeader,
  republishFooter
) => {
  const {
    content_elements: contentElements = [],
    headlines,
    publish_date,
    credits,
    canonical_url,
  } = article;

  const publishedDateStr = getDateForRepublish(publish_date, true);
  const canonicalUrl = `${websiteUrl}${canonical_url}`;
  const republishHeaderStr = republishHeader
    .replace("#canonicalUrl#", canonicalUrl)
    .replace("#websiteDomain#", websiteUrl);

  // iterate over article elements
  const articleBody = [
    //legal header
    outputType === "html" ? `<p>${republishHeaderStr}</p>` : stripTags(republishHeaderStr),
    //headline
    outputType === "html" ? `<h1>${headlines.basic}</h1>` : headlines.basic,
    //author
    credits.by[0]
      ? outputType === "html"
        ? `<p>${credits.by[0].name}, ${websiteName}</p>`
        : `${credits.by[0].name}, ${websiteName}`
      : "",
    //time
    outputType === "html" ? `<time>${publishedDateStr}</time>` : publishedDateStr,
    //body
    ...contentElements.map((contentElement) => {
      const { type, content } = contentElement;
      switch (type) {
        case "text":
          var strippedContent = stripBrTags(content);
          return strippedContent?.length > 0
            ? outputType === "html"
              ? `<p>${strippedContent}</p>`
              : stripTags(strippedContent)
            : null;
        case "header":
          return contentElement.content && contentElement.content.length > 0
            ? outputType === "html"
              ? `<h${contentElement.level}>${contentElement.content}</h${contentElement.level}>`
              : stripTags(contentElement.content)
            : null;

        case "list":
          var { items: listItems } = contentElement;
          if (listItems && listItems.length > 0) {
            //get list items as html text (ul and li)
            var listItemsHtml = listItems
              .map((listItem) => {
                return outputType === "html" ? `<li>${listItem.content}</li>` : listItem.content;
              })
              .join("\n\r");
            return outputType === "html" ? `<ul>${listItemsHtml}</ul>` : listItemsHtml;
          }
          return null;
        default:
          return null;
      }
    }),
    // legals section
    // description
    outputType === "html" ? `<p>${republishFooter}</p>` : republishFooter,
    // canonical
    outputType === "html" ? `<link rel="canonical" href="${canonicalUrl}" />` : canonicalUrl,
    //tracking pixel
    outputType === "html"
      ? `<img src="http://www.itjon.com/phppt/pixel.php?a=${canonicalUrl}" alt="">`
      : "",
  ];

  return articleBody.join("\n\r");
};

const stripTags = (str) => {
  if (str === null || str === "") return false;
  else str = str.toString();
  return str.replace(
    /<\/?a[^>]*>|<\/?b[^>]*>|<\/?i[^>]*>|<\/?p[^>]*>|<\/?em[^>]*>|<\/?strong[^>]*>/gi,
    ""
  );
};

const stripBrTags = (str) => {
  if (str === null || str === "") return false;
  else str = str.toString();
  return str.replace(/<br\s*\/?>/gi, "");
};
