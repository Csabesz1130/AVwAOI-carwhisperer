import { Api } from '@/core/trpc'
import { AppHeader } from '@/designSystem/ui/AppHeader'
import { useNavigate, useSearchParams } from '@remix-run/react'
import { Button, Flex, Form, Input, Typography } from 'antd'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const router = useNavigate()
  const [searchParams] = useSearchParams()

  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState(false)

  const [loginError, setLoginError] = useState<string>('')
  const { mutateAsync: login } = Api.authentication.login.useMutation({
    onSettled: () => setLoading(false),
    onSuccess: async data => {
      if (data.redirect) {
        window.location.href = data.redirect
      } else {
        await router('/home')
      }
    },
    onError: (error) => {
      console.error(error)
      setLoginError(error.message || 'Login failed. Please try again.')
      form.resetFields()
    }
  })

  const errorKey = searchParams.get('error')

  const errorMessage = {
    Signin: 'Try signing in with a different account.',
    OAuthSignin: 'Try signing in with a different account.',
    OAuthCallback: 'Try signing in with a different account.',
    OAuthCreateAccount: 'Try signing in with a different account.',
    EmailCreateAccount: 'Try signing in with a different account.',
    Callback: 'Try signing in with a different account.',
    OAuthAccountNotLinked:
      'To confirm your identity, sign in with the same account you used originally.',
    EmailSignin: 'Check your email address.',
    CredentialsSignin:
      'Sign in failed. Check the details you provided are correct.',
    default: 'Unable to sign in.',
  }[errorKey ?? 'default']

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      form.setFieldValue('email', 'test@test.com')
      form.setFieldValue('password', 'password')
    }
  }, [])

  const handleSubmit = async (values: any) => {
    setLoading(true)
    setLoginError('')

    try {
      await login({ 
        email: values.email, 
        password: values.password
      })
    } catch (error) {
      console.error(error)
      setLoginError(error.message || 'Login failed. Please try again.')
    }
  }

  return (
    <Flex align="center" justify="center" vertical flex={1}>
      <Flex
        vertical
        style={{
          width: '340px',
          paddingBottom: '100px',
          paddingTop: '100px',
        }}
        gap="middle"
      >
        <AppHeader description="Welcome!" />

        {(errorKey || loginError) && (
          <Typography.Text type="danger">
            {loginError || errorMessage}
          </Typography.Text>
        )}

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <Input type="email" placeholder="Your email" autoComplete="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password
              type="password"
              placeholder="Your password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Flex justify="end">
              <Button
                type="link"
                onClick={() => router('/reset-password')}
                style={{ padding: 0, margin: 0 }}
              >
                Forgot password?
              </Button>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Sign in
            </Button>
          </Form.Item>
        </Form>

        <Button
          ghost
          style={{ border: 'none' }}
          onClick={() => router('/register')}
        >
          <Flex gap={'small'} justify="center">
            <Typography.Text type="secondary">No account?</Typography.Text>{' '}
            <Typography.Text>Sign up</Typography.Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}
