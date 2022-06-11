export class InvalidParameterReceived extends Error {
	constructor(message: string) {
		super(`[DEV_ERROR] ${message}`);
		this.name = this.constructor.name;
	}
}

export default InvalidParameterReceived;
