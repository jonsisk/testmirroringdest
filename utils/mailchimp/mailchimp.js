/**
 * Cloudflare worker code that gets the email address from the request body and adds it to a Mailchimp list.
 * Todo: 1) keys to environment variables. 2) test recaptcha once we have a component ready on arc. 3) handle multiple lists (website param?)
 *
 */
export default {
  // eslint-disable-next-line no-unused-vars
  async fetch(request, env, ctx) {
    // Change this to what you want for CORS
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      // Handle CORS preflight requests
      return new Response(null, {
        headers: { ...corsHeaders },
      });
    } else if (request.method === "POST") {
      const {
        website,
        email,
        interest_ids,
        "g-recaptcha-response": captchaResponse,
      } = await request.json();

      // // Verify reCAPTCHA
      const secretKey = env.RECAPTCHA_SECRET_KEY;
      const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaResponse}`;

      const captchaVerificationResponse = await fetch(verificationURL, { method: "POST" });
      const captchaVerificationData = await captchaVerificationResponse.json();

      if (!captchaVerificationData.success) {
        return new Response("Failed captcha verification", { status: 401 });
      }

      const interests = {
        interests: interest_ids.reduce((acc, cur) => ({ ...acc, [cur]: true }), {}),
      };

      const data = {
        email_address: email,
        status: "pending",
        ...interests,
      };

      const API_KEY = env.MAILCHIMP_APIKEY;
      const DC = env.MAILCHIMP_DC;
      const LIST_IDS = {
        votebeat: env.MAILCHIMP_VOTEBEAT_LISTID,
        chalkbeat: env.MAILCHIMP_CHALKBEAT_LISTID,
        healthbeat: env.MAILCHIMP_HEATLHBEAT_LISTID,
        // add more websites and their corresponding list IDs here
      };

      const response = await fetch(
        `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_IDS[website]}/members/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(`anystring:${API_KEY}`)}`,
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        return new Response(responseData.detail, {
          status: response.status,
          headers: { ...corsHeaders },
        });
      }

      return new Response("ok", { status: response.status, headers: { ...corsHeaders } });
    } else {
      return new Response("Not found", { status: 404, headers: { ...corsHeaders } });
    }
  },
};
