import { createContext, useContext, useEffect, useState } from 'react';
import { readFetchTasks } from '../api';

const TasksContext = createContext(null);

export const AppContextProvider = ({ children }) => {
	const [taskList, setTaskList] = useState([]);
	const [sortedAndFilteredTasklist, setSortedAndFilteredTasklist] = useState([]);
	const [isloading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [isFilteringEnabled, setIsFilteringEnabled] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		readFetchTasks()
			.then((loadedTodos) => setTaskList(loadedTodos))
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<TasksContext.Provider
			value={{
				isError,
				taskList,
				isloading,
				setIsError,
				setTaskList,
				isButtonDisabled,
				isFilteringEnabled,
				setIsButtonDisabled,
				setIsFilteringEnabled,
				sortedAndFilteredTasklist,
				setSortedAndFilteredTasklist,
			}}
		>
			{children}
		</TasksContext.Provider>
	);
};

export const useTasksContext = () => useContext(TasksContext);
