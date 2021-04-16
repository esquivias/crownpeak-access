import Crownpeak, { Configuration, Interface, Response } from "./crownpeak";
import {
	ColumnType,
	OrderType,
	VisibilityType,
	IconType,
	RequiredActionType,
	RenderType
} from "./model";

export interface AttachRequest {
	assetId: number;
	bytes: string;
	originalFilename: string;
}
export interface AttachResponse extends Response {
	displayUrl: string;
}

export interface BranchRequset {
	assetId: number;
}

export interface BranchResponse extends Response {
	asset: WorklistAsset;
}

export interface CreateRequest {
	destinationFolderId: number;
	devTemplateLanguage: number;
	modelId: number;
	newName: string;
	subtype: number;
	templateId: number;
	type: number;
	workflowId: number;
}

export interface CreateResponse extends Response {
	asset: WorklistAsset;
}

export interface DeleteRequest {
	assetId: number;
}

export type DeleteResponse = Response;
export interface DownloadAssetsPrepareRequest {
	assetIDs: number[];
}
export interface DownloadAssetsPrepareResponse extends Response {
	downloadTicket: string;
	downloadUrl: string;
	filename: string;
	fileBuffer: string;
	exceededDownloadLimit: string;
}
export interface PagedRequest {
	assetId?: number;
	assetIdToFindPage?: number;
	currentPage?: number;
	ignoreFilter?: boolean;
	ignoreSort?: boolean;
	orderType?: OrderType;
	pageSize?: number;
	saveSort?: boolean;
	sortColumn?: string;
	visibilityType?: VisibilityType;
}

export interface PagedResponse extends Response {
	assets: WorklistAsset[];
	currentPage: number;
	deletedCount: number;
	hiddenCount: number;
	normalCount: number;
	sortInfo: SortInfo;
}

export interface WorklistAsset {
	acl_id?: number;
	approvedWorkflowFilters: number;
	base_model_id?: number;
	branchId: number;
	change_date?: string;
	change_user_id?: number;
	changedBy: string;
	checkedOutBy: string;
	checkout_date?: string;
	checkout_user_id?: number;
	child_id?: number;
	create_date?: string;
	createdBy: string;
	creator_user_id?: number;
	deploy_id?: number;
	dataFilter?: string;
	error_code: number;
	error_msg: string;
	extension: string;
	extraId: string;
	folder_id?: number;
	fullPath: string;
	hasCSharpInput: boolean;
	hasPeriodicSchedule: boolean;
	hasWorkflowSchedule: boolean;
	iconType: IconType;
	iconTypeValue?: number;
	id: number;
	idPath: string;
	isFlagged: boolean;
	isQueued: boolean;
	isWcoIntegrated: boolean;
	is_deleted?: boolean;
	is_hidden?: boolean;
	label: string;
	lastPublishedBy: string;
	model_id?: number;
	modifiedBy: string;
	modified_date?: string;
	modified_user_id?: number;
	ownedBy: string;
	owner_user_id: number;
	permissionList: string;
	publish_date?: string;
	publish_dependencies_date?: string;
	publish_user_id?: number;
	size?: number;
	status?: string;
	statusChangedBy: string;
	statusColor: string;
	statusName: string;
	status_date?: string;
	status_user_id?: number;
	storage_id?: number;
	subtype?: number;
	taskCount: number;
	templateSubType?: number;
	template_id?: number;
	template_label: string;
	template_language: number;
	type?: number;
	version_id?: number;
	workflow_id?: number;
	workflow_step?: number;
}

export interface SortInfo {
	column: ColumnType;
	columnSortToStringMap: {};
	order: OrderType;
	stringToColumnSortMap: {};
}

/**
 * `fieldsToDelete` used to delete fields throught the AccessAPI.
 * Populate this list with the field_name of the fields to be deleted. Deletion will occur on update.
 *
 * @example
 *
 * {
 *  "assetId": 1234,
 *  "fields": {
 *      "_last_image_path": "/Crownpeak/",
 *      "_last_selection_path": "/Crownpeak/",
 *      "cp-languages": "English:-1"
 *  }
 * }
 */

export interface UpdateRequest {
	assetId: number;
	fields: {}; //Map<string, string>;
	fieldsToDelete?: string[];
}

export interface UpdateResponse extends Response {
	asset: WorklistAsset;
}

export interface ExecuteWorkflowCommandRequest {
	assetId: number;
	commandId: number;
	skipDependencies: boolean;
}

export interface ExecuteWorkflowCommandResponse extends Response {
	asset: WorklistAsset;
	publishingSessionId: number;
	requiredAction: RequiredActionType;
}

export interface ExistsRequest {
	assetIdOrPath: string;
}

export interface ExistsResponse extends Response {
	assetId: number;
	exists: boolean;
}

export interface FieldsRequest {
	assetId: number;
}

export interface FieldsResponse extends Response {
	fields: Field[];
}

export interface Field {
	cvalue?: string;
	dvalue?: number;
	fvalue?: number;
	id: number;
	ivalue?: number;
	name: string;
	parent_id: number;
	value: string;
}

export interface RenderRequest {
	assetId: number;
	userId: number;
	versionId?: number;
	renderType: RenderType;
}
export interface IsRenderListCompleteRequest {
	isSlui: boolean;
	requests: RenderRequest[];
}

export type IsRenderListCompleteResponse = Response;

export interface MoveRequest {
	assetId: number;
	destinationFolderId: number;
}

export interface MoveResponse extends Response {
	asset: WorklistAsset;
}

export interface PublishRequest {
	assetIds: number[];
	skipDependencies: boolean;
}
export interface PublishResponse extends Response {
	publishingSessionId: number;
}

export interface PublishRefreshRequest extends PublishRequest {
	publishingServerId: number;
}

export type PublishRefreshResponse = PublishResponse;

export interface ReadByPathRequest {
	path: string
}

export interface ReadByPathResponse extends Response {
	asset: WorklistAsset
}

export interface ReadRequest {
	assetId: number;
}
export interface ReadResponse extends Response {
	asset: WorklistAsset;
}

export interface RenameRequest {
	assetId: number;
	newName: string;
}
export interface RenameResponse extends Response {
	asset: WorklistAsset;
}

export type RenderListRequest = IsRenderListCompleteRequest;
export type RenderListResponse = IsRenderListCompleteResponse;

export interface RouteRequest {
	assetId: number;
	stateId: number;
}
export type RouteResponse = Response;

export interface RouteAssetsRequest {
	list: number[],
	stateId: number,
	stateChangeCheck: boolean
}
export type RouteAssetsResponse = Response;

export interface TemplateProfileRequest {
	assetId: number;
	layoutName: string;
}

export interface TemplateProfileDataApiCall {
	accumulatedTimeTaken: number;
	accumulatedTimeThrottled: number;
	name: string;
	usageCount: number;
}
export interface TemplateProfileData {
	apiCalls: TemplateProfileDataApiCall[];
	assetId: number;
	executionDate: string;
	executionTime: string;
	parentTemplateId: number;
	pluginName?: string;
	templateId: number;
	templateName?: string;
	templateVersionId: number;
	throttledTime: string;
	userId: number;
}
export interface TemplateProfileResponse extends Response {
	templateProfile: TemplateProfileData;
}

export interface UndeleteRequest {
	assetId: number;
}

export type UndeleteResponse = Response;

/**
 * Hint: Model ID might be the base_model_id.
 */
export interface UploadRequest {
	bytes: string;
	destinationFolderId: number;
	modelId: number;
	newName: string;
	workflowId: number;
}

export interface UploadResponse extends Response {
	asset: WorklistAsset;
	displayUrl: string;
}

/**
 * The Asset Web API function calls are used to manage assets in the CMS.
 *
 * These calls allow external programs to create, update, delete assets using the POST, PUT, and DELETE calls.
 */
export default class Asset extends Crownpeak implements Interface {
	/**
	 * @param configuration
	 */
	constructor(configuration: Configuration) {
		super(configuration);
	}

	/**
	 * Upload and attach data to an asset.
	 * Attachment name will be based on originalFilename parameter and saved to the content fields of the asset.
	 *
	 * @param attachRequest
	 */
	async attach(attachRequest: AttachRequest): Promise<AttachResponse> {
		return super.post("asset/attach", attachRequest);
	}

	/**
	 * Creates a branch from the specified asset. The asset created as a result is returned.
	 *
	 * @param branchRequest
	 */
	async branch(branchRequest: BranchRequset): Promise<BranchResponse> {
		return super.post("asset/branch", branchRequest);
	}

	/**
	 * Creates a new file or folder within the CMS.
	 *
	 * @param createRequest
	 */
	async create(createRequest: CreateRequest): Promise<CreateResponse> {
		return super.post("asset/create/", createRequest);
	}

	/**
	 * Marks the specified asset as deleted.
	 * Deleted assets are permanently removed from the CMS after 15 days.
	 *
	 * @param deleteRequest
	 */
	async delete(deleteRequest: DeleteRequest): Promise<DeleteResponse> {
		return super.post(`asset/delete/${deleteRequest.assetId}`);
	}
	
	/**
	 * Prepare an asset for download.
	 * 
	 * @param downloadAssetsPrepareRequest
	 */
	 async downloadAssetsPrepare(downloadAssetsPrepareRequest: DownloadAssetsPrepareRequest): Promise<DownloadAssetsPrepareResponse> {
		return super.post(`asset/downloadassetsprepare`, downloadAssetsPrepareRequest);
	}

	/**
	 * Move an asset through its workflow.
	 *
	 * @param executeWorkflowCommandRequest parameters sent as post data.
	 */
	async executeWorkflowCommand(
		executeWorkflowCommandRequest: ExecuteWorkflowCommandRequest
	): Promise<ExecuteWorkflowCommandResponse> {
		return super.post(
			"asset/executeWorkflowCommand",
			executeWorkflowCommandRequest
		);
	}

	/**
	 * Checks if an asset with the supplied assetId or assetPath exists in the CMS.
	 *
	 * @param existsRequest
	 */
	async exists(existsRequest: ExistsRequest): Promise<ExistsResponse> {
		return super.post("asset/exists", existsRequest);
	}

	/**
	 * Gets a list of content fields for the specified asset.
	 *
	 * @param fieldsRequest
	 */
	async fields(fieldsRequest: FieldsRequest): Promise<FieldsResponse> {
		return super.post(`asset/fields/${fieldsRequest.assetId}`);
	}

	/**
	 *
	 * @param isRenderListRequestComplete
	 */
	async isRenderListComplete(
		isRenderListRequestComplete: IsRenderListCompleteRequest
	): Promise<IsRenderListCompleteResponse> {
		return super.post(
			`asset/isRenderListComplete`,
			isRenderListRequestComplete
		);
	}

	/**
	 * Move an asset to a specified folder in the CMS.
	 *
	 * @param moveRequest
	 */
	async move(moveRequest: MoveRequest): Promise<MoveResponse> {
		return super.post("asset/move", moveRequest);
	}

	/**
	 * Returns a list of assets which is filtered by the criteria specified in pagedRequest.
	 *
	 * @param pagedRequest parameters sent as post data.
	 */
	async paged(pagedRequest: PagedRequest): Promise<PagedResponse> {
		return super.post("asset/paged", pagedRequest);
	}

	/**
	 * Publish a non-workflow asset.
	 *
	 * @param publishRequest
	 */
	async publish(publishRequest: PublishRequest): Promise<PublishResponse> {
		return super.post("asset/publish", publishRequest);
	}

	/**
	 * Refresh the assets in a folder based on the publishing package id.
	 *
	 * @param publishRefreshRequest
	 */
	async publishRefresh(
		publishRefreshRequest: PublishRefreshRequest
	): Promise<PublishRefreshResponse> {
		return super.post("asset/publishRefresh", publishRefreshRequest);
	}

	/**
	 * Retrieve a CMS asset by its unique identifier.
	 *
	 * @param readRequest
	 */
	async read(readRequest: ReadRequest): Promise<ReadResponse> {
		return super.post(`asset/read/${readRequest.assetId}`);
	}

	/**
	 * Retrieve a CMS asset by its path.
	 * 
	 * @param readByPathRequest
	 */
	async readByPath(readByPathRequest: ReadByPathRequest): Promise<ReadByPathResponse> {
		return super.post("asset/readByPath", readByPathRequest);
	}

	/**
	 * Rename an asset in the CMS.
	 *
	 * @param renameRequset
	 */
	async rename(renameRequset: RenameRequest): Promise<RenameResponse> {
		return super.post("asset/rename", renameRequset);
	}

	/**
	 *
	 * @param renderListRequest
	 */
	async renderList(
		renderListRequest: RenderListRequest
	): Promise<RenderListResponse> {
		return super.post("asset/renderList", renderListRequest);
	}

	/**
	 * Move an asset from one workflow state to another.
	 *
	 * @param routeRequest
	 */
	async route(routeRequest: RouteRequest): Promise<RouteResponse> {
		return super.post("asset/route", routeRequest);
	}

	/**
	 * Move assets from one workflow state to another.
	 *
	 * @param routeAssetsRequest
	 */
	async routeAssets(routeAssetsRequest: RouteAssetsRequest): Promise<RouteAssetsResponse> {
		return super.post("asset/routeAssets", routeAssetsRequest);
	}

	/**
	 * Returns a template profiling data containing performance diagnostics.
	 *
	 * @param templateProfileRequest
	 */
	async templateProfile(
		templateProfileRequest: TemplateProfileRequest
	): Promise<TemplateProfileResponse> {
		return super.post("asset/route", templateProfileRequest);
	}

	/**
	 * Undeletes the specified asset.
	 *
	 * @param undeleteRequest
	 */
	async undelete(
		undeleteRequest: UndeleteRequest
	): Promise<UndeleteResponse> {
		return super.post(`asset/undelete/${undeleteRequest.assetId}`);
	}

	/**
	 * Modifies the content fields of an asset within the Content Management System.
	 *
	 * @param assetUpdateRequest parameters sent as post data.
	 */
	async update(updateRequest: UpdateRequest): Promise<UpdateResponse> {
		return super.post("asset/update", updateRequest);
	}

	/**
	 * Create a new asset in the CMS the content of which will be the bytes supplied in req.
	 *
	 * @param uploadRequest
	 */
	async upload(uploadRequest: UploadRequest): Promise<UploadResponse> {
		return super.post("asset/upload", uploadRequest);
	}

	/**
	 * Throw Error
	 *
	 * @param message
	 */
	throwError(message: string): never {
		return super.throwError(`Asset: ${message}`);
	}
}
