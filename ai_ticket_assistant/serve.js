import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { onUserSignup } from "./inngest/functions/on-signup.js";

export default serve(
  {
    client: inngest,
    functions: [onUserSignup]
  }
);


// import { serve } from "inngest/next"; // or your preferred framework
// import { inngest } from "./client";
// import {
//   importProductImages,
//   sendSignupEmail,
//   summarizeText,
// } from "./functions";

// serve({
//   client: inngest,
//   functions: [sendSignupEmail, summarizeText, importProductImages],
// });