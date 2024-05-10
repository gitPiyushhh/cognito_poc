import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
const poolData = {
      UserPoolId: 'ap-south-1_R7qEwjagO',
      ClientId: '2a3498ir6ad8acsc7rono1uepa',
    };
export const userPool = new CognitoUserPool(poolData);
