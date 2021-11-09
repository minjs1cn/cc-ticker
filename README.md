# ticker

时间线计时器

## Install

```bash
$ yarn add @byte1024/ticker
```

## Usage

```ts
import { Ticker, TTickerOptions } from '@byte1024/ticker';

const ticker = Ticker.shared;
// const ticker = new Ticker();

function update(dt: number) {
	console.log(dt);
}

ticker.start(update);
```

## new Ticker(options: TTickerOptions)

| key       | default | tips |
| --------- | ------- | ---- |
| frameRate | 60      | 帧率 |

## License

The MIT License
