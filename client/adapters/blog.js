import { getFormatedImage } from "../utils";

const adapter = (blog) => {
  const { title, slug, permalink, description, content, urlToImage, profile } =
    blog.attributes;

  const { srcs } = getFormatedImage(urlToImage);

  const wordCount = content.replace(/[^\w ]/g, "").split(/\s+/).length;
  const readingTime = Math.floor(wordCount / 228) + 1;

  return {
    slug,
    permalink,
    title,
    description,
    author: profile.data.attributes.name,
    urlToImage: srcs.medium,
    readingTime,
  };
};

const blogsAdapter = (blogs) => {
  return blogs.map((blog) => adapter(blog));
};

export default blogsAdapter;
