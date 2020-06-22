/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import React, { useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  Space,
  notification,
  PageHeader,
  InputNumber,
} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const { Content, Header } = Layout;
const { Title, Text } = Typography;

export default function CreateCourse({ history }) {
  const onBack = useCallback(() => history.goBack(), [history]);
  const onFinish = useCallback((values) => {
    console.log('Success: ', values);
  }, []);
  const onFinishFailed = useCallback((errorInfo) => {
    console.log('Failure: ', errorInfo);
  }, []);
  return (
    <Layout>
      <PageHeader
        css={{ backgroundColor: 'white' }}
        className="site-page-header"
        onBack={onBack}
        title="Create Course"
        subTitle="Subtitle"
      >
        <Text type="secondary">
          This course will not be immediately available to the public. You will
          have the option to deploy your course after its creation.
        </Text>
      </PageHeader>
      <Content css={{ backgroundColor: 'white', padding: '0 3rem' }}>
        <Row>
          <Col>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{ coursePrice: 5 }}
              layout="vertical"
            >
              <Form.Item label="Course Name" name="courseName">
                <Input />
              </Form.Item>
              <Form.Item label="Technology Stack" name="technologyStack">
                <Input />
              </Form.Item>
              <Form.Item label="Pricing">
                <Form.Item name="coursePrice" noStyle>
                  <InputNumber
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    min={0}
                    max={100}
                  />
                </Form.Item>
              </Form.Item>
              <Form.Item css={{ marginBottom: 0 }}>
                <Space>
                  <Button type="secondary">Cancel</Button>
                  <RouterLink to="/admin/edit-course/777">
                    <Button type="primary" htmlType="submit">
                      Start Editing
                    </Button>
                  </RouterLink>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
