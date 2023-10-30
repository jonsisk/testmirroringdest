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
          type
          url
          resized_params {
            1440x810
            768x512
            768x432
            600x450
            600x338            
            400x225
            377x212
            274x154
            158x89
          }
        }
        lead_art {
          promo_items {
            basic {
              type
              url
              resized_params {
                1440x810
                768x512
                768x432
                600x450
                600x338                
                400x225
                377x212
                274x154
                158x89
              }
            }
          }
          type
        }
      }
      taxonomy {
        primary_section {
          _id
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
