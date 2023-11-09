import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getTranslatedPhrases from "fusion:intl";
import getProperties from "fusion:properties";
import React from "react";
import { resolveDefaultPromoElements } from "../../helpers/list.helpers";
import Results from "./results/index";

const FeaturedStoriesCivic = ({ customFields }) => {
  const { arcSite, contextPath, deployment, globalContent } = useFusionContext();
  const {
    listContentConfig: { contentService, contentConfigValues },
    listType,
    title,
  } = customFields;
  const { fallbackImage, locale, primaryLogoAlt, breakpoints, resizerURL } = getProperties(arcSite);
  const imageProperties = {
    smallWidth: 274,
    smallHeight: 154,
    mediumWidth: 377,
    mediumHeight: 212,
    largeWidth: 600,
    largeHeight: 338,
    primaryLogoAlt,
    breakpoints,
    resizerURL,
  };
  const imagePropertiesFeatured = {
    smallWidth: 768,
    smallHeight: 512,
    mediumWidth: 768,
    mediumHeight: 512,
    largeWidth: 768,
    largeHeight: 512,
    primaryLogoAlt,
    breakpoints,
    resizerURL,
  };
  const imagePropertiesHero = {
    smallWidth: 768,
    smallHeight: 432,
    mediumWidth: 768,
    mediumHeight: 432,
    largeWidth: 1440,
    largeHeight: 810,
    primaryLogoAlt,
    breakpoints,
    resizerURL,
  };

  const imagePropertiesSquare = {
    smallWidth: 600,
    smallHeight: 450,
    mediumWidth: 600,
    mediumHeight: 450,
    largeWidth: 600,
    largeHeight: 450,
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
      {title != null && (
        <div className="PageList-header articles-slider">
          <svg className="PageList-header-squiggly">
            <use xlinkHref="#squiggly"></use>
          </svg>
          <div className="PageList-header-title-wrap">
            <div className="PageList-header-title">{title}</div>
          </div>
        </div>
      )}
      <Results
        arcSite={arcSite}
        configuredOffset={configuredOffset}
        configuredSize={configuredSize}
        contentConfigValues={contentConfigValues}
        contentService={contentService}
        imageProperties={imageProperties}
        imagePropertiesFeatured={imagePropertiesFeatured}
        imagePropertiesHero={imagePropertiesHero}
        imagePropertiesSquare={imagePropertiesSquare}
        isServerSideLazy={false}
        phrases={phrases}
        showByline={promoElements.showByline}
        showDate={promoElements.showDate}
        showDescription={promoElements.showDescription}
        showHeadline={promoElements.showHeadline}
        showImage={promoElements.showImage}
        showItemOverline={promoElements.showItemOverline}
        targetFallbackImage={targetFallbackImage}
        showFeatured={false}
        listType={listType}
        globalContent={globalContent}
      />
    </div>
  );
};

FeaturedStoriesCivic.label = "Featured Stories – Civic";

FeaturedStoriesCivic.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      label: "Title",
      group: "Configure Content",
    }),
    listType: PropTypes.oneOf([
      "ListG",
      "ListP",
      "ListAP",
      "ListA",
      "ListU",
      "ListZ",
      "ListAH",
      "ListQ",
      "ListQA",
      "ListS",
      "ListT",
    ]).tag({
      defaultValue: "ListG",
      group: "Configure Content",
      label: "Style",
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
  }),
};

export default FeaturedStoriesCivic;
