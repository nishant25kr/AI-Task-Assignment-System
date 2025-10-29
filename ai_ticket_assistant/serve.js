import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { onUserSignup } from "./inngest/functions/on-signup.js";
import { onTicketCreated } from "./inngest/functions/on-ticket-create.js";

export default serve(
  {
    client: inngest,
    functions: [onUserSignup,onTicketCreated]
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