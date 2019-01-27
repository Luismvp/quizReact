import React from 'react';
export default class Game extends React.Component {
	render() {
		if (this.props.finished === false){
			if(this.props.running){
				return (
					<div>
						<div className="display">
								<div className="numbers">
									<span className="secs">{this.props.second}</span>
									<span className="millis">.{this.props.millis}</span>
								</div>
						</div>
						<div id="imagenPregunta">
							<img src={this.props.question.attachment.url} id="foto" height="300px" width ="400px"/>
							<div id="Pregunta">
								<h2>{this.props.question.question}</h2>
								<br/>
								<input type="text" id="answer" placeholder="Introduce your answer" value={this.props.question.userAnswer || ''} onChange={(e)=>{
									this.props.onQuestionAnswer(e.target.value);}}/>
								<br/>
								<br/>
								<h3> Pistas: </h3>
								{this.props.question.tips.map((tip, i) => <p key = {i}>{tip}</p>)}
							</div>
						</div>
						<br/>
						<br/>
						<input type='button' id="resetea" 	class="btn" value='Resetear preguntas' onClick={()=>{
								this.props.onResetea();}}/>
						<div id="actionBar" >
							<input type='button' id="anterior" class="btn" value='Pregunta Anterior' onClick={()=>{
								this.props.onChangeBackwards();}}/>
							<input type='button' id="comprobar" class="btn" value='Comprobar' onClick={()=>{
								this.props.onSubmitScore();}}/>
							<input type='button' id="siguiente" class="btn" value='Siguiente Pregunta' onClick={()=>{
								this.props.onChangeQuestion();}}/>
						</div>
						<br/>
					</div>
				);
			}
			else{
				return (
					<div>
						<div className="actions">
							<button className="btn start" onClick={()=>{this.props.onCounter();}}>Contrarreloj</button>
						</div>
						<div id="imagenPregunta">
							<img src={this.props.question.attachment.url} id="foto" height="300px" width ="400px"/>
							<div id="Pregunta">
								<h2>{this.props.question.question}</h2>
								<br/>
								<input type="text" id="answer" placeholder="Introduce your answer" value={this.props.question.userAnswer || ''} onChange={(e)=>{
									this.props.onQuestionAnswer(e.target.value);}}/>
								<br/>
								<br/>
								<h3> Pistas: </h3>
								{this.props.question.tips.map((tip, i) => <p key = {i}>{tip}</p>)}
							</div>
						</div>
						<br/>
						<br/>
						<input type='button' id="resetea" 	class="btn" value='Resetear preguntas' onClick={()=>{
								this.props.onResetea();}}/>
						<div id="actionBar" >
							<input type='button' id="anterior" class="btn" value='Pregunta Anterior' onClick={()=>{
								this.props.onChangeBackwards();}}/>
							<input type='button' id="comprobar" class="btn" value='Comprobar' onClick={()=>{
								this.props.onSubmitScore();}}/>
							<input type='button' id="siguiente" class="btn" value='Siguiente Pregunta' onClick={()=>{
								this.props.onChangeQuestion();}}/>
						</div>
						<br/>
					</div>
				);
			}
		}else{
			return(
				<div id="resultado">
					<h2>La puntuación que has obtenido es: </h2>
					<h2>{this.props.score}</h2>
					<br/>
					<br/>
					<input type='button' id="reset" value='Volver a empezar' onClick={()=>{
							this.props.onResetea();}}/>
				</div>
			)
		}
	}
}
