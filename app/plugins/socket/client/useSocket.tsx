import { App } from 'antd'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { io, Socket } from 'socket.io-client'
import { useUserContext } from '~/core/context'

type SocketContextType = {
  isLive: boolean
  socket?: Socket
}

// Removed throwing in error handler; now just logs errors.
export const connect = () => {
  const socket = io({
    reconnectionDelayMax: 10000,
    reconnectionAttempts: 5,
  })

  socket.on('error', error => {
    console.error('Socket connection error:', error)
  })

  return socket
}

const SocketContext = createContext<SocketContextType>(undefined!)

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null)
  const { user } = useUserContext()
  const [isLive, setLive] = useState(false)

  useEffect(() => {
    if (!user) {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
      setLive(false)
      return
    }

    socketRef.current = connect()
    socketRef.current.on('connect', () => {
      setLive(true)
    })
    socketRef.current.on('error', error => {
      console.log(`Could not connect to server: ${error.message}`)
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [user?.id])

  return (
    <SocketContext.Provider
      value={{
        isLive,
        socket: socketRef.current,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export function useSocketEvent<DataType = unknown>(
  key: string,
  callback: (data: DataType) => void,
) {
  const { isLive, socket } = useSocket()
  const { message } = App.useApp()

  useEffect(() => {
    if (isLive && socket) {
      socket.on(key, data => {
        callback(data.payload)
      })
      return () => {
        socket.off(key)
      }
    }
  }, [socket, key, callback, isLive])

  const emit = (options: { payload: DataType; userIds?: string[] }) => {
    if (!isLive || !socket) {
      message.error(`Socket is not active`)
      return
    }
    socket.emit('automatic', { key, ...options })
  }

  return { emit }
}

export const useSocket = Object.assign(
  (): SocketContextType => {
    const context = useContext(SocketContext)
    if (context === undefined) {
      throw new Error('useSocket must be used within a SocketProvider')
    }
    return context
  },
  { connect },
)
