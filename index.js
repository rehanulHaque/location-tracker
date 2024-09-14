const express = require("express")
const socketio = require("socket.io")
const http = require("http")
const path = require("path")
const app = express()
const server = http.createServer(app)

app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "public")))

const io = socketio(server)

io.on("connection", (socket) => {
    socket.on("sendLocation", (data)=>{
        io.emit("receiveLocation", {id: socket.id, ...data})
    })
    socket.on("disconnect", ()=>{
        io.emit("receiveLocation", {id: socket.id})
    })
    console.log("new connection")
})

app.get("/", (req, res) => {
    res.render("index")
})

server.listen(3000)

