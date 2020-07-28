/** @jsx jsx */
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { jsx } from '@emotion/core';
import {
  Alert,
  Breadcrumb,
  Button,
  Divider,
  Empty,
  message,
  Skeleton,
  Spin,
  Tooltip,
  Typography,
} from 'antd';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import FloatingActionButton from '../components/FloatingActionButton';
import TutorialList, {
  AdminTutorialListItem,
} from '../components/TutorialList';
import { useGetCallback, useGetEffect, usePostCallback } from '../hooks/axios';
import { AppHeader, AppLayout, PaddedContent } from '../styles';

const { Link } = Typography;

export default function Administrator() {
  const [notVerified, setNotVerified] = useState(null);
  const [notConnectedToStripe, setNotConnectedToStripe] = useState(null);
  const [loadingTutorials, tutorials] = useGetEffect(
    '/api/admin/tutorials',
    {
      onError: (error) => {
        if (error.response.data.notVerified) {
          setNotVerified(true);
        } else if (error.response.data.notConnectedToStripe) {
          setNotConnectedToStripe(true);
        } else {
          message.error('Failed to load tutorials');
        }
      },
    },
    [],
  );
  const [resendVerificationEmail, resendingVerificationEmail] = usePostCallback(
    '/api/users/resend',
    {
      onSuccess: () => message.success('Successfully sent verification email'),
      onError: () => message.error('Failed to resend verification email'),
    },
  );

  const [setupStripeAccount, settingUpStripeAccount] = useGetCallback(
    '/auth/stripe',
    {
      onSuccess: (response) => (window.location = response.data),
      onError: () => message.error('Failed to setup an account with stripe'),
    },
  );
  return (
    <AppLayout>
      <AppHeader css={{ height: 'initial' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <HomeOutlined /> Admin Home
          </Breadcrumb.Item>
        </Breadcrumb>
      </AppHeader>
      {notVerified ? (
        <PaddedContent css={{ marginTop: '1rem' }}>
          <Alert
            message="Unauthorized"
            description={
              <div>
                You must verify your account to start creating tutorials. Click{' '}
                {resendingVerificationEmail && <Spin />}{' '}
                <Link onClick={resendVerificationEmail}>here</Link> to resend a
                verification email.
              </div>
            }
            type="warning"
            showIcon
            css={{ marginBottom: '1rem' }}
          />
          <RouterLink to="/">
            <Button type="primary" size="large">
              Go Back Home
            </Button>
          </RouterLink>
        </PaddedContent>
      ) : notConnectedToStripe ? (
        <PaddedContent css={{ marginTop: '2rem' }}>
          <h2>Setup an Account with Stripe</h2>
          <p>
            In order to use our service and make money, you will need to setup
            an account with Stripe, a secure money transfer protocol.
          </p>
          <Button onClick={setupStripeAccount} loading={settingUpStripeAccount}>
            Setup an Account
          </Button>
        </PaddedContent>
      ) : (
        <PaddedContent>
          <FloatingActionButton>
            <Tooltip title="Add Tutorial" placement="left">
              <RouterLink to="/admin/create-tutorial">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                  css={{
                    width: 40,
                    height: 40,
                    boxShadow:
                      '0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05)',
                  }}
                />
              </RouterLink>
            </Tooltip>
          </FloatingActionButton>
          <Divider orientation="left">Created Tutorials</Divider>
          {loadingTutorials ? (
            <Skeleton active />
          ) : tutorials && tutorials.length > 0 ? (
            <TutorialList
              tutorials={tutorials}
              itemRenderer={AdminTutorialListItem}
            />
          ) : (
            <Empty description="No Tutorials" />
          )}
        </PaddedContent>
      )}
    </AppLayout>
  );
}
