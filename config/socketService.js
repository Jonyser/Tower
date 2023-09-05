import io from "socket.io-client";

const socket = io("http://127.0.0.1:8081", {
  extraHeaders: {
    "Access-Control-Allow-Origin": "http://127.0.0.1:8080"
    // Add any other necessary headers
  }
});
export default socket;
