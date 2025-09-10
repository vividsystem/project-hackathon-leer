import { Server } from "socket.io"
import { Player, Room } from "shared/types";

const io = new Server(4000, {
	cors: {
		origin: "http://localhost:3000",
			methods: ["GET", "POST"],
			credentials: true
	}

});

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}


//TODO: replace with database in the future maybe
const rooms: Record<string, Room> = {};
const players: Record<string, Player> = {};
//client connects to server
io.on("connection", (socket) => {

	console.log(socket.id)
  socket.on("set-name", (name: string, callback) => {
    players[socket.id].name = name;
    callback({ success: true });
  });

  socket.on("create-room", (callback) => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    socket.join(code);
		if(!players[socket.id]) {
			players[socket.id] = { id: socket.id, alive: false, gameMaster: true}
		}
    players[socket.id].room = code;
    rooms[code] = { code: code, owner: socket.id, dead: [socket.id], alive: []};
    callback(players[socket.id]);
  });

  socket.on("join-room", (code: string, callback) => {
    if (!rooms[code]) {
      callback({ success: false, message: "Room not found" });
      return;
    }
    socket.join(code);
		if(!players[socket.id]) {
			players[socket.id] = { id: socket.id, alive: true, gameMaster: false}
		}
    players[socket.id].room = code;
    rooms[code].alive.push(socket.id);
    callback({ success: true, player: players[socket.id] });
  });

  socket.on("send-message", (data) => {
    const user = players[socket.id];
    if (!user?.room) return;
    io.to(user.room).emit("receive-message", {
      sender: user.name || "Anonymous",
      message: data.message,
    });
  });

	socket.on("get-room", (callback) => {
		if(!players[socket.id]) return callback([])
		if(!players[socket.id].room) return callback([])
		return callback(rooms[players[socket.id].room!])
	})


	socket.on("kill-player", (data: {id: string}) => {
		const user = players[socket.id];
		if(!user?.room) return;
		if(rooms[user.room].owner != socket.id) return;

		const player = players[data.id]
		if(!player) return
		if(player.room != user.room) return
		
		rooms[user.room].dead = rooms[user.room].dead.filter((id) => id !== data.id)
		rooms[user.room].alive.push(data.id)

		players[data.id] = { ...player, alive: false}

		io.to(data.id).emit("killed", {...player, alive: false})


	})
	

	socket.on("disconnect", () => {
    const user = players[socket.id];
    if (user?.room) {
      const room = rooms[user.room];
      if (room) {
        room.dead = room.dead.filter((id) => id !== socket.id);
        room.alive = room.alive.filter((id) => id !== socket.id);
        if (room.dead.length === 0) delete rooms[user.room];
      }
    }
    delete players[socket.id];
  });
})

