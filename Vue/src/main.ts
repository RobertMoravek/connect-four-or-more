import { createApp } from "vue";
import App from "./App.vue";
import { io, Socket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from "../types";
import "./assets/main.css";

const app = createApp(App);
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

app.provide("socket", socket);

app.mount("#app");
