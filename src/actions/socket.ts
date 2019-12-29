export const socketConnect = (host: any) => ({
  type: "SOCKET_CONNECT",
  host
});

export const socketDisconnect = (host: any) => ({
  type: "SOCKET_DISCONNECT",
  host
});