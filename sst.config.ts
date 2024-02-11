import type { SSTConfig } from "sst";
import { Bucket, RemixSite } from "sst/constructs";

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

      const site = new RemixSite(stack, "site", {
        bind: [logsBucket],
      });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
