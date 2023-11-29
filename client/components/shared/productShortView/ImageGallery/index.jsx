"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {
  Image,
  mySwiper,
  mySwiper2,
  mySwiperSlide,
  mySwiperSlideThumbActive,
  swiper,
  swiperSlide,
} from "./styles.module.css";
import "./styles.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { getFormatedImage } from "../../../../utils";
import { Box, useMediaQuery } from "@mui/material";

export default function ImageGallery({ images, variant }) {
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

  const sm = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <Box sx={{ height: { xs: 200, md: "100%" } }}>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          height: variant === "quickView" && sm ? "200px" : "",
        }}
        loop
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`${mySwiper2} ${swiper}`}
      >
        {swiperImages.map((image) => (
          <SwiperSlide
            key={image.srcs.thumbnail}
            className={swiperSlide}
            style={
              variant === "quickView"
                ? { borderRadius: "10px", overflow: "hidden" }
                : {}
            }
          >
            <img
              src={image.srcs.medium}
              alt={image.alt || "product image"}
              className={Image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {variant !== "quickView" ? (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={`${swiper} ${mySwiper}`}
        >
          {swiperImages.map((image) => (
            <SwiperSlide
              key={image.srcs.thumbnail}
              className={`${mySwiperSlide} ${swiperSlide} ${mySwiperSlideThumbActive}`}
            >
              <img
                src={image.srcs.thumbnail}
                alt={image.alt || "product image"}
                className={Image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        ""
      )}
    </Box>
  );
}
