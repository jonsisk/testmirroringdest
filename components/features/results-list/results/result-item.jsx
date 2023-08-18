import { Image } from "@wpmedia/engine-theme-sdk";
import { extractResizedParams, extractImageFromStory } from "@wpmedia/resizer-image-block";
import getProperties from "fusion:properties";
import React from "react";
import Byline from "../../../base/byline/byline.component";

const ResultItem = React.memo(
  React.forwardRef(
    ({
      arcSite,
      element,
      imageProperties,
      imagePropertiesFeatured,
      targetFallbackImage,
      placeholderResizedImageOptions,
      showAsList,
      showByline,
      showDescription,
      showHeadline,
      showImage,
      showItemOverline,
      keepPrimaryWebsite,
    }) => {
      const {
        description: { basic: descriptionText } = {},
        headlines: { basic: headlineText } = {},
        websites,
        subtype,
      } = element;

      const actualSite = Object.keys(websites).find((key) => key.includes("-"));

      const { websiteName } = getProperties(actualSite);

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
              subtype === "standard" || subtype === undefined ? "" : "featured"
            }`}
          >
            <div className={`PagePromo-${subtype}`}>
              <div className="PagePromo-media">
                {showImage ? (
                  <a href={url} title={headlineText} aria-hidden="true" tabIndex="-1">
                    {subtype === "standard" || subtype === undefined ? (
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
                  {showDescription && descriptionText ? <p>{descriptionText}</p> : null}
                </div>

                <div className="PagePromo-byline">
                  {showByline ? (
                    <div className="PagePromo-author">
                      <Byline element={element} showTime={false} />
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
