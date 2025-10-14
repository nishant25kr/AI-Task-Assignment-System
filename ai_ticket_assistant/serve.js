// serve.js
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { onUserSignup } from "./inngest/functions/on-signup.js";
// import other functions if needed
// import { onTicketCreated } from "./inngest/functions/on-ticket-create.js";

export default serve("ai_ticket_assistant", [
  onUserSignup,
  // onTicketCreated
]);
