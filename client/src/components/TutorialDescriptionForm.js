/** @jsx jsx */
// -- General Imports --
import { jsx } from '@emotion/core';
import { Button, Form, Input, InputNumber } from 'antd';
import { useCallback, useState } from 'react';
import InputTags from '../components/InputTags';

export default function TutorialDescriptionForm({
  initialState,
  onSubmit,
  saving,
}) {
  const [technologyStack, setTechnologyStack] = useState(
    initialState?.technologyStack ? initialState.technologyStack : [],
  );
  const onFinish = useCallback(
    (rawValues) => {
      const values = { ...rawValues, technologyStack };
      onSubmit(values);
    },
    [technologyStack, onSubmit],
  );
  return (
    <Form name="basic" initialValues={initialState} onFinish={onFinish}>
      <Form.Item label="Tutorial Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Technology Stack">
        <InputTags tags={technologyStack} onChange={setTechnologyStack} />
      </Form.Item>
      <Form.Item label="Price" name="price">
        <InputNumber
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          min={0}
          max={100}
        />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="primary" htmlType="submit" loading={saving}>
            Save
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
