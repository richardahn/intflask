/** @jsx jsx */
import { CloseCircleOutlined } from '@ant-design/icons';
import { jsx } from '@emotion/core';
import { Typography } from 'antd';
import CenteredContent from './CenteredContent';
const { Text } = Typography;

export default function ErrorContent({ children, ...props }) {
  return (
    <CenteredContent>
      <Text>
        <CloseCircleOutlined /> {children}
      </Text>
    </CenteredContent>
  );
}
