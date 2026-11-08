import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Carousel({ images }) {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="w-full rounded-3xl"
    >
      {images.map((img) => (
        <SwiperSlide key={img.src}>
          <img src={img.src} alt={img.alt} className="w-full object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
