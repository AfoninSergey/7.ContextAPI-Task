import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { AppContextProvider } from './providers/tasks-context-provider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<AppContextProvider>
		<App />
	</AppContextProvider>,
);
