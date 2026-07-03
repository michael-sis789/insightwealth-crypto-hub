import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const file = path.join(process.cwd(), "data", "etf-flow.json");
const data = JSON.parse(await readFile(file, "utf8"));

data.lastUpdated = new Date().toISOString().slice(0, 10);
data.source = data.source || "Manual JSON update - ETF issuers / Farside-style daily table";
data.status = data.status || "Neutral";

await writeFile(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`ETF flow JSON timestamp refreshed: ${data.lastUpdated}`);
console.log("Edit data/etf-flow.json manually with the latest daily ETF flow values before publishing.");
