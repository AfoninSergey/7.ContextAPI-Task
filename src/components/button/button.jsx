import { useTasksContext } from '../../providers';

import styles from './button.module.css';

export const Button = ({ className, children, ...attributes }) => {
	const { isButtonDisabled } = useTasksContext();
	return (
		<button
			className={`${styles.button} ${styles[className]}`}
			disabled={isButtonDisabled}
			{...attributes}
		>
			{children}
		</button>
	);
};
