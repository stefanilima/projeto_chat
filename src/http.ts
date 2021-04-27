import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

import "./database";
import { routes } from "./routes";

//  Cria o app
const app = express();

// Configurando a public
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html");
});

app.get("/pages/admin", (request, response) => {
    return response.render("html/admin.html");
});

// Criando protocolo http
const http = createServer(app);
// Criando protocolo de websocket
const io = new Server(http);

io.on("connection", (socket: Socket) => {
    console.log("Conectou", socket.id);
});

app.use(express.json());
app.use(routes);

export { http, io };