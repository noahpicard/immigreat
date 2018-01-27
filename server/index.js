// include modules
const express = require('express'),
const app = express(),
const path = require('path'),
const less = require('less-middleware');

const fillForm = require('pdf-fill-form');
const fs = require('fs');

const formName = path.join(__dirname, 'i589ApplicationForAsylum.pdf');

app.set('port', process.env.PORT || 1337);

app.use(express.json())

app.use(less(path.join(__dirname,'source','less'),{
  dest: path.join(__dirname, 'public'),
  options: {
    compiler: {
      compress: false,
    },
  },
  preprocess: {
    path: function(pathname, req) {
      return pathname.replace('/css/','/');
    },
  },
  force: true,
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/form/:id', (req, res) => {
  res.send({
    title: "Name",
    field: "name",
    type: "string",
  })
})

app.post('/fill/:id', function (req, res) {
  const fields = req.body.fields;

  tmp.file((err, path, _, cleanup) => {
    if (err) { res.sendStatus(500); }

    let pdf = fillForm.writeSync(, ...fields, {'save': 'pdf'});

    fs.writeFileSync(path, pdf);

    res.sendFile(path);
  });

});

let server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
