# Real-Time Chat Application

This project is a real-time chat application built using Node.js, Express, Socket.io, and MongoDB. It enables users to join the chat, send messages, and see live updates on connected users. The application stores chat messages in a MongoDB database and loads the chat history when users join.

## Features

- **Real-time Communication:** Utilizes Socket.io for real-time bidirectional communication between the server and clients.
- **User Authentication:** Users can enter their names upon joining the chat.
- **Chat History:** Displays the last 50 messages when a user joins, retrieved from the MongoDB database.
- **Responsive Interface:** Features a responsive layout with separate sections for chat and user count.
- **Message Styling:** Messages include sender names, timestamps, and avatars.

## Project Structure

- **`server.js`:** Contains the server-side logic, setting up the Express server, Socket.io for WebSocket communication, and MongoDB connection. Handles user connections, disconnections, and message broadcasting.

- **`index.html`:** Client-side code for the chat interface, including sections for chat messages, user count, and message input. Uses Socket.io to establish a connection with the server.

- **`style.css`:** Basic styling for the HTML elements.

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/Faizanamd/chat-web-app
