// import { useUserContext } from '@/core/context'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { Flex } from 'antd'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Mobilebar } from './components/Mobilebar'
import { Topbar } from './components/Topbar'
import { NavigationItem } from './types'
import { useUserContext } from '~/core/context'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useNavigate()
  const pathname = useLocation().pathname
  const params: Record<string, string> = useParams()

  const { organization } = useUserContext()

  const goTo = (url: string) => {
    router(url)
  }

  const items: NavigationItem[] = [
    {
      key: '/home',
      label: 'Home Page',
      position: 'topbar',

      onClick: () => goTo('/home'),
    },

    {
      key: '/organizations/:organizationId/questionnaire',
      label: 'Lifestyle Questionnaire Page',
      position: 'topbar',

      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/questionnaire'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/recommendations',
      label: 'Car Recommendations Page',
      position: 'topbar',

      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/recommendations'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/comparison',
      label: 'Car Comparison Page',
      position: 'topbar',

      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/comparison'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/deals',
      label: 'Deal Finder Page',
      position: 'topbar',

      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/deals'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/favorites',
      label: 'Favorites Page',
      position: 'topbar',

      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/favorites'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/virtual-garage',
      label: 'Virtual Garage',
      position: 'topbar',

      onClick: () => goTo('/virtual-garage'),
    },

    {
      key: '/user-preferences',
      label: 'User Preferences Page',
      position: 'topbar',

      onClick: () => goTo('/user-preferences'),
    },

    {
      key: '/future-proofing',
      label: 'Future-Proofing Advisor Page',
      position: 'topbar',

      onClick: () => goTo('/future-proofing'),
    },

    {
      key: '/organizations/:organizationId/pricing',
      label: 'Pricing',

      position: 'topbar',

      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/pricing'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },
  ]

  const itemsVisible = items
    .filter(item => item.isVisible !== false)
    .map(item => ({
      key: item.key,
      label: item.label,
      position: item.position,
      onClick: item.onClick,
    }))

  const itemsTopbar = itemsVisible.filter(item => item.position === 'topbar')

  const itemsLeftbar = itemsVisible.filter(item => item.position === 'leftbar')

  const itemsLeftbottom = itemsVisible.filter(
    item => item.position === 'leftbar-bottom',
  )

  const itemsMobile = itemsVisible

  let keySelected = pathname

  Object.entries(params).forEach(([key, value]) => {
    keySelected = keySelected.replace(`/${value}`, `/:${key}`)
  })

  return (
    <>
      <Topbar keySelected={keySelected} items={itemsTopbar} />

      <Mobilebar keySelected={keySelected} items={itemsMobile} />

      <Flex flex={1} style={{ overflowY: 'hidden' }}>
        <Leftbar
          keySelected={keySelected}
          items={itemsLeftbar}
          itemsBottom={itemsLeftbottom}
        />

        <Flex flex={1} vertical style={{ overflowY: 'hidden' }}>
          {children}
        </Flex>
      </Flex>
    </>
  )
}
