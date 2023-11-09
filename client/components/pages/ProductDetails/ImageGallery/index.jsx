"use client";
import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { getFormatedImage } from "../../../../utils";

export default function ImageGallery({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  let swiperImages = images.default.images.data.map((image) => {
    const { srcs, alt } = getFormatedImage({ data: image });
    return {
      srcs,
      alt,
      id: images.default.id,
      type: "parent",
    };
  });
  images.variations?.forEach((variation) => {
    const { srcs, alt } = getFormatedImage(variation.image);
    swiperImages.push({ id: variation.id, srcs, alt, type: "variant" });
  });

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {swiperImages.map((image) => (
          <SwiperSlide key={image.srcs.thumbnail}>
            <img src={image.srcs.medium} alt={image.alt || "product image"} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {swiperImages.map((image) => (
          <SwiperSlide key={image.srcs.thumbnail}>
            <img
              src={image.srcs.thumbnail}
              alt={image.alt || "product image"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
