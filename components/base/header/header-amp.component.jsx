/* eslint-disable react/no-unknown-property */
import React from "react";

/**
 * AMP Header version
 */
const HeaderAMP = ({
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
    <>
      <amp-sidebar
        id="Page-header-hamburger-menu"
        class="Page-header-hamburger-menu i-amphtml-element i-amphtml-layout-nodisplay i-amphtml-overlay i-amphtml-scrollable i-amphtml-built i-amphtml-layout"
        layout="nodisplay"
        side="left"
        i-amphtml-layout="nodisplay"
        role="menu"
        tabindex="-1"
        hidden=""
      >
        <button on="tap:Page-header-hamburger-menu.toggle" className="close-x">
          ×
        </button>
        <div className="Page-header-hamburger-menu-wrapper">
          <div className="Page-header-hamburger-menu-content">
            <nav className="Navigation">
              <ul className="Navigation-items">
                <li className="Navigation-items-item">
                  <amp-accordion
                    class="NavigationItem i-amphtml-element i-amphtml-layout-container i-amphtml-built i-amphtml-layout"
                    i-amphtml-layout="container"
                  >
                    <section>
                      <header
                        className="NavigationItem-text i-amphtml-accordion-header"
                        id="94_AMP_header_0"
                        role="button"
                        aria-controls="94_AMP_content_0"
                        aria-expanded="false"
                        tabIndex="0"
                      >
                        <span>{communitiesTitle}</span>

                        <span className="NavigationItem-more-carat open">▾</span>
                        <span className="NavigationItem-more-carat closed">▸</span>
                      </header>

                      <ul
                        className="NavigationItem-items i-amphtml-accordion-content"
                        id="94_AMP_content_0"
                        aria-labelledby="94_AMP_header_0"
                        role="region"
                      >
                        {communityNavigation &&
                          communityNavigation.children.map((item) => (
                            <li key={item._id} className="NavigationItem-items-item">
                              <a className="NavigationLink" href={item.url}>
                                {item.display_name}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </section>
                  </amp-accordion>
                </li>

                <li className="Navigation-items-item">
                  <amp-accordion
                    class="NavigationItem i-amphtml-element i-amphtml-layout-container i-amphtml-built i-amphtml-layout"
                    i-amphtml-layout="container"
                  >
                    <section>
                      <header
                        className="NavigationItem-text i-amphtml-accordion-header"
                        id="20_AMP_header_0"
                        role="button"
                        aria-controls="20_AMP_content_0"
                        aria-expanded="false"
                        tabIndex="0"
                      >
                        <span>{topicsTitle}</span>

                        <span className="NavigationItem-more-carat open">▾</span>
                        <span className="NavigationItem-more-carat closed">▸</span>
                      </header>

                      <ul
                        className="NavigationItem-items i-amphtml-accordion-content"
                        id="20_AMP_content_0"
                        aria-labelledby="20_AMP_header_0"
                        role="region"
                      >
                        {topicNavigation &&
                          topicNavigation.children.map((item) => (
                            <li key={item._id} className="NavigationItem-items-item">
                              <a className="NavigationLink" href={`${item._id}/`}>
                                {item.name}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </section>
                  </amp-accordion>
                </li>

                <li className="Navigation-items-item">
                  <div className="NavigationItem">
                    <div className="NavigationItem-text">
                      <a href={aboutUsUrl}>{aboutUsCopy}</a>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <button className="i-amphtml-screen-reader" tabIndex="-1">
          Close the sidebar
        </button>
      </amp-sidebar>
      <div className="Page-header-bar">
        <button
          className="Page-header-menu-trigger"
          on="tap:Page-header-hamburger-menu.toggle"
          aria-expanded="false"
          tabIndex="1"
        >
          <svg className="burger-menu">
            <use xlinkHref="#burger-menu"></use>
          </svg>
          <span className="label">Menu</span>
        </button>

        <div className="Page-header-bar-logo">
          <a aria-label="home page" href="/" data-cms-ai="0">
            <amp-img
              class="PageLogo-image i-amphtml-element i-amphtml-layout-intrinsic i-amphtml-layout-size-defined i-amphtml-built i-amphtml-layout"
              alt={logoAlt}
              src={logoURL}
              width="120"
              height="23"
              layout="intrinsic"
              i-amphtml-layout="intrinsic"
            >
              <i-amphtml-sizer class="i-amphtml-sizer" slot="i-amphtml-svc">
                <img
                  alt=""
                  role="presentation"
                  aria-hidden="true"
                  className="i-amphtml-intrinsic-sizer"
                  src='data:image/svg+xml;charset=utf-8,<svg height="23px" width="120px" xmlns="http://www.w3.org/2000/svg" version="1.1"/>'
                />
              </i-amphtml-sizer>
              <img
                decoding="async"
                alt={logoAlt}
                src={logoURL}
                className="i-amphtml-fill-content i-amphtml-replaced-content"
              />
            </amp-img>
          </a>
        </div>

        <div className="Page-header-end">
          <button
            className="SearchOverlay-Amp-search-button"
            on="tap:SearchOverlay.toggleVisibility,AMP.setState({searchVisible: !searchVisible})"
          >
            <svg className="icon-magnify">
              <use xlinkHref="#icon-magnify"></use>
            </svg>
          </button>
          <div className="SearchOverlay-Amp-search-overlay" id="SearchOverlay" hidden>
            <form
              className="SearchOverlay-Amp-search-form i-amphtml-form"
              action="/search/"
              noValidate=""
              autoComplete="off"
              target="_top"
              amp-novalidate=""
            >
              <label>
                <input
                  placeholder="Search"
                  type="text"
                  className="SearchOverlay-Amp-search-input"
                  name="query"
                  required
                />
                <span className="sr-only">Search Query</span>
                <button type="submit" className="SearchOverlay-Amp-search-submit">
                  <svg>
                    <use xlinkHref="#icon-magnify"></use>
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </label>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

HeaderAMP.propTypes = {};

export default HeaderAMP;
