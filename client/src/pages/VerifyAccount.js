import { Button, message, Result } from 'antd';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CenteredContent from '../components/CenteredContent';
import PageSpinner from '../components/PageSpinner';
import { usePostCallback, usePostEffect } from '../hooks/axios';
import { AppLayout } from '../styles';

export default function VerifyAccount({ match }) {
  const { token } = match.params;
  const [error, setError] = useState(null);
  const [verifying, status] = usePostEffect(
    '/api/users/verify',
    {
      data: { token },
      onError: (error) => setError(error.response.data),
    },
    [],
  );

  const [resendVerification, resendingVerification] = usePostCallback(
    '/api/users/resend',
    {
      onSuccess: () =>
        message.success('Successfully resent verification token'),
      onError: () => message.error('Failed to resend verification token'),
    },
  );

  return (
    <AppLayout>
      {verifying ? (
        <PageSpinner />
      ) : status ? (
        <CenteredContent>
          <Result
            status="success"
            title={
              status.successfullyVerified
                ? 'Successfully verified'
                : status.userAlreadyVerified
                ? 'User already verified'
                : ''
            }
            extra={[
              <RouterLink to="/">
                <Button>Go Home</Button>
              </RouterLink>,
            ]}
          ></Result>
        </CenteredContent>
      ) : (
        error && (
          <CenteredContent>
            <Result
              status="error"
              title={
                error.tokenDoesntExist
                  ? 'Token does not exist'
                  : error.userDoesntExist
                  ? 'User does not exist'
                  : ''
              }
              extra={[
                true && (
                  <Button
                    type="primary"
                    loading={resendingVerification}
                    onClick={resendVerification}
                  >
                    Resend Verification Token
                  </Button>
                ),
              ]}
            ></Result>
          </CenteredContent>
        )
      )}
    </AppLayout>
  );
}
