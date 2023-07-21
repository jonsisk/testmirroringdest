import React from "react";
import "./header-composer.scss";

/**
 * Handles the newsletter signup form using recaptcha and posting to an external
 * endpoint to handle the actual mailchimp API communication.
 */
const HeaderSignup = ({
  tagline,
  logoURL,
  logoAlt,
  communityNavigation,
  topicNavigation,
  aboutUsUrl,
  aboutUsCopy,
  communitiesTitle,
  topicsTitle,
}) => {
  return (
    <div className="Page-header" data-nav-alignment="right">
      <div className="Page-header-wrap">
        <div className="Page-header-bar">
          <div className="Page-header-bar-logo">
            <a aria-label="home page" href="/" data-cms-ai="0">
              <img className="PageLogo-image" src={logoURL} alt={logoAlt} />
            </a>
          </div>

          <div className="Page-header-navigation-wrapper">
            <div className="Page-header-tagline">{tagline}</div>
            <div className="Page-header-navigation">
              <nav className="Navigation">
                <ul className="Navigation-items">
                  <li className="Navigation-items-item">
                    <div className="NavigationItem  has-menu">
                      <div className="NavigationItem-text">
                        <span>{communitiesTitle}</span>

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
                          {communityNavigation &&
                            communityNavigation.children.map((item) => (
                              <li key={item._id} className="NavigationItem-items-item">
                                <a className="NavigationLink" href={item.url}>
                                  {item.display_name}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li className="Navigation-items-item">
                    <div className="NavigationItem  has-menu">
                      <div className="NavigationItem-text">
                        <span>{topicsTitle}</span>

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
                          {topicNavigation &&
                            topicNavigation.children.map((item) => (
                              <li key={item._id} className="NavigationItem-items-item">
                                <a className="NavigationLink" href={item._id}>
                                  {item.name}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li className="Navigation-items-item">
                    <div className="NavigationItem ">
                      <div className="NavigationItem-text">
                        <a href={aboutUsUrl}>{aboutUsCopy}</a>
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
                                <span>{communitiesTitle}</span>

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
                                  {communityNavigation &&
                                    communityNavigation.children.map((item) => (
                                      <li key={item._id} className="NavigationItem-items-item">
                                        <a className="NavigationLink" href={item.url}>
                                          {item.display_name}
                                        </a>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li className="NavigationItem-items-item" data-show="false">
                            <div className="NavigationItem  has-menu">
                              <div className="NavigationItem-text">
                                <span>{topicsTitle}</span>

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
                                  {topicNavigation &&
                                    topicNavigation.children.map((item) => (
                                      <li key={item._id} className="NavigationItem-items-item">
                                        <a className="NavigationLink" href={item._id}>
                                          {item.name}
                                        </a>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li className="NavigationItem-items-item" data-show="false">
                            <div className="NavigationItem ">
                              <div className="NavigationItem-text">
                                <a href={aboutUsUrl}>{aboutUsCopy}</a>
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
            <a href="/pages/newsletters" className="Button newsletter-button" data-cms-ai="0">
              Sign Up
            </a>

            <a
              href="https://checkout.fundjournalism.org/memberform?org_id=chalkbeat&campaign=7015A000001PuQv"
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
