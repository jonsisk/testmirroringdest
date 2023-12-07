import { RESIZER_TOKEN_VERSION } from "fusion:environment";

export const LIST_FILTER = (arcSite) => `{
    count
    next
    content_elements {
      _id,
      type
      display_date
      publish_date
      first_publish_date
      credits {
        by {
          _id
          name
          url
          type
          slug
          additional_properties {
            original {
              byline
            }
          }
        }
      }
      headlines {
        basic
        web
        print
      }
      subheadlines {
        basic
      }
      subtype
      copyright
      label {
        basic {
          display
          url
          text
        }
      }
      owner {
        sponsored
      }
      description {
        basic
      }
      promo_items {
        basic {
          _id
          type
          url
          auth {
            ${RESIZER_TOKEN_VERSION}
          }          
        }
        lead_art {
          promo_items {
            basic {
              _id
              auth {
                ${RESIZER_TOKEN_VERSION}
              }
              type
              url              
            }
          }
          type
        }
      }
      taxonomy {
        primary_section {
          _id
          _website
          name
          path
          additional_properties {
            original {
              name
              inactive
              site {
                site_title
                is_internal
              }  
              bureau {
                is_bureau_section
              }              
            }
          }
        }
        sections {
          _id
          _website
          name
          path
          additional_properties {
            original {
              name
              inactive
              site {
                site_title
                is_internal
              }  
              bureau {
                is_bureau_section
              }              
            }
          }
        }
      }
      websites {
        ${arcSite} {
          website_url
          website_section {
            _id
            name
          }
        }
      }
    }
  }`;
