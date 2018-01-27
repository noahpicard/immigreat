module.exports = (app, db) => {
  app.get('/form/:id', (req, res) => {
    res.send({
      title: "Name",
      field: "name",
      type: "string"
    });
  });

  app.post('/fill/:id', function (req, res) {
    const fields = req.body.fields;

    tmp.file((err, path, _, cleanup) => {
      if (err) {
        res.sendStatus(500);
      }

      pdf.fillForm(formName, path, ...fields, err => {
        if (err) {
          res.sendStatus(500);
        }

        res.sendFile(path);
      });
    });
  });
};