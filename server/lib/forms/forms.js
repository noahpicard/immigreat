const fields = pdf.readSync(formName);

/* let server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
}); */

let outputFields = {};

outputFields[fields[1].name] = "Ben Murphy";

console.log(outputFields);

const data = pdf.writeSync(formName, outputFields, { "save": "pdf" });
fs.writeFileSync('./example.pdf', data);