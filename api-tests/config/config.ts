import { Utils } from "../../utils/Utils.ts";

const randomFilterId = Utils.generateRandomUsername(10);
module.exports = {
    "local": {
        "BASE_URL": "http://localhost:8080",
        "API_USER": process.env.API_USER,
        "API_PASSWORD": process.env.API_PASSWORD,
        "UI_USER": process.env.UI_USER,
        "UI_PASSWORD": process.env.UI_PASSWORD,
        "PROJECT_NAME": "default_personal",
        "widgetData": {
            widgetType: "overallStatistics",
            contentParameters: {
                "contentFields": [
                    "statistics$executions$total",
                    "statistics$executions$passed",
                    "statistics$executions$failed",
                    "statistics$executions$skipped",
                    "statistics$defects$product_bug$pb001",
                    "statistics$defects$automation_bug$ab001",
                    "statistics$defects$system_issue$si001",
                    "statistics$defects$no_defect$nd001",
                    "statistics$defects$to_investigate$ti001"
                ],
                "itemsCount": "50",
                "widgetOptions": { "viewMode": "panel", "latest": false }
            },
            filters: [{ "value": "2", "name": "DEMO_FILTER" }],
            name: "DEMO_FILTER_" + randomFilterId,
            description: "",
            filterIds: ["2"]
        }
    },
    "prod": {
        "BASE_URL": "https://rp.epam.com",
        "API_USER": process.env.API_USER,
        "API_PASSWORD": process.env.API_PASSWORD,
        "UI_USER": process.env.UI_USER,
        "UI_PASSWORD": process.env.UI_PASSWORD,
        "PROJECT_NAME": "mchaveztest_personal",
        "widgetData": {
            widgetType: "statisticTrend",
            contentParameters: {
                "contentFields": [
                    "statistics$executions$total",
                    "statistics$executions$passed",
                    "statistics$executions$failed",
                    "statistics$executions$skipped",
                    "statistics$defects$product_bug$total",
                    "statistics$defects$product_bug$pb001",
                    "statistics$defects$automation_bug$total",
                    "statistics$defects$automation_bug$ab001",
                    "statistics$defects$system_issue$total",
                    "statistics$defects$system_issue$si001",
                    "statistics$defects$no_defect$total",
                    "statistics$defects$no_defect$nd001",
                    "statistics$defects$to_investigate$total",
                    "statistics$defects$to_investigate$ti001"
                ],
                itemsCount: "50",
                widgetOptions: { "zoom": false, "timeline": "launch", "viewMode": "area-spline" }
            },
            filters: [{ "value": "183723", "name": "DEMO_FILTER" }],
            name: "DEMO_FILTER_" + randomFilterId,
            description: "",
            filterIds: ["183723"]
        }
    }
}
