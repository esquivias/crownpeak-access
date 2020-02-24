import Crownpeak, { Configuration, Interface, Response } from "./crownpeak";

export interface PublishedPageData {
	count: number;
	name: string;
	reportURI: string;
}

export interface SiteSummaryReportData {
	cdnMonthlyDistribution: number;
	contractedCDNMonthlyDistribution: number;
	contractedSitesInProduction: number;
	contractedtotalActiveTemplates: number;
	contractedtotalContentDataSize: string;
	contractedtotalFiles: number;
	contractedtotalFolders: number;
	contractedtotalGroups: number;
	contractedtotalNumberOfPages: number;
	contractedtotalNumberOfProductionPages: number;
	contractedtotalPublishedFiles: number;
	contractedtotalPublishedPages: number;
	contractedtotalPublishedTemplatedFiles: number;
	contractedtotalSites: number;
	contractedtotalStorage: string;
	contractedtotalTemplatedFiles: number;
	contractedtotalUsers: number;
	contractedWCOPageViews: number;
	lastUpdated: string;
	lastUpdatedDate: string;
	lastUpdatedFrequency: number;
	publishedPages: PublishedPageData[];
	sitesInProduction: number;
	totalActiveTemplates: number;
	totalContentDataSize: string;
	totalFiles: number;
	totalFolders: number;
	totalGroups: number;
	totalNumberOfPages: number;
	totalNumberOfProductionPages: number;
	totalPublishedFiles: number;
	totalPublishedPages: number;
	totalPublishedTemplatedFiles: number;
	totalSites: number;
	totalStorage: string;
	totalTemplatedFiles: number;
	totalUsers: number;
	wcoPageViews: number;
}

export interface SiteSummaryResponse extends Response {
	reportData: SiteSummaryReportData;
}

/**
 * The Report web api function calls are used to allow a user to see the statisics regarding their instance.
 */
export default class Report extends Crownpeak implements Interface {
	/**
	 * @param configuration
	 */
	constructor(configuration: Configuration) {
		super(configuration);
	}

	/**
	 * Gets the site summary for the instance
	 *
	 * @param siteSummaryRequest
	 */
	async siteSummary(): Promise<SiteSummaryResponse> {
		return super.post("report/siteSummary");
	}
}
