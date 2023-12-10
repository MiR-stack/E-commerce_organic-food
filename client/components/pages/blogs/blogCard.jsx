import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { CustomStack } from "../../utils/elements";
import { AccessTime, Share as ShareIcon } from "@mui/icons-material";
import Link from "next/link";
import Share from "../../utils/Share";

function BlogCard({
  index,
  slug,
  permalink,
  title,
  description,
  author,
  urlToImage,
  readingTime,
}) {
  return (
    <Stack
      flexDirection={{
        md: index % 2 === 0 ? "row-reverse" : "row",
        xs: "column",
      }}
    >
      <Link href={`/blogs/${slug}`}>
        <Box
          sx={{
            width: { lg: 500, md: "400px", xs: "100%" },
            height: { md: "100%", sm: "220px", xs: "180px" },
            position: "relative",
          }}
        >
          <Image
            src={urlToImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100% , 250px, (max-width: 1200px) 500px, 100%"
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Link>
      <CardContent>
        <Stack gap={2}>
          <Stack>
            <Link href={`/blogs/${slug}`} legacyBehavior>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Teko', sans-serif",
                  cursor: "pointer",
                  ":hover": { textDecoration: "underline" },
                }}
              >
                {title}{" "}
              </Typography>
            </Link>
            <CustomStack justifyContent="space-between">
              <CustomStack gap={2}>
                <AccessTime fontSize="16px" />
                <Typography variant="body2">
                  {readingTime} minutes read time{" "}
                </Typography>
              </CustomStack>
              <Share text={"share aritcle"} title={"share"} url={permalink}>
                <CustomStack gap={2}>
                  <Typography variant="body2" sx={{ cursor: "pointer" }}>
                    share
                  </Typography>
                  <ShareIcon fontSize="16px" />
                </CustomStack>
              </Share>
            </CustomStack>
          </Stack>
          <Typography variant="body1" sx={{ fontSize: { sm: "18px", xs: 14 } }}>
            {description.length > 200
              ? `${description.substr(0, 200)}...`
              : description}
          </Typography>
          <Stack alignItems={"flex-end"}>
            <Typography
              variant="h5"
              component={"p"}
              sx={{ fontFamily: "'Smooch', cursive" }}
            >
              ~{author}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Stack>
  );
}

export default BlogCard;
