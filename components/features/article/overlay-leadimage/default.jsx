import PropTypes from "@arc-fusion/prop-types";
import { Image } from "@wpmedia/arc-themes-components";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React from "react";
import { isSiteSection, getSiteProperties } from "../../../helpers/site.helper";

/**
 * Overlay lead image for article layout
 */
const OverlayLeadImage = ({ customFields }) => {
  const context = useFusionContext();
  const { globalContent, arcSite } = context;
  const lead_art = globalContent.promo_items?.lead_art || globalContent.promo_items?.basic;
  const { primaryLogo, lightBackgroundLogoAlt } = isSiteSection(globalContent)
    ? getSiteProperties(context)
    : getProperties(arcSite);
  const { hideLogo, hideImageCaption, hideImageCredits, hideImageTitle } = customFields;
  const {
    url,
    subtitle,
    caption,
    credits,
    alt_text: altText,
    resized_params: resizedImageOptions = {},
    vanity_credits: vanityCredits,
  } = lead_art;

  let widthsObject = {
    small: 768,
    medium: 1024,
    large: 1600,
  };

  let heightsObject = {
    small: 432,
    medium: 576,
    large: 900,
  };

  const logoUrl = isSiteSection(globalContent) ? globalContent.site_section?._id : "/";

  return (
    <>
      {!hideLogo && (
        <div className="logo-overlay">
          <a aria-label="home page" href={logoUrl} data-cms-ai="0">
            <img className="PageLogo-image" src={primaryLogo} alt={lightBackgroundLogoAlt} />
          </a>
        </div>
      )}
      <figure className="overlay-image">
        <Image
          resizedImageOptions={resizedImageOptions}
          url={url}
          alt={altText}
          smallWidth={widthsObject.small}
          smallHeight={heightsObject.small}
          mediumWidth={widthsObject.medium}
          mediumHeight={heightsObject.medium}
          largeWidth={widthsObject.large}
          largeHeight={heightsObject.large}
          breakpoints={getProperties(arcSite)?.breakpoints}
          resizerURL={getProperties(arcSite)?.resizerURL}
        />
        <figcaption>
          {/* <ImageMetadata
            subtitle={!hideImageTitle ? subtitle : null}
            caption={!hideImageCaption ? caption : null}
            credits={!hideImageCredits ? credits : null}
            vanityCredits={!hideImageCredits ? vanityCredits : null}
          /> */}
        </figcaption>
      </figure>
    </>
  );
};

OverlayLeadImage.label = "Overlay Lead Image - Civic";
OverlayLeadImage.description = "Lead image as overlay on article";

OverlayLeadImage.propTypes = {
  customFields: PropTypes.shape({
    hideLogo: PropTypes.bool.tag({
      description: "Hide logo from overlay",
      label: "Hide Logo",
      defaultValue: false,
      group: "Image Display Options",
    }),
    hideImageTitle: PropTypes.bool.tag({
      label: "Hide Title",
      defaultValue: false,
      group: "Image Display Options",
    }),
    hideImageCaption: PropTypes.bool.tag({
      label: "Hide Caption",
      defaultValue: false,
      group: "Image Display Options",
    }),
    hideImageCredits: PropTypes.bool.tag({
      label: "Hide Credits",
      defaultValue: false,
      group: "Image Display Options",
    }),
  }),
};

export default OverlayLeadImage;
