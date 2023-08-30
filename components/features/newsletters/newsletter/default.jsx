import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import PropTypes from "prop-types";
import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import NewsletterSignup from "../../../base/newsletter/newsletter-signup.component";
import useRenderForBreakpoint from "../../../hooks/use-renderforbreakpoint";
import { deviceRender } from "../../../utilities/customFields";
import { newsletterInterests } from "../../../utilities/newsletters";

/**
 * Handles the composer-driven newsletter signup form together with the power-up for newsletters
 * @returns
 */
const NewsletterFeature = ({ customFields }) => {
  const { arcSite, contextPath, deployment, outputType } = useFusionContext();
  const { recaptchaSiteKey, newsletterSignupEndpoint } = getProperties(arcSite);
  const {
    title,
    style,
    description,
    showImage,
    thankYouMsg,
    disclaimer,
    newsletter,
    renderMobile,
    renderTablet,
    renderDesktop,
  } = customFields;

  const { shouldRender } = useRenderForBreakpoint({
    renderMobile,
    renderTablet,
    renderDesktop,
  });

  const selectedNewsletterInterests = newsletterInterests
    .filter((int) => int.slug === newsletter)
    .map((int) => int.id);

  if (!shouldRender || outputType === "amp") {
    return null;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      <div className={`newsletter-breaker-wrapper ${style}`}>
        <div className="newsletter-feature">
          <div className="info">
            {showImage && style === "vertical" && (
              <img
                src={deployment(`${contextPath}/resources/images/votebeat/icon-news.svg`)}
                alt={description}
              />
            )}
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          <NewsletterSignup
            newsletterSignupEndpoint={newsletterSignupEndpoint}
            layout={style}
            website={arcSite}
            interestIds={selectedNewsletterInterests}
            thankYouMsg={thankYouMsg}
            disclaimer={disclaimer}
          />
        </div>
      </div>
    </GoogleReCaptchaProvider>
  );
};

NewsletterFeature.label = "Newsletter Signup - Civic";

NewsletterFeature.propTypes = {
  customFields: PropTypes.shape({
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
    disclaimer: PropTypes.richtext.tag({
      label: "Disclaimer (HTML)",
      group: "Configure Content",
      description: "Shown below the form. Accepts HTML.",
    }),
    newsletter: PropTypes.oneOf([
      "votebeat-national",
      "votebeat-arizona",
      "votebeat-michigan",
      "votebeat-pennsylvania",
      "votebeat-texas",
    ]).tag({
      defaultValue: "votebeat-national",
      label: "Newsletter",
      group: "Configure Content",
    }),
    ...deviceRender,
  }),
};

export default NewsletterFeature;
