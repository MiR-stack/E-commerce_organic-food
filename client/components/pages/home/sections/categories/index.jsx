"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Card from "./Card";

function Categories({ categories }) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      navigation
      breakpoints={{
        350: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        900: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }}
      modules={[Navigation]}
      style={{
        "--swiper-navigation-color": "#fff",
      }}
    >
      {categories.data.map((category) => (
        <SwiperSlide key={category.id}>
          <Card {...category.attributes} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Categories;
