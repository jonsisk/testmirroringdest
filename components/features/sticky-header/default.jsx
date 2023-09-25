import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React from "react";
import { isSiteSection, getSiteProperties } from "../../helpers/site.helper";
import useSticky from "../../hooks/use-sticky";
import "./styles.scss";

/**
 * Article Sticky Header navigation
 */
const StickyHeader = () => {
  const { sticky, stickyRef } = useSticky();
  const { globalContent, arcSite, outputType } = useFusionContext();
  const { websiteDomain } = getProperties(arcSite);
  const { lightBackgroundLogo, lightBackgroundLogoAlt } = isSiteSection(globalContent)
    ? getSiteProperties(globalContent)
    : getProperties(arcSite);

  const encodedArticleUrl = encodeURIComponent(`${websiteDomain}${globalContent?.canonical_url}`);

  if (outputType == "amp") return null;

  return (
    <div ref={stickyRef} className={`sticky-header ${sticky ? "show" : ""}`}>
      <a href={globalContent?.site_section ? globalContent?.site_section._id : "/"}>
        <img
          height="60"
          width="60"
          className="PageLogo-image"
          src={lightBackgroundLogo}
          alt={lightBackgroundLogoAlt}
        />
      </a>
      <div className="ActionBarInStickyBar">
        <a
          href={`https://www.facebook.com/dialog/share?app_id=735437511148430&display=popup&href=${encodedArticleUrl}`}
          target="_blank"
          rel="noreferrer"
          className="ActionLink fb"
        >
          <svg className="facebook">
            <use xlinkHref="#icon-facebook"></use>
          </svg>
          <span>Facebook</span>
        </a>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodedArticleUrl}`}
          target="_blank"
          rel="noreferrer"
          className="ActionLink"
        >
          <svg className="twitter">
            <use xlinkHref="#icon-twitter"></use>
          </svg>
          <span>Twitter</span>
        </a>
      </div>
    </div>
  );
};

StickyHeader.label = "Sticky Header - Civic";
StickyHeader.description = "StickyHeader that appears after scrolling down";

export default StickyHeader;
