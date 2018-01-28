'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*import FormItem from './form-item';*/

var FormFlow = function (_React$Component) {
  _inherits(FormFlow, _React$Component);

  function FormFlow() {
    _classCallCheck(this, FormFlow);

    var _this = _possibleConstructorReturn(this, (FormFlow.__proto__ || Object.getPrototypeOf(FormFlow)).call(this));

    _this.state = {
      "nextStateQuestion": "",
      "nextStateType": "",
      "nextStateFinal": false,
      "nextState": "",
      "questionState": {},
      "answerText": ""
    };
    _this.submit = _this.submit.bind(_this);
    _this.componentWillMount = _this.componentWillMount.bind(_this);
    _this.answer = _this.answer.bind(_this);
    _this.handleTextChange = _this.handleTextChange.bind(_this);
    return _this;
  }

  _createClass(FormFlow, [{
    key: 'componentWillMount',
    value: function componentWillMount() {

      var self = this;

      var postUrl = "/form/" + this.props.id;
      console.log("sending request");
      console.log(this.props.id);
      console.log(postUrl);
      _axios2.default.post(postUrl, {}).then(function (response) {
        console.log(response);
        self.setState(response.data);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'submit',
    value: function submit(event) {
      if (this.state.nextStateType == "NONE") {
        this.answer();
      } else if (this.state.nextStateType == "STRING") {
        this.answer(this.state.answerText);
      }
    }
  }, {
    key: 'finishForm',
    value: function finishForm() {
      var self = this;

      var postUrl = "/form/" + this.props.id + "/publish";

      console.log("finishing form");
      console.log(this.props.id);
      console.log(postUrl);

      _axios2.default.post(postUrl, {
        "current": this.state.nextState,
        "state": this.state.questionState
      }).then(function (response) {
        console.log(response);
        self.showPDF(response.data.resource);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'showPDF',
    value: function showPDF(pdf) {
      var self = this;

      var url = "/" + pdf;

      console.log("showing pdf");
      console.log(this.props.id);
      console.log(url);

      window.open(url, '_blank');
    }
  }, {
    key: 'answer',
    value: function answer(_answer) {
      var self = this;

      var state = this.state.questionState;
      state[this.state.nextStateField] = _answer;
      this.setState({ questionState: state });

      this.clearFields();

      var postUrl = "/form/" + this.props.id;

      if (this.state.nextStateFinal == true) {
        this.finishForm();
        return;
      }

      console.log("sending answer");
      console.log(this.props.id);
      console.log(postUrl);

      _axios2.default.post(postUrl, {
        "current": this.state.nextState,
        "state": this.state.questionState
      }).then(function (response) {
        console.log(response);
        self.setState({
          "nextStateQuestion": "",
          "nextStateType": "",
          "nextStateContext": "",
          "nextStatePlaceholder": ""
        });
        self.setState(response.data);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'clearFields',
    value: function clearFields() {
      this.setState({ "answerText": "" });
    }
  }, {
    key: 'handleTextChange',
    value: function handleTextChange(event) {
      this.setState({ "answerText": event.target.value });
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      return _react2.default.createElement(
        'div',
        { className: 'form-flow' },
        _react2.default.createElement(
          'h1',
          { className: 'form-title' },
          this.props.item,
          ' Form'
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-question-container' },
          _react2.default.createElement(
            'span',
            { className: 'form-question' },
            this.state.nextStateQuestion
          ),
          this.state.nextStateType == "STRING" && _react2.default.createElement('input', { className: 'form-answer-text', type: 'text', name: 'answer', placeholder: this.state.nextStatePlaceholder, value: this.state.answerText, onChange: this.handleTextChange }),
          this.state.nextStateType == "NUMERIC" && _react2.default.createElement('input', { className: 'form-answer-text', type: 'text', name: 'answer', placeholder: this.state.nextStatePlaceholder, value: this.state.answerText, onChange: this.handleTextChange }),
          this.state.nextStateType == "BOOLEAN" && _react2.default.createElement(
            'div',
            { className: 'button-section' },
            _react2.default.createElement(
              'span',
              { className: 'button', onClick: function onClick() {
                  return self.answer(true);
                } },
              'Yes'
            ),
            _react2.default.createElement(
              'span',
              { className: 'button', onClick: function onClick() {
                  return self.answer(false);
                } },
              'No'
            )
          ),
          this.state.nextStateType == "MULTI" && _react2.default.createElement(
            'div',
            { className: 'button-section' },
            this.state.nextStateOptions.map(function (listValue, index) {
              return _react2.default.createElement(
                'span',
                { className: 'button', key: index, onClick: function onClick() {
                    return self.answer(listValue);
                  } },
                listValue
              );
            })
          ),
          _react2.default.createElement(
            'span',
            { className: 'form-question-details' },
            this.state.nextStateContext
          ),
          _react2.default.createElement(
            'span',
            { className: 'form-question-example' },
            'e.g: ',
            this.state.nextStatePlaceholder
          ),
          _react2.default.createElement(
            'div',
            { className: 'button form-question-submit-button', onClick: this.submit },
            'Next'
          )
        )
      );
    }
  }]);

  return FormFlow;
}(_react2.default.Component);

var FormItem = function (_React$Component2) {
  _inherits(FormItem, _React$Component2);

  function FormItem() {
    _classCallCheck(this, FormItem);

    var _this2 = _possibleConstructorReturn(this, (FormItem.__proto__ || Object.getPrototypeOf(FormItem)).call(this));

    _this2.onClick = _this2.onClick.bind(_this2);
    return _this2;
  }

  _createClass(FormItem, [{
    key: 'onClick',
    value: function onClick(event) {
      console.log(this.props.item);
      _reactDom2.default.render(_react2.default.createElement(FormFlow, { item: this.props.item, id: this.props.id }), document.getElementById('root'));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'form-item', onClick: this.onClick },
        this.props.item,
        ' ',
        this.props.id
      );
    }
  }]);

  return FormItem;
}(_react2.default.Component);

var FormList = function (_React$Component3) {
  _inherits(FormList, _React$Component3);

  function FormList() {
    _classCallCheck(this, FormList);

    return _possibleConstructorReturn(this, (FormList.__proto__ || Object.getPrototypeOf(FormList)).call(this));
  }

  _createClass(FormList, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'form-list' },
        this.props.items.map(function (listValue, index) {
          return _react2.default.createElement(FormItem, { key: index, item: listValue.name, id: listValue.id });
        })
      );
    }
  }]);

  return FormList;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(FormList, { items: [{ "name": "Asylum", "id": "i589" }, { "name": "Immigration", "id": "i588" }, { "name": "Citizenship", "id": "i587" }] }), document.getElementById('root'));