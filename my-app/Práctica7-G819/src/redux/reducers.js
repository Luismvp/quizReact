import { combineReducers } from 'redux';
import { CHANGE_BACKWARDS } from './actions'
import { QUESTION_ANSWER } from './actions'
import { CHANGE_QUESTION } from './actions'
import { SUBMIT_SCORE } from './actions'
import { RESET, FETCH, COUNTER, START, MILLISCOUNTER, FINISHCOUNT } from './actions'

function score(state = 0 , action = {}) {
	switch(action.type) {
		case SUBMIT_SCORE:
			state = 0 
			for( var i = 0 ; i < action.payload.questions.length ; i++ ){
				if (action.payload.questions[i].answer === action.payload.questions[i].userAnswer){
					state = state + 1
				}
			}
			return state;
		case RESET:
			state = 0;
			return state;
		case 'FETCH_STATE_SUCCESS':
			state = 0
			return state;
		default:
			return state;
	}
}

function finished(state = false, action = {}) {
	switch(action.type) {
		case SUBMIT_SCORE:
			state = true;
			return state;
		case RESET:
			state = false;
			return state;
		case 'FETCH_STATE_SUCCESS':
			state = false
			return state;
		default:
			return state;
	}
}

function currentQuestion(state = 0, action = {}) {
	switch(action.type) {
		case CHANGE_QUESTION:
			if(state < 9){
				state = state + 1;
			}
			return state;
		case CHANGE_BACKWARDS:
			if(state > 0){
				state = state - 1;
			}
			return state;
		case RESET:
			state=0;
			return state;
		case 'FETCH_STATE_SUCCESS':
			state = 0
			return state;
		default:
			return state;
	}
}

function questions(state = [], action = {}) {
	switch(action.type) {
		case QUESTION_ANSWER:
			return state.map((question,i) => {
				return{ ...question,
					userAnswer: action.payload.index === i ?
					action.payload.answer : question.userAnswer}
			});
		case 'FETCH_STATE_SUCCESS':
			state = action.json;
			return state;
		default:
			return state;
	}
}
function fetch(state=FETCH, action){
	let newState;
	switch (action.type){
		case 'FETCH_STATE_BEGIN':
			newState = JSON.parse(JSON.stringify(state));
			newState.fetching = true;
			return newState;
		case 'FETCH_STATE_SUCCESS':
			newState = JSON.parse(JSON.stringify(state));
			newState.fetching = false
			newState.finished = true;
			return newState;
		case 'FETCH_STATE_FAILURE':
			newState = JSON.parse(JSON.stringify(state));
			newState.fetching = false;
			newState.error = action.error
			return newState;

		default:
			return state;
	}
}
function millis(state=0,action){
	switch(action.type){
		case START:
			state=0;
			return state;
		case MILLISCOUNTER:
			if(state===0){
				state = 9;
				return state;
			}
			state = state - 1;
			return state; 
		case FINISHCOUNT:
			state = 0;
			return state;
		default:
			return state;
	}
}
function second(state=60,action){
	switch(action.type){
		case START:
			state=60;
			return state;
		case COUNTER:
			state = state - 1;
			return state; 
		case FINISHCOUNT:
			state = 60;
			return state;
		default:
			return state;
	}
}
function running(state=false,action){
	switch(action.type){
		case START:
			state=true;
			return state;
		case FINISHCOUNT:
			state=false;
			return state;
		default:
			return state;
	}
}
const GlobalState = (combineReducers({
	score,
	finished,
	currentQuestion,
	questions,
	fetch,			
	millis,
	second,
	running

}));

export default GlobalState;
