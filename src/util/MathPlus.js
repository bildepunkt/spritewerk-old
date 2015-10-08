/**
 * @class Sprite
 */
export default class MathPlus {
    static clamp(target, min, max) {
        return (target > max) ? max : (target < min) ? min : target;
    }
}