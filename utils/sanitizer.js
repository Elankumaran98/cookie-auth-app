import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurifyInstance = DOMPurify(window);

const sanitize = (dirty) => {
  return DOMPurifyInstance.sanitize(dirty);
};

export default sanitize;
