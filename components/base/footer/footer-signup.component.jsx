import React from "react";
import "./footer-composer.scss";

/**
 * Handles the newsletter signup form using recaptcha and posting to an external
 * endpoint to handle the actual mailchimp API communication.
 */
const FooterSignup = () => {
  return (
    <footer className="Page-footer">
      <div className="Page-footer-container">
        <div className="Page-footer-container-section Page-footer-container-links">
          <div className="Page-footer-container-logo">
            <a aria-label="home page" href="/" data-cms-ai="0">
              <img
                className="PageLogo-image"
                src="https://chalkbeat.brightspotcdn.com/d5/b0/f967e5a84ca58f5e717c9671b6da/vb-logo-2color-light-v2.svg"
                alt="votebeat-national-light"
              />
            </a>
          </div>

          <div className="Page-footer-container-navigation">
            <nav className="FooterNavigation">
              <ul className="FooterNavigation-items" data-column-count="9">
                <li className="FooterNavigation-items-item">
                  <a href="https://www.votebeat.org/pages/about-votebeat" data-cms-ai="0">
                    About Us
                  </a>
                </li>

                <li className="FooterNavigation-items-item">
                  <a href="https://www.votebeat.org/pages/our-staff" data-cms-ai="0">
                    Our Staff
                  </a>
                </li>

                <li className="FooterNavigation-items-item">
                  <a href="https://www.votebeat.org/pages/careers" data-cms-ai="0">
                    Careers at Votebeat
                  </a>
                </li>

                <li className="FooterNavigation-items-item">
                  <a href="https://www.votebeat.org/pages/supporters" data-cms-ai="0">
                    Our Supporters
                  </a>
                </li>

                <li className="FooterNavigation-items-item">
                  <a href="https://www.votebeat.org/pages/contact-us" data-cms-ai="0">
                    Contact Us
                  </a>
                </li>

                <li className="FooterNavigation-items-item">
                  <a href="https://www.votebeat.org/pages/votebeat-media-kit" data-cms-ai="0">
                    Become a Sponsor
                  </a>
                </li>

                <li className="FooterNavigation-items-item">
                  <a
                    href="https://www.votebeat.org/pages/how-to-be-a-source-for-votebeat"
                    data-cms-ai="0"
                  >
                    How to be a Source
                  </a>
                </li>

                <li className="FooterNavigation-items-item">
                  <a href="https://www.votebeat.org/pages/code-of-ethics" data-cms-ai="0">
                    Code of Ethics
                  </a>
                </li>

                <li className="FooterNavigation-items-item">
                  <a href="https://www.votebeat.org/pages/republishing" data-cms-ai="0">
                    Republishing
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="Page-footer-container-navigation">
            <nav className="FooterNavigation">
              <ul className="FooterNavigation-items" data-column-count="5">
                <li className="FooterNavigation-items-item">
                  <a href="https://www.votebeat.org/pages/terms-of-use" data-cms-ai="0">
                    Terms of Use
                  </a>
                </li>

                <li className="FooterNavigation-items-item">
                  <a href="https://www.votebeat.org/pages/privacy-policy" data-cms-ai="0">
                    Privacy Policy
                  </a>
                </li>

                <li className="FooterNavigation-items-item">
                  <a href="https://www.votebeat.org/pages/cookie-policy" data-cms-ai="0">
                    Cookie Policy
                  </a>
                </li>

                <li className="FooterNavigation-items-item">
                  <a href="https://www.votebeat.org/pages/contact-us" data-cms-ai="0">
                    Do not sell my info
                  </a>
                </li>

                <li className="FooterNavigation-items-item">
                  <a
                    href="https://www.civicnews.org"
                    target="_blank"
                    data-cms-ai="0"
                    rel="noreferrer"
                  >
                    A Civic News Company Newsroom
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="Page-footer-container-section Page-footer-container-auth">
          <a href="#" className="Page-header-piano-login-contols-mange-account" data-cms-ai="0">
            Author Login
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSignup;
