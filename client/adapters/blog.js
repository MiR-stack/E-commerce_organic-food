import { getFormatedImage, readingTimeCounter } from "../utils";

const adapter = (blog) => {
  const { title, slug, permalink, description, content, urlToImage, profile } =
    blog.attributes;

  const { srcs } = getFormatedImage(urlToImage);

  const readingTime = readingTimeCounter(content);
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
