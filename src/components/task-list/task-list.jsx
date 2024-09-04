import { useTasksContext } from '../../providers';
import { Loader, Error, Task, TaskListEmpty } from './components';

import styles from './task-list.module.css';

export const TaskList = () => {
	const {
		isError,
		taskList,
		isloading,
		isFilteringEnabled,
		sortedAndFilteredTasklist,
	} = useTasksContext();

	if (isloading) return <Loader />;
	if (isError) return <Error />;
	if (
		taskList.length === 0 ||
		(sortedAndFilteredTasklist.length === 0 && isFilteringEnabled)
	)
		return <TaskListEmpty />;

	return (
		<ul className={styles.taskList}>
			{(sortedAndFilteredTasklist.length !== 0 || isFilteringEnabled
				? sortedAndFilteredTasklist
				: taskList
			).map(({ id, title }) => (
				<Task
					key={id}
					id={id}
					title={title}
				/>
			))}
		</ul>
	);
};
