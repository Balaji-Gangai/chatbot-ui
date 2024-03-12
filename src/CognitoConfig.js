import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "eu-west-1_pT6PYqlXl",
    ClientId: "6v7t4knfsafigu3rgvq5pe3nje"
};

const UserPool = new CognitoUserPool(poolData);

export default UserPool