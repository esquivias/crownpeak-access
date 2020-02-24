import Crownpeak, { Response, Interface, Configuration } from "./crownpeak";

export interface LogRequest {
	assetId: number;
	message: string;
}

export type LogResponse = Response;

/**
 * The Util web api function calls utility methods within CMS.
 *
 * These calls allow external programs to use utility methods.
 */
export default class Util extends Crownpeak implements Interface {
	/**
	 * @param configuration
	 */
	constructor(configuration: Configuration) {
		super(configuration);
	}

	/**
	 * Logs provided message. AssetId is optional.
	 *
	 * @param logRequest '
	 */
	async log(logRequest: LogRequest): Promise<LogResponse> {
		return super.post("util/log", logRequest);
	}
}
