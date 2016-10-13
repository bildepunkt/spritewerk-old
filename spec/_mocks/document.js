import Canvas from "./Canvas";
import Element from "./Element";

const doc = {
    body: new Element("body"),
    children: [],

    createElement: (type)=> {
        switch (type) {
            case "canvas":
                return new Canvas(type);
            default:
                return new Element(type);
        }
    }
}

export default doc;
