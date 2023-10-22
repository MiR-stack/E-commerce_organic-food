import Section from "../sections/section";
import Colaborators from "../colaborators";
import Offer from "../offer";

function BlockManager({ data }) {
  switch (data.__component) {
    case "home.offer":
      return <Offer data={data} />;
    case "home.brands":
      return <Colaborators data={data} />;
    default:
      return <Section data={data} />;
  }
}

export default BlockManager;
