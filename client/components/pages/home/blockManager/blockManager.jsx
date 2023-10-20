import Section from "../sections/section";
import Offer from "../offer";
import Brands from "../brands";

function BlockManager({ data }) {
  switch (data.__component) {
    case "home.offer":
      return <Offer data={data} />;
    case "home.brands":
      return <Brands />;
    default:
      return <Section data={data} />;
  }
}

export default BlockManager;
