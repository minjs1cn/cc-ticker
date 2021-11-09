const settings = { frameRate: 60 };

export type TTickerUpdate = (deltaTime: number) => void;

export type TTickerOptions = {
	frameRate?: number;
};
/**
 * Ticker
 */
export class Ticker {
	private static _shared: Ticker;

	public static get shared() {
		if (!Ticker._shared) {
			Ticker._shared = new Ticker();
		}
		return Ticker._shared;
	}

	/** 间隔时间 */
	private deltaTime: number;

	private frameDuration: number;

	private lastTime: number = -1;

	/** 速度 */
	public speed = 1;

	/** 是否开始 */
	private started = false;

	private _requestId: number | null = null;

	private _tick: (time: number) => any;

	public get FPS(): number {
		return 1000 / this.deltaTime;
	}

	private update: TTickerUpdate | null = null;

	constructor(options: TTickerOptions = {}) {
		options = Object.assign({}, settings, options);

		this.frameDuration = 1000 / options.frameRate!;
		this.deltaTime = 0;

		this._tick = (time: number) => {
			this._requestId = null;

			if (this.started) {
				this.updateTime(time);
				if (this.started && this._requestId === null) {
					this._requestId = requestAnimationFrame(this._tick);
				}
			}
		};
	}

	private _requestIfNeeded() {
		if (this._requestId === null) {
			this.lastTime = performance.now();
			this._requestId = requestAnimationFrame(this._tick);
		}
	}

	private _cancelIfNeeded(): void {
		if (this._requestId !== null) {
			cancelAnimationFrame(this._requestId);
			this._requestId = null;
		}
	}

	/**
	 * start ticker
	 */
	public start(update?: TTickerUpdate) {
		if (!this.started) {
			if (update) {
				this.update = update;
			}
			this.started = true;
			this._requestIfNeeded();
		}
	}

	/**
	 * pause ticker
	 */
	public pause() {
		if (this.started) {
			this.started = false;
			this._cancelIfNeeded();
		}
	}

	private updateTime(currentTime = performance.now()): void {
		const { lastTime, frameDuration } = this;
		let deltaTime = currentTime - lastTime;

		if (deltaTime >= frameDuration) {
			this.lastTime = currentTime - (deltaTime % this.frameDuration);
			deltaTime = this.lastTime - lastTime;

			deltaTime *= this.speed;

			this.deltaTime = deltaTime;

			this.update && this.update(this.deltaTime);
		}
	}
}
