/* eslint-disable no-restricted-globals */
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import NewsletterSignup from "../../../base/newsletter/newsletter-signup.component";
import useRenderForBreakpoint from "../../../hooks/use-renderforbreakpoint";
import { deviceRender } from "../../../utilities/customFields";
import { newsletterInterests } from "../../../utilities/newsletters";

/**
 * Handles sticky newsletter with close button
 */
const StickyNewsletterFeature = ({ customFields }) => {
  const context = useFusionContext();
  const { arcSite } = context;
  const { recaptchaSiteKey, newsletterSignupEndpoint } = getProperties(arcSite);
  const {
    title,
    description,
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

  const [closed, setClosed] = useState(
    typeof window !== "undefined" && window.localStorage
      ? localStorage.getItem("newsletterbreaker") === "true"
      : false
  );

  const handleClose = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("newsletterbreaker", "true");
      setClosed(true);
    }
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      <div className={`newsletter-sticky ${!closed ? "sticky" : ""}`}>
        {!closed && (
          <button className="close-button" onClick={handleClose}>
            Close
          </button>
        )}
        <h3>{title}</h3>
        <p>{description}</p>

        <NewsletterSignup
          newsletterSignupEndpoint={newsletterSignupEndpoint}
          website={arcSite}
          interestIds={[
            newsletterInterests.filter((int) => int.slug === newsletter).map((int) => int.id),
          ]}
          thankYouMsg={thankYouMsg}
          disclaimer={disclaimer}
        />
      </div>
    </GoogleReCaptchaProvider>
  );
};

StickyNewsletterFeature.label = "Sticky Newsletter - Civic";

StickyNewsletterFeature.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      label: "Title",
      group: "Configure Content",
    }),
    description: PropTypes.string.tag({
      label: "Description",
      group: "Configure Content",
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

export default StickyNewsletterFeature;
