import PropTypes from "prop-types";
import React, { useState, useCallback, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

/**
 * Handles the newsletter signup form using recaptcha and posting to an external
 * endpoint to handle the actual mailchimp API communication.
 */
const NewsletterSignup = ({
  newsletterSignupEndpoint,
  website,
  interestIds,
  thankYouMsg,
  validation,
  disclaimer,
}) => {
  const [email, setEmail] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    const token = await executeRecaptcha("newsletter");
    setRecaptchaValue(token);
  }, [executeRecaptcha]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (recaptchaValue === "") {
      setErrorMessage("Captcha failed, please reload and try again");
      return;
    }

    if (typeof validation === "function" && !validation()) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);

    fetch(newsletterSignupEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        website: website,
        interest_ids: interestIds,
        "g-recaptcha-response": recaptchaValue,
      }),
    })
      .then((response) => {
        setIsSubmitting(false);
        if (response.ok) {
          setEmail("");
          setFormSubmitted(true);
        } else {
          setErrorMessage("An error occurred. Please try again later.");
          handleReCaptchaVerify();
        }
      })
      .then(() => {
        setErrorMessage("An error occurred. Please try again later.");
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      {!formSubmitted ? (
        <form onSubmit={handleSubmit}>
          <label className="emailInput-label">
            <span>
              Email <span className="input-required">(required)</span>
            </span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            onChange={handleInputChange}
            required
          />
          <input type="hidden" name="recaptcha" value={recaptchaValue} />
          <p className="small" dangerouslySetInnerHTML={{ __html: disclaimer }}></p>
          <div className="buttonContainer">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Sign Me Up"}
            </button>
          </div>
          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        </form>
      ) : (
        <p>{thankYouMsg}</p>
      )}
    </div>
  );
};

NewsletterSignup.propTypes = {
  newsletterSignupEndpoint: PropTypes.string,
  website: PropTypes.string,
  interestIds: PropTypes.arrayOf(PropTypes.string),
  thankYouMsg: PropTypes.string,
  validation: PropTypes.func,
  disclaimer: PropTypes.string,
};

export default NewsletterSignup;
