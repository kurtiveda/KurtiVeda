import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: "nr6xd1wb",
  dataset: "production",
  apiVersion: "2024-02-05",
  useCdn: false,
};

const client = createClient(config);

export default client;
