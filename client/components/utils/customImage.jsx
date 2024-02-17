import { Box } from "@mui/material";
import PropTypes from "prop-types";
import Image from "next/image";

function CustomImage({
  className,
  sizes,
  styles,
  src,
  alt,
  height,
  width,
  priority = false,
  blurDataUrl,
  placeholder,
}) {
  return (
    <Box sx={{ position: "relative", height, width, ...styles }}>
      <Image
        className={`${className}`}
        src={src}
        alt={alt || "offer image"}
        fill
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataUrl}
        sizes={sizes || "100vw"}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </Box>
  );
}

export default CustomImage;

CustomImage.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.object,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sizes: PropTypes.string,
  priority: PropTypes.bool,
  placeholder: PropTypes.string,
  blurDataUrl: PropTypes.string,
};
