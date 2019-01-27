import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Game from "./Game";
import {questionAnswer} from './redux/actions'
import {changeBackwards} from './redux/actions'
import {changeQuestion} from './redux/actions'
import {submitScore} from './redux/actions'
import {resetea, fetchState, counter, start, milliscounter, finishCounter} from './redux/actions'

class App extends Component {



	componentDidMount(){
  		this.props.dispatch(fetchState())
	}

	componentDidUpdate(){
		if(this.props.second === 0 && this.props.millis === 0){
			clearInterval(this.interval);
			clearInterval(this.intervale)
			this.props.dispatch(finishCounter());
			this.props.dispatch(submitScore(this.props.questions));
		}
	}
	render() {

	    console.log(this.props)
	    if(this.props.fetch.fetching){
	      return <div id="gato"></div>
	    } else if(this.props.fetch.fetching===false && this.props.error){
	      console.log(this.props.fetch.error)
	    }
	    else{
		    return (
		      	<div className="App">
			      	<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
			    		<div class="contenedor">
			       			<div class="navbar-header">
			            		<a class="navbar-brand" href="index.html">
			                		<img src="quizzz.png" id="logo" height="40px" width="60px"/>
			            		</a>
			        		</div>
			        		<div class="collapse navbar-collapse">
			          			<h1 id="title"> Práctica 6. Quiz con React </h1>
			        		</div>
			    		</div>
			    	</div>
			    	<Game question={this.props.questions[this.props.currentQuestion]}
					  finished={this.props.finished}
					  score = {this.props.score}
					  onQuestionAnswer={(answer)=>{
						this.props.dispatch(questionAnswer(this.props.currentQuestion, answer))
					  }}
					  onChangeQuestion={()=>{
						this.props.dispatch(changeQuestion(this.props.currentQuestion))	
					  }}	
					  onChangeBackwards={()=>{
						this.props.dispatch(changeBackwards(this.props.currentQuestion))
					  }}
					  onSubmitScore={()=>{
					  clearInterval(this.interval)
					  clearInterval(this.intervale)
					  this.props.dispatch(finishCounter())
					  this.props.dispatch(submitScore(this.props.questions))
					  
					  }} 
					  onResetea={()=>{
					  	clearInterval(this.interval)
					  	clearInterval(this.intervale)
					  	this.props.dispatch(finishCounter())
					  	this.props.dispatch(resetea(this.props.score, this.props.finished));
					  	this.props.dispatch(fetchState())
					  	this.props.dispatch(finishCounter())
					  }} 
					  onCounter={()=>{
					  	if(this.props.running===false){
						  	this.props.dispatch(resetea(this.props.score, this.props.finished));
						  	this.props.dispatch(fetchState())
						  	this.props.dispatch(start())
						  	if(this.props.millis===0){
						  		this.props.dispatch(counter())
						  	}
						  	this.interval = setInterval(() => {
	    						this.props.dispatch(milliscounter());}, 100)
							this.intervale = setInterval(() => {
						  		this.props.dispatch(counter());},1000)
						}
					  }}
					  onSecond={()=>{
					  	this.props.dispatch(counter())
					  }}
					  millis={this.props.millis}
					  second={this.props.second}
					  running={this.props.running}/>
				</div> 
		    );
  		}
	}	
}

function mapStateToProps(state){
	return{
		...state
	}
}
export default connect(mapStateToProps)(App);
