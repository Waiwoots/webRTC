const WebSocket = require("ws");

const WS_PORT = process.env.WS_PORT || 8888;

// สร้าง WebSocket server ที่ใช้พอร์ต WS_PORT
const wsServer = new WebSocket.Server({ port: WS_PORT }, () => {
  console.log(`WS server is listening at ws://localhost:${WS_PORT}`);
});

// array ของ clients ที่เชื่อมต่อ
let connectedClients = [];

wsServer.on("connection", (ws) => {
  console.log("New client connected");

  // เพิ่ม client ใหม่ใน array
  connectedClients.push(ws);

  // รับและส่งข้อความ signaling data สำหรับ WebRTC
  ws.on("message", (data) => {
    const message = JSON.parse(data);

    // ส่งข้อมูลให้ client อื่นที่เชื่อมต่ออยู่
    connectedClients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  });

  // เมื่อ client ตัดการเชื่อมต่อให้นำออกจาก list
  ws.on("close", () => {
    connectedClients = connectedClients.filter(client => client !== ws);
    console.log("Client disconnected");
  });
});
