export const socketConnect = (host: any) => ({
  type: "SOCKET_CONNECT",
  host
});

export const socketDisconnect = () => ({
  type: "SOCKET_DISCONNECT" 
});