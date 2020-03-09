#!/usr/bin/env node

const fs = require("fs");
import { existsSync, readFileSync } from "fs";
import { CookieJar } from "tough-cookie";
import Auth from "../auth";
import Asset from "../asset";
import Workflow, {
	Data as WorkflowData,
	StepCommandsData as WorkflowStepCommandsData
} from "../workflow";
import { ResultCodeType } from "../model";

try {
	const path = "./crownpeak.config.json";
	if (existsSync(path)) {
		const crownpeakConfig = JSON.parse(readFileSync(path, "utf8"));
		const config = {
			apiKey: crownpeakConfig.apiKey,
			basePath: crownpeakConfig.basePath,
			cookieJar: new CookieJar()
		};
		const auth = new Auth(config);
		auth.authenticate({
			instance: crownpeakConfig.instance,
			username: crownpeakConfig.username,
			password: crownpeakConfig.password,
			/* eslint-disable-next-line @typescript-eslint/camelcase */
			remember_me: crownpeakConfig.remember_me,
			timeZoneOffsetMinutes: crownpeakConfig.timeZoneOffsetMinutes
		}).then(response => {
			if (response.resultCode == ResultCodeType.Success) {
				const asset = new Asset(config);
				asset
					.fields({ assetId: crownpeakConfig.test.assetId })
					.then(response => {
						const field = response.fields.find(
							field => field.name == "body"
						);
						if (field) {
							console.log(field.value);
							asset
								.update({
									assetId: crownpeakConfig.test.assetId,
									fields: {
										body:
											"new value " + Date.now().toString()
									}
								})
								.then(response => {
									console.log(response.resultCode);
									const workflow = new Workflow(config);
									workflow.read().then(response => {
										var wd, wc;
										for (const v of Object.values(
											response.workflows
										)) {
											const data = (v as unknown) as WorkflowData;
											if (
												data.name ==
												crownpeakConfig.test.workflow
													.name
											) {
												wd = data;
												for (const v of Object.values(
													wd.stepCommands
												)) {
													const data = (v as unknown) as WorkflowStepCommandsData;
													data.commands.forEach(
														commandStep => {
															if (
																commandStep.command ==
																crownpeakConfig
																	.test
																	.workflow
																	.command
															) {
																wc = commandStep;
																return;
															}
														}
													);
												}
												break;
											}
										}
										if (wd && wc) {
											asset
												.executeWorkflowCommand({
													assetId:
														crownpeakConfig.test
															.assetId,
													commandId: wc.commandId,
													skipDependencies: false
												})
												.then(response => {
													console.log(
														response.resultCode
													);
												});
											// upload test
											const fileBytes = fs
												.readFileSync(
													`./${crownpeakConfig.test.fileName}`
												)
												.toString("base64");
											asset
												.upload({
													bytes: fileBytes,
													destinationFolderId:
														crownpeakConfig.test
															.destinationFolderId,
													workflowId: wd.id,
													newName:
														crownpeakConfig.test
															.fileName,
													modelId:
														crownpeakConfig.test
															.modelId
												})
												.then(response => {
													asset
														.attach({
															assetId:
																response.asset
																	.id,
															bytes: fileBytes,
															originalFilename:
																crownpeakConfig
																	.test
																	.fileName
														})
														.then(response => {
															console.log(
																"attach:"
															);
															console.log(
																response
															);
														});
													console.log("upload:");
													console.log(response);
												});
										} else {
											if (wd == null) {
												console.log(
													`Unknown Workflow Name: ${crownpeakConfig.test.workflow.name}`
												);
											}
											if (wc == null) {
												console.log(
													`Unknown Workflow Command: ${crownpeakConfig.test.workflow.command}`
												);
											}
										}
									});
								});
						}
					});
			} else {
				console.log(response.resultCode);
			}
		});
	} else {
		console.log(
			"Command Line Interface development in progress; use import instead."
		);
	}
} catch (_) {
	console.log(
		"Command Line Interface development in progress; use import instead."
	);
}
