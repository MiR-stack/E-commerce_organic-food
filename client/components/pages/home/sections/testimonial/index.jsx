"use client";

import TestimonialCard from "./card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";

function Testimonial({ testimonials }) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      navigation
      breakpoints={{
        400: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        900: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }}
      modules={[Navigation]}
    >
      {testimonials.data.map((testimonial) => {
        const { review, rating, profile } = testimonial.attributes;
        const { firstName, lastName, avatar } = profile.data.attributes;

        const data = {
          avatar,
          name: `${firstName} ${lastName}`,
          review,
          rating,
        };
        return (
          <SwiperSlide key={testimonial.id}>
            <TestimonialCard {...data} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Testimonial;
