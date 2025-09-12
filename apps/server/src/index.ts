import { Player, Room } from "packages/shared";
import { Server } from "socket.io"

const io = new Server(4000, {
	cors: {
		origin: "http://localhost:3000",
			methods: ["GET", "POST"],
			credentials: true
	}

});

//TODO: replace with database in the future maybe
const rooms: Record<string, Room> = {};
const players: Record<string, Player> = {};
//client connects to server


const initializePlayer = (id: string, name?: string) => {
	players[id] = { id: id, name: name, alive: true, gameMaster: false } 
}
const roomPlayers = (room: Room) => {
	return [
		...room.alive.map((id) => players[id]), 
		...room.dead.map((id) => players[id])
	]
}

io.on("connection", (socket) => {
	console.log(socket.id)

  socket.on("set-name", (name: string, callback) => {
		console.log(`${socket.id} set name to ${name}`)
		if(!players[socket.id]) {
			initializePlayer(socket.id, name)
		} else {
    	players[socket.id].name = name;
		}
    callback({ success: true, player: players[socket.id] });
  });

  socket.on("create-room", (callback) => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

		console.log(`${socket.id} created ${code}`)
    socket.join(code);
		if(!players[socket.id]) {
			initializePlayer(socket.id)
		}
    players[socket.id].room = code;
		players[socket.id].gameMaster = true
		players[socket.id].alive = false
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
			initializePlayer(socket.id)
		}
		console.log(`${socket.id} joined ${code}`)
    players[socket.id].room = code;
    rooms[code].alive.push(socket.id);

    socket.to(code).emit("player-list", roomPlayers(rooms[code]));
    callback({ success: true, player: players[socket.id], room: rooms[code] });
  });

	socket.on("leave-room", (callback) => {
		const player = players[socket.id]
		if(!player) {
			initializePlayer(socket.id)
			return callback({success:false, player: players[socket.id]})
		}
		if(!player.room) return callback({ success: false, player: player})
		if (player.alive) {
			rooms[player.room].alive = rooms[player.room].alive.filter((id) => id !== socket.id)
		} else {

			rooms[player.room].dead = rooms[player.room].alive.filter((id) => id !== socket.id)
		}
		players[socket.id].room = undefined	
		players[socket.id].alive = true
		players[socket.id].gameMaster = false 
		

    socket.to(player.room!).emit("player-list", roomPlayers(rooms[player.room!]));
		return callback({ success: true, player: players[socket.id]})

	})

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

	socket.on("get-room-players", (callback) => {
		if(!players[socket.id]) return callback([])
		if(!players[socket.id].room) return callback([])
		const room = rooms[players[socket.id].room!]

		return callback(roomPlayers(room))
	})


	socket.on("kill-player", (id: string) => {
		const user = players[socket.id];
		if(!user?.room) return;

		if(rooms[user.room].owner != socket.id) return;

		const player = players[id]
		if(!player) return
		if(player.room != user.room) return

		rooms[user.room].dead.push(id)
		rooms[user.room].alive = rooms[user.room].alive.filter((pid) => pid !== id) 

		players[id] = { ...player, alive: false}

		console.log(`killed player ${id}`)
		io.to(id).emit("killed", {...player, alive: false})
    socket.to(user.room).emit("player-list", roomPlayers(rooms[user.room]));

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

