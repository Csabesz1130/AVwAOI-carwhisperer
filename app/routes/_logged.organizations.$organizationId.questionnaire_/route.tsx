import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { CarOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from '@remix-run/react'
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Typography,
} from 'antd'
import { useState } from 'react'
const { Title, Paragraph } = Typography
const { Option } = Select

export default function LifestyleQuestionnairePage() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { organizationId } = useParams()
  const { user } = useUserContext()
  const [loading, setLoading] = useState(false)

  const { mutateAsync: createQuestionnaireResponse } =
    Api.questionnaireResponse.create.useMutation()

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      await createQuestionnaireResponse({
        data: {
          responses: values,
          userId: user?.id || '',
        },
      })
      message.success('Questionnaire submitted successfully!')
      navigate(`/organizations/${organizationId}/recommendations`)
    } catch (error) {
      console.error('Error submitting questionnaire:', error)
      message.error('Failed to submit questionnaire. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="narrow">
      <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <Title level={2}>Lifestyle Questionnaire</Title>
        <Paragraph>
          Answer the following questions about your car needs, priorities,
          budget, and lifestyle aspirations to receive personalized car
          recommendations.
        </Paragraph>

        <Form
          form={form}
          name="lifestyle_questionnaire"
          onFinish={onFinish}
          layout="vertical"
        >
          <Divider orientation="left">Lifestyle & Usage</Divider>
          <Form.Item
            name="carType"
            label="What type of car are you looking for?"
            rules={[{ required: true, message: 'Please select a car type' }]}
          >
            <Select placeholder="Select car type">
              <Option value="sedan">Sedan</Option>
              <Option value="suv">SUV</Option>
              <Option value="hatchback">Hatchback</Option>
              <Option value="truck">Truck</Option>
              <Option value="sports">Sports Car</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="primaryUse"
            label="What is the primary use for this vehicle?"
            rules={[{ required: true, message: 'Please select primary use' }]}
          >
            <Select placeholder="Select primary use">
              <Option value="commuting">Daily Commuting</Option>
              <Option value="familyUse">Family Use</Option>
              <Option value="offRoad">Off-Road / Adventure</Option>
              <Option value="longDistance">Long Distance Travel</Option>
              <Option value="cityDriving">City Driving</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="averageMileage"
            label="What is your estimated average annual mileage?"
            rules={[
              { required: true, message: 'Please enter average mileage' },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              formatter={value => `${value} miles`}
              parser={value =>
                value ? (Number(value.replace(' miles', '')) as any) : 0
              }
            />
          </Form.Item>

          <Divider orientation="left">Budget & Finance</Divider>
          <Form.Item
            name="budget"
            label="What is your budget?"
            rules={[{ required: true, message: 'Please enter your budget' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={value => Number(value!.replace(/\$\s?|(,*)/g, '')) as any}
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="financingPreference"
            label="What is your preferred financing option?"
            rules={[
              { required: true, message: 'Please select financing preference' },
            ]}
          >
            <Select placeholder="Select financing preference">
              <Option value="cash">Cash Purchase</Option>
              <Option value="loan">Auto Loan</Option>
              <Option value="lease">Lease</Option>
            </Select>
          </Form.Item>

          <Divider orientation="left">Performance & Features</Divider>
          <Form.Item
            name="enginePreference"
            label="What is your preferred engine type?"
            rules={[
              { required: true, message: 'Please select engine preference' },
            ]}
          >
            <Select placeholder="Select engine preference">
              <Option value="gasoline">Gasoline</Option>
              <Option value="diesel">Diesel</Option>
              <Option value="hybrid">Hybrid</Option>
              <Option value="electric">Electric</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="transmissionType"
            label="What type of transmission do you prefer?"
            rules={[
              { required: true, message: 'Please select transmission type' },
            ]}
          >
            <Select placeholder="Select transmission type">
              <Option value="automatic">Automatic</Option>
              <Option value="manual">Manual</Option>
              <Option value="cvt">CVT</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priorities"
            label="What are your top priorities? (Select up to 3)"
            rules={[
              { required: true, message: 'Please select your priorities' },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select priorities"
              maxTagCount={3}
            >
              <Option value="fuelEfficiency">Fuel Efficiency</Option>
              <Option value="safety">Safety</Option>
              <Option value="performance">Performance</Option>
              <Option value="comfort">Comfort</Option>
              <Option value="technology">Technology</Option>
              <Option value="reliability">Reliability</Option>
            </Select>
          </Form.Item>

          <Divider orientation="left">Environmental Impact</Divider>
          <Form.Item
            name="emissionsConcern"
            label="How important are low emissions to you?"
            rules={[
              { required: true, message: 'Please rate emissions importance' },
            ]}
          >
            <Select placeholder="Select importance">
              <Option value="veryImportant">Very Important</Option>
              <Option value="important">Important</Option>
              <Option value="somewhatImportant">Somewhat Important</Option>
              <Option value="notImportant">Not Important</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="fuelEfficiencyImportance"
            label="How important is fuel efficiency to you?"
            rules={[
              {
                required: true,
                message: 'Please rate fuel efficiency importance',
              },
            ]}
          >
            <Select placeholder="Select importance">
              <Option value="veryImportant">Very Important</Option>
              <Option value="important">Important</Option>
              <Option value="somewhatImportant">Somewhat Important</Option>
              <Option value="notImportant">Not Important</Option>
            </Select>
          </Form.Item>

          <Divider orientation="left">Practical Considerations</Divider>
          <Form.Item
            name="parkingSpace"
            label="What type of parking space do you have?"
            rules={[
              { required: true, message: 'Please select parking space type' },
            ]}
          >
            <Select placeholder="Select parking space type">
              <Option value="garage">Garage</Option>
              <Option value="driveway">Driveway</Option>
              <Option value="street">Street Parking</Option>
              <Option value="parkingLot">Parking Lot</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="passengers"
            label="How many passengers do you regularly transport?"
            rules={[
              { required: true, message: 'Please enter number of passengers' },
            ]}
          >
            <InputNumber min={1} max={10} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="lifestyle"
            label="Describe your lifestyle and any additional considerations"
            rules={[
              { required: true, message: 'Please describe your lifestyle' },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<CarOutlined />}
              loading={loading}
              block
            >
              Submit Questionnaire
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
