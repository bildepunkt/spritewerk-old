import Camera from './src/Camera';
import Canvas from './src/Canvas';
import Input from './src/Input';
import Stage from './src/Stage';
import Rect from './src/shapes/Rectangle';
import TextInput from './src/text/TextInput';
import Group from './src/Group';
import Ticker from './src/Ticker';

let camera = new Camera();
let stage = new Stage(800, 600, {
    bgColor: '#222',
    fill: true
});
let canvas = new Canvas(stage.getCanvas(), camera);
let input = new Input(stage.getCanvas());
let group = new Group();
let textInput = new TextInput(32, 32, {debug: true});
let ticker = new Ticker();

textInput.focus();
group.addItem(textInput);

input.addListener('click', function () {
	if (textInput.isFocused()) {
		textInput.blur();
	} else {
		textInput.focus();
	}
});

ticker.onTick = function (factor, ticks) {
    canvas.clear('#DDD');
    canvas.render(group, factor, ticks);
};
