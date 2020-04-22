import Crownpeak, { Configuration, Interface, Response } from "./crownpeak";
import { WorklistAsset } from "./asset";

export interface DeploymentRecord {
	deployId: number;
	extension: string;
	fileName: string;
	filePath: string;
	id: number;
	isDeleted: boolean;
	isEnabled: boolean;
	layout: string;
	packageId: number;
	type: number;
}

export interface Package {
	packageName: string;
	packageId: number;
	isEnabled: boolean;
}

export interface PackageInfo {
	entries: PublishInfo[];
	name: string;
	numRepos: number;
	numReposDescription: string;
}

export interface PublishInfo {
	hostName: string;
	packageName: string
	packageId: string;
	path: string;
}

export interface ReadPublishingRequest {
	assetId: number;
	forceRefresh: boolean;
}

export interface ReadPublishingResponse extends Response {
	deployId: number;
	propertyRootAsset: WorklistAsset;
	currentFileNames: PackageInfo[];
	currentUrls: PackageInfo[];
	uploadedMedia: PackageInfo[];
	deploymentRecords: DeploymentRecord[];
	layoutNames: string[],
	packages: Package[];
}

/**
 * The Asset Web API function calls are used to manage assets in the CMS.
 *
 * These calls allow external programs to create, update, delete assets using the POST, PUT, and DELETE calls.
 */
export default class AssetProperties extends Crownpeak implements Interface {
	/**
	 * @param configuration
	 */
	constructor(configuration: Configuration) {
		super(configuration);
	}

	/**
	 * Create a new asset in the CMS the content of which will be the bytes supplied in req.
	 *
	 * @param uploadRequest
	 */
	async readPublishing(readPublishingRequest: ReadPublishingRequest): Promise<ReadPublishingResponse> {
		return super.post("assetProperties/readPublishing", readPublishingRequest);
	}

	/**
	 * Throw Error
	 *
	 * @param message
	 */
	throwError(message: string): never {
		return super.throwError(`Asset Properties: ${message}`);
	}
}
