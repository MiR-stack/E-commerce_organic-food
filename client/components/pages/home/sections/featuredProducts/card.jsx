import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Stack,
  Box,
  Link as MuiLink,
} from "@mui/material";
import { getStrapiMedia } from "../../../../../utils";

import CardFooter from "../../../../shared/productCard/cardFooter";
import Link from "next/link";

// TODO: add badge (hot, latest)
// TODO: hover to open quick view option

function ProductCard({
  data: {
    id,
    name,
    images,
    avarageRating,
    ratingCount,
    price,
    salePrice,
    discount,
    shortDescription,
    slug,
  },
}) {
  const { url, name: alt } = images.data[0].attributes.formats.small;
  const image = getStrapiMedia(url);

  return (
    <Card sx={{ maxWidth: { sm: "345px", xs: "100%" }, pb: 1 }}>
      <Link href={`/products/${slug}`} passHref legacyBehavior>
        <CardMedia
          component={"img"}
          height={"180px"}
          image={image}
          alt={alt}
          sx={{ cursor: "pointer" }}
        />
      </Link>
      <CardContent>
        <Link href={`/products/${slug}`} passHref legacyBehavior>
          <MuiLink
            color={"inherit"}
            underline="hover"
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="h6" component="h2">
              {name}
            </Typography>
          </MuiLink>
        </Link>
        <Typography variant="body2" component="p">
          {`${shortDescription}`.substring(0, 60)}...
        </Typography>
        <Stack direction={"row"} spacing={1} alignItems="center">
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            ${salePrice}{" "}
          </Typography>
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
        <Stack direction={"row"} spacing={1}>
          <Rating
            name="read-only"
            value={avarageRating}
            precision={0.5}
            readOnly
          />
          <Typography>{avarageRating} </Typography>
          <Typography>({ratingCount}) </Typography>
        </Stack>
      </CardContent>
      <Box sx={{ px: 1, pb: 1 }}>
        <CardFooter data={{ id, name, salePrice, price, image }} />
      </Box>
    </Card>
  );
}

export default ProductCard;
