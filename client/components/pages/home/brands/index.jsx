import React from "react";
import { getData, getStrapiMedia, getStrapiUrl } from "../../../../utils";
import { Box, Container } from "@mui/material";
import Image from "next/image";

async function Brands() {
  const url = getStrapiUrl("/brands?populate=*");

  const brands = await getData(url, ["brands"]);

  return (
    <Box sx={{ pb: 5 }}>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          //   gap: { xs: "10px", sm: "20px" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {brands.data.map((brand) => {
          const { name, logo: Logo } = brand.attributes;
          const { width, height, url } = Logo.data.attributes.formats.thumbnail;
          const logo = getStrapiMedia(url);

          return (
            <Box>
              <span>
                <Image src={logo} alt={name} height={height} width={width} />
              </span>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
}

export default Brands;
