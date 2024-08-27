const fetchServer = (method, id, title) => {
	const url =
		id !== undefined
			? `http://localhost:3003/todos/${id}`
			: `http://localhost:3003/todos`;

	const options =
		method !== 'GET' && method !== 'DELETE'
			? {
					method,
					headers: {
						'Content-Type': 'Application/json; Charset=UTF-8',
					},
					body: JSON.stringify({ title }),
				}
			: {
					method,
				};

	return fetch(url, options).then((loadedJsonData) => loadedJsonData.json());
};

export const createFetchTask = (newTitle) => fetchServer('POST', '', newTitle.trim());
export const readFetchTasks = () => fetchServer('GET');
export const updateFetchTask = (taskId, newTitle) =>
	fetchServer('PATCH', taskId, newTitle.trim());
export const deleteFetchTask = (taskId) => fetchServer('DELETE', taskId);
