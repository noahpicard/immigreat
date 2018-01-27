/*var pdfFiller   = require('pdffiller');
 
var sourcePDF = "";
 
// Override the default field name regex. Default: /FieldName: ([^\n]*)/ 
var nameRegex = null;  
 
var FDF_data = pdfFiller.generateFDFTemplate( sourcePDF, nameRegex, function(err, fdfData) {
    if (err) throw err;
    console.log(fdfData);
});*/

/*var pdfFillForm = require('pdf-fill-form');

var pdfFields = pdfFillForm.readSync('test/i589ApplicationForAsylum.pdf');
console.log(pdfFields);*/


var pdfFillForm = require('pdf-fill-form');
var fs = require('fs');

var fillValues = { 
	'form1[0].#subform[0]﻿.PtAILine1_ANumber[0]': 'Alien Registration Number',
	'form1[0].#subform[0]﻿.TextField1[0]': 'Social Security Number',
	'form1[0].#subform[0]﻿.PtAILine4_LastName[0]': 'Account',
	'form1[0].#subform[0]﻿.TextField1[1]': 'Account No.',
	'form1[0].#subform[0]﻿.PtAILine8_StreetNumandName[0]': '100 Street'
};


// Use here the field names you got from read
pdfFillForm.writeAsync('test/i589ApplicationForAsylum.pdf', 
	fillValues, 
	{ "save": "pdf" }, 
	function(err, pdf) {
		fs.writeFile("test/filled_test.pdf", pdf, function(err){});
	}
);