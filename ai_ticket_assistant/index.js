import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv';
import userRoute from "./routes/user.js"
import ticketRoute from "./routes/ticket.js"
import { serve } from "inngest/express"
import { inngest } from "./inngest/client.js"
import { onUserSignup } from "./inngest/functions/on-signup.js";
import { onTicketCreated } from "./inngest/functions/on-ticket-create.js";


dotenv.config();
const PORT = process.env.PORT || 3000
const app = express()
app.use(cors({
    origin: "http://localhost:5173",  // your frontend URL
    credentials: true,                // allow cookies/auth headers
}));
app.use(express.json())


app.get("/", (req, res) => {
    res.send("<h1>Ticket Agent Server is running</h1>");
});

app.use('/api/auth', userRoute)
app.use('/api/ticket', ticketRoute)

app.use("/api/inngest", serve({
    client: inngest,
    functions: [onUserSignup,onTicketCreated]
}))

// app.use("/api/inngest", serve({ client: inngest, functions }));


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Mondo DB connected")
        app.listen(PORT, () => {
            console.log("Server is running at : ", PORT)
        })
    })
    .catch((error) => {
        console.log("Mongo DB error", error)
    })
