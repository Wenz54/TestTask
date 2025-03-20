export const connectToWebSocket = (streams: string[], callback: (data: any) => void) => {
    const formattedStreams = streams.map(s => `${s.toLowerCase()}usdt@ticker`).join('/');
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${formattedStreams}`);
  
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.data) {
          callback({
            s: message.data.s.replace('USDT', ''),
            c: message.data.c,
            P: message.data.P
          });
        }
      } catch (error) {
        console.error('WebSocket parse error:', error);
      }
    };
  
    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  
    return ws;
  };