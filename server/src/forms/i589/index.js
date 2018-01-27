const path = require('path');

const { Form, State } = require('../index.js');

class i589 extends Form {
  constructor() {
    super();

    this.form = path.join(__dirname, 'i589ApplicationForAsylum.pdf');

    this.states = [
      State({
        key: 'INITIAL',
        question: 'Do you speak English?',
        type: 'BOOLEAN',
        field: 'SPEAKS_ENGLISH',
        initial: true,
      }).ifTrue('AGE').ifFalse('FAILED'),

      State({
        key: 'AGE',
        question: 'How old are you?',
        type: 'NUMERIC',
        field: 'USER_AGE',
      }).ifGreaterThanOrEqualTo(18, 'COMPLETE').goTo('FAILED')

      State({
        key: 'FAILED',
        question: 'We cannot help you at this time.',
        type: 'NONE',
        field: null,
        final: true,
      }),

      State({
        state: 'COMPLETE',
        question: 'You have completed the questionnaire.',
        type: 'NONE',
        field: null,
        final: true,
     }),
  }
}

module.exports = i589;
