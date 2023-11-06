import { isDateAfter } from "./date.helper";
/**
 * Get JSON+LD schema for article
 * @param {*} globalContent - the arcile
 * @param {*} logo - the logo of the site
 * @param {*} baseUrl - the base url of the site
 * @param {*} websiteName - the site name
 * @returns JSON+LD schema
 */
export const getSchema = (globalContent, logo, baseUrl, websiteName) => {
  const {
    type,
    headlines,
    first_publish_date,
    display_date,
    last_updated_date,
    description,
    credits,
    canonical_url,
    promo_items,
  } = globalContent;

  if (type !== "story") return null;

  const image = promo_items?.basic || promo_items?.lead_image;
  const date = isDateAfter(display_date, first_publish_date) ? display_date : first_publish_date;

  return `{
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "url": "${baseUrl}${canonical_url}",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${baseUrl}${canonical_url}"
        },
        "name" : "${headlines.basic.replace(/['"]+/g, "")}",
        "headline": "${headlines.basic.replace(/['"]+/g, "")}",
        "datePublished": "${date}",
        "dateModified": "${last_updated_date}",
        "description": "${description?.basic?.replace(/['"]+/g, "")}",
        "author": [
            ${credits.by
              .map((author) => {
                return `{
                    "@type": "Person",
                    "name": "${author.name}",
                    "url" : "${author?.url}"
                }`;
              })
              .join(",")}
        ],       
        "publisher": {
          "@type": "NewsMediaOrganization",
          "name": "${websiteName}",
          "logo": {
            "@type": "ImageObject",
            "url": "${logo}"
           }
        },  
        "thumbnailUrl": "${baseUrl}${image?.additional_properties?.thumbnailResizeUrl}",
        "image": {
          "@type": "ImageObject",
          "url": "${baseUrl}${image?.additional_properties?.fullSizeResizeUrl}"
        }
      }`;
};
