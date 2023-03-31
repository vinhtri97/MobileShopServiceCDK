export const handler = () => {
	return {
		body: `Hello from Lambda. This is ${process.env.stage} stage`,
		statusCode: 200,
	};
};
