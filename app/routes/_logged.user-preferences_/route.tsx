import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { SettingOutlined, SyncOutlined } from '@ant-design/icons'
import { Button, Card, List, message, Spin, Switch, Typography } from 'antd'
import { useEffect, useState } from 'react'
const { Title, Paragraph } = Typography

interface JsonObject {
  [key: string]: string | number | boolean | JsonObject | JsonArray
}

interface JsonArray
  extends Array<string | number | boolean | JsonObject | JsonArray> {}

interface QuestionnaireResponse {
  carType?: string
  primaryUse?: string
  averageMileage?: number
  budget?: number
  financingPreference?: string
  enginePreference?: string
  transmissionType?: string
  priorities?: string[]
  emissionsConcern?: string
  fuelEfficiencyImportance?: string
  parkingSpace?: string
  passengers?: number
}

export default function UserPreferencesPage() {
  const { user } = useUserContext()
  const [preferences, setPreferences] = useState<any[]>([])
  const [isUpdating, setIsUpdating] = useState(false)

  const {
    data: userPreferences,
    isLoading: preferencesLoading,
    refetch: refetchPreferences,
  } = Api.userPreference.findMany.useQuery({
    where: { userId: user?.id },
  })

  const { data: questionnaireResponses, isLoading: responsesLoading } =
    Api.questionnaireResponse.findMany.useQuery({
      where: { userId: user?.id },
    })

  const { mutateAsync: updatePreference } =
    Api.userPreference.update.useMutation()
  const { mutateAsync: createPreference } =
    Api.userPreference.create.useMutation()

  useEffect(() => {
    if (userPreferences) {
      setPreferences(userPreferences)
    }
  }, [userPreferences])

  const handleTogglePreference = async (
    preferenceId: string,
    newValue: boolean,
  ) => {
    setIsUpdating(true)
    try {
      await updatePreference({
        where: { id: preferenceId },
        data: { preferenceValue: newValue.toString() },
      })
      message.success('Preference updated successfully')
      refetchPreferences()
    } catch (error) {
      message.error('Failed to update preference')
    } finally {
      setIsUpdating(false)
    }
  }

  const convertToString = (
    value: string | number | boolean | JsonObject | JsonArray,
  ): string => {
    if (Array.isArray(value)) {
      return value.join(',')
    }
    return String(value)
  }

  const handleSyncPreferences = async () => {
    setIsUpdating(true)
    try {
      if (questionnaireResponses && questionnaireResponses.length > 0) {
        const rawResponses = questionnaireResponses[0].responses ?? []
        const responses = rawResponses as QuestionnaireResponse

        // Type-safe way to iterate through the responses
        type ResponseKey = keyof QuestionnaireResponse
        const entries = Object.entries(responses) as [
          ResponseKey,
          QuestionnaireResponse[ResponseKey],
        ][]

        for (const [key, value] of entries) {
          const existingPreference = preferences.find(
            p => p.preferenceType === key,
          )
          if (existingPreference && value !== undefined) {
            await updatePreference({
              where: { id: existingPreference.id },
              data: { preferenceValue: convertToString(value) },
            })
          } else if (value !== undefined) {
            await createPreference({
              data: {
                userId: user?.id || '',
                preferenceType: key,
                preferenceValue: convertToString(value),
              },
            })
          }
        }

        // Add new preference options based on expanded questionnaire
        const newPreferences = [
          { type: 'carType', value: responses.carType },
          { type: 'primaryUse', value: responses.primaryUse },
          { type: 'averageMileage', value: responses.averageMileage },
          { type: 'budget', value: responses.budget },
          { type: 'financingPreference', value: responses.financingPreference },
          { type: 'enginePreference', value: responses.enginePreference },
          { type: 'transmissionType', value: responses.transmissionType },
          { type: 'priorities', value: responses.priorities?.join(',') },
          { type: 'emissionsConcern', value: responses.emissionsConcern },
          {
            type: 'fuelEfficiencyImportance',
            value: responses.fuelEfficiencyImportance,
          },
          { type: 'parkingSpace', value: responses.parkingSpace },
          { type: 'passengers', value: responses.passengers },
        ]

        for (const pref of newPreferences) {
          if (pref.value !== undefined) {
            const existingPref = preferences.find(
              p => p.preferenceType === pref.type,
            )
            if (existingPref) {
              await updatePreference({
                where: { id: existingPref.id },
                data: { preferenceValue: convertToString(pref.value) },
              })
            } else {
              await createPreference({
                data: {
                  userId: user?.id || '',
                  preferenceType: pref.type,
                  preferenceValue: convertToString(pref.value),
                },
              })
            }
          }
        }

        message.success('Preferences synced with questionnaire responses')
        refetchPreferences()
      } else {
        message.warning('No questionnaire responses found to sync')
      }
    } catch (error) {
      message.error('Failed to sync preferences')
    } finally {
      setIsUpdating(false)
    }
  }

  if (preferencesLoading || responsesLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Card>
        <Title level={2}>User Preferences</Title>
        <Paragraph>
          Manage your preferences to receive more accurate car suggestions.
          These preferences are linked to your questionnaire responses and can
          be updated based on your interactions.
        </Paragraph>
        <Button
          icon={<SyncOutlined />}
          onClick={handleSyncPreferences}
          style={{ marginBottom: '20px' }}
          loading={isUpdating}
        >
          Sync with Questionnaire Responses
        </Button>
        <List
          dataSource={preferences}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <Switch
                  key="toggle"
                  checked={item.preferenceValue === 'true'}
                  onChange={checked => handleTogglePreference(item.id, checked)}
                  disabled={isUpdating}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<SettingOutlined />}
                title={item.preferenceType}
                description={`Current value: ${item.preferenceValue}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </PageLayout>
  )
}
