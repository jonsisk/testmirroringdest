import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import PropTypes from "prop-types";
import React from "react";
import NewsletterSignup from "../../../base/newsletter/newsletter-signup.component";
import { replaceSiteVariables, getSiteProperties } from "../../../helpers/site.helper";
import useRenderForBreakpoint from "../../../hooks/use-renderforbreakpoint";
import { deviceRender } from "../../../utilities/customFields";
import { newsletterInterests } from "../../../utilities/newsletters";

/**
 * Handles the composer-driven newsletter signup form together with the power-up for newsletters
 * @returns
 */
const NewsletterFeature = ({ customFields }) => {
  const context = useFusionContext();
  const { arcSite, contextPath, deployment, outputType } = context;
  const { newsletterSignupEndpoint, websiteName } = getProperties(arcSite);
  const { websiteName: globalContentWebsite, rightRailNewsletter: globalNewsletter } =
    getSiteProperties(context);
  let {
    fromContext,
    title,
    style,
    description,
    showImage,
    thankYouMsg,
    errorMsg,
    buttonLabel,
    disclaimer,
    newsletter,
    language,
    renderMobile,
    renderTablet,
    renderDesktop,
  } = customFields;

  if (globalNewsletter && fromContext) {
    title = globalNewsletter.title;
    description = globalNewsletter.description;
    newsletter = globalNewsletter.newsletter;
  }

  const { shouldRender } = useRenderForBreakpoint({
    renderMobile,
    renderTablet,
    renderDesktop,
  });

  const selectedNewsletterInterests = newsletterInterests[arcSite]
    .filter((int) => int.slug === newsletter)
    .map((int) => int.id);

  if (!shouldRender || outputType === "amp") {
    return null;
  }

  const replacedDescription = replaceSiteVariables(
    description,
    globalContentWebsite || websiteName
  );

  return (
    <div className={`newsletter-breaker-wrapper ${style}`}>
      <div className="newsletter-feature">
        <div className="info">
          {showImage && style === "vertical" && (
            <img
              src={deployment(`${contextPath}/resources/images/votebeat/icon-news.svg`)}
              alt={replacedDescription}
            />
          )}
          <h3>{title}</h3>
          <p>{replacedDescription}</p>
        </div>
        <NewsletterSignup
          newsletterSignupEndpoint={newsletterSignupEndpoint}
          layout={style}
          website={arcSite}
          interestIds={selectedNewsletterInterests}
          thankYouMsg={thankYouMsg}
          errorMsg={errorMsg}
          buttonLabel={buttonLabel}
          disclaimer={disclaimer}
          locale={language}
        />
      </div>
    </div>
  );
};

NewsletterFeature.label = "Newsletter Signup - Civic";

NewsletterFeature.propTypes = {
  customFields: PropTypes.shape({
    fromContext: PropTypes.bool.tag({
      label: "Take newsletter from active bureau",
      defaultValue: false,
      description:
        "If set to true, it will ignore title, description and newsletter fields. Instead it will take the infomation set on the bureau section.",
      group: "Configure Content",
    }),
    style: PropTypes.oneOf(["vertical", "horizontal"]).tag({
      defaultValue: "horizontal",
      label: "Style (Vertical/Horizontal)",
      group: "Configure Content",
    }),
    title: PropTypes.string.tag({
      label: "Title",
      group: "Configure Content",
    }),
    description: PropTypes.string.tag({
      label: "Description",
      group: "Configure Content",
    }),
    showImage: PropTypes.bool.tag({
      label: "Show image",
      group: "Configure Content",
      default: false,
      description: "Only displayed when style is 'vertical'",
    }),
    thankYouMsg: PropTypes.string.tag({
      label: "Thank you message",
      group: "Configure Content",
      description: "Shown after the user submits the form.",
    }),
    errorMsg: PropTypes.string.tag({
      label: "Error message",
      group: "Configure Content",
      description: "Shown in case of error",
    }),
    buttonLabel: PropTypes.string.tag({
      label: "Submit button label",
      default: "Sign Me Up",
      group: "Configure Content",
    }),
    disclaimer: PropTypes.richtext.tag({
      label: "Disclaimer (HTML)",
      group: "Configure Content",
      description: "Shown below the form. Accepts HTML.",
    }),
    language: PropTypes.oneOf(["en", "es"]).tag({
      defaultValue: "en",
      label: "Language",
      group: "Configure Content",
    }),
    newsletter: PropTypes.oneOf(
      [].concat(...Object.values(newsletterInterests).map((list) => list.map((item) => item.slug)))
    ).tag({
      defaultValue: "votebeat-national",
      label: "Newsletter",
      group: "Configure Content",
    }),
    ...deviceRender,
  }),
};

export default NewsletterFeature;
