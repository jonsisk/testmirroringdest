import PropTypes from "@arc-fusion/prop-types";
import { Image, ImageMetadata } from "@wpmedia/engine-theme-sdk";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React from "react";

/**
 * Overlay lead image for article layout
 */
const OverlayLeadImage = ({ customFields }) => {
  const { globalContent, arcSite } = useFusionContext();
  const lead_art = globalContent.promo_items.lead_art || globalContent.promo_items.basic;
  const { lightBackgroundLogo, lightBackgroundLogoAlt } = getProperties(arcSite);
  const { hideImageCaption, hideImageCredits, hideImageTitle } = customFields;
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

  return (
    <>
      <div className="logo-overlay">
        <a aria-label="home page" href="/" data-cms-ai="0">
          <img className="PageLogo-image" src={lightBackgroundLogo} alt={lightBackgroundLogoAlt} />
        </a>
      </div>
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
          <ImageMetadata
            subtitle={!hideImageTitle ? subtitle : null}
            caption={!hideImageCaption ? caption : null}
            credits={!hideImageCredits ? credits : null}
            vanityCredits={!hideImageCredits ? vanityCredits : null}
          />
        </figcaption>
      </figure>
    </>
  );
};

OverlayLeadImage.label = "Overlay Lead Image - Civic";
OverlayLeadImage.description = "Lead image as overlay on article";

OverlayLeadImage.propTypes = {
  customFields: PropTypes.shape({
    hideImageTitle: PropTypes.bool.tag({
      description: "This display option applies to all Images in the Article Body.",
      label: "Hide Title",
      defaultValue: false,
      group: "Image Display Options",
    }),
    hideImageCaption: PropTypes.bool.tag({
      description: "This display option applies to all Images in the Article Body.",
      label: "Hide Caption",
      defaultValue: false,
      group: "Image Display Options",
    }),
    hideImageCredits: PropTypes.bool.tag({
      description: "This display option applies to all Images in the Article Body.",
      label: "Hide Credits",
      defaultValue: false,
      group: "Image Display Options",
    }),
  }),
};

export default OverlayLeadImage;
