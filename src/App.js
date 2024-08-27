// npm run server
// npm start
import { useState, useEffect } from 'react';
import { Loader, Error, TaskListEmpty, Task, Controlpanel } from './components';
import { readFetchTasks } from './api';
import { AppContext } from './context';

import styles from './App.module.css';

export const App = () => {
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

	const renderContent = () => {
		if (isloading) return <Loader />;
		if (isError) return <Error />;
		if (
			taskList.length === 0 ||
			(sortedAndFilteredTasklist.length === 0 && isFilteringEnabled)
		)
			return <TaskListEmpty />;

		return (
			<ul className={styles.tasksList}>
				{(sortedAndFilteredTasklist.length !== 0 || isFilteringEnabled
					? sortedAndFilteredTasklist
					: taskList
				).map(({ id, title }) => (
					<Task
						key={id}
						id={id}
						title={title}
						setIsError={setIsError}
						taskList={taskList}
						setTaskList={setTaskList}
					/>
				))}
			</ul>
		);
	};

	return (
	<AppContext.Provider value={{isButtonDisabled, setIsButtonDisabled}}>
			<div className={styles.app}>
				<header>
					<h1>Список задач</h1>
					<Controlpanel
						taskList={taskList}
						setIsError={setIsError}
						setTaskList={setTaskList}
						isFilteringEnabled={isFilteringEnabled}
						setIsFilteringEnabled={setIsFilteringEnabled}
						setSortedAndFilteredTasklist={setSortedAndFilteredTasklist}
					/>
				</header>

				<main>
					<h2>Задачи:</h2>
					{renderContent()}
				</main>
			</div>
		</AppContext.Provider>
	);
};
