import { Container, Typography } from "@mui/material";
import { getBanner, getData, getStrapiUrl } from "../../utils/index";
import Banner from "../../components/shared/banner";
import Newsletter from "../../components/shared/newsletter";

async function AboutUs() {
  const url = getStrapiUrl("/about-us?populate=about");
  const { data } = await getData(url, ["aboutUs"]);
  const { description } = data.attributes.about;

  const {
    name,
    srcs: { medium },
    alt,
    breadcrumb,
  } = await getBanner("about");

  return (
    <>
      <Container maxWidth={"md"}>
        <span>
          <Banner
            name={name}
            image={{ src: medium, alt }}
            breadcrumbs={breadcrumb}
            currentPage={"about us"}
          />
        </span>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </Container>
      <Newsletter />
    </>
  );
}

export default AboutUs;
