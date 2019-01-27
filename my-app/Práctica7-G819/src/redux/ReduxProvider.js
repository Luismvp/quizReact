import { Provider } from 'react-redux';
import GlobalState from './reducers';
import { createStore, compose, applyMiddleware } from 'redux';
import { questions } from "../assets/mock-data";
import thunk from 'redux-thunk';
import React from 'react';
import App from '../App';

export default class ReduxProvider extends React.Component {
	constructor(props) {
		super(props);
		this.initialState = {
			score: 0,
			finished: false,
			currentQuestion: 0,
			questions: [ ...questions ],
			millis:0,
			second:60,
			running:false
		};
		this.store = this.configureStore();
	}

	render() {
		
		return(
			<Provider store={ this.store }>
				<div style={{ height: '100%' }} >
					<App store={ this.store } />
				</div>
			</Provider>
		);
	}

	configureStore() {
		return createStore(GlobalState, this.initialState, compose(applyMiddleware(thunk)));
	}
}
