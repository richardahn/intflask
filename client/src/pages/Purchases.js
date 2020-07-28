/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Divider, Empty, message, Skeleton } from 'antd';
import CenteredContent from '../components/CenteredContent';
import TutorialList, {
  PurchasedTutorialListItem,
} from '../components/TutorialList';
import { useGetEffect } from '../hooks/axios';
import { AppLayout, PaddedContent } from '../styles';

export default function Purchases(props) {
  const [loadingPurchases, purchases] = useGetEffect(
    '/api/purchased-tutorials',
    {
      onError: () => message.error('Failed to load purchased tutorials'),
    },
    [],
  );
  return (
    <AppLayout>
      {loadingPurchases ? (
        <PaddedContent>
          <Skeleton active />
        </PaddedContent>
      ) : purchases ? (
        purchases.length > 0 ? (
          <PaddedContent>
            <Divider orientation="left">Purchased Tutorials</Divider>
            <TutorialList
              tutorials={purchases}
              itemRenderer={PurchasedTutorialListItem}
            />
          </PaddedContent>
        ) : (
          <CenteredContent>
            <Empty description="No purchased tutorials" />
          </CenteredContent>
        )
      ) : (
        <CenteredContent>
          <Empty description="Could not fetch purchased tutorials" />
        </CenteredContent>
      )}
    </AppLayout>
  );
}
