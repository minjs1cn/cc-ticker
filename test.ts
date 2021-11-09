import { Ticker } from './src/main';
import { Easing, motion } from '@byte1024/easing';

const ticker = Ticker.shared;

const div = document.createElement('div');
div.style.width = '100px';
div.style.height = '100px';
div.style.backgroundColor = 'red';

document.body.appendChild(div);

let from = 0,
	to = 300,
	duration = 2000,
	s = 0,
	k = 0,
	p = 0;
function update(dt: number) {
	s += dt;
	k = Math.min(s / duration, 1);
	if (k >= 1) ticker.pause();
	p = motion(from, to, k, Easing.linear);
	div.style.transform = `translate(${p}px)`;
}

setTimeout(() => {
	ticker.start(update);
}, 1000);
