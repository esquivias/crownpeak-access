import Crownpeak, { Configuration, Response, Interface } from "./crownpeak";
import { EditModeType, LoginModeType, WysiwygEditorType } from "./model";
import { Data as WorkflowData } from "./workflow";

/**
 * Request Information
 * - URI Params: None.
 * - Body Parameters: The parameters sent as post data.
 * - Request Formats: application/json
 *
 * @example
 * {
 *  "instance": "instance",
 *  "password": "password",
 *  "remember_me": false,
 *  "timeZoneOffsetMinutes": -480,
 *  "username": "username"
 * }
 */

export interface AuthenticateRequest {
	instance: string;
	password: string;
	remember_me: boolean;
	timeZoneOffsetMinutes: number;
	username: string;
}

/**
 * Response Information
 *
 * @example
 * {
 *  "resultCode": "conWS_Success",
 *  "errorMessage": "",
 *  "internalCode": 0
 * }
 */

export type AuthenticateResponse = Response;

export interface AuthenticateFederatedRequest {
	instance: string;
	provider: string;
	remember_me: boolean;
	timeZoneOffsetMinutes: number;
}

export type AuthenticateFederatedResponse = Response;

export type AuthenticateWithCacheRequest = AuthenticateRequest;
export interface UserData {
	avatar: string;
	cell: string;
	createdDate?: string;
	departmentId?: number;
	description: string;
	email: string;
	enabled: boolean;
	eulaDate?: string;
	expires?: string;
	extension: string;
	fax: string;
	fName: string;
	fullName: string;
	groupIds?: number[];
	groupPermissionList: string;
	groups: string[];
	id: number;
	idPName: string;
	isServiceAccount: boolean;
	lastLoginAddr: string;
	lastLoginAttempt?: string;
	lastLoginDate?: string;
	lName: string;
	locationId?: number;
	loginAttempts?: number;
	pager: string;
	phone: string;
	preferences: PreferenceData;
	settings: SettingsData;
	titleId?: number;
	username: string;
}
export interface SettingsData {
	assetBrowserScrolling: string;
	defaultWCOConnectorId: string;
}

export interface PreferenceData {
	assetBrowserScrolling: boolean;
	culture?: string;
	defaultFolderSort: number;
	defaultWCOConnectorId: number;
	editMode: EditModeType;
	folderPageSize: number;
	initialAssetView: string;
	lastFileOrFolderShortCut: MenuShortCutData;
	loginMode: LoginModeType;
	menuShortCuts: MenuShortCutData[];
	notificationErrorDetail: boolean;
	notificationMode: number;
	notifyOnScheduledDowntime: boolean;
	notifyOnWorkflowAlerts: boolean;
	previewStates: number[];
	showDebugConsole: boolean;
	showRuntimeErrorDetail: boolean;
	skipDependenciesMode: number;
	startupFileOrFolderId: number;
	startupFileOrFolderPath: string;
	timezoneDaylightOrStandardName: string;
	timezoneDisplayName: string;
	timezoneOffsetMinutes: number;
	wysiwygEditor: WysiwygEditorType;
}

export interface MenuShortCutData {
	action: string;
	assetId: number;
	display: string;
}

export interface ActionData {
	action: string;
	description: string;
}

export interface UIConfigurationData {
	key: string;
	value: string;
}

export interface StatusData {
	id: number;
	color: string;
	name: string;
}

export interface WCOBeaconSiteData {
	hostName: string;
	packageId: number;
	packageName: string;
	snippetId: string;
}

export interface AuthenticateWithCacheResponse extends Response {
	actions: Map<string, ActionData>;
	activityUsers: ActivityUser[];
	// connectorUpdateData: List
	daysToExpire: number;
	// deviceLayouts: CrownPeakApp.Model.UIModel.DeviceLayoutData[]
	// folderOptionData: CrownPeakApp.Model.FolderOptionData[]
	groupPermissionList: string;
	idleTimeoutMinutes: number;
	instanceWysiwygEditor: WysiwygEditorType;
	isConnectorDataChanged: boolean;
	isMaintenanceMessageChanged: boolean;
	isStatusDataChanged: boolean;
	isWorkflowDataChanged: boolean;
	layouts: LayoutData[];
	machineNumber: string;
	maintenanceMessage: string;
	needsExpirationWarning: boolean;
	preferenceData: PreferenceData;
	publishingServers: PublishingServer[];
	statusData: Map<string, StatusData>;
	systemModelsPathId: number;
	systemTemplatesPathId: number;
	taskBaseModelId: number;
	taskCount: number;
	tasksFolderId: number;
	uiConfiguration: UIConfigurationData[];
	user: UserData;
	wcoBeaconSites: WCOBeaconSiteData[];
	workflowData: Map<string, WorkflowData>;
	workflowTaskCount: number;
}

export interface ActivityUser {
	avatar: string;
	fName: string;
	fullName: string;
	id: number;
	lName: string;
}

export interface LayoutData {
	displayName: string;
	fileName: string;
	icon?: string;
}
/**
 * TODO: Verify Interface
 */
export interface PublishingServer {
	configured_hostname?: string;
	configured_path?: string;
	enabled: boolean;
	encodeUTF8: boolean;
	http_id?: number;
	id: number;
	name: string;
	odbc_id?: number;
	package_state: number;
	repository_id?: number;
	repositoryServer?: string;
	smtp_id?: number;
	soap_id?: number;
}

export interface ForgotPasswordRequest {
	username: string;
}
export type ForgotPasswordResponse = Response;

export interface PreAuthResponse extends Response {
	defaultProvider: string;
	enableRememberMe: boolean;
	fedAuthEnabled: boolean;
	host: string;
	isEnabled: boolean;
	isLoggedIn: boolean;
	machineNumber: string;
	message: string;
	providers: []; // TODO
	version: string;
}

export type LogoutResponse = Response;

export interface UpdatePasswordRequest {
	newPassword: string;
	oldPassword: string;
	username: string;
}

export type UpdatePasswordResponse = Response;

/**
 * The Auth Web API function calls are used to authenticate with the CMS.
 *
 * These calls allow external programs to login and logout using the POST method.
 */
export default class Auth extends Crownpeak implements Interface {
	/**
	 * @param configuration
	 */
	constructor(configuration: Configuration) {
		super(configuration);
	}

	/**
	 * Create a new user session on the specified server and instance.
	 *
	 * @param authenticaterequest
	 */
	async authenticate(
		authenticateRequest: AuthenticateRequest
	): Promise<AuthenticateResponse> {
		return super.post("auth/authenticate", authenticateRequest);
	}

	/**
	 * Create a new user session on the specified server and instance using Federated Authentication.
	 *
	 * @param authenticateFederatedRequest
	 */
	async authenticateFederated(
		authenticateFederatedRequest: AuthenticateFederatedRequest
	): Promise<AuthenticateFederatedResponse> {
		return super.post(
			"auth/authenticateFederated",
			authenticateFederatedRequest
		);
	}

	/**
	 * Create a new user session on the specified server and instance.
	 * The response will contain contents that can be used for caching.
	 *
	 * @param authenticateWithCacheRequest
	 */
	async authenticateWithCache(
		authenticateWithCacheRequest: AuthenticateWithCacheRequest
	): Promise<AuthenticateWithCacheResponse> {
		return super.post(
			"auth/authenticateWithCache",
			authenticateWithCacheRequest
		);
	}

	/**
	 * Given a valid username, it resets the password and emails a notice to the user with the new password.
	 * If there is an error, it will be returned in the error message.
	 *
	 * @param forgotPasswordRequest
	 */
	async forgotPassword(
		forgotPasswordRequest: ForgotPasswordRequest
	): Promise<ForgotPasswordResponse> {
		return super.post("auth/forgotPassword", forgotPasswordRequest);
	}

	/**
	 * Get data for use before authentication.
	 */
	async preAuth(): Promise<PreAuthResponse> {
		return super.post("auth/preAuth");
	}

	/**
	 * Logout of the current CMS session.
	 */
	async logout(): Promise<LogoutResponse> {
		return super.post("auth/logout");
	}

	/**
	 * Given a valid username and old password, it changes the password to the new password.
	 * If there is an error, it will be returned in the error message.
	 *
	 * @param updatePasswordRequest
	 */
	async updatePassword(
		updatePasswordRequest: UpdatePasswordRequest
	): Promise<UpdatePasswordResponse> {
		return super.post("auth/updatePassword", updatePasswordRequest);
	}
}
