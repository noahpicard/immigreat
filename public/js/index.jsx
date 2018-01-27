import React from 'react';
import ReactDOM from 'react-dom';
/*import FormItem from './form-item';*/

class FormFlow extends React.Component {
  constructor() {
    super();
  }

  onClick(event) {
  	console.log(this.props.item);
  }

  render() {
    return(
      <div className="form-flow">
      	<h1 className="form-title">{this.props.item} Form</h1>
      	<div className="form-question-container">
	      	<span className="form-question">What is your name?</span>
	      	<input className="form-answer-text" type="text" name="answer" placeholder="(First, Middle, Last)"></input>
	      	<span className="form-question-details">(First, Middle, Last)</span>
	      	<span className="form-question-example">e.g: Harry James Potter</span>
	      	<div className="button form-question-submit-button">Next</div>
      	</div>
      </div>
    );
  }
}

//POSt req with response to questions





class FormItem extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
  	console.log(this.props.item);
  	ReactDOM.render(
	  <FormFlow item={this.props.item}/>,
	  document.getElementById('root')
	);
  }

  render() {
    return(
      <div className="form-item" onClick={this.onClick}>
      	{this.props.item}
      </div>
    );
  }
}

class FormList extends React.Component {
  constructor() {
    super();
  }
  render() {
    return(
      <div className="form-list">
      	{this.props.items.map(function(listValue, index){
            return <FormItem key={index} item={listValue}/>;
          })}
      </div>
    );
  }
}

ReactDOM.render(
  <FormList items={["Asylum", "Immigration", "Citizenship"]}/>,
  document.getElementById('root')
);