'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*import FormItem from './form-item';*/

var FormFlow = function (_React$Component) {
  _inherits(FormFlow, _React$Component);

  function FormFlow() {
    _classCallCheck(this, FormFlow);

    return _possibleConstructorReturn(this, (FormFlow.__proto__ || Object.getPrototypeOf(FormFlow)).call(this));
  }

  _createClass(FormFlow, [{
    key: 'onClick',
    value: function onClick(event) {
      console.log(this.props.item);
    }
  }, {
    key: 'render',
    value: function render() {
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
            'What is your name?'
          ),
          _react2.default.createElement('input', { className: 'form-answer-text', type: 'text', name: 'answer', placeholder: '(First, Middle, Last)' }),
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
            { className: 'button form-question-submit-button' },
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

    var _this2 = _possibleConstructorReturn(this, (FormItem.__proto__ || Object.getPrototypeOf(FormItem)).call(this));

    _this2.onClick = _this2.onClick.bind(_this2);
    return _this2;
  }

  _createClass(FormItem, [{
    key: 'onClick',
    value: function onClick(event) {
      console.log(this.props.item);
      _reactDom2.default.render(_react2.default.createElement(FormFlow, { item: this.props.item }), document.getElementById('root'));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'form-item', onClick: this.onClick },
        this.props.item
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
          return _react2.default.createElement(FormItem, { key: index, item: listValue });
        })
      );
    }
  }]);

  return FormList;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(FormList, { items: ["Asylum", "Immigration", "Citizenship"] }), document.getElementById('root'));