import { Image } from "@wpmedia/engine-theme-sdk";
import { extractResizedParams, extractImageFromStory } from "@wpmedia/resizer-image-block";
import React from "react";
import { getPrimarySection } from "../../helpers/article.helper";
import { getWebsiteDomain } from "../../helpers/site.helper";
import Byline from "../byline/byline.component";

const HeroItem = React.memo(
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
      showItemOverline,
      globalContent,
      style,
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

      const getMainSection = (element) => {
        const primarySection = getPrimarySection(element, globalContent);
        if (
          !primarySection ||
          primarySection?.additional_properties?.original?.bureau?.is_bureau_section == "true" ||
          primarySection?.additional_properties?.original?.site?.is_internal === "true" ||
          primarySection?.name?.startsWith("#StoryType")
        )
          return null;
        return (
          <a href={`${primarySection.path}/`} title={primarySection.name} className="eyebrow">
            {primarySection.name}
          </a>
        );
      };

      return (
        <>
          <div className={`PageListQ-items-item ${style}`}>
            <div className={`PagePromo-${subtype}`}>
              <div className="PagePromo-content">
                {showItemOverline ? (
                  <div className="PagePromo-category">
                    {showItemOverline && getMainSection(element)}
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
              <div className="PagePromo-media">
                <a href={url} title={headlineText} aria-hidden="true" tabIndex="-1">
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
                </a>
              </div>
            </div>
          </div>
        </>
      );
    }
  )
);

export default HeroItem;
