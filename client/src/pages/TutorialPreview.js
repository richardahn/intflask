/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Layout, Carousel, Button } from 'antd';

const { Content } = Layout;

const carouselHeight = 320;

function CarouselItem({ children }) {
  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'center',
        height: carouselHeight,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

export default function TutorialPreview() {
  return (
    <Layout css={{ backgroundColor: 'white' }}>
      <Content>
        <div css={{ position: 'relative' }}>
          <Carousel
            css={{
              background: 'black',
              color: 'white',
              height: carouselHeight,
              textAlign: 'center',
            }}
          >
            <CarouselItem>
              <img
                src="https://picsum.photos/1000/1000"
                css={{ objectFit: 'cover', width: '100%' }}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://picsum.photos/1100/1000"
                css={{ objectFit: 'cover', width: '100%' }}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://picsum.photos/1000/1100"
                css={{ objectFit: 'cover', width: '100%' }}
              />
            </CarouselItem>
          </Carousel>
          <div css={{ position: 'absolute', bottom: 10, right: 10 }}>
            <Button>Purchase</Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
}
