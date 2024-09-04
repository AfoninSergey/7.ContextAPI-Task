import { Controlpanel, TaskList } from './components';
import styles from './App.module.css';

export const App = () => {
	return (
		<div className={styles.app}>
			<header>
				<h1>Список задач</h1>
				<Controlpanel />
			</header>
			<main>
				<h2>Задачи:</h2>
				<TaskList />
			</main>
		</div>
	);
};
// npm run server
// npm start
