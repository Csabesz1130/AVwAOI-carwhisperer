import { useUserContext } from '@/core/context'
import { NavigationLayout } from '@/designSystem/layouts/NavigationLayout'
import { Outlet, useLocation, useNavigate } from '@remix-run/react'
import { useEffect } from 'react'
import { MrbSplashScreen } from '~/designSystem'

export default function LoggedLayout() {
  const { isLoggedIn, isLoading } = useUserContext()
  const router = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isLoading && !isLoggedIn && location.pathname !== '/login') {
      router('/login')
    }
  }, [isLoading, isLoggedIn, location.pathname, router])

  // Removed window focus reconnection logic since SocketProvider handles connection

  if (isLoading) {
    return <MrbSplashScreen />
  }

  if (isLoggedIn) {
    return (
      <NavigationLayout>
        <Outlet />
      </NavigationLayout>
    )
  }

  return null
}
