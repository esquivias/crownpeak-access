#!/usr/bin/env node

import { existsSync, readFileSync } from "fs";
import { CookieJar } from "tough-cookie";
import Auth from "../auth";
import Asset from "../asset";
import Workflow from "../workflow";
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
						if (asset.hasFieldByName(response, "body")) {
							console.log(
								asset.findFieldByName(response, "body").value
							);
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
										const wd = workflow.findWorkflowByName(
											response,
											crownpeakConfig.test.workflow.name
										);
										const wc = workflow.findCommandByName(
											wd,
											crownpeakConfig.test.workflow
												.command
										);
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
