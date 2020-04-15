module.exports = {
  resource: "/purchase/{purchaseId}",
  path: "/purchase/abea53e5-e7aa-4480-a554-4a702cadc936",
  httpMethod: "GET",
  headers: null,
  multiValueHeaders: null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: { purchaseId: "abea53e5-e7aa-4480-a554-4a702cadc936" },
  stageVariables: null,
  requestContext: {
    resourceId: "ke31w6",
    resourcePath: "/purchase/{purchaseId}",
    httpMethod: "GET",
    extendedRequestId: "KCYz9Fr0PHcFuSw=",
    requestTime: "27/Mar/2020:06:48:18 +0000",
    path: "/purchase/{purchaseId}",
    accountId: "927516465821",
    protocol: "HTTP/1.1",
    stage: "test-invoke-stage",
    domainPrefix: "testPrefix",
    requestTimeEpoch: 1585291698833,
    requestId: "fccca398-cdaa-4340-b910-25dbd552bf2a",
    identity: {
      cognitoIdentityPoolId: null,
      cognitoIdentityId: null,
      apiKey: "test-invoke-api-key",
      principalOrgId: null,
      cognitoAuthenticationType: null,
      userArn: "arn:aws:iam::927516465821:root",
      apiKeyId: "test-invoke-api-key-id",
      userAgent:
        "aws-internal/3 aws-sdk-java/1.11.719 Linux/4.9.184-0.1.ac.235.83.329.metal1.x86_64 OpenJDK_64-Bit_Server_VM/25.242-b08 java/1.8.0_242 vendor/Oracle_Corporation",
      accountId: "927516465821",
      caller: "927516465821",
      sourceIp: "test-invoke-source-ip",
      accessKey: "ASIA5P5CKDKOSURAXAOW",
      cognitoAuthenticationProvider: null,
      user: "927516465821"
    },
    domainName: "testPrefix.testDomainName",
    apiId: "7jdw1jxnm4"
  },
  body: {
    pk: "PURCHASE",
    sk: "abea53e5-e7aa-4480-a554-4a702cadc936",
    purchaseDate: "2020-01-01T08:00:00.000Z",
    category: "Bills",
    amount: 210.21,
    memo: "Electric bill.",
    payee: "Pacific Power"
  },
  isBase64Encoded: false
};
