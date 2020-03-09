import {
	FieldsResponse as AssetFieldsResponse,
	Field as AssetField
} from "./asset";
import {
	ReadResponse as WorkflowReadResponse,
	Data as WorkflowData,
	CommandsData as WorkflowCommandsData,
	StepCommandsData as WorkflowStepCommandsData
} from "./workflow";

export default class Helper {
	/**
	 *
	 * @param file file to encode
	 */
	encodeFileToBase64(file: string): string {
		const fs = require("fs");
		return fs.readFileSync(file).toString("base64");
	}

	/**
	 *
	 * @param fieldsResponse
	 * @param name
	 */
	assetGetFieldByName(
		fieldsResponse: AssetFieldsResponse,
		name: string
	): AssetField {
		const field = fieldsResponse.fields.find(field => field.name == name);
		return field ? field : this.throwError(`Unable to find field: ${name}`);
	}

	/**
	 *
	 * @param fieldsResponse
	 * @param name
	 */
	assetHasFieldByName(
		fieldsResponse: AssetFieldsResponse,
		name: string
	): boolean {
		const field = fieldsResponse.fields.find(field => field.name == name);
		return field ? true : false;
	}

	/**
	 * Find workflow command by name
	 *
	 * @param data
	 * @param name
	 */
	workflowGetCommandByName(
		data: WorkflowData,
		name: string
	): WorkflowCommandsData {
		for (const stepCommandsData of Object.values(data.stepCommands)) {
			for (const commands of Object.values(
				((stepCommandsData as unknown) as WorkflowStepCommandsData)
					.commands
			)) {
				const commandsData = (commands as unknown) as WorkflowCommandsData;
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
	workflowGetByName(
		readResponse: WorkflowReadResponse,
		name: string
	): WorkflowData {
		for (const v of Object.values(readResponse.workflows)) {
			const data = (v as unknown) as WorkflowData;
			if (data.name == name) {
				return data;
			}
		}
		return this.throwError(`Unable to find workflow: ${name}`);
	}

	/**
	 * Throw Error
	 *
	 * @param message
	 */
	throwError(message: string): never {
		throw new Error(`Helper: ${message}`);
	}
}
