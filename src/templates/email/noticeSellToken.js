import HTMLing from "htmling";
import path from "path";
const template = HTMLing.file(path.join(__dirname, "./SellToken2.html"));

const getContent = toAddress => {
  return {
    to: toAddress,
    from: "CSE Token <support@csetoken.io>",
    subject: "HOT HOT NEWS!",
    html: template.render()
  };
};

export default getContent;
