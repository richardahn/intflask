/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Layout,
  Button,
  Typography,
  Space,
  List,
  Avatar,
  Tag,
  Breadcrumb,
  Tooltip,
} from 'antd';
import PageSpinner from '../components/PageSpinner';
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
  HomeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { AppLayout, PaddedContent, AppHeader } from '../styles';

const { Content, Header } = Layout;
const { Title, Text, Link } = Typography;

export default function FloatingActionButton({
  top = '4rem',
  right = '1.5rem',
  children,
  ...props
}) {
  return (
    <div css={{ position: 'fixed', top, right, zIndex: 2 }} {...props}>
      {children}
    </div>
  );
}
