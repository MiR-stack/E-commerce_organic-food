import { Card, CardContent, Typography, Stack, Rating } from "@mui/material";
import CardFooter from "./cardFooter";
import { getStrapiMedia } from "../../../utils/index";
import Link from "../../utils/link";
import { CustomImage } from "../../utils";

const defaultConfig = {
  direction: "column",
  mediaHeight: 100,
  mediaWidht: "100%",
  size: "sm",
};

function ProductCard({ data, config }) {
  config = { ...defaultConfig, ...config };
  const { images, name, avarageRating, salePrice, price, discount } = data;
  const { url, name: alt } = images.data[0].attributes.formats.small;
  const small = getStrapiMedia(url);
  data.image = small;

  return (
    <Card
      sx={{ display: config.direction, height: "100%", alignItems: "center" }}
    >
      <Link
        href={`/products/${data.slug}`}
        styles={{
          display: "block",
          height: config.mediaHeight,
          width: config.mediaWidth,
          minWidth: config.mediaWidth,
        }}
      >
        <CustomImage
          src={small}
          alt={alt}
          height={"100%"}
          width={"100%"}
          sizes={`(max-width:600px) 100vw, (max-width:1200px) 40vw, 30vw`}
        />
      </Link>
      <CardContent
        sx={{
          py: { xs: "5px", sm: 1 },
          px: { xs: 1, sm: 2 },
          pb: "10px !important",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Link href={`/products/${data.slug}`}>
            <Typography
              variant="subtitle1"
              component="h2"
              sx={{ cursor: "pointer" }}
            >
              {name}
            </Typography>
          </Link>
          <Stack direction={"row"} gap={1} alignItems="center">
            <Rating value={avarageRating} size={config.size} readOnly />
            <span style={{ fontSize: "13px" }}>{avarageRating} </span>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Typography variant="subtitle2">${salePrice} </Typography>
            {discount ? (
              <Typography
                variant="subtitle2"
                sx={{ textDecoration: "line-through" }}
              >
                ${price}
              </Typography>
            ) : (
              ""
            )}
          </Stack>
        </div>
        <CardFooter data={data} config={config} />
      </CardContent>
    </Card>
  );
}

export default ProductCard;
