import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Schedule } from "@mui/icons-material";
import { CustomImage } from "../../utils";

function BlogCard({ title, description, image, author, readTime }) {
  return (
    <Card sx={{ height: "100%" }}>
      <Link href={`/blogs/${title}`} legacyBehavior>
        <CardActionArea>
          <CustomImage
            src={image.url}
            alt={image.alt}
            height={200}
            width={"100%"}
            sizes={`(max-widht:600px) 100vw, (max-widht:1200px) 40vw, 30vw`}
          />
          <CardContent>
            <Typography
              variant="h4"
              sx={{
                ":hover": { textDecoration: "underline" },
                maxHeight: 80,
                overflow: "hidden",
              }}
            >
              {title.length > 50 ? `${`${title}`.substring(0, 50)}...` : title}{" "}
            </Typography>
            <Typography
              variant="body1"
              sx={{ py: 1, maxHeight: "6.5rem", overflow: "hidden" }}
            >
              {description.length > 200
                ? `${`${description}`.substring(0, 200)}...`
                : description}{" "}
            </Typography>

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ pt: 1 }}
            >
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                <Schedule fontSize="16" />
                <Typography variant="subtitle2">{readTime} minutes</Typography>
              </Stack>
              <Typography variant="subtitle2"> ~{author} </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

export default BlogCard;
