import Crownpeak, { Configuration, Response, Interface } from "./crownpeak";

export interface ReadResponse extends Response {
	workflows: Map<string, Data>;
}

export interface Data {
	assetId: number;
	description: string;
	id: number;
	modifiedBy: string;
	modifiedDate: string;
	name: string;
	stepCommands: StepCommandsData;
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
	 * Find workflow command by name
	 *
	 * @param data
	 * @param name
	 */
	findCommandByName(data: Data, name: string): CommandsData {
		for (const stepCommandsData of Object.values(data.stepCommands)) {
			for (const commands of Object.values(
				((stepCommandsData as unknown) as StepCommandsData).commands
			)) {
				const commandsData = (commands as unknown) as CommandsData;
				if (commandsData.command == name) {
					return commandsData;
				}
			}
		}
		return this.throwError(`Unable to find command: ${name}`);
	}

	/**
	 * Find workflow by name
	 *
	 * @param readResponse
	 * @param name
	 */
	findWorkflowByName(readResponse: ReadResponse, name: string): Data {
		for (const v of Object.values(readResponse.workflows)) {
			const data = (v as unknown) as Data;
			if (data.name == name) {
				return data;
			}
		}
		return this.throwError(`Unable to find workflow: ${name}`);
	}

	/**
	 * Get a list of all workflows available for this instance.
	 *
	 * @param id Get a workflow based on Id from the current instance.
	 */
	async read(id?: number): Promise<ReadResponse> {
		if (id != undefined) {
			return super.post(`workflow/read/${id}`);
		}
		return super.post("workflow/read");
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
