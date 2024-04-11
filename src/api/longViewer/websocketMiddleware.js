  import { getDataSuccess, getDataError } from "../../redux/longViewer/actions";

  const MAX_ARRAY_SIZE_BYTES = 512 * 1024 * 1024; // 512MB in bytes
  let currentArraySizeBytes = 0;
  let chunkData = ''; // Accumulate chunks in a string
  
  const websocketMiddleware = (ws) => (store) => {
    console.log('WebSocket connection established.');
  
    ws.onmessage = (event) => {
      const chunks = event.data.split('\n');
  
      chunks.forEach((chunk) => {
        try {
          const chunkSizeBytes = new Blob([chunk]).size;
  
          // Check if adding the chunk exceeds the maximum array size
          if (currentArraySizeBytes + chunkSizeBytes > MAX_ARRAY_SIZE_BYTES) {
            // Dispatch the accumulated chunk data as a single message
            if (chunkData.length > 0) {
              store.dispatch(getDataSuccess(chunkData));
            }
  
            // Reset chunkData and currentArraySizeBytes
            chunkData = '';
            currentArraySizeBytes = 0;
          }
  
          // Add the chunk to the accumulated data
          chunkData += chunk;
          currentArraySizeBytes += chunkSizeBytes;
        } catch (error) {
          console.log("Error handling chunk:", error);
          store.dispatch(getDataError(error.message));
        }
      });
  
      // Dispatch any remaining accumulated data after processing all chunks
      if (chunkData.length > 0) {
        store.dispatch(getDataSuccess(chunkData));
      }
    };
  
    return (next) => (action) => {
      if (action.type === "SEND_LOG_MESSAGE" && ws.readyState === WebSocket.OPEN) {
        ws.send(action.payload);
      }
      return next(action);
    };
  };
  
  export default websocketMiddleware;
  
  
