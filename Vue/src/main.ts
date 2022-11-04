import { createApp } from "vue";
import App from "./App.vue";
// import router from "./router";
import { io, Socket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from "../types";

import "./assets/main.css";

const app = createApp(App);
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
//make socketio available for all components
app.config.globalProperties.$socket = socket;

// app.use(router);

app.mount("#app");
app.use(socket);
