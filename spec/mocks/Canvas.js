import Element from "./Element";
import context from "./context";

class Canvas extends Element {
    constructor () {
        super("canvas");

        this.width = 0;
        this.height = 0;
    }

    getContext () {
        return context;
    }
}

export default Canvas;
