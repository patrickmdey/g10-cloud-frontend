import { Buffer } from 'buffer';
import { useSelector } from 'react-redux';

export default function useUserId() {
	const token = useSelector((state) => state.auth.token);
	if (token == null) return null;

	const info = token.split('.');
	if (info.length !== 3) return null;

	const json = JSON.parse(Buffer.from(info[1], 'base64').toString());
	if (json == null || json.user == null) return null;

	return parseInt(json.user.id);
}
