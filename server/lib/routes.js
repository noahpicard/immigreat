const { supportedForms } = require('./forms');
const path = require('path');

module.exports = app => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/index.html'));
  });
  app.get('/form', (req, res) => {
    res.send({
      supportedForms
    });
  });

  app.post('/form/:id', (req, res) => {
    if (!supportedForms.includes(req.params.id)) {
      return res.status(400).send('Invalid form identifier.');
    }

    const FormClass = require(path.join(__dirname, 'forms', req.params.id));

    const form = new FormClass();

    let nextState;
    if (!req.body.current) {
      // We need to transition to the first state.
      nextState = form.states.find(state => state.initial);
    } else {
      nextState = form.transition(req.body.current, req.body.state);
    }

    if (!nextState) {
      return res.status(500).send('Unable to determine next state.');
    }

    return res.status(200).send({
      nextState: nextState.key,
      nextStateQuestion: nextState.question,
      nextStateContext: nextState.context,
      nextStatePlaceholder: nextState.placeholder,
      nextStateType: nextState.type,
      nextStateField: nextState.field,
      nextStateFinal: nextState.final,
      nextStateInitial: nextState.initial
    });
  });
};