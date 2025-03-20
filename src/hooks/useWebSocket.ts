import { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { updatePrices } from '../store/portfolioSlice';

const useWebSocket = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let ws: WebSocket;
    
    const connect = () => {
      ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          data.forEach((ticker: any) => {
            dispatch(updatePrices({
              symbol: ticker.s.replace('USDT', ''),
              price: parseFloat(ticker.c),
              change24h: parseFloat(ticker.P)
            }));
          });
        } catch (error) {
          console.error('WebSocket parse error:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setTimeout(connect, 5000);
      };
    };

    connect();

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [dispatch]);
};

export default useWebSocket;