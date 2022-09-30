import {
  readChatRoomsDB,
  writeChatRoomsDB,
} from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";
import { checkToken } from "../../../../backendLibs/checkToken";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const username = checkToken(req);
    if (!username) {
      return res.status(401).json({
        ok: false,
        message: "You don't permission to access this api",
      });
    }
    const roomId = req.query.roomId;
    if (roomId === -1)
      return res
        .status(404)
        .json({ ok: false, message: "Room ID does not exit" });
    const rooms = readChatRoomsDB();
    const findRoom = rooms.find((x) => x.roomId === roomId);
    if (!findRoom)
      return res.status(400).json({ ok: false, message: "Invalid Room ID" });
    return res.json({ ok: true, findRoom });
  } else if (req.method === "POST") {
    //check token

    //get roomId from url
    const roomId = req.query.roomId;
    const rooms = readChatRoomsDB();

    //check if roomId exist

    //validate body
    if (typeof req.body.text !== "string" || req.body.text.length === 0)
      return res.status(400).json({ ok: false, message: "Invalid text input" });

    //create message

    writeChatRoomsDB(rooms);
  }
}
