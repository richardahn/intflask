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
  Steps,
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
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { connect } from 'react-redux';

const { Step } = Steps;
const { Text } = Typography;

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function CardSection() {
  return (
    <label>
      <Text strong css={{ display: 'block', marginBottom: '0.4rem' }}>
        Card Details
      </Text>
      <CardElement
        options={{
          style: {
            base: {
              color: '#32325d',
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSmoothing: 'antialiased',
              fontSize: '16px',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#fa755a',
              iconColor: '#fa755a',
            },
          },
        }}
      />
    </label>
  );
}

function CheckoutForm({ tutorial, name, clientSecret, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = useCallback(
    async (event) => {
      console.log('entered form', stripe, elements);
      event.preventDefault();
      if (!stripe || !elements) return;
      try {
        setSubmitting(true);
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name,
            },
          },
        });

        if (result.error) {
          message.error(result.error.message);
          console.error(result.error);
        } else {
          if (result.paymentIntent.status === 'succeeded' && onSuccess) {
            await onSuccess(result.paymentIntent);
          }
        }
      } catch (error) {
        console.error(error);
        message.error('Encountered an unknown error while checking out');
      } finally {
        setSubmitting(false);
      }
    },
    [clientSecret, name, onSuccess, stripe, elements],
  );
  return (
    <div
      css={css`
        .StripeElement {
          height: 40px;
          padding: 10px 12px;
          width: 100%;
          color: #32325d;
          background-color: white;
          border: 1px solid transparent;
          border-radius: 4px;

          box-shadow: 0 1px 3px 0 #e6ebf1;
          -webkit-transition: box-shadow 150ms ease;
          transition: box-shadow 150ms ease;
        }

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
      <form onSubmit={onSubmit}>
        <Row gutter={[0, 24]} css={{ marginBottom: '0 !important' }}>
          <Col span={24}>
            <CardSection />
          </Col>
          <Col
            span={24}
            css={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingBottom: '0 !important',
            }}
          >
            <Space size="middle">
              <RouterLink to={`/tutorial-preview/${tutorial.slug}`}>
                <Button>Cancel</Button>
              </RouterLink>
              <Button
                htmlType="submit"
                type="primary"
                loading={submitting}
                disabled={!stripe}
              >
                Pay
              </Button>
            </Space>
          </Col>
        </Row>
      </form>
    </div>
  );
}
CheckoutForm = connect((state) => ({
  name: state.auth.user.name,
}))(CheckoutForm);

function ConfirmPurchase({ tutorial, onConfirm, confirming }) {
  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <Descriptions title="Details" bordered css={{ marginTop: '2rem' }}>
          <Descriptions.Item label="Tutorial Name" span={3}>
            {tutorial.name}
          </Descriptions.Item>
          <Descriptions.Item label="Price" span={3}>
            ${tutorial.price.toFixed(2)}
          </Descriptions.Item>
        </Descriptions>
      </Col>
      <Col span={24} css={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Space size="middle">
          <RouterLink to={`/tutorial-preview/${tutorial.slug}`}>
            <Button>Cancel</Button>
          </RouterLink>
          <Button type="primary" onClick={onConfirm} loading={confirming}>
            Confirm
          </Button>
        </Space>
      </Col>
    </Row>
  );
}
function Payment({ tutorial, clientSecret, onPay }) {
  return (
    <Row gutter={[0, 24]}>
      <Col span={24} css={{ display: 'flex', justifyContent: 'center' }}>
        <Card css={{ maxWidth: '500px', flex: 1, marginTop: '1rem' }}>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              tutorial={tutorial}
              clientSecret={clientSecret}
              onSuccess={onPay}
            />
          </Elements>
        </Card>
      </Col>
    </Row>
  );
}
function Success({ tutorial }) {
  return (
    <Result
      status="success"
      title="Successfully Purchased Tutorial!"
      subTitle="Thank you for purchasing this tutorial. Please allow a short moment for Stripe to process the payment."
      extra={[
        <RouterLink to={`/view-tutorial/${tutorial.slug}`}>
          <Button type="primary" key="tutorial">
            Go To Tutorial
          </Button>
        </RouterLink>,
      ]}
    />
  );
}

export default function PurchaseTutorial({ match }) {
  const { slug } = match.params;
  const [loadingTutorial, tutorial] = useGetEffect(
    `/api/tutorials/${slug}`,
    {
      onError: () => message.error('Failed to fetch tutorial'),
    },
    [],
  );
  // -- Steps --
  const [currentStep, setCurrentStep] = useState(0);
  const [stripeClientSecret, setStripeClientSecret] = useState(null);

  // -- Api Calls --
  const [confirmPurchase, confirmingPurchase] = usePostCallback(
    `/api/purchase/intent/${slug}`,
    {
      onSuccess: (response) => {
        setStripeClientSecret(response.data.client_secret);
        setCurrentStep(1);
      },
      onError: () => message.error('Failed to confirm purchase'),
    },
    [],
  );
  const addPurchaseToDatabase = useCallback(
    async (paymentIntentId) => {
      try {
        await axios.post('/api/purchase/complete-intflask-side', {
          tutorialSlug: slug,
          stripePaymentIntentId: paymentIntentId,
        });
      } catch (error) {
        console.error(error);
        message.error('Failed to complete purchase');
      }
    },
    [slug],
  );
  return (
    <AppLayout>
      {loadingTutorial ? (
        <PageSpinner />
      ) : tutorial ? (
        <PaddedContent
          css={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}
        >
          <div css={{ maxWidth: '700px', flex: 1 }}>
            <Steps current={currentStep}>
              <Step title="Confirm Purchase" />
              <Step title="Payment" />
              <Step title="Success!" />
            </Steps>
            {currentStep === 0 ? (
              <ConfirmPurchase
                tutorial={tutorial}
                onConfirm={confirmPurchase}
                confirming={confirmingPurchase}
              />
            ) : currentStep === 1 ? (
              <Payment
                tutorial={tutorial}
                clientSecret={stripeClientSecret}
                onPay={async (paymentIntent) => {
                  await addPurchaseToDatabase(paymentIntent.id);
                  setCurrentStep(2);
                }}
              />
            ) : (
              currentStep === 2 && <Success tutorial={tutorial} />
            )}
          </div>
        </PaddedContent>
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
