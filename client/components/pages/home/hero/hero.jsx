"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Box, Typography, Button, Stack } from "@mui/material";
import Image from "next/image";
import { getStrapiMedia } from "../../../../utils";
import { Backdrop } from "../../../utils";
import styled from "@emotion/styled";
import Link from "next/link";

const Offer = ({
  offer: { bannerOverlay, headline, subHeadline, image, ctaButton },
}) => {
  const { url, alternativeText } = image.data.attributes;

  const src = getStrapiMedia(url);

  const Content = styled(Stack)(({ theme }) => ({
    color: theme.palette.common.white,
    zIndex: "4",
    textAlign: "left",
  }));

  return (
    <>
      <Image
        src={src}
        alt={alternativeText}
        fill
        priority
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <Backdrop />
      <Content
        sx={{
          width: { sm: "500px", md: "600px", lg: "900px" },
          px: 2,
          py: 4,
        }}
        gap={1}
      >
        {bannerOverlay && (
          <Typography variant="button" component={"h4"}>
            {bannerOverlay}{" "}
          </Typography>
        )}
        <Typography variant="h2" component={"h1"} color={"secondary.main"}>
          {headline}{" "}
        </Typography>
        {subHeadline && (
          <Typography variant="h4" component={"h3"}>
            {subHeadline}{" "}
          </Typography>
        )}

        <Box sx={{ pt: 2 }}>
          <Link href={ctaButton.href} legacyBehavior>
            <Button variant="contained" color="primary">
              {ctaButton.label}
            </Button>
          </Link>
        </Box>
      </Content>
    </>
  );
};

export default function Hero({ data }) {
  return (
    <Box
      sx={{
        height: { xs: "50vh", sm: "60vh", md: "70" },
        width: "100%",
        position: "relative",
      }}
    >
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        style={{
          "--swiper-pagination-color": "#fff",
          height: "100%",
          width: "100%",
        }}
      >
        {data.map((offer) => (
          <SwiperSlide
            key={offer.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Offer offer={offer} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
