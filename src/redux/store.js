import { configureStore } from '@reduxjs/toolkit';
import logsReducer from './longViewer/reducers';
import websocketMiddleware from '../api/longViewer/websocketMiddleware';
// import WebSocket from 'websocket-extensions'; // Import WebSocket library

// Create a new WebSocket instance
const ws = new WebSocket('ws://localhost:4000/view-log-ws');

const store = configureStore({
  reducer: {
    logs: logsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware(ws)), // Pass the WebSocket instance to the middleware
});

export default store;
