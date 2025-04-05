const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const {
  handle_send_code,
  handle_verify_code,
  verification_timed_out,
} = require("./functionality");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store countdowns in a Map: { phoneNumber: { countdown, intervalId, clients } }
const countdowns = new Map();

// Add Express middleware for code resets
app.use(express.json());

wss.on("connection", (ws) => {
  let phoneNumber = null;

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === "register" && data.phoneNumber) {
        phoneNumber = data.phoneNumber;
        initializeCountdown(phoneNumber, ws);
      }

      // get the code from client:
      if (data.type === "code" && data.code) {
        let entry = countdowns.get(data.phoneNumber);
        // verify the code and create the result:
        handle_verify_code(data.phoneNumber, data.code)
          .then((verify_result) => {
            if (verify_result.isconfirmed) {
              entry.is_succeed = true;
              entry.token = verify_result.data.token;
              entry.userId = verify_result.data.userId;
              entry.username = verify_result.data.username;
              console.log("verifyed result is: ", verify_result);
              // send the verification result to the client:
              send_verify_code_result(data.phoneNumber, entry);
              cleanupClient(data.phoneNumber, ws);
            } else {
              entry.is_succeed = false;
              entry.token = null;
              // send the verification result to the client:
              send_verify_code_result(data.phoneNumber, entry);
            }
          })
          .catch(() => {
            entry.is_succeed = false;
            entry.token = null;
            // send the verification result to the client:
            send_verify_code_result(data.phoneNumber, entry);
          });
      }
    } catch (error) {
      console.error("Invalid message:", error);
    }
  });

  // ws.on("close", () => {
  //   if (phoneNumber) {
  //     cleanupClient(phoneNumber, ws);
  //   }
  // });
});

function initializeCountdown(phoneNumber, ws) {
  let entry = countdowns.get(phoneNumber);

  if (!entry) {
    entry = {
      countdown: 60,
      intervalId: null,
      clients: new Set(),
    };
    countdowns.set(phoneNumber, entry);
  }

  entry.clients.add(ws);
  ws.send(JSON.stringify({ type: "countdown", value: entry.countdown }));

  if (!entry.intervalId) {
    handle_send_code(phoneNumber)
      .then(() => startCountdown(phoneNumber, entry))
      .catch(() => console.log("there is an error sending code..."));
  }
}

function startCountdown(phoneNumber, entry) {
  // set the counting status to true.
  try {
    // setCountingDown(phoneNumber, true);
  } catch (error) {
    return;
  }

  entry.intervalId = setInterval(() => {
    //countdown is started
    entry.countdown = Math.max(0, entry.countdown - 1);

    entry.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        //send the counted down number to the user
        client.send(
          JSON.stringify({
            type: "countdown",
            value: entry.countdown,
          })
        );
      }
    });

    //countdown is ended
    if (entry.countdown === 0) {
      console.log("counting eded... now reset the user info...");
      verification_timed_out(phoneNumber);
      try {
        // setCountingDown(phoneNumber, false);
      } catch (error) {
        return;
      }

      clearInterval(entry.intervalId);

      entry.intervalId = null;
      // Auto-reset after 1 second
      setTimeout(() => {
        entry.countdown = 60;
      }, 1000);
    }
  }, 1000);
}

function send_verify_code_result(phoneNumber, entry) {
  entry.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "virify_code_result",
          succeed: entry.is_succeed,
          token: entry.token,
          userId: entry.userId,
          username: entry.username,
        })
      );
    }
  });
}

function cleanupClient(phoneNumber, ws) {
  const entry = countdowns.get(phoneNumber);
  if (entry) {
    entry.clients.delete(ws);
    if (entry.clients.size === 0 && entry.intervalId) {
      clearInterval(entry.intervalId);
      countdowns.delete(phoneNumber);
    }
  }
}

server.listen(8080, () => {
  console.log("WebSocket server running on port 8080");
});
