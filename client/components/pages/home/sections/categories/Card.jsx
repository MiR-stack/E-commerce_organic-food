import { Stack, Typography, Box } from "@mui/material";
import { getStrapiMedia } from "../../../../../utils";
import Link from "next/link";

const Card = ({ name, slug, totalProduct, image }) => {
  const src = getStrapiMedia(image.data.attributes.formats.thumbnail.url);

  return (
    <Link href={`/products?category=${slug}`} legacyBehavior>
      <Box
        sx={{
          background: `url(${src}) `,
          backgroundRepeat: "no-repeat",
          height: "150px",
          boxSizing: "border-box",
          cursor: "pointer",
          borderRadius: "10px",
          overflow: "hidden",
          textAlign: "center",
        }}
        style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
        component={"div"}
      >
        <Stack
          sx={{ p: 3, background: "rgba(0,0,0,.6)", height: "100%" }}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={1}
          color={"common.white"}
        >
          <Typography variant="h6">
            {name.length > 14 ? `${`${name}`.substring(0, 13)}...` : name}{" "}
          </Typography>
          <Typography variant="subtitle1">{totalProduct} products </Typography>
        </Stack>
      </Box>
    </Link>
  );
};

export default Card;
