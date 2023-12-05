import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getThemeStyle from "fusion:themes";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import {
  Image,
  // presentational component does not do data fetching
  LazyLoad,
  isServerSide,
  formatCredits,
  MediaItem,
  Conditional,
  Link,
} from "@wpmedia/arc-themes-components";
import Header from "./_children/heading";
import HTML from "./_children/html";
import List from "./_children/list";
import Oembed from "./_children/oembed";
import Quote from "./_children/quote";
import Table from "./_children/table";
import NewsletterComposer from "../../base/newsletter/newsletter-composer.component";
import SidebarComposer from "../../base/sidebar/sidebar-composer.component";
import PymEmbedComposer from "../../base/pymembed/pymembed.composer";
import NewGallery from "../../base/newgallery/default";
import { isSponsoredArticle } from "../../helpers/article.helper";
import getResizeParamsFromANSImage from "./shared/get-resize-params-from-ans-image";

const StyledText = styled.p`
  a {
    color: ${(props) => props.primaryColor};
  }
`;

const StyledLink = styled.a`
  border-bottom: 1px solid ${(props) => props.primaryColor};
  color: ${(props) => props.primaryColor};
`;

function parseArticleItem(item, index, arcSite, phrases, id, customFields) {
  const { _id: key = index, type, content } = item;

  const {
    hideImageTitle = false,
    hideImageCaption = false,
    hideImageCredits = false,
    hideGalleryTitle = false,
    hideGalleryCaption = false,
    hideGalleryCredits = false,
    hideVideoTitle = false,
    hideVideoCaption = false,
    hideVideoCredits = false,
  } = customFields;

  // TODO: Split each type into a separate reusable component
  switch (type) {
    case "text": {
      return content && content.length > 0 ? (
        <StyledText
          primaryColor={getThemeStyle(arcSite)["primary-color"]}
          className="body-paragraph"
          key={key}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : null;
    }
    case "divider": {
      return (
        <Fragment key={key}>
          <div className="divider">
            <hr />
          </div>
        </Fragment>
      );
    }
    case "image": {
      const {
        additional_properties: { link = "" } = {},
        // alignment not always present
        alignment = "",
        alt_text: altText,
        caption,
        credits,
        subtitle,
        url,
        vanity_credits: vanityCredits,
      } = item;

      // only left and right float supported
      const allowedFloatValue = alignment === "left" || alignment === "right" ? alignment : "";
      let figureImageClassName = "article-body-image-container";

      if (allowedFloatValue) {
        // add space after initial string ' '
        figureImageClassName +=
          allowedFloatValue === "left"
            ? " article-body-image-container--mobile-left-float"
            : " article-body-image-container--mobile-right-float";
      }

      if (url) {
        const formattedCredits = formatCredits(vanityCredits || credits);
        return (
          <MediaItem
            key={`${type}_${index}_${key}`}
            className={figureImageClassName}
            caption={!hideImageCaption ? caption : null}
            credit={!hideImageCredits ? formattedCredits : null}
            title={!hideImageTitle ? subtitle : null}
          >
            <Conditional component={Link} condition={link} href={link}>
              <Image
                {...getResizeParamsFromANSImage(
                  item,
                  arcSite,
                  allowedFloatValue ? 400 : 800,
                  [274, 400, 768, 1024, 1440].map((w) => (allowedFloatValue ? w / 2 : w))
                )}
                alt={altText}
              />
            </Conditional>
          </MediaItem>
        );
      }
      return null;
    }

    case "interstitial_link": {
      const { url } = item;
      // link string will have to be truthy (non-zero length string) to render below
      if (!(url && content)) return null;
      const beforeContent = "[&nbsp;";
      const afterContent = "&nbsp;]";

      return (
        <Fragment key={key}>
          <p className="interstitial-link block-margin-bottom">
            <span dangerouslySetInnerHTML={{ __html: beforeContent }} />
            <StyledLink
              href={url}
              aria-label={phrases.t("article-body-block.interstitial-link-aria-label")}
              dangerouslySetInnerHTML={{ __html: content }}
              primaryColor={getThemeStyle(arcSite)["primary-color"]}
            />
            <span dangerouslySetInnerHTML={{ __html: afterContent }} />
          </p>
        </Fragment>
      );
    }

    case "raw_html": {
      return content && content.length > 0 ? (
        <HTML
          key={key}
          id={key}
          content={content}
          primaryColor={getThemeStyle(arcSite)["primary-color"]}
        />
      ) : null;
    }

    case "list": {
      const { list_type: listType, items: listItems } = item;
      // eslint-disable-next-line arrow-body-style
      return listItems && listItems.length > 0 ? (
        <Fragment key={key}>
          <List
            listType={listType}
            listItems={listItems}
            primaryColor={getThemeStyle(arcSite)["primary-color"]}
          />
        </Fragment>
      ) : null;
    }

    case "correction": {
      // can either be clarification or correction
      const { correction_type: labelType } = item;
      const labelText =
        labelType === "clarification"
          ? phrases.t("article-body-block.clarification")
          : phrases.t("article-body-block.correction");

      return item.text && item.text.length > 0 ? (
        <Fragment key={key}>
          <section className="correction">
            <h2 className="h6-primary">{labelText}</h2>
            <p>{item.text}</p>
          </section>
        </Fragment>
      ) : null;
    }

    case "header":
      return item.content && item.content.length > 0 ? (
        <Header key={key} element={item} primaryColor={getThemeStyle(arcSite)["primary-color"]} />
      ) : null;

    case "oembed_response": {
      return item.raw_oembed ? <Oembed key={key} element={item} /> : null;
    }

    case "table": {
      return item.rows ? <Table key={key} element={item} /> : null;
    }

    case "quote":
      switch (item.subtype) {
        case "pullquote":
          return <Quote key={key} element={item} className="pullquote" />;

        case "blockquote":
        default:
          return <Quote key={key} element={item} />;
      }
    case "video":
      return (
        <section key={key} className="block-margin-bottom">
          {/* <VideoPlayerPresentational
            id={id}
            embedMarkup={item.embed_html}
            shrinkToFit={customFields?.shrinkToFit}
            viewportPercentage={customFields?.viewportPercentage}
            displayTitle={!hideVideoTitle}
            displayCaption={!hideVideoCaption}
            displayCredits={!hideVideoCredits}
            subtitle={item?.headlines?.basic}
            caption={item?.description?.basic}
            credits={item.credits}
          /> */}
        </section>
      );
    case "gallery":
      return (
        <div key={key} className="block-margin-bottom gallery content-slider">
          <NewGallery
            galleryElements={item.content_elements}
            resizerURL={getProperties(arcSite)?.resizerURL}
          />
        </div>
      );
    case "custom_embed":
      switch (item.subtype) {
        case "sidebar":
          return <SidebarComposer key={key} alignment={item.alignment} embed={item.embed} />;
        case "newsletter":
          return <NewsletterComposer key={key} embed={item.embed} />;
        case "pymembed":
          return <PymEmbedComposer key={key} embed={item.embed} />;
        default:
          return null;
      }

    default:
      return null;
  }
}

const ArticleBodyCivic = styled.article`
  font-family: ${(props) => props.secondaryFont};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  figcaption,
  table {
    font-family: ${(props) => props.primaryFont};
  }

  .body-paragraph,
  .interstitial-link,
  ol,
  ul,
  blockquote p,
  blockquote {
    font-family: ${(props) => props.secondaryFont};
  }
`;

export const ArticleBodyChainCivicPresentation = ({ children, customFields = {}, context }) => {
  const { globalContent: items = {}, arcSite, id, deployment, contextPath } = context;

  const primary_section = items?.taxonomy?.primary_section;

  const { content_elements: contentElements = [], copyright, location } = items;
  const { elementPlacement: adPlacementConfigObj = {} } = customFields;
  const { locale = "en" } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const isSponsored = isSponsoredArticle(items);

  const adPlacements = isSponsored
    ? []
    : Object.keys(adPlacementConfigObj).map((key) => ({
        feature: +key,
        paragraph: +adPlacementConfigObj[key],
      }));

  const paragraphTotal = contentElements.filter((element) => element.type === "text").length;

  let paragraphCounter = 0;
  const articleBody = [
    ...(primary_section?.additional_properties?.original?.sidebar?.sidebar_logo
      ? [
          <div
            key={primary_section?.additional_properties?.original?.sidebar?.sidebar_logo}
            class="Page-articleBody-TagData"
          >
            <div class="Page-articleBody-TagData-title">
              <a class="Link" href={`${primary_section?._id}/`}>
                <img
                  src={
                    primary_section?.additional_properties?.original?.sidebar?.sidebar_logo?.startsWith(
                      "/"
                    )
                      ? deployment(
                          `${contextPath}/resources/images${primary_section?.additional_properties?.original?.sidebar?.sidebar_logo}`
                        )
                      : primary_section?.additional_properties?.original?.sidebar?.sidebar_logo
                  }
                  width="300"
                  height="68"
                />
              </a>
            </div>
            <div
              class="Page-articleBody-TagData-description"
              dangerouslySetInnerHTML={{
                __html: primary_section?.additional_properties?.original?.sidebar?.sidebar_text,
              }}
            ></div>
          </div>,
        ]
      : []),
    ...contentElements.map((contentElement, index) => {
      if (contentElement.type === "text") {
        // Start at 1 since the ad configs use one-based array indexes
        paragraphCounter += 1;

        const adsAfterParagraph = adPlacements.filter(
          (placement) => placement.paragraph === paragraphCounter
        );

        if (
          paragraphCounter === 1 &&
          location &&
          contentElement.content.indexOf(`${location} &mdash;`) !== 0
        ) {
          // eslint-disable-next-line no-param-reassign
          contentElement.content = `${location} &mdash; ${contentElement.content}`;
        }

        // The ad features should follow the content element if they exist, but not if
        // the current paragraph is the last or second-to-last paragraph.
        if (adsAfterParagraph.length && paragraphCounter < paragraphTotal - 1) {
          return [
            parseArticleItem(contentElement, index, arcSite, phrases, id, customFields),
            ...adsAfterParagraph.map((placement) => children[placement.feature - 1]),
          ];
        }
      }

      return parseArticleItem(contentElement, index, arcSite, phrases, id, customFields);
    }),
    ...(copyright
      ? [
          parseArticleItem(
            {
              type: "copyright",
              content: copyright,
            },
            "copyright-text",
            arcSite,
            null, // phrases not used by text type
            null, // id not used by text type
            {} // customFields only used in video
          ),
        ]
      : []),
  ];

  return (
    <ArticleBodyCivic
      className="article-body-wrapper"
      primaryFont={getThemeStyle(arcSite)["primary-font-family"]}
      secondaryFont={getThemeStyle(arcSite)["secondary-font-family"]}
    >
      {articleBody}
    </ArticleBodyCivic>
  );
};

const ArticleBodyChainCivic = ({ children, customFields = {} }) => {
  const context = useFusionContext();
  const { isAdmin } = context;
  if (customFields?.lazyLoad && isServerSide() && !isAdmin) {
    // On Server
    return null;
  }
  return (
    <LazyLoad enabled={customFields?.lazyLoad && !isAdmin}>
      <ArticleBodyChainCivicPresentation context={context} customFields={customFields}>
        {children}
      </ArticleBodyChainCivicPresentation>
    </LazyLoad>
  );
};

ArticleBodyChainCivic.propTypes = {
  customFields: PropTypes.shape({
    elementPlacement: PropTypes.kvp.tag({
      label: "Ad placements",
      group: "Inline ads",
      description:
        "Places your inline article body ads in the article body chain. For each ad feature in the chain, fill in two values below: Field 1) The position of the ad within the chain and Field 2) the paragraph number that this ad should follow in the article body. For example, entering 1 and 3 would mean that the first ad in the article body chain will be placed after the third paragraph in the article.",
    }),
    lazyLoad: PropTypes.bool.tag({
      name: "Lazy Load block?",
      defaultValue: false,
      description:
        "Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
    }),
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
    hideGalleryTitle: PropTypes.bool.tag({
      description: "This display option applies to all Galleries in the Article Body",
      label: "Hide Title",
      defaultValue: false,
      group: "Gallery Display Options",
    }),
    hideGalleryCaption: PropTypes.bool.tag({
      description: "This display option applies to all Galleries in the Article Body",
      label: "Hide Caption",
      defaultValue: false,
      group: "Gallery Display Options",
    }),
    hideGalleryCredits: PropTypes.bool.tag({
      description: "This display option applies to all Galleries in the Article Body",
      label: "Hide Credits",
      defaultValue: false,
      group: "Gallery Display Options",
    }),
    hideVideoTitle: PropTypes.bool.tag({
      description: "This display option applies to all Videos in the Article Body",
      label: "Hide Title",
      defaultValue: false,
      group: "Video Display Options",
    }),
    hideVideoCaption: PropTypes.bool.tag({
      description: "This display option applies to all Videos in the Article Body",
      label: "Hide Caption",
      defaultValue: false,
      group: "Video Display Options",
    }),
    hideVideoCredits: PropTypes.bool.tag({
      description: "This display option applies to all Videos in the Article Body",
      label: "Hide Credits",
      defaultValue: false,
      group: "Video Display Options",
    }),
  }),
};

ArticleBodyChainCivic.label = "Article Body Civic";

ArticleBodyChainCivic.icon = "arc-article";

export default ArticleBodyChainCivic;
