// import { BaseApiSlice } from '../baseApiSlice';
import { AuthenticationDetails, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

import { useState } from 'react';

const poolData = {
	UserPoolId: process.env.REACT_APP_USER_POOL, // Your user pool id here
	ClientId: process.env.REACT_APP_CLIENT_ID // Your client id here
};

const userPool = new CognitoUserPool(poolData);

export function useLogin() {
	const [result, setResult] = useState(null);
	const [loggedUser, setLoggedUser] = useState(null);
	const [error, setError] = useState(null);

	const login = ({ email, password }) => {
		const cognitoUser = new CognitoUser({
			Username: email,
			Pool: userPool
		});

		const authenticationDetails = new AuthenticationDetails({
			Username: email,
			Password: password
		});

		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: function (result) {
				const accessToken = result.getAccessToken().getJwtToken();
				setResult(accessToken);
				setLoggedUser(result.getIdToken().payload);
			},

			onFailure: function (err) {
				console.error(err);
				setError(err);
			},

			newPasswordRequired: function (_, requiredAtributes) {
				const attributes = [];
				for (var i = 0; i < requiredAtributes.length; i++) {
					attributes.push({
						Name: requiredAtributes[i],
						Value: null
					});
				}
				cognitoUser.completeNewPasswordChallenge(password, attributes, this);
			}
		});
	};

	return [login, result, loggedUser, error];
}
