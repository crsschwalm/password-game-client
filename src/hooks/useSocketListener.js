import { useContext, useEffect } from 'react';
import { SocketContext } from '../context/socket';

const useSocketListener = (api) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    const handler = ({ method, payload }) => {
      if (!api[method]) {
        console.warn('⚠️ Failed trying to run :>>', method);
        console.log('api :>> ', Object.keys(api));
      } else {
        api[method]?.(payload);
      }
    };

    socket.on('fromApi', handler);

    return () => {
      socket.off('fromApi', handler);
    };
  }, [api, socket]);

  return socket;
};

export default useSocketListener;
