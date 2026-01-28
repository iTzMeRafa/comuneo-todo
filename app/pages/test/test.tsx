import { client } from 'app/libs/appwrite';

export async function loader() {
	return null;
}

export default function Test() {
	return (
		<div>
			<h1>test page</h1>
			<button
				onClick={async () => {
					const result = await client.ping();
					const log = {
						date: new Date(),
						method: 'GET',
						path: '/v1/ping',
						status: 200,
						response: JSON.stringify(result),
					};
					console.log('log');
					console.log(log);
				}}
			>
				ping appwrite
			</button>
		</div>
	);
}
