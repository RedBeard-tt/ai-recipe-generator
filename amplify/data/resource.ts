import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

// Define the schema for your Bedrock API
const schema = a.schema({
  BedrockResponse: a.customType({
    body: a.string(),
    error: a.string(),
  }),

  askBedrock: a
    .query()
    .arguments({
      ingredients: a.string().array(),
    })
    .returns(a.ref("BedrockResponse"))
    .authorization((allow) => [allow.authenticated()])
    .handler(
      a.handler.custom({
        entry: "./bedrock.js",
        dataSource: "bedrockDS",
      })
    ),
});

// ✔ Correct type export for Amplify Gen 2
export type Schema = ClientSchema<typeof schema>;

// ✔ Exports the data client used by Amplify
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

