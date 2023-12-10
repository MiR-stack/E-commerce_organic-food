"use client";
import SearchBar from "../../components/shared/searchBar";

export const searchbarStyles = {
  width: { md: 400, xs: "100%" },
  maxWidth: { md: 400, xs: 250 },
  zIndex: 3,
};

function BannerContent() {
  return <SearchBar open styles={searchbarStyles} />;
}

export default BannerContent;
