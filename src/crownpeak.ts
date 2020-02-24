import axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";
import { ResultCodeType } from "./model";

export interface Response {
	errorMessage: string;
	internalCode: number;
	isSuccessful: boolean;
	resultCode: ResultCodeType;
}
export interface Interface {
	configuration: Configuration;
	throwError(message: string): never;
}

export interface Configuration {
	apiKey: string;
	basePath: string;
	cookieJar: tough.CookieJar;
}

axiosCookieJarSupport(axios);

export default class Crownpeak implements Interface {
	configuration: Configuration;

	/**
	 * @param configuration
	 */
	constructor(configuration: Configuration) {
		this.configuration = configuration;
	}

	/**
	 * POST Helper
	 *
	 * @param url
	 * @param data
	 */
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	async post(url?: string, data?: any): Promise<any> {
		if (data === "undefined") {
			data = {};
		}
		try {
			const response = await axios({
				method: "post",
				jar: this.configuration.cookieJar,
				withCredentials: true,
				url: this.configuration.basePath + url,
				headers: {
					"x-api-key": this.configuration.apiKey,
					"Content-Type": "application/json; charset=utf8",
					Accept: "application/json"
				},
				data: data
				/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
			}).then((response: any) => {
				return response.data;
			});
			return response;
		} catch (err) {
			return err.response.data;
		}
	}

	/**
	 * Throw Error
	 *
	 * @param message
	 */
	throwError(message: string): never {
		throw new Error(message);
	}
}
