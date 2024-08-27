import { useContext } from 'react';
import styles from './button.module.css';
import { AppContext } from '../../context';

export const Button = ({ className, children, ...attributes }) => {
	const {isButtonDisabled} = useContext(AppContext)
	return (
		<button className={`${styles.button} ${styles[className]}`} disabled={isButtonDisabled} {...attributes}>
			{children}
		</button>
	);
};
