// include modules
const express = require('express');
const app = express();
const path = require('path');
const less = require('less-middleware');

app.use(express.json())

app.set('port', process.env.PORT || 1337);

// compile and serve css
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

// serve static content
app.use(express.static(path.join(__dirname, 'public')));

app.post('/fill', function (req, res) {

  res.send('Hello World!')
  //return express.static(path.join(__dirname, 'public'));
});

// setup server
var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
