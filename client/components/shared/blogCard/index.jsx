import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Schedule } from "@mui/icons-material";

function BlogCard({ title, description, image, author, readTime }) {
  console.log(image.url);
  return (
    <Card sx={{ height: "100%" }}>
      <Link href={`/blogs/${title}`} legacyBehavior>
        <CardActionArea>
          <CardMedia image={image.url} alt={image.alt} sx={{ height: 200 }} />
          <CardContent>
            <Typography
              variant="h4"
              sx={{ ":hover": { textDecoration: "underline" } }}
            >
              {title.length > 50 ? `${`${title}`.substring(0, 50)}...` : title}{" "}
            </Typography>
            <Typography variant="body1" sx={{ py: 1 }}>
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
