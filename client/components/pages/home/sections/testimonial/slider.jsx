"use client";

import TestimonialCard from "./card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function TestimonialSlider({ testimonials }) {
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
      style={{
        "--swiper-navigation-color": "black",
      }}
    >
      {testimonials.map((testimonial) => {
        const {
          review,
          rating,
          customer: { firstName, lastName, avatar },
        } = testimonial;

        const data = {
          avatar: avatar ? { data: { attributes: avatar } } : null,
          name: `${firstName} ${lastName}`,
          review,
          rating,
        };
        return (
          <SwiperSlide key={testimonial.id} style={{ padding: "20px 0" }}>
            <TestimonialCard {...data} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default TestimonialSlider;
