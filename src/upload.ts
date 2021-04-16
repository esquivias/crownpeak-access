import Crownpeak, { Configuration, Interface, Response } from "./crownpeak";
import  WorklistAsset from "./asset";
export interface AssetCompleteRequest {
	destinationId: number;
	label: string;
	modelId: number;
	uploadTicket: string;
}

export interface AssetCompleteResponse extends Response {
	asset: WorklistAsset;
	displayUrl: string;
}

export interface AssetPrepareRequest {
	destinationId: number;
	label: string;
	modelId: number;
	totalSize: number;
}

export interface AssetPrepareResponse extends Response {
	maxUploadLimit: number;
	uploadTicket: string;
}

export interface BytesRequest {
	base64: string;
    bytes?: number;
    checksum?: string;
    uploadTicket: string;
}

export interface BytesResponse extends Response {
	bytesWritten: number;
}

/**
 * The Upload Web API function calls are used to manage asset uploads in the CMS.
 *
 * These calls allow external programs to create, update, delete assets using the POST, PUT, and DELETE calls.
 */
export default class Upload extends Crownpeak implements Interface {
	/**
	 * @param configuration
	 */
	constructor(configuration: Configuration) {
		super(configuration);
	}

	async assetComplete(assetCompleteRequest: AssetCompleteRequest): Promise<AssetCompleteResponse> {
		return super.post("upload/assetcomplete", assetCompleteRequest);
	}

	async assetPrepare(assetPrepareRequest: AssetPrepareRequest): Promise<AssetPrepareResponse> {
		return super.post("upload/assetprepare", assetPrepareRequest);
	}

	async bytes(bytesRequest: BytesRequest): Promise<BytesResponse> {
		return super.post("upload/bytes", bytesRequest);
	}
}
