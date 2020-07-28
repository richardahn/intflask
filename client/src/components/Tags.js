import { Tag } from 'antd';
import React from 'react';

export default function Tags({ tags }) {
  return tags.map((tag) => <Tag key={tag}>{tag}</Tag>);
}
