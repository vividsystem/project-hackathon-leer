import { Server } from "socket.io"
import { Player } from "~/shared/types";

const io = new Server(4000);

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

interface Room {
	code: string
	owner: string
	dead: string[]
	alive: string[]
}

//TODO: replace with database in the future maybe
const rooms: Record<string, Room> = {};
const users: Record<string, Player> = {};
//client connects to server
io.on("connection", (socket) => {

  // Set name
  socket.on("set-name", (name: string, callback) => {
    users[socket.id] = { id: socket.id, name };
    callback({ success: true });
  });

  // Create room
  socket.on("create-room", (callback) => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    socket.join(code);
    users[socket.id].room = code;
    rooms[code] = { code: code, owner: socket.id, dead: [socket.id], alive: []};
    callback(code);
  });

  // Join room
  socket.on("join-room", (code: string, callback) => {
    if (!rooms[code]) {
      callback({ success: false, message: "Room not found" });
      return;
    }
    socket.join(code);
    users[socket.id].room = code;
    rooms[code].alive.push(socket.id);
    callback({ success: true, code });
  });

  // Send message
  socket.on("send-message", (data) => {
    const user = users[socket.id];
    if (!user?.room) return;
    io.to(user.room).emit("receive-message", {
      sender: user.name || "Anonymous",
      message: data.message,
    });
  });


	socket.on("kill-player", (data: {id: string}) => {
		const user = users[socket.id];
		if(!user?.room) return;
		if(rooms[user.room].owner != socket.id) return;
		
		rooms[user.room].dead = rooms[user.room].dead.filter((id) => id !== data.id)
		rooms[user.room].alive.push(data.id)

	})

	socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user?.room) {
      const room = rooms[user.room];
      if (room) {
        room.dead = room.dead.filter((id) => id !== socket.id);
        room.alive = room.alive.filter((id) => id !== socket.id);
        if (room.dead.length === 0) delete rooms[user.room];
      }
    }
    delete users[socket.id];
  });
})

