export const QUESTION_ANSWER = 'QUESTION_ANSWER';
export const CHANGE_QUESTION = 'CHANGE_QUESTION';
export const CHANGE_BACKWARDS = 'CHANGE_BACKWARDS';
export const SUBMIT_SCORE = 'SUBMIT_SCORE';
export const RESET = 'RESET';
export const FETCH = {
	fetching: false,
	finished: false,
	error: null
};
export const FINISHCOUNT = 'FINISHCOUNT';
export const COUNTER = 'COUNTER';
export const MILLISCOUNTER = 'MILLISCOUNTER';
export const START = 'START';
export const API = 'https://quiz2019.herokuapp.com/api/quizzes/random10wa?token=6038a591ed37bcad9a30';

export function questionAnswer(index, answer){
	return { type: QUESTION_ANSWER, payload: {index, answer } };
}

export function changeQuestion(index){
	return { type: CHANGE_QUESTION, payload:{index}};
}

export function changeBackwards(index){
	return { type: CHANGE_BACKWARDS, payload:{index}};
}

export function submitScore(questions){
	return { type: SUBMIT_SCORE, payload:{questions}};
}
export function resetea(score, finished){
	return { type: RESET, payload:{score, finished}};
}
export function start(){
	return{ type:START }
}
export function finishCounter(){
	return{ type: FINISHCOUNT }
}
export function counter(){
	return { type: COUNTER };
}
export function milliscounter(){
	return { type: MILLISCOUNTER }
}
//Get data via fetching, learned from MOOC videos 4.0, 4.1 and 4.2
export function fetchStateBegin(){
	return {type: 'FETCH_STATE_BEGIN' }
}

export function fetchStateSuccess(json_received){
	return{
		type: 'FETCH_STATE_SUCCESS',
		json: json_received
	}
}

export function fetchStateFailure(error){
	return{
		type: 'FETCH_STATE_FAILURE',
		error: error
	}
}

export function handleErrors(response){
	if(!response.ok){
		console.log("Error: " + response.statusText);
		throw Error(response.statusText);
	}
	return response
}

export function fetchState(){
	return dispatch => {
		dispatch(fetchStateBegin());
		return fetch(API)
			.then(handleErrors)
			.then(res => res.json())
			.then(json =>{
				return dispatch(fetchStateSuccess(json));
			})
			.catch(error=>{
				console.log(error);
				return dispatch(fetchStateFailure);
			})
	}
}