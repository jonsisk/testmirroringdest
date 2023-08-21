import PropTypes from "@arc-fusion/prop-types";
import { isServerSide, LazyLoad } from "@wpmedia/engine-theme-sdk";
import { useFusionContext } from "fusion:context";
import getTranslatedPhrases from "fusion:intl";
import getProperties from "fusion:properties";
import React from "react";
import Results from "./results";
import { resolveDefaultPromoElements } from "./results/helpers";

const ResultsListCivic = ({ customFields }) => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext();
  const {
    layoutStyle,
    lazyLoad,
    listContentConfig: { contentService, contentConfigValues },
    keepPrimaryWebsite,
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
  const isServerSideLazy = lazyLoad && isServerSide() && !isAdmin;
  const configuredOffset =
    parseInt(contentConfigValues?.offset, 10) ||
    parseInt(contentConfigValues?.feedOffset, 10) ||
    parseInt(contentConfigValues?.from, 10) ||
    0;
  const configuredSize =
    parseInt(contentConfigValues?.size, 10) || parseInt(contentConfigValues?.feedSize, 10) || 10;

  return (
    <LazyLoad enabled={lazyLoad && !isAdmin}>
      <Results
        arcSite={arcSite}
        configuredOffset={configuredOffset}
        configuredSize={configuredSize}
        contentConfigValues={contentConfigValues}
        contentService={contentService}
        imageProperties={imageProperties}
        imagePropertiesFeatured={imagePropertiesFeatured}
        isServerSideLazy={isServerSideLazy}
        phrases={phrases}
        showAsList={layoutStyle === "List"}
        showByline={promoElements.showByline}
        showDate={promoElements.showDate}
        showDescription={promoElements.showDescription}
        showHeadline={promoElements.showHeadline}
        showImage={promoElements.showImage}
        showItemOverline={promoElements.showItemOverline}
        targetFallbackImage={targetFallbackImage}
        keepPrimaryWebsite={keepPrimaryWebsite}
      />
    </LazyLoad>
  );
};

ResultsListCivic.label = "Results List – Civic";

ResultsListCivic.icon = "arc-list";

ResultsListCivic.propTypes = {
  customFields: PropTypes.shape({
    layoutStyle: PropTypes.oneOf(["List", "Front page"]).tag({
      label: "Layout Style",
      defaultValue: "List",
      group: "Configure Content",
      description:
        "'List' will display the traditional result list.  'Front page' will display a top component to feature some stories.",
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
    lazyLoad: PropTypes.bool.tag({
      name: "Lazy Load block?",
      defaultValue: false,
      description:
        "Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
    }),
  }),
};

export default ResultsListCivic;
