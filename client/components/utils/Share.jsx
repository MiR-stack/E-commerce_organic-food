import { RWebShare } from "react-web-share";

const Share = ({ url, title, text, children }) => {
  return (
    <div>
      <RWebShare
        data={{
          text: text,
          url: url,
          title: title,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        {children}
      </RWebShare>
    </div>
  );
};

export default Share;
