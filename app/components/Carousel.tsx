'use client'

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselProps {
  data: { poster_path: string }[];
}

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={false}
        // slidesPerGroupSkip={1}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        freeMode={true}
        scrollbar={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Keyboard, Scrollbar, Navigation, Pagination]}
        className="mySwiper"
      >
      {data.map((item, index) => (
        
        <SwiperSlide key={index}>
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={`Slide ${index + 1}`}
          />
        </SwiperSlide>
      ))}
      </Swiper>
    </>
  );
}

export default Carousel;