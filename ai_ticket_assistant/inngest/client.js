import { Inngest } from "inngest";

export const inngest = new Inngest({
    id: "ticketing-system",
    eventKey: "8KbFL2yxZL6eU1rzDBGRbhkPrlJ9scPlpi9nNnzM_HMOojdis0Cig52Tr1Q4I0S2FkbZ5LcVio_O5G1hsC8sZA",
});


// import { Inngest } from "inngest";

// // Create a client to send and receive events
// export const inngest = new Inngest({ id: "ticketing-system" });

// const helloWorld = inngest.createFunction(
//     { id: "hello-world" },
//     { event: "test/hello.world" },
//     async ({ event, step }) => {
//         await step.sleep("wait-a-moment", "1s");
//         return { message: `Hello ${event.data.email}!` };
//     },
// );

// // Create an empty array where we'll export future Inngest functions
// export const functions = [helloWorld];