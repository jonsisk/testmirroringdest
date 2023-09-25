import React, { useState } from "react";
import { useBrowserGlobals } from "../../hooks/use-browserglobals";

/**
 * Header component
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
  logoHref,
}) => {
  const global = useBrowserGlobals();
  const [showCommunityPanel, setShowCommunityPanel] = useState(false);
  const [showTopicPanel, setShowTopicPanel] = useState(false);
  const [showMorePanel, setShowMorePanel] = useState(false);
  const [showSubTopicPanel, setShowSubTopicPanel] = useState(false);
  const menuDelay = 300;

  const querylySearchClick = () => {
    const event = new Event("change");
    global.document.getElementById("queryly_toggle").checked = true;
    global.document.getElementById("queryly_toggle").dispatchEvent(event);
  };

  const handleMouseEnterCommunity = () => {
    setTimeout(() => {
      setShowCommunityPanel(true);
      setShowTopicPanel(false);
      setShowMorePanel(false);
      setShowSubTopicPanel(false);
    }, menuDelay);
  };

  const handleMouseLeaveCommunity = () => {
    setShowCommunityPanel(false);
  };

  const handleMouseEnterTopics = () => {
    setTimeout(() => {
      setShowTopicPanel(true);
      setShowCommunityPanel(false);
    }, menuDelay);
  };

  const handleMouseLeaveTopics = () => {
    setShowTopicPanel(false);
  };

  const handleClickMore = () => {
    setShowMorePanel(!showMorePanel);
    setShowCommunityPanel(false);
  };

  const handleClickSubTopics = () => {
    setShowSubTopicPanel(!showSubTopicPanel);
  };

  return (
    <div className="Page-header" data-nav-alignment="right">
      <div className="Page-header-wrap">
        <div className="Page-header-bar">
          <div className="Page-header-bar-logo">
            <a aria-label="home page" href={logoHref} data-cms-ai="0">
              <img className="PageLogo-image" src={logoURL} alt={logoAlt} />
            </a>
          </div>

          <div className="Page-header-navigation-wrapper">
            <div className="Page-header-tagline">{tagline}</div>
            <div className="Page-header-navigation">
              <nav className="Navigation">
                <ul className="Navigation-items">
                  <li
                    className="Navigation-items-item"
                    onMouseEnter={handleMouseEnterCommunity}
                    onMouseLeave={handleMouseLeaveCommunity}
                  >
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

                      <div
                        className="NavigationItem-items"
                        style={{ display: showCommunityPanel ? "block" : "none" }}
                      >
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

                  <li
                    className="Navigation-items-item item-topics"
                    onMouseEnter={handleMouseEnterTopics}
                    onMouseLeave={handleMouseLeaveTopics}
                  >
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

                      <div
                        className="NavigationItem-items"
                        style={{ display: showTopicPanel ? "block" : "none" }}
                      >
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

                  <li className="Navigation-items-item item-about">
                    <div className="NavigationItem ">
                      <div className="NavigationItem-text">
                        <a href={aboutUsUrl}>{aboutUsCopy}</a>
                      </div>
                    </div>
                  </li>

                  <li id="item-more" className="Navigation-items-item item-more">
                    <div className="NavigationItem has-menu">
                      <div className="NavigationItem-text" onClick={handleClickMore}>
                        <span>More</span>
                        <div className="NavigationItem-more">
                          <button aria-label="More">
                            <svg className="chevron">
                              <use xlinkHref="#chevron-down"></use>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div
                        className="NavigationItem-items"
                        style={{ display: showMorePanel ? "block" : "none" }}
                      >
                        <ul>
                          <li className="NavigationItem-items-item" data-show="false">
                            <div className="NavigationItem  has-menu">
                              <div className="NavigationItem-text" onClick={handleClickSubTopics}>
                                <span>{topicsTitle}</span>

                                <div className="NavigationItem-more">
                                  <button aria-label="More">
                                    <svg className="chevron">
                                      <use xlinkHref="#chevron-down"></use>
                                    </svg>
                                  </button>
                                </div>
                              </div>

                              <div
                                className="NavigationItem-items"
                                style={{ display: showSubTopicPanel ? "block" : "none" }}
                              >
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

              <button onClick={querylySearchClick} className="SearchOverlay-search-button">
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
            <a href="/newsletters/" className="Button newsletter-button" data-cms-ai="0">
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
      <div className="hidden">
        <svg viewBox="373.3 133.3 533.3 533.3" id="icon-magnify" xmlns="http://www.w3.org/2000/svg">
          <path d="M754.7 468.7l-22.3-22.3c24.3-33.3 37.5-73.4 37.7-114.7 0-109.5-88.8-198.3-198.3-198.3s-198.3 88.8-198.3 198.3S462.1 530 571.7 530c41.2-.2 81.3-13.4 114.7-37.7l22.3 22.3 152.7 152 45.3-45.3-152-152.6zm-183 0c-75.8 0-137.3-61.5-137.3-137.3S495.8 194 571.7 194 709 255.5 709 331.3c.2 75.7-61 137.1-136.7 137.3-.2.1-.4.1-.6.1z"></path>
        </svg>
      </div>
    </div>
  );
};

HeaderSignup.propTypes = {};

export default HeaderSignup;
