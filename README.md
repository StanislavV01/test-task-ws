# Express Socket.IO Counter Project

This project demonstrates a real-time application with a React counter component and a Node.js server using Express and Socket.IO.

## Overview

- **React Client:**  
  Displays a counter value with an "Increment" button. Each click increases the counter by one. The component listens for a `GET_COUNTER` event from the server and responds with the current counter value.

- **Node.js Server:**  
  Uses Express and Socket.IO to listen for client connections. Every second, the server broadcasts a `GET_COUNTER` event to all connected clients. When a client responds with its counter value, the server logs that value.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/)

## Setup Instructions

### Server (Backend)

1. **Clone or create the server directory:**

   ```bash
   mkdir express-socketio-server
   cd express-socketio-server


Weaknesses & Improvements

Weaknesses:

    The server broadcasts a request every second regardless of state changes.
    Error handling and reconnection strategies are minimal.
    No authentication or secure connection (HTTPS/WSS) is implemented.
    The communication protocol is basic and may need enhancement for scalability.
  

Potential Improvements:

    Use event-driven updates (only send updates when the counter changes).
    Implement robust error handling and reconnection strategies on the client.
    Enhance security with proper authentication, secure connections, and CORS policies.
    Use env instead of direct links
