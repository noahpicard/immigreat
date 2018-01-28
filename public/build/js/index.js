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
      "questionState": {}
    };
    _this.submit = _this.submit.bind(_this);
    _this.componentWillMount = _this.componentWillMount.bind(_this);
    _this.answer = _this.answer.bind(_this);
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
      _axios2.default.post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      }).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'answer',
    value: function answer(_answer) {
      var self = this;

      var postUrl = "/form/" + this.props.id;
      console.log("sending answer");
      console.log(this.props.id);
      console.log(postUrl);
      _axios2.default.post(postUrl, {
        "current": this.state.nextState,
        "state": this.state.questionState
      }).then(function (response) {
        console.log(response);
        self.setState(response.data);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'submitAnswer',
    value: function submitAnswer() {
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
    key: 'render',
    value: function render() {
      var _this2 = this;

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
          this.state.nextStateType == "STRING" && _react2.default.createElement('input', { className: 'form-answer-text', type: 'text', name: 'answer', placeholder: '(First, Middle, Last)' }),
          this.state.nextStateType == "BOOLEAN" && _react2.default.createElement(
            'span',
            { className: 'button', onClick: function onClick() {
                return _this2.answer(true);
              } },
            'Yes'
          ),
          this.state.nextStateType == "BOOLEAN" && _react2.default.createElement(
            'span',
            { className: 'button', onClick: function onClick() {
                return _this2.answer(false);
              } },
            'No'
          ),
          _react2.default.createElement(
            'span',
            { className: 'form-question-details' },
            '(First, Middle, Last)'
          ),
          _react2.default.createElement(
            'span',
            { className: 'form-question-example' },
            'e.g: Harry James Potter'
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

//POSt req with response to questions


var FormItem = function (_React$Component2) {
  _inherits(FormItem, _React$Component2);

  function FormItem() {
    _classCallCheck(this, FormItem);

    var _this3 = _possibleConstructorReturn(this, (FormItem.__proto__ || Object.getPrototypeOf(FormItem)).call(this));

    _this3.onClick = _this3.onClick.bind(_this3);
    return _this3;
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