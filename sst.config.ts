import type { SSTConfig } from "sst";
import { Bucket, RemixSite, Config } from "sst/constructs";

export default {
  config() {
    return {
      name: "lnse-io",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const logsBucket = new Bucket(stack, "public");
      const TURSO_URL = new Config.Secret(stack, "TUROS_URL");
      const TURSO_TOKEN = new Config.Secret(stack, "TURSO_TOKEN");

      const site = new RemixSite(stack, "site", {
        bind: [logsBucket, TURSO_URL, TURSO_TOKEN],
      });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
