import Hero from "../components/pages/home/hero/hero";
import { getData, getStrapiUrl } from "../utils";
import qs from "qs";
import BlockManger from "../components/pages/home/blockManager/blockManager";
import Newsletter from "../components/shared/newsletter";
import { MASTER_TAG } from "../constants";

async function Home() {
  const pageQuery = qs.stringify({
    populate: {
      heroSection: {
        populate: ["image", "ctaButton"],
      },
      blocks: {
        populate: "*",
      },
    },
  });

  const pageUrl = getStrapiUrl(`/landing-page?${pageQuery}`);
  const pageData = await getData(pageUrl, [MASTER_TAG, "home"]);
  const { heroSection, blocks } = pageData.data.attributes;

  return (
    <div>
      <Hero data={heroSection} />
      {blocks.map((block) => (
        <BlockManger data={block} key={block.id} />
      ))}
      <Newsletter divider={false} />
    </div>
  );
}

export default Home;
