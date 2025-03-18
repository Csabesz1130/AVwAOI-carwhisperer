import * as socket from './useSocket'

export namespace SocketClient {
  export const Provider = socket.SocketProvider
  export const use = socket.useSocket
  export const useEvent = socket.useSocketEvent
  export const connect = socket.connect
}
