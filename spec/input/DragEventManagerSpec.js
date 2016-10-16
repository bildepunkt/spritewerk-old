import DragEventManager from "../../src/input/DragEventManager";
import touchCnst from "../../src/input/constants/touch";
import emulatedCnst from "../../src/input/constants/emulated";

describe("DragEventManager", ()=> {
    let dragEventManager;

    beforeEach(()=> {
        dragEventManager = new DragEventManager(
            touchCnst.TOUCH_START,
            touchCnst.TOUCH_MOVE,
            touchCnst.TOUCH_END
        );
    });

    it("sets canDrag flag to true", ()=> {
        dragEventManager.getDragEvents({
            type: touchCnst.TOUCH_START
        });

        expect(dragEventManager.canDrag).toBe(true);
    });

    it("sets isDragging flag to true", ()=> {
        dragEventManager.getDragEvents({
            type: touchCnst.TOUCH_START
        });
        dragEventManager.getDragEvents({
            type: touchCnst.TOUCH_MOVE
        });

        expect(dragEventManager.isDragging).toBe(true);
    });

    it("reverts canDrag and isDragging", ()=> {
        dragEventManager.getDragEvents({
            type: touchCnst.TOUCH_START
        });
        dragEventManager.getDragEvents({
            type: touchCnst.TOUCH_MOVE
        });
        dragEventManager.getDragEvents({
            type: touchCnst.TOUCH_END
        });

        expect(dragEventManager.canDrag).toBe(false);
        expect(dragEventManager.isDragging).toBe(false);
    });

    it("returns [ DRAG_START, DRAG ], and [ DRAG_END ]", ()=> {
        dragEventManager.getDragEvents({
            type: touchCnst.TOUCH_START
        });

        expect(dragEventManager.getDragEvents({
            type: touchCnst.TOUCH_MOVE
        })).toEqual(
            [{
                type: emulatedCnst.DRAG_START
            }, {
                type: emulatedCnst.DRAG
            }]
        );

        expect(dragEventManager.getDragEvents({
            type: touchCnst.TOUCH_END
        })).toEqual(
            [{ type: emulatedCnst.DRAG_END }]
        );
    });
});
