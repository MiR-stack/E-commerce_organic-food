import {
  getData,
  getFormatedImage,
  getStrapiMedia,
  getStrapiUrl,
} from "../../../../utils";
import { Box, Container } from "@mui/material";
import Image from "next/image";

async function Colaborators({ data: { logos } }) {
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
        {logos.data.map((brand) => {
          const img = { data: brand };
          const {
            srcs: { small },
            alt,
          } = getFormatedImage(img);
          return (
            <Box key={brand.id}>
              <span>
                <Image
                  src={small}
                  alt={alt || "colaborators"}
                  height={100}
                  width={140}
                />
              </span>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
}

export default Colaborators;
