import Crownpeak, { Configuration, Response, Interface } from "./crownpeak";
import { ResultCodeType } from "./model";

export interface ReadResponse extends Response {
	workflows: Data[] //Map<string, Data>
}

export interface ReadByIdRequest {
	id: number
}

export interface ReadByIdResponse {
	workflow: Data
}

export interface Data {
	assetId: number;
	description: string;
	id: number;
	modifiedBy: string;
	modifiedDate: string;
	name: string;
	stepCommands: StepCommandsData[];
	usage: number;
}

export interface StepCommandsData {
	commands: CommandsData[];
	description: string;
	stateId: number;
	subject: string;
}

export interface CommandsData {
	id?: number;
	workflowId: number;
	workflowStep: number;
	destinationStatus: number;
	commandId: number;
	command: string;
	filterId: number;
	hasVerifyCommand: boolean;
	hasRequestComment: boolean;
	isPublishingStep: boolean;
}

/**
 * The Workflow Web API function calls are used to manage workflows in the CMS.
 *
 * These calls allow external programs to create, update, and delete workflows using the POST, PUT, and DELETE calls.
 */
export default class Workflow extends Crownpeak implements Interface {
	/**
	 * @param configuration
	 */
	constructor(configuration: Configuration) {
		super(configuration);
	}

	/**
	 * Get a list of all workflows available for this instance.
	 * 
	 * @returns `Array` of workflows instead of _Map<string, Data>_;
	 */
	async read(): Promise<ReadResponse> {
		const responseModification = super.post("workflow/read").then((response: ReadResponse) => {
			if (response.resultCode == ResultCodeType.Success) {
				const workflows = response.workflows;
				response.workflows = [];
				Object.entries(workflows).forEach((value, _) => {
					response.workflows.push(value[1]);
				});
			} else {
				response.workflows = [];
			}
			return response;
		});
		return responseModification;
	}

	/**
	 * Get workflow by ID.
	 * @param id
	 */
	async readById(readByIdRequest: ReadByIdRequest): Promise<ReadByIdResponse> {
		return super.post(`workflow/read/${readByIdRequest.id}`);
	}

	/**
	 * Throw Error
	 *
	 * @param message
	 */
	throwError(message: string): never {
		return super.throwError(`Workflow: ${message}`);
	}
}
