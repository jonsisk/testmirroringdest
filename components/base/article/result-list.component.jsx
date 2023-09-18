import { Image } from "@wpmedia/engine-theme-sdk";
import { extractResizedParams, extractImageFromStory } from "@wpmedia/resizer-image-block";
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
      keepPrimaryWebsite,
      websiteName,
    }) => {
      const {
        description: { basic: descriptionText } = {},
        subheadlines: { basic: basicSubheadlines, print: feedSubheadlines } = {},
        headlines: { basic: basicHeadline, web: feedHeadline } = {},
        websites,
        subtype,
      } = element;

      if (!websites) return null;

      const headlineText = feedHeadline || basicHeadline;
      const subheadlines = feedSubheadlines || basicSubheadlines;

      const imageURL = extractImageFromStory(element);
      const url = websites[arcSite].website_url;

      const getMainSection = (element) => {
        const primarySection = element?.taxonomy?.primary_section;
        if (!primarySection) return null;
        return (
          <a href={primarySection.path} title={primarySection.name} className="eyebrow">
            {primarySection.name}
          </a>
        );
      };

      return (
        <>
          <div
            className={`PageListH-items-item ${
              subtype === "standard" || subtype === undefined || !showFeatured ? "" : "featured"
            }`}
          >
            <div className={`PagePromo-${subtype}`}>
              <div className="PagePromo-media">
                {showImage ? (
                  <a href={url} title={headlineText} aria-hidden="true" tabIndex="-1">
                    {subtype === "standard" || subtype === undefined || !showFeatured ? (
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

              <div className="PagePromo-content">
                {showItemOverline ? (
                  <div className="PagePromo-category">
                    {showItemOverline && !keepPrimaryWebsite ? getMainSection(element) : null}
                    {showItemOverline && keepPrimaryWebsite && Object.keys(websites).length <= 1
                      ? getMainSection(element)
                      : null}
                    {showItemOverline && keepPrimaryWebsite && Object.keys(websites).length > 1 ? (
                      <a href={url} title={headlineText} className="eyebrow">
                        {"FROM " + websiteName}
                      </a>
                    ) : null}
                  </div>
                ) : null}

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
                        websiteDomain={getWebsiteDomain(arcSite)}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  )
);

export default ResultItem;
