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
import "./styles.scss";

/**
 * Handles newsletter signup with interest selection.
 * Takes the interests from the environment properties.
 */
const NewsletterInterestFeature = ({ customFields }) => {
  const context = useFusionContext();
  const { arcSite } = context;
  const { recaptchaSiteKey, newsletterSignupEndpoint } = getProperties(arcSite);
  const [selectedValues, setSelectedValues] = useState([]);
  const { title, description, thankYouMsg, disclaimer, renderMobile, renderTablet, renderDesktop } =
    customFields;

  const { shouldRender } = useRenderForBreakpoint({
    renderMobile,
    renderTablet,
    renderDesktop,
  });

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    }
  };

  const validateSelection = () => {
    return selectedValues.length > 0;
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      <div className={`newsletter-interests`}>
        <h3>{title}</h3>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <div className="interests">
          {newsletterInterests.map((interest) => (
            <div className="interest" key={interest.slug}>
              <label>
                <input
                  type="checkbox"
                  name="interest_id"
                  value={interest.id}
                  checked={selectedValues.includes(interest.id)}
                  onChange={handleCheckboxChange}
                />
                <span className="title">{interest.title}</span>
                <span className="description">
                  {interest.description}
                  <br />
                  <i>{interest.frequency}</i>
                </span>
              </label>
            </div>
          ))}
        </div>

        <NewsletterSignup
          newsletterSignupEndpoint={newsletterSignupEndpoint}
          website={arcSite}
          interestIds={selectedValues}
          thankYouMsg={thankYouMsg}
          validation={validateSelection}
          disclaimer={disclaimer}
        />
      </div>
    </GoogleReCaptchaProvider>
  );
};

NewsletterInterestFeature.label = "Newsletter Interests - Civic";

NewsletterInterestFeature.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      label: "Title",
      group: "Configure Content",
    }),
    description: PropTypes.richtext.tag({
      label: "Description (HTML)",
      group: "Configure Content",
      description: "Shown above the newsletter selection. Accepts HTML.",
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
    ...deviceRender,
  }),
};

export default NewsletterInterestFeature;
