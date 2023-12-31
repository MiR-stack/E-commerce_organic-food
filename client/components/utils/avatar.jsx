import { Avatar } from "@mui/material";
import { getStrapiMedia } from "../../utils";

function CustomAvater({
  avatar,
  avatarUrl,
  name,
  styles,
  config,
  size = "lg",
}) {
  if (!avatar && !name && !avatarUrl) return <Avatar sx={styles} />;

  const avatarMedia = avatarUrl
    ? avatarUrl
    : getStrapiMedia(avatar?.data?.attributes.formats.thumbnail.url);

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  name = name.replace(/\s+/g, " ").trim();

  const sizes = {
    lg: {
      height: 70,
      width: 70,
    },
    md: {
      height: 50,
      width: 50,
    },
    sm: {
      height: 30,
      width: 30,
    },
  };

  return (
    <Avatar
      src={avatarMedia}
      alt={avatar?.data?.attributes.alternativeText || "avater"}
      sx={{
        bgcolor: stringToColor(name),
        textTransform: "uppercase",
        ...sizes[size],
        ...styles,
      }}
    >
      {`${name.split(" ")[0][0]}${
        config?.name === "sm" ? "" : name.split(" ")[1][0]
      }`}
    </Avatar>
  );
}

export default CustomAvater;
