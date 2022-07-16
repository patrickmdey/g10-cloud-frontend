import { useEffect, useState } from 'react';

export default function useErrorMessage(errorStrings, error, validation) {
	const [message, setMessage] = useState(null);

	useEffect(() => {
		if (error == null || errorStrings == null || validation == null) {
			setMessage(null);
			return;
		}

		let msg = errorStrings[error?.type];
		if (msg == null) {
			setMessage(null);
			return;
		}

		for (const [key, value] of Object.entries(validation)) msg = msg.replace(`{${key}}`, value.toString());

		setMessage(msg);
		return;
	}, [error, errorStrings, validation]);

	return message;
}
