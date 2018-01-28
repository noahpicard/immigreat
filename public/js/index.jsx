import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
/*import FormItem from './form-item';*/

class FormFlow extends React.Component {
  constructor() {
    super();
    this.state = {
      "nextStateQuestion":"",
      "nextStateType":"",
      "nextStateFinal": false,
      "nextState":"",
      "questionState": {},
      "answerText": ""
    };
    this.submit = this.submit.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.answer = this.answer.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentWillMount() {

    const self = this;

  	let postUrl = "/form/" + this.props.id;
  	console.log("sending request");
    console.log(this.props.id);
    console.log(postUrl);
  	axios.post(postUrl, {})
	  .then(function (response) {
	    console.log(response);
      self.setState(response.data);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });

  }

  submit(event) {
  	if (this.state.nextStateType == "NONE") {
      this.answer();
    } else if (this.state.nextStateType == "STRING") {
      this.answer(this.state.answerText);
    }
  }


  answer(answer) {
    const self = this;

    let state = this.state.questionState;
    state[this.state.nextStateField] = answer;
    this.setState({questionState: state});

    this.clearFields();

    let postUrl = "/form/" + this.props.id;
    console.log("sending answer");
    console.log(this.props.id);
    console.log(postUrl);
    axios.post(postUrl, {
      "current": this.state.nextState,
      "state": this.state.questionState
    })
    .then(function (response) {
      console.log(response);
      self.setState(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  clearFields() {
    this.setState({"answerText": ""});
  }

  handleTextChange(event) {
    this.setState({"answerText": event.target.value});
  }

  render() {
    return(
      <div className="form-flow">
      	<h1 className="form-title">{this.props.item} Form</h1>
      	<div className="form-question-container">
	      	<span className="form-question">{this.state.nextStateQuestion}</span>
          { this.state.nextStateType == "STRING" &&
	         <input className="form-answer-text" type="text" name="answer" placeholder={this.state.nextStatePlaceholder} value={this.state.answerText} onChange={this.handleTextChange}></input>
	      	}
          { this.state.nextStateType == "NUMERIC" &&
           <input className="form-answer-text" type="text" name="answer" placeholder={this.state.nextStatePlaceholder} value={this.state.answerText} onChange={this.handleTextChange}></input>
          }
          { this.state.nextStateType == "BOOLEAN" &&
            <span className="button" onClick={() => this.answer(true)}>Yes</span>
          }
          { this.state.nextStateType == "BOOLEAN" &&
            <span className="button" onClick={() => this.answer(false)}>No</span>
          }
          { this.state.nextStateType == "MULTI" &&
            <span>
              {this.props.items.map(function(listValue, index){
                return <span className="button" onClick={() => this.answer(listValue)}>listValue</span>;
              })} 
            </span>
          }
          <span className="form-question-details">{this.state.nextStateContext}</span>
	      	<span className="form-question-example">e.g: {this.state.nextStatePlaceholder}</span>
	      	<div className="button form-question-submit-button" onClick={this.submit}>Next</div>
      	</div>
      </div>
    );
  }
}





class FormItem extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
  	console.log(this.props.item);
  	ReactDOM.render(
	  <FormFlow item={this.props.item} id={this.props.id}/>,
	  document.getElementById('root')
	);
  }

  render() {
    return(
      <div className="form-item" onClick={this.onClick}>
      	{this.props.item} {this.props.id}
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
            return <FormItem key={index} item={listValue.name} id={listValue.id}/>;
          })}
      </div>
    );
  }
}

ReactDOM.render(
  <FormList items={[{"name": "Asylum", "id": "i589"}, {"name": "Immigration", "id": "i588"}, {"name": "Citizenship", "id": "i587"}]}/>,
  document.getElementById('root')
);