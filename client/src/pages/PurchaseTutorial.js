/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import {
  Layout,
  Carousel,
  Button,
  Divider,
  message,
  Skeleton,
  Empty,
  Descriptions,
  Typography,
  Rate,
  Tree,
  Comment,
  Tooltip,
  List,
  Statistic,
  Row,
  Input,
  Space,
  Avatar,
  Result,
  Card,
  Col,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Tags from '../components/Tags';
import ErrorContent from '../components/ErrorContent';
import { AppLayout, PaddedContent } from '../styles';
import {
  useGetEffect,
  usePostEffect,
  usePostCallback,
  useGetCallback,
} from '../hooks/axios';
import axios from 'axios';
import { parseTutorialDates } from '../utils/tutorial';
import Modal from 'antd/lib/modal/Modal';
import PageSpinner from '../components/PageSpinner';
import CenteredContent from '../components/CenteredContent';
import {
  StripeProvider,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from 'react-stripe-elements';

const { Text } = Typography;

function CheckoutForm({ tutorial, stripe, history }) {
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState(null);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const submitOrder = useCallback(
    async (event) => {
      event.preventDefault();
      setSubmittingOrder(true);
      try {
        const freeTutorial = tutorial.price === 0;
        let data = {};
        if (!freeTutorial) {
          const { token, error } = await stripe.createToken();
          if (error) throw error;
          data = {
            source: token.id,
            receipt_email: 'richahn2@gmail.com',
          };
        }
        const response = await axios.post(
          `/api/purchase/${tutorial.slug}`,
          data,
        );
        setReceiptUrl(response.data.receipt_url);
        setPaymentSuccessful(true);
      } catch (error) {
        console.error(error);
        message.error(error.message);
      } finally {
        setSubmittingOrder(false);
      }
    },
    [tutorial],
  );

  return paymentSuccessful ? (
    <CenteredContent>
      <Result
        status="success"
        title="Payment Successful!"
        extra={[
          receiptUrl && (
            <Button href={receiptUrl} target="_blank">
              View Receipt
            </Button>
          ),
          <RouterLink to={`/view-tutorial/${tutorial.slug}`}>
            <Button type="primary">Go To Tutorial</Button>
          </RouterLink>,
        ]}
      ></Result>
    </CenteredContent>
  ) : (
    <PaddedContent
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: '2rem',
      }}
    >
      <Card
        title="Purchase Tutorial"
        css={css`
          flex: 1;
          max-width: 500px;
          input,
          .StripeElement {
            height: 40px;
            padding: 10px 12px;

            color: #32325d;
            background-color: white;
            border: 1px solid #f0f0f0;
            border-radius: 4px;
          }

          input:focus,
          .StripeElement--focus {
            box-shadow: 0 1px 3px 0 #cfd7df;
          }

          .StripeElement--invalid {
            border-color: #fa755a;
          }

          .StripeElement--webkit-autofill {
            background-color: #fefde5 !important;
          }
        `}
      >
        <form onSubmit={submitOrder}>
          <Row gutter={[0, 24]} css={{ marginBottom: '0 !important' }}>
            <Col span={24}>
              <Descriptions title="Details" bordered>
                <Descriptions.Item label="Name" span={3}>
                  {tutorial.name}
                </Descriptions.Item>
                <Descriptions.Item label="Price" span={3}>
                  ${tutorial.price.toFixed(2)}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            {tutorial.price !== 0 && (
              <div>
                <Col span={24}>
                  <Descriptions title="Payment"></Descriptions>
                  <label>
                    <Text strong>Card Details</Text>
                    <CardNumberElement css={{ marginTop: '0.3rem' }} />
                  </label>
                </Col>
                <Col span={24}>
                  <label>
                    <Text strong>Expiration date</Text>
                    <CardExpiryElement css={{ marginTop: '0.3rem' }} />
                  </label>
                </Col>
                <Col span={24}>
                  <label>
                    <Text strong>CVC</Text>
                    <CardCVCElement css={{ marginTop: '0.3rem' }} />
                  </label>
                </Col>
              </div>
            )}
            <Col span={24} css={{ paddingBottom: '0 !important' }}>
              <Button
                htmlType="submit"
                type="primary"
                loading={submittingOrder}
                css={{ width: '100%' }}
              >
                {tutorial.price === 0 ? 'Get' : 'Pay'}
              </Button>
            </Col>
          </Row>
        </form>
      </Card>
    </PaddedContent>
  );
}
CheckoutForm = injectStripe(withRouter(CheckoutForm));

export default function PurchaseTutorial({ match }) {
  const { slug } = match.params;
  const [loadingTutorial, tutorial] = useGetEffect(
    `/api/tutorials/${slug}`,
    {
      onError: () => message.error('Failed to fetch tutorial'),
    },
    [],
  );
  return (
    <AppLayout>
      {loadingTutorial ? (
        <PageSpinner />
      ) : tutorial ? (
        <StripeProvider apiKey="pk_test_51H6STZHFlstueRplazEH5UMyg0TyjbVRkIp6UDQd0PR9BYrNfnYhvjtyRTMwNudw7ShW0P9iT45ein0yOUJQvxiW00dcbydJ24">
          <Elements>
            <CheckoutForm tutorial={tutorial} />
          </Elements>
        </StripeProvider>
      ) : (
        <CenteredContent>
          <Result
            status="error"
            title="Purchase Failed"
            subTitle="Failed to reach the server. Try again later."
          ></Result>
        </CenteredContent>
      )}
    </AppLayout>
  );
}
