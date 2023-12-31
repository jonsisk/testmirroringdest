import { Image } from "@wpmedia/engine-theme-sdk";
import { extractResizedParams, extractImageFromStory } from "@wpmedia/resizer-image-block";
import { Overline } from "@wpmedia/shared-styles";
import React from "react";
import { getWebsiteDomain } from "../../helpers/site.helper";
import Byline from "../byline/byline.component";

const ResultItem = React.memo(
  React.forwardRef(
    ({
      arcSite,
      element,
      imageProperties,
      imagePropertiesFeatured,
      targetFallbackImage,
      placeholderResizedImageOptions,
      showByline,
      showDescription,
      showHeadline,
      showImage,
      showItemOverline,
      showFeatured,
      globalContent,
    }) => {
      const {
        description: { basic: descriptionText } = {},
        subheadlines: { basic: basicSubheadlines } = {},
        headlines: { basic: basicHeadline, web: feedHeadline, print: feedSubheadlines } = {},
        websites,
        subtype,
      } = element;

      if (!websites) return null;

      const headlineText = feedHeadline || basicHeadline;
      const subheadlines = feedSubheadlines || basicSubheadlines;

      const imageURL = extractImageFromStory(element);
      const url = websites[arcSite].website_url;

      return (
        <div className="notice-list-container">
          <div className={`PageListH-items-item `}>
            <div className="PagePromo">
              <div className="PagePromo-media">
                {showImage ? (
                  <a href={url} title={headlineText} aria-hidden="true" tabIndex="-1">
                    {subtype === "standard" ||
                    subtype === undefined ||
                    subtype === "" ||
                    !showFeatured ? (
                      <Image
                        {...imageProperties}
                        url={imageURL !== null ? imageURL : targetFallbackImage}
                        alt={imageURL !== null ? headlineText : imageProperties.primaryLogoAlt}
                        resizedImageOptions={
                          imageURL !== null
                            ? extractResizedParams(element)
                            : placeholderResizedImageOptions
                        }
                      />
                    ) : (
                      <Image
                        {...imagePropertiesFeatured}
                        url={imageURL !== null ? imageURL : targetFallbackImage}
                        alt={imageURL !== null ? headlineText : imageProperties.primaryLogoAlt}
                        resizedImageOptions={
                          imageURL !== null
                            ? extractResizedParams(element)
                            : placeholderResizedImageOptions
                        }
                      />
                    )}
                  </a>
                ) : null}
              </div>
              <Overline story={element} className="overline" />
              <div className="PagePromo-content">
                <div className="PagePromo-title">
                  {showHeadline ? (
                    <a href={url} title={headlineText}>
                      {headlineText}
                    </a>
                  ) : null}
                </div>

                <div className="PagePromo-description">
                  {showDescription && subheadlines ? (
                    <p>{subheadlines}</p>
                  ) : showDescription && descriptionText ? (
                    <p>{descriptionText}</p>
                  ) : null}
                </div>

                <div className="PagePromo-byline">
                  {showByline ? (
                    <div className="PagePromo-author">
                      <Byline
                        element={element}
                        showTime={false}
                        showBorder={true}
                        websiteDomain={getWebsiteDomain(arcSite)}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  )
);

export default ResultItem;
