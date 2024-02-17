import NextLink from "next/link";
import { string, object } from "prop-types";
import { link } from "./link.module.css";

function Link({ className, href, target, rel, styles, children }) {
  return (
    <NextLink
      className={`${link} ${className ? className : ""}`}
      href={href}
      target={target}
      rel={rel}
      style={styles}
    >
      {children}
    </NextLink>
  );
}

export default Link;

Link.propTypes = {
  className: string,
  href: string,
  target: string,
  rel: string,
  styles: object,
};
