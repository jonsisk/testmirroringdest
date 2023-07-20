import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import React, { useState, useCallback, useEffect } from "react";
import "./header-composer.scss";

/**
 * Handles the newsletter signup form using recaptcha and posting to an external
 * endpoint to handle the actual mailchimp API communication.
 */

//const context = useFusionContext();
//const { arcSite } = context;
//const { primaryLogo } = getProperties(arcSite);
//const { primaryLogo } = getProperties("default");
const primaryLogo =
  "https://chalkbeat.brightspotcdn.com/d5/b0/f967e5a84ca58f5e717c9671b6da/vb-logo-2color-light-v2.svg";

const HeaderSignup = ({ logoURL }) => {
  return (
    <div className="Page-header" data-nav-alignment="right">
      <div className="Page-header-wrap">
        <div className="Page-header-bar">
          <div className="Page-header-bar-logo">
            <a aria-label="home page" href="/" data-cms-ai="0">
              <img className="PageLogo-image" src={primaryLogo} alt="votebeat-national-light" />
            </a>
          </div>

          <div className="Page-header-navigation-wrapper">
            <div className="Page-header-tagline">
              Nonpartisan local reporting on elections and voting
            </div>
            <div className="Page-header-navigation">
              <nav className="Navigation">
                <ul className="Navigation-items">
                  <li className="Navigation-items-item">
                    <div className="NavigationItem  has-menu">
                      <div className="NavigationItem-text">
                        <span>Communities</span>

                        <div className="NavigationItem-more">
                          <button aria-label="More">
                            <svg className="chevron">
                              <use xlinkHref="#chevron-down"></use>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="NavigationItem-items">
                        <ul>
                          <li className="NavigationItem-items-item">
                            <a
                              className="NavigationLink"
                              href="https://arizona.votebeat.org/"
                              data-cms-ai="0"
                            >
                              Arizona
                            </a>
                          </li>
                          <li className="NavigationItem-items-item">
                            <a
                              className="NavigationLink"
                              href="https://michigan.votebeat.org/"
                              data-cms-ai="0"
                            >
                              Michigan
                            </a>
                          </li>
                          <li className="NavigationItem-items-item">
                            <a
                              className="NavigationLink"
                              href="https://pennsylvania.votebeat.org/"
                              data-cms-ai="0"
                            >
                              Pennsylvania
                            </a>
                          </li>
                          <li className="NavigationItem-items-item">
                            <a
                              className="NavigationLink"
                              href="https://texas.votebeat.org/"
                              data-cms-ai="0"
                            >
                              Texas
                            </a>
                          </li>
                          <li className="NavigationItem-items-item">
                            <a
                              className="NavigationLink"
                              href="https://votebeat.org/"
                              data-cms-ai="0"
                            >
                              National
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li className="Navigation-items-item">
                    <div className="NavigationItem  has-menu">
                      <div className="NavigationItem-text">
                        <span>Topics</span>

                        <div className="NavigationItem-more">
                          <button aria-label="More">
                            <svg className="chevron">
                              <use xlinkHref="#chevron-down"></use>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="NavigationItem-items">
                        <ul>
                          <li className="NavigationItem-items-item">
                            <a
                              className="NavigationLink"
                              href="https://votebeat.org/voting-access"
                              data-cms-ai="0"
                            >
                              Voting Access
                            </a>
                          </li>
                          <li className="NavigationItem-items-item">
                            <a
                              className="NavigationLink"
                              href="https://votebeat.org/election-security"
                              data-cms-ai="0"
                            >
                              Election Security
                            </a>
                          </li>
                          <li className="NavigationItem-items-item">
                            <a
                              className="NavigationLink"
                              href="https://votebeat.org/voting-bills"
                              data-cms-ai="0"
                            >
                              Voting Legislation
                            </a>
                          </li>
                          <li className="NavigationItem-items-item">
                            <a
                              className="NavigationLink"
                              href="https://votebeat.org/election-funding"
                              data-cms-ai="0"
                            >
                              Election Funding
                            </a>
                          </li>
                          <li className="NavigationItem-items-item">
                            <a
                              className="NavigationLink"
                              href="https://votebeat.org/voter-registration"
                              data-cms-ai="0"
                            >
                              Voter Registration
                            </a>
                          </li>
                          <li className="NavigationItem-items-item">
                            <a
                              className="NavigationLink"
                              href="https://votebeat.org/election-misinformation"
                              data-cms-ai="0"
                            >
                              Misinformation
                            </a>
                          </li>
                          <li className="NavigationItem-items-item">
                            <a
                              className="NavigationLink"
                              href="https://votebeat.org/mail-voting"
                              data-cms-ai="0"
                            >
                              Mail Voting
                            </a>
                          </li>
                          <li className="NavigationItem-items-item">
                            <a
                              className="NavigationLink"
                              href="https://votebeat.org/election-laws"
                              data-cms-ai="0"
                            >
                              Election Laws
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li className="Navigation-items-item">
                    <div className="NavigationItem ">
                      <div className="NavigationItem-text">
                        <a href="https://www.votebeat.org/pages/about-votebeat" data-cms-ai="0">
                          About Us
                        </a>
                      </div>
                    </div>
                  </li>

                  <li className="Navigation-items-item" data-morebutton="">
                    <div className="NavigationItem  has-menu">
                      <div className="NavigationItem-text">
                        <span>More</span>

                        <div className="NavigationItem-more">
                          <button aria-label="More">
                            <svg className="chevron">
                              <use xlinkHref="#chevron-down"></use>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="NavigationItem-items">
                        <ul>
                          <li className="NavigationItem-items-item" data-show="false">
                            <div className="NavigationItem  has-menu">
                              <div className="NavigationItem-text">
                                <span>Communities</span>

                                <div className="NavigationItem-more">
                                  <button aria-label="More">
                                    <svg className="chevron">
                                      <use xlinkHref="#chevron-down"></use>
                                    </svg>
                                  </button>
                                </div>
                              </div>

                              <div className="NavigationItem-items">
                                <ul>
                                  <li className="NavigationItem-items-item">
                                    <a
                                      className="NavigationLink"
                                      href="https://arizona.votebeat.org/"
                                      data-cms-ai="0"
                                    >
                                      Arizona
                                    </a>
                                  </li>
                                  <li className="NavigationItem-items-item">
                                    <a
                                      className="NavigationLink"
                                      href="https://michigan.votebeat.org/"
                                      data-cms-ai="0"
                                    >
                                      Michigan
                                    </a>
                                  </li>
                                  <li className="NavigationItem-items-item">
                                    <a
                                      className="NavigationLink"
                                      href="https://pennsylvania.votebeat.org/"
                                      data-cms-ai="0"
                                    >
                                      Pennsylvania
                                    </a>
                                  </li>
                                  <li className="NavigationItem-items-item">
                                    <a
                                      className="NavigationLink"
                                      href="https://texas.votebeat.org/"
                                      data-cms-ai="0"
                                    >
                                      Texas
                                    </a>
                                  </li>
                                  <li className="NavigationItem-items-item">
                                    <a
                                      className="NavigationLink"
                                      href="https://votebeat.org/"
                                      data-cms-ai="0"
                                    >
                                      National
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li className="NavigationItem-items-item" data-show="false">
                            <div className="NavigationItem  has-menu">
                              <div className="NavigationItem-text">
                                <span>Topics</span>

                                <div className="NavigationItem-more">
                                  <button aria-label="More">
                                    <svg className="chevron">
                                      <use xlinkHref="#chevron-down"></use>
                                    </svg>
                                  </button>
                                </div>
                              </div>

                              <div className="NavigationItem-items">
                                <ul>
                                  <li className="NavigationItem-items-item">
                                    <a
                                      className="NavigationLink"
                                      href="https://votebeat.org/voting-access"
                                      data-cms-ai="0"
                                    >
                                      Voting Access
                                    </a>
                                  </li>
                                  <li className="NavigationItem-items-item">
                                    <a
                                      className="NavigationLink"
                                      href="https://votebeat.org/election-security"
                                      data-cms-ai="0"
                                    >
                                      Election Security
                                    </a>
                                  </li>
                                  <li className="NavigationItem-items-item">
                                    <a
                                      className="NavigationLink"
                                      href="https://votebeat.org/voting-bills"
                                      data-cms-ai="0"
                                    >
                                      Voting Legislation
                                    </a>
                                  </li>
                                  <li className="NavigationItem-items-item">
                                    <a
                                      className="NavigationLink"
                                      href="https://votebeat.org/election-funding"
                                      data-cms-ai="0"
                                    >
                                      Election Funding
                                    </a>
                                  </li>
                                  <li className="NavigationItem-items-item">
                                    <a
                                      className="NavigationLink"
                                      href="https://votebeat.org/voter-registration"
                                      data-cms-ai="0"
                                    >
                                      Voter Registration
                                    </a>
                                  </li>
                                  <li className="NavigationItem-items-item">
                                    <a
                                      className="NavigationLink"
                                      href="https://votebeat.org/election-misinformation"
                                      data-cms-ai="0"
                                    >
                                      Misinformation
                                    </a>
                                  </li>
                                  <li className="NavigationItem-items-item">
                                    <a
                                      className="NavigationLink"
                                      href="https://votebeat.org/mail-voting"
                                      data-cms-ai="0"
                                    >
                                      Mail Voting
                                    </a>
                                  </li>
                                  <li className="NavigationItem-items-item">
                                    <a
                                      className="NavigationLink"
                                      href="https://votebeat.org/election-laws"
                                      data-cms-ai="0"
                                    >
                                      Election Laws
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li className="NavigationItem-items-item" data-show="false">
                            <div className="NavigationItem ">
                              <div className="NavigationItem-text">
                                <a
                                  href="https://www.votebeat.org/pages/about-votebeat"
                                  data-cms-ai="0"
                                >
                                  About Us
                                </a>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>

              <button className="SearchOverlay-search-button">
                <svg className="icon-magnify">
                  <use xlinkHref="#icon-magnify"></use>
                </svg>
                <span className="sr-only">Show Search</span>
                <svg className="close-x">
                  <use xlinkHref="#close-x"></use>
                </svg>
              </button>
            </div>
          </div>

          <div className="Page-header-end">
            <a
              href="https://www.votebeat.org/pages/newsletters"
              className="Button newsletter-button"
              data-cms-ai="0"
            >
              Sign Up
            </a>

            <a
              href="https://checkout.fundjournalism.org/memberform?org_id=chalkbeat&amp;campaign=7015A000001PuQv"
              className="Button donate-button"
              data-cms-ai="0"
            >
              Donate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

HeaderSignup.propTypes = {};

export default HeaderSignup;
