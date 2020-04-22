/**
 * Result Codes Type
 */
export const enum ResultCodeType {
	APIError = "conWS_APIError",
	APIUnknownError = "conWS_APIUnknownError",
	ActionNotAllowed = "conWS_ActionNotAllowed",
	CompilerError = "conWS_CompilerError",
	ConfigurationError = "conWS_ConfigurationError",
	ConfigurationGlobalError = "conWS_ConfigurationGlobalError",
	ConflictAlreadyExists = "conWS_ConflictAlreadyExists",
	DBConnectFailure = "conWS_DBConnectFailure",
	DBError = "conWS_DBError",
	ExceededLoginAttempts = "conWS_ExceededLoginAttempts",
	GeneralError = "conWS_GeneralError",
	HasFailures = "conWS_HasFailures",
	InitError = "conWS_InitError",
	InstanceDisabledOrMoved = "conWS_InstanceDisabledOrMoved",
	InvalidUserNameOrPassword = "conWS_InvalidUserNameOrPassword",
	IoError = "conWS_IoError",
	LayoutNotFound = "conWS_LayoutNotFound",
	LockedByAnotherUser = "conWS_LockedByAnotherUser",
	LoginDisabled = "conWS_LoginDisabled",
	LoginExpired = "conWS_LoginExpired",
	MovedPermanently = "conWS_MovedPermanently",
	NeedsConfirmation = "conWS_NeedsConfirmation",
	NeedsRendering = "conWS_NeedsRendering",
	NotCheckedOutByThisUser = "conWS_NotCheckedOutByThisUser",
	NotFound = "conWS_NotFound",
	NotImplemented = "conWS_NotImplemented",
	NotSet = "conWS_NotSet",
	NotSupported = "conWS_NotSupported",
	PasswordExpired = "conWS_PasswordExpired",
	PasswordTemporary = "conWS_PasswordTemporary",
	PluginError = "conWS_PluginError",
	RestrictedHours = "conWS_RestrictedHours",
	RestrictedLocation = "conWS_RestrictedLocation",
	SessionUnauthorizedOrTimedOut = "conWS_SessionUnauthorizedOrTimedOut",
	Success = "conWS_Success",
	UploadTooLarge = "conWS_UploadTooLarge",
	ValidationError = "conWS_ValidationError",
	WorkflowFailure = "conWS_WorkflowFailure"
}

/**
 * Order Type
 */
export const enum OrderType {
	Ascending = "Ascending",
	Descending = "Descending",
	NotSet = "NotSet",
	Saved = "Saved"
}

/**
 * Visibility Type
 */
export const enum VisibilityType {
	Normal = "Normal",
	Hidden = "Hidden",
	Deleted = "Deleted"
}

/**
 * Column Type
 */
export const enum ColumnType {
	ChangedBy = "ChangedBy",
	ChangedDate = "ChangedDate",
	Id = "Id",
	Label = "Label",
	ModifiedBy = "ModifiedBy",
	NotSet = "NotSet",
	Saved = "Saved",
	Size = "Size",
	Status = "Status",
	TemplateLabel = "TemplateLabel",
	Type = "Type"
}

/**
 * Icon Type
 */
export const enum IconType {
	Asset = "Asset",
	AssetCSS3 = "Asset_CSS3",
	AssetDoc = "Asset_Doc",
	AssetExcel = "Asset_Excel",
	AssetFacebook = "Asset_Facebook",
	AssetGooglePlus = "Asset_GooglePlus",
	AssetHTML5 = "Asset_HTML5",
	AssetImg = "Asset_Img",
	AssetLinkedIn = "Asset_LinkedIn",
	AssetMov = "Asset_Mov",
	AssetMusic = "Asset_Music",
	AssetPdf = "Asset_Pdf",
	AssetTwitter = "Asset_Twitter",
	AssetWorkflow = "Asset_Workflow",
	Branch = "Branch",
	Configuration = "Configuration",
	CustomDefault = "Custom_Default",
	CustomDefaultFolder = "Custom_Default_Folder",
	Data = "Data",
	Developer = "Developer",
	DeveloperOutput = "Developer_Output",
	Flag = "Flag",
	Folder = "Folder",
	GreenFolder = "Green_Folder",
	InputOnly = "Input_Only",
	LockedFolder = "Locked_Folder",
	Page = "Page",
	PurpleFolder = "Purple_Folder",
	RedFolder = "Red_Folder",
	Redirect = "Redirect",
	Reports = "Reports",
	Sitemap = "Sitemap",
	SubAsset = "SubAsset",
	Utility = "Utility",
	Widget = "Widget",
	Wysiwyg = "Wysiwyg",
	YellowFolder = "Yellow_Folder"
}

/**
 * Required Action Type
 */
export enum RequiredActionType {
	Edit = "Edit",
	None = "None",
	SetSchedule = "SetSchedule",
	SpellCheck = "SpellCheck"
}

/**
 * Render Type
 */
export enum RenderType {
	ASPUI = "ASP_UI",
	ASPUINoHeader = "ASP_UI_NO_HEADER",
	Download = "Download",
	SLUI = "SL_UI",
	SLUINoHeader = "SL_UI_NO_HEADER",
	V3UI = "V3_UI",
	ViewOutput = "ViewOutput",
	ViewOutputNoHeader = "ViewOutput_NO_HEADER"
}

/**
 * WYSIWYG Editor
 */
export enum WysiwygEditorType {
	Ephox = "Ephox",
	TinyMCE = "TinyMCE",
	UseInstanceConfiguration = "UseInstanceConfiguration"
}

/**
 * Login Mode
 */
export enum LoginModeType {
	None = "Node",
	ShowDashboard = "ShowDashboard",
	ShowHomeFileOrFolder = "ShowHomeFileOrFolder",
	ShowLastFileOrFolder = "ShowLastFileOrFolder"
}

/**
 * Edit Mode
 */
export enum EditModeType {
	InContext = "InContext",
	Inline = "Inline"
}
