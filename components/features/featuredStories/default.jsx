import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getTranslatedPhrases from "fusion:intl";
import getProperties from "fusion:properties";
import React from "react";
import { resolveDefaultPromoElements } from "../../helpers/list.helpers";
import Results from "./results/index";

const FeaturedStoriesCivic = ({ customFields }) => {
  const { arcSite, contextPath, deployment } = useFusionContext();
  const {
    listContentConfig: { contentService, contentConfigValues },
    keepPrimaryWebsite,
    listType,
  } = customFields;
  const { fallbackImage, locale, primaryLogoAlt, breakpoints, resizerURL } = getProperties(arcSite);
  const imageProperties = {
    smallWidth: 158,
    smallHeight: 89,
    mediumWidth: 274,
    mediumHeight: 154,
    largeWidth: 274,
    largeHeight: 154,
    primaryLogoAlt,
    breakpoints,
    resizerURL,
  };
  const imagePropertiesFeatured = {
    smallWidth: 768,
    smallHeight: 432,
    mediumWidth: 768,
    mediumHeight: 432,
    largeWidth: 768,
    largeHeight: 432,
    primaryLogoAlt,
    breakpoints,
    resizerURL,
  };
  const targetFallbackImage = !fallbackImage.includes("http")
    ? deployment(`${contextPath}/${fallbackImage}`)
    : fallbackImage;
  const promoElements = resolveDefaultPromoElements(customFields);
  const phrases = getTranslatedPhrases(locale || "en");

  const configuredOffset =
    parseInt(contentConfigValues?.offset, 10) ||
    parseInt(contentConfigValues?.feedOffset, 10) ||
    parseInt(contentConfigValues?.from, 10) ||
    0;
  const configuredSize =
    parseInt(contentConfigValues?.size, 10) || parseInt(contentConfigValues?.feedSize, 10) || 10;

  return (
    <div className="Front-Page">
      <Results
        arcSite={arcSite}
        configuredOffset={configuredOffset}
        configuredSize={configuredSize}
        contentConfigValues={contentConfigValues}
        contentService={contentService}
        imageProperties={imageProperties}
        imagePropertiesFeatured={imagePropertiesFeatured}
        isServerSideLazy={false}
        phrases={phrases}
        showByline={promoElements.showByline}
        showDate={promoElements.showDate}
        showDescription={promoElements.showDescription}
        showHeadline={promoElements.showHeadline}
        showImage={promoElements.showImage}
        showItemOverline={promoElements.showItemOverline}
        targetFallbackImage={targetFallbackImage}
        keepPrimaryWebsite={keepPrimaryWebsite}
        showFeatured={promoElements.showFeatured}
        listType={listType}
      />
    </div>
  );
};

FeaturedStoriesCivic.label = "Featured Stories – Civic";
FeaturedStoriesCivic.static = true;

FeaturedStoriesCivic.propTypes = {
  customFields: PropTypes.shape({
    listType: PropTypes.oneOf(["ListG", "ListP", "ListA"]).tag({
      defaultValue: "ListG",
      group: "Configure Content",
      label: "Style",
    }),
    keepPrimaryWebsite: PropTypes.bool.tag({
      label: "Keep primary website URL",
      defaultValue: true,
      group: "Configure Content",
      description:
        "If selected, the primary website URL will be used for the link of the story instead of the current site.",
    }),
    listContentConfig: PropTypes.contentConfig("ans-feed").tag({
      group: "Configure Content",
      label: "Display Content Info",
    }),
    showItemOverline: PropTypes.bool.tag({
      label: "Show overline",
      defaultValue: false,
      group: "Show promo elements",
    }),
    showHeadline: PropTypes.bool.tag({
      label: "Show headline",
      defaultValue: true,
      group: "Show promo elements",
    }),
    showImage: PropTypes.bool.tag({
      label: "Show image",
      defaultValue: true,
      group: "Show promo elements",
    }),
    showDescription: PropTypes.bool.tag({
      label: "Show description",
      defaultValue: true,
      group: "Show promo elements",
    }),
    showByline: PropTypes.bool.tag({
      label: "Show byline",
      defaultValue: true,
      group: "Show promo elements",
    }),
    showDate: PropTypes.bool.tag({
      label: "Show date",
      defaultValue: true,
      group: "Show promo elements",
    }),
    showFeatured: PropTypes.bool.tag({
      label: "Show featured article layout",
      defaultValue: true,
      group: "Show promo elements",
    }),
  }),
};

export default FeaturedStoriesCivic;
