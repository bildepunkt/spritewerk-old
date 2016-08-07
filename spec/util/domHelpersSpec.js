"use strict";

describe("util/domHelpers", ()=> {
    let domHelpers = require("../../xpile/util/domHelpers");

    describe("applyStyles", ()=> {
        let el;

        beforeEach(()=> {
            el = {
                style: {}
            };
        })

        it("applies styles", ()=> {
            let styles = {
                position: "absolute",
                color: "#c0ffee"
            };

            domHelpers.applyStyles(el, styles);
            expect(el.style).toEqual(styles);
        });

        it("adds 'px' to numeric values", ()=> {
            domHelpers.applyStyles(el, {
                top: 32,
                left: 64
            });
            
            expect(el.style).toEqual({
                top: "32px",
                left: "64px"
            });
        });
    });

    describe("fitToWindow", ()=> {
        it("centers and stretches an element (with aspec ratio) to the window", ()=> {
            /*
            +-------------------+
            |                   |
            |-------------------|
            |+++++++++++++++++++|
            |+++++++++++++++++++|
            |+++++++++++++++++++|
            |-------------------|
            |                   |
            +-------------------+
            */
            expect(domHelpers.fitToWindow(800, 600, 640, 640)).toEqual({
                top: 80,
                left: 0,
                width: 640,
                height: 480
            });

            /*
            +------------------+
            |++++++++++++++++++|
            |++++++++++++++++++|
            |++++++++++++++++++|
            |++++++++++++++++++|
            +------------------+
            */
            expect(domHelpers.fitToWindow(640, 480, 800, 600)).toEqual({
                left: 0,
                top: 0,
                width: 800,
                height: 600
            });

            /*
            +---------------------------+
            |    |+++++++++++++++++|    |
            |    |+++++++++++++++++|    |
            |    |+++++++++++++++++|    |
            |    |+++++++++++++++++|    |
            +---------------------------+
            */
            expect(domHelpers.fitToWindow(640, 480, 800, 360)).toEqual({
                left: 160,
                top: 0,
                width: 480,
                height: 360
            });
        });
    });
});
