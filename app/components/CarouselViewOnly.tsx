'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

interface CarouselProps {
  data: { poster_path: string; id: number, media_type: string }[];
}


// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';

const Carousel: React.FC<CarouselProps> = ({ data }) => {


  const myLoader = ({ src }: any) => {
    return `https://image.tmdb.org/t/p/w400${src}`;
  };

  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        centeredSlides={false}
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
            <Image
              loader={myLoader}
              src={item.poster_path} // Pass the relative path only
              alt={`Slide ${index + 1}`}
              className="cursor-pointer"
              width={400}
              height={400}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Carousel;