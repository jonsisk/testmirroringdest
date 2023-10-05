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
  errorMsg,
  buttonLabel,
  validation,
  disclaimer,
  layout = "standard",
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

  const handleSubmit = async (event) => {
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

    let response = await fetch(newsletterSignupEndpoint, {
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
    });

    setIsSubmitting(false);

    if (response.ok) {
      setEmail("");
      setFormSubmitted(true);
    } else {
      const responseText = await response.text();
      const alreadyMember = responseText?.includes("already a list member");
      setErrorMessage(
        alreadyMember
          ? "You're already subscribed to this newsletter."
          : errorMsg || "An error occurred. Please try again later."
      );
      handleReCaptchaVerify();
    }
  };

  return (
    <div>
      {!formSubmitted ? (
        <form onSubmit={handleSubmit}>
          <label className="emailInput-label">
            <span>
              Email{" "}
              <span className="input-required">{layout === "horizontal" ? "*" : "(required)"}</span>
            </span>
            {layout === "horizontal" && (
              <span className="TextInput-Newsletter-wrap">
                <input type="email" name="email" onChange={handleInputChange} required />
                <button type="submit" className="buttonContainer" disabled={isSubmitting}>
                  {buttonLabel || "Submit"}
                </button>
              </span>
            )}
          </label>
          {layout !== "horizontal" && (
            <input type="email" name="email" onChange={handleInputChange} required />
          )}
          <input type="hidden" name="recaptcha" value={recaptchaValue} />

          {layout == "vertical" && (
            <>
              <p className="small" dangerouslySetInnerHTML={{ __html: disclaimer }}></p>
              <div className="buttonContainer">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : buttonLabel || "Sign Me Up"}
                </button>
              </div>
            </>
          )}
          {layout == "sticky" && (
            <>
              <div className="buttonContainer">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : buttonLabel || "Sign Me Up"}
                </button>
              </div>
              <p className="small" dangerouslySetInnerHTML={{ __html: disclaimer }}></p>
            </>
          )}
          {layout == "horizontal" && (
            <>
              <p className="small" dangerouslySetInnerHTML={{ __html: disclaimer }}></p>
            </>
          )}
          {layout == "powerup" && (
            <>
              <div className="buttonContainer">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : buttonLabel || "Sign Me Up"}
                </button>
              </div>
            </>
          )}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        </form>
      ) : (
        <p className="thankYouMsgNews">{thankYouMsg}</p>
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
