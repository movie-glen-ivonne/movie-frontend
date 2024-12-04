import { io, Socket } from "socket.io-client";

// Check if running in the browser before accessing localStorage
const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const socketClient: Socket = io("https://movie-project-bk-630243095989.us-central1.run.app", {
  withCredentials: true,
  extraHeaders: {
    "Authorization": token ? `Bearer ${token}` : "",  // Send token only if it exists
  },
});

socketClient.on("connect", () => {
  console.log("Socket connected successfully!");
});

socketClient.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
});

export default socketClient;