import { useState } from 'react';
import { Input } from '../../../input/Input';
import { Button } from '../../../button/button';
import { updateFetchTask, deleteFetchTask } from '../../../../api';
import { deleteTask, updateTask } from '../../../../utils';
import styles from './task.module.css';
import { useTasksContext } from '../../../../providers';

export const Task = ({ id, title }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isInputEmpty, setIsInputEmpty] = useState(false);
	const [newTitle, setNewTitle] = useState('');

	const { taskList, setIsError, setTaskList, setIsButtonDisabled } =
		useTasksContext();

	const onTitleChange = ({ target: { value } }) => {
		setNewTitle(value);

		if (value.length === 0) {
			setIsInputEmpty(true);
		} else if (value.length === 1) {
			setIsInputEmpty(false);
		}
	};

	const onTaskEdit = () => {
		setIsEditing(!isEditing);

		if (!isEditing) {
			setNewTitle(title);
		}

		if (isEditing) {
			if (newTitle.trim().length === 0) {
				setTaskList(taskList);
				setIsInputEmpty(false);
				setNewTitle(title);
				setTimeout(() => {
					setNewTitle('');
				}, 350);
				return;
			}

			setIsButtonDisabled(true);
			updateFetchTask(id, newTitle)
				.then(() => {
					const ubdatedTaskList = updateTask(taskList, id, newTitle);
					setTaskList(ubdatedTaskList);
					setNewTitle('');
				})
				.catch(() => setIsError(true))
				.finally(() => setIsButtonDisabled(false));
		}
	};

	const onTaskDelete = () => {
		setIsButtonDisabled(true);

		if (!isEditing) {
			deleteFetchTask(id)
				.then(() => {
					const ubdatedTaskList = deleteTask(taskList, id);
					setTaskList(ubdatedTaskList);
				})
				.catch(() => setIsError(true))
				.finally(() => setIsButtonDisabled(false));
		} else {
			setTaskList(taskList);
			setIsInputEmpty(false);
			setNewTitle('');
			setIsButtonDisabled(false);
			setIsEditing(false)
		}
	};

	return (
		<li className={styles.task}>
			<Input
				className="taskInput"
				isEditing={isEditing}
				readOnly={!isEditing}
				value={newTitle}
				placeholder={!isInputEmpty ? title : ''}
				onChange={onTitleChange}
			/>
			<div className={styles.task_actions}>
				<Button className="editButton" type="button" onClick={onTaskEdit}>
					{!isEditing ? 'Изменить' : 'Сохранить'}
				</Button>
				<Button
					className="deleteButton"
					type="button"
					onClick={onTaskDelete}
				>
					{!isEditing ? 'Удалить' : 'Отменить'}
				</Button>
			</div>
		</li>
	);
};
