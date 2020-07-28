/** @jsx jsx */
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { jsx } from '@emotion/core';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Layout,
  Row,
  Typography,
} from 'antd';
import { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { loginUser } from '../actions/auth';
import { GoogleLoginButton } from '../components/intflask-antd';
const { Content } = Layout;
const { Title, Text } = Typography;

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 23,
  },
};
const tailLayout = {
  wrapperCol: { span: 16 },
};

function LoginForm({ onLogin, serversideValidationErrors }) {
  const [form] = Form.useForm();
  const onFinish = useCallback((values) => {
    onLogin(values); // Server side validation
  });
  useEffect(() => {
    if (serversideValidationErrors) {
      const errs = [];
      if (
        serversideValidationErrors.email ||
        serversideValidationErrors.emailnotfound
      ) {
        errs.push({
          name: 'email',
          errors: [
            serversideValidationErrors.email,
            serversideValidationErrors.emailnotfound,
          ],
        });
      }
      if (
        serversideValidationErrors.password ||
        serversideValidationErrors.passwordincorrect
      ) {
        errs.push({
          name: 'password',
          errors: [
            serversideValidationErrors.password,
            serversideValidationErrors.passwordincorrect,
          ],
        });
      }
      form.setFields(errs);
    }
  }, [serversideValidationErrors]);

  return (
    <Form
      form={form}
      layout="vertical"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      validateMessages={{
        types: {
          email: 'Not a valid ${type}',
        },
      }}
      {...layout}
    >
      <Form.Item
        label="Email"
        name="email"
        css={{ marginBottom: '0.5rem' }}
        rules={[{ type: 'email' }]}
      >
        <Input prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        css={{ marginBottom: '0.25rem' }}
      >
        <Input.Password prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item>
        <div css={{ justifyContent: 'space-between', display: 'flex' }}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          {/* <Text>
            <Link>Forgot your password?</Link>
          </Text> */}
        </div>
      </Form.Item>
      <Form.Item {...tailLayout} css={{ marginBottom: 0 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

function Login({ loginUser, serversideValidationErrors }) {
  return (
    <Content
      css={{
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '2rem',
      }}
    >
      <Card css={{ margin: '1rem', maxWidth: '600px', flexGrow: 1 }}>
        <Row>
          <Col span={24}>
            <Title level={3} css={{ marginBottom: '0 !important' }}>
              Login
            </Title>
            <Text>
              Don't have an account?{' '}
              <RouterLink to="/signup">Sign up</RouterLink>
            </Text>
          </Col>
        </Row>
        <Row css={{ marginTop: '1rem' }}>
          <Col xs={24} lg={15}>
            <LoginForm
              onLogin={loginUser}
              serversideValidationErrors={serversideValidationErrors}
            />
          </Col>
          <Col xs={0} lg={1}>
            <Divider type="vertical" css={{ height: '100%' }} />
          </Col>
          <Col xs={24} lg={0}>
            <Divider type="horizontal" css={{ marginTop: '1.5rem' }} />
          </Col>
          <Col xs={24} lg={8}>
            <GoogleLoginButton />
          </Col>
        </Row>
      </Card>
    </Content>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  serversideValidationErrors: state.errors,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
