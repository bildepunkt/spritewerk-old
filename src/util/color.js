/**
 * @class color
 */
const color = {
    options: {},

    getRandRGB: function (low = 0, high = 255) {
        const r = low + Math.round(Math.random() * (high - low));
        const g = low + Math.round(Math.random() * (high - low));
        const b = low + Math.round(Math.random() * (high - low));
        return `rgb(${r}, ${g}, ${b})`;
    }
};

export default color;
