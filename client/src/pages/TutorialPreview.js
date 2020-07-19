/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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

const { Content } = Layout;
const { Text } = Typography;
const { TextArea } = Input;

function Reviews({ tutorial, onSubmitReview }) {
  const reviews = [...tutorial.reviews].sort((a, b) =>
    b.date > a.date ? 1 : -1,
  );
  const numRatings = reviews.length;
  let averageRating = 0;
  if (numRatings > 0) {
    averageRating =
      reviews.reduce((total, { rating }) => total + rating, 0) / numRatings;
  }
  console.log(reviews);
  const [writeReviewModalVisible, setWriteReviewModalVisible] = useState(false);
  const defaultRatingInput = 5;
  const defaultCommentInput = '';
  const [ratingInput, setRatingInput] = useState(defaultRatingInput);
  const [commentInput, setCommentInput] = useState(defaultCommentInput);
  const closeWriteReviewModal = useCallback(() => {
    setWriteReviewModalVisible(false);
    setRatingInput(defaultRatingInput);
    setCommentInput(defaultCommentInput);
  }, []);
  const [submitReview, submittingReview] = usePostCallback(
    `/api/tutorials/${tutorial.slug}/review`,
    {
      data: {
        rating: ratingInput,
        comment: commentInput,
      },
      onSuccess: () => {
        message.success('Successfully submitted review');
        closeWriteReviewModal();
        if (onSubmitReview) {
          onSubmitReview();
        }
      },
      onError: (error) => message.error(error.response.data),
    },
    [ratingInput, commentInput],
  );
  const validateThenSubmitReview = useCallback(() => {
    if (commentInput === '') {
      message.error('You must enter a comment');
    } else {
      submitReview();
    }
  }, [ratingInput, commentInput]);
  console.log('xxx', tutorial);
  return (
    <div>
      <div css={{ display: 'flex', justifyContent: 'space-between' }}>
        <div css={{ display: 'flex', flexDirection: 'column' }}>
          <Space css={{ display: 'flex', alignItems: 'center' }}>
            <Rate
              disabled
              value={Math.floor(averageRating * 2) / 2}
              allowHalf
            />{' '}
            {numRatings > 0 ? (
              <Statistic
                value={averageRating}
                suffix="out of 5"
                precision={1}
              />
            ) : (
              <Text>No Ratings</Text>
            )}
          </Space>
          <Text type="secondary">{numRatings} ratings</Text>
        </div>
        {tutorial.purchased && !tutorial.reviewed && (
          <Button onClick={() => setWriteReviewModalVisible(true)}>
            Write A Review
          </Button>
        )}
        <Modal
          title="Write A Review"
          visible={writeReviewModalVisible}
          onOk={validateThenSubmitReview}
          onCancel={closeWriteReviewModal}
          confirmLoading={submittingReview}
        >
          <Space>
            <Text strong>Rating: </Text>
            <Rate allowHalf value={ratingInput} onChange={setRatingInput} />
          </Space>
          <div>
            <Text strong>Comment: </Text>
            <TextArea
              value={commentInput}
              onChange={(event) => setCommentInput(event.target.value)}
              rows={4}
            />
          </div>
        </Modal>
      </div>
      {numRatings > 0 ? (
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={reviews}
          renderItem={(review) => (
            <li>
              <Comment
                author={review.userId.firstName + ' ' + review.userId.lastName}
                avatar={<Avatar>{review.userId.firstName.charAt(0)}</Avatar>}
                content={
                  <div>
                    <div>
                      <Text strong>Rated: {review.rating}/5</Text>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                }
                datetime={
                  <span>{review.date.toLocaleDateString('en-US')}</span>
                }
              />
            </li>
          )}
        />
      ) : (
        <Empty description="No Reviews Yet" />
      )}
    </div>
  );
}

export default function TutorialPreview({ match }) {
  const { slug } = match.params;
  const [loadTutorial, loadingTutorial, tutorial] = useGetCallback(
    `/api/tutorials/${slug}`,
    {
      defaultLoadingValue: true,
      transformValue: (tutorial) => parseTutorialDates(tutorial),
      onError: () => message.error('Failed to fetch tutorial'),
    },
    [],
  );
  useEffect(() => loadTutorial(), []);
  return (
    <AppLayout>
      {loadingTutorial ? (
        <PaddedContent>
          <Skeleton active />
        </PaddedContent>
      ) : tutorial ? (
        <PaddedContent>
          <div css={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h2 css={{ display: 'inline', marginRight: '0.5rem' }}>
                {tutorial.name}
              </h2>
              <Text type="secondary">
                ({tutorial.purchases.length}{' '}
                {tutorial.purchases.length === 1 ? 'person' : 'people'}{' '}
                purchased)
              </Text>
            </div>
            {tutorial.purchased ? (
              <RouterLink to={`/view-tutorial/${slug}`}>
                <Button>Go To Tutorial</Button>
              </RouterLink>
            ) : tutorial.price === 0 ? (
              <RouterLink to={`/purchase-tutorial/${slug}`}>
                <Button>Get</Button>
              </RouterLink>
            ) : (
              <RouterLink to={`/purchase-tutorial/${slug}`}>
                <Button type="primary">Buy ${tutorial.price}</Button>
              </RouterLink>
            )}
          </div>
          <Divider orientation="left">Details</Divider>
          <Descriptions bordered>
            <Descriptions.Item label="Author">
              {tutorial.userId.firstName + ' ' + tutorial.userId.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Technology Stack" span={2}>
              <Tags tags={tutorial.technologyStack} />
            </Descriptions.Item>
            <Descriptions.Item label="Date Created">
              <Text>{tutorial.creationDate.toLocaleDateString('en-US')}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Last Modified" span={2}>
              <Text>{tutorial.modifiedDate.toLocaleDateString('en-US')}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={3}>
              <Text>{tutorial.description}</Text>
            </Descriptions.Item>
          </Descriptions>
          <Divider orientation="left">Outline</Divider>
          <Tree
            treeData={tutorial.outline}
            switcherIcon={<DownOutlined />}
            showLine
          />
          <Divider orientation="left">Reviews</Divider>
          <Reviews tutorial={tutorial} onSubmitReview={loadTutorial} />
        </PaddedContent>
      ) : (
        <ErrorContent>Failed to fetch tutorial</ErrorContent>
      )}
    </AppLayout>
  );
}
