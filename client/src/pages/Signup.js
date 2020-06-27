/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { Component, useCallback, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signupUser } from '../actions/auth';
import SignupImage from '../assets/signup.jpg';
import SignupImageTiny from '../assets/signup-tiny.jpg';

import {
  Card,
  Layout,
  Col,
  Row,
  Typography,
  Divider,
  Form,
  Input,
  Button,
  Checkbox,
  message,
} from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { GoogleLoginButton } from '../components/intflask-antd';
import ProgressiveImage from '../components/ProgressiveImage';
const { Content, Header } = Layout;
const { Title, Text, Link } = Typography;

function SignupForm({ onSignup, errors }) {
  const [form] = Form.useForm();
  const onFinish = useCallback((values) => {
    console.log('Client side validation succeeded: ', values);
    onSignup(values);
  });
  const onFinishFailed = useCallback((errorInfo) => {
    console.log('Client side validation failed: ', errorInfo);
  });
  useEffect(() => {
    const errs = [];
    if (errors.firstName) {
      errs.push({
        name: 'firstName',
        errors: [errors.firstName],
      });
    }
    if (errors.email) {
      errs.push({
        name: 'email',
        errors: [errors.email],
      });
    }
    if (errors.password) {
      errs.push({
        name: 'password',
        errors: [errors.password],
      });
    }
    if (errors.passwordConfirm) {
      errs.push({
        name: 'passwordConfirm',
        errors: [errors.passwordConfirm],
      });
    }
    form.setFields(errs);
  }, [errors]);
  return (
    <Form
      form={form}
      layout="vertical"
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      validateMessages={{
        types: {
          email: 'Not a valid ${type}',
        },
      }}
    >
      <Form.Item label="Name" css={{ marginBottom: '0.5rem' }}>
        <Row gutter={6}>
          <Col lg={12} xs={24}>
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: 'First name is required' }]}
              css={{ marginBottom: 0 }}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={0} css={{ height: '0.2rem' }}></Col>
          <Col lg={12} xs={24}>
            <Form.Item name="lastName" css={{ marginBottom: 0 }}>
              <Input placeholder="Last Name(optional)" />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        css={{ marginBottom: '0.5rem' }}
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        css={{ marginBottom: '0.25rem' }}
        rules={[{ required: true, message: 'Password is required' }]}
      >
        <Input.Password />
      </Form.Item>
      <div>
        <Text>Use at least 6 characters(and at least 1 number)</Text>
      </div>
      <Form.Item
        label="Confirm Password"
        name="passwordConfirm"
        css={{ marginBottom: '1.3rem' }}
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input.Password />
      </Form.Item>

      <div css={{ marginBottom: '0.4rem' }}>
        <Text>
          By clicking Sign up, you agree to our <Link>Terms</Link>,{' '}
          <Link>Data Policy</Link> and <Link>Cookie Policy</Link>.
        </Text>
      </div>
      <Form.Item css={{ marginBottom: 0 }}>
        <Button type="primary" htmlType="submit">
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );
}

function Signup({ signupUser, errors, history }) {
  const onSignup = useCallback(
    (values) => {
      signupUser(values, () => {
        history.push('/login');
        message.success('Successfully created an account');
      });
    },
    [signupUser, history],
  );
  return (
    <Layout
      css={{
        backgroundColor: 'white',
        paddingTop: '2rem',
      }}
    >
      <Content
        css={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}
      >
        <Row align="stretch">
          <Col xs={24} sm={12} css={{ padding: '2rem' }}>
            <div css={{ marginBottom: '1.5rem' }}>
              <Title level={3} css={{ marginBottom: '0 !important' }}>
                Sign up
              </Title>
              <Text>
                Already have an account?{' '}
                <RouterLink to="/login">Login</RouterLink>
              </Text>
            </div>
            <SignupForm onSignup={onSignup} errors={errors} />
            <Col span={24}>
              <Divider type="horizontal" css={{ marginTop: '1.5rem' }} />
            </Col>
            <Col span={24}>
              <GoogleLoginButton />
            </Col>
          </Col>
          <Col xs={0} sm={12}>
            <ProgressiveImage
              src={SignupImage}
              placeholderSrc={SignupImageTiny}
              alt="Signup Image"
              css={{ maxWidth: '100%', width: '10000px' }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

// Maps store state to props
const mapStateToProps = (state) => ({
  errors: state.errors,
});

const mapDispatchToProps = {
  signupUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
