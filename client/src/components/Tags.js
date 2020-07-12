import React from 'react';
import { Tag } from 'antd';

export default function Tags({ tags }) {
  return tags.map((tag) => <Tag key={tag}>{tag}</Tag>);
}
