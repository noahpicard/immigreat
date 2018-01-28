const path = require('path');

const { Form, State } = require('../index.js');

class i589 extends Form {
  constructor() {
    super();

    this.form = path.join(__dirname, 'i589ApplicationForAsylum.pdf');

    this.states = [,

      new State({ 
        key: 'INTRO',
        question: 'Introduction',
        type: 'STRING',
        field: 'INTRO',
        placeholder: 'Nour',
        initial: true, // This is the first pop up info blurb,
      }).goTo('NAME'),

      new State({ 
        key: 'NAME',
        question: 'What is your name?',
        type: 'STRING',
        field: 'NAME',
        placeholder: 'Nour',
      }).goTo('MIDDLE_NAME'),

      new State({
        key: 'MIDDLE_NAME',
        question: 'What is your middle name?',
        type: 'STRING',
        field: 'MIDDLE_NAME',
        placeholder: 'Abdulla',
      }).goTo('LAST_NAME'),

      new State({
        key: 'LAST_NAME',
        question: 'What is your last name?',
        type: 'STRING',
        field: 'LAST_NAME',
        placeholder: 'Aldalaijan',
      }).goTo('OTHER_NAMES'),

      new State({
        key: 'OTHER_NAMES',
        question: 'Have you used any other names? (Include maiden name and aliases). If so, please provide them here.',
        placeholder: 'John Doe, Johnny Doe',
        context: 'If you have a different name when travelling make sure to start using your real name now',
        type: 'STRING',
        field: 'OTHER_NAMES',
      }).goTo('GENDER'),

      new State({ // FILL THIS OUT LATER: add a dropdown for male/female,
        key: 'GENDER',
        question: 'Are you male?',
        context: 'If you are transgender or your asylum claim involves matters of gender identity such that choosing either "Male" or "Female" is no simple matter, write an asterisk ("*") here and say, “See Supplement.” Then make sure to further explain this in your supplementary statement.',
        type: 'MULTI',
        field: 'GENDER',
      }).goTo('DOB'),

      new State({ 
        key: 'DOB',
        question: 'What is your date of birth?',
        context: 'If you aren\'t sure of your birth date (and aren\'t able to locate documents showing it), you can enter your best estimate or write "unknown." Then enter an asterisk and explain the situation in your Supplement.',
        type: 'NUMERIC',
        placeholder: 'MM-DD-YYYY',
        field: 'DOB',
      }).goTo('BIRTH_CITY_COUNTRY'),

      new State({ 
        key: 'BIRTH_CITY_COUNTRY',
        question: 'In which country and city were you born?',
        type: 'STRING',
        placeholder: 'Damascus, Syria',
        field: 'BIRTH_CITY_COUNTRY',
      }).goTo('BIRTH_NATIONALITY'),

      new State({ 
        key: 'BIRTH_NATIONALITY',
        question: 'What was your Nationality when you were born?',
        context: 'You will need to write your birth country’s name here. If you are now a citizen of a different country than the one in which you were born, be prepared to answer questions about why you are unable or unwilling to return to your birth country (instead of the country for which you are applying for asylum) and provide evidence to back up your statements.',
        type: 'STRING',
        placeholder: 'Syrian',
        field: 'BIRTH_NATIONALITY',
      }).goTo('PRESENT_NATIONALITY'),

      new State({ 
        key: 'PRESENT_NATIONALITY',
        question: 'What is your Nationality right now?',
        context: 'You can say that you are stateless if your nationality has been taken away from you and you have no legal right to live in any country. The fact that you might be arrested if you return to your home country, however, does not make you stateless.',
        type: 'STRING',
        placeholder: 'Iraqi',
        field: 'PRESENT_NATIONALITY',
      }).goTo('RACE'),

      new State({ 
        key: 'RACE',
        question: 'What Race, Ethnic or Tribal Group do you belong to?',
        context: 'If you are applying for asylum based on race, ethnicity, or tribal affiliation, enter the name of your group here. Make sure that the identifying name matches any evidence that you are attaching to prove your claim. If you need further space to explain, use Supplement B.',
        type: 'STRING',
        placeholder: 'Kurdish',
        field: 'RACE',
      }).goTo('RELIGION'),

      new State({ 
        key: 'RELIGION',
        question: 'Which Religion or Religious Group do you belong to?',
        context: 'If you are applying for asylum based on religion, make sure your answer here matches any evidence that you provide with your application and that you name the specific branch, sect, or denomination. For example, instead of "Jewish," an applicant persecuted on the basis of religion might say, "Orthodox Jewish."',
        type: 'STRING',
        placeholder: 'Muslim',
        field: 'RELIGION',
      }).goTo('MARITAL_STATUS'),

      new State({ // FILL THIS OUT LATER: checkboxes for states,
        // if MARRIED, open A.II 1-24. Otherwise, skip to your CHILDREN,
        key: 'MARITAL_STATUS',
        question: 'What is your marital status?',
        context: 'This refers to your legal status, not your current living situation.',
        type: 'MULTI',
        options: ['Single', 'Married', 'Divorced', 'Widowed'],
        field: 'MARITAL_STATUS',
      })/*.ifChoice('Married').doSOMETHING('')*/.goTo('TRAVEL_DOC_ORIGIN'), // DO ABOVE,

      new State({ 
        key: 'TRAVEL_DOC_ORIGIN',
        question: 'What is your passport number or travel documentation number?',
        context: 'If you don\'t have a passport, enter "N/A" in every relevant space. If you used a false passport, you should still answer "N/A," but explain your entry on Supplement B.',
        type: 'NUMERIC',
        placeholder: '0123456789',
        field: 'TRAVEL_DOC_ORIGIN',
      }).goTo('DOC_EXPIRE_DATE'),

      new State({ 
        key: 'DOC_EXPIRE_DATE',
        question: 'When does your travel document expire?',
        type: 'NUMERIC',
        placeholder: 'MM-DD-YYYY',
        field: 'DOC_EXPIRE_DATE',
      }).goTo('NATIVE_LANG'),

      new State({ 
        key: 'NATIVE_LANG',
        question: 'What is your native language (include dialect, if applicable)?',
        context: 'Your "native language" is the one you spoke at home. If you used another language at school or at work, enter that in Question 25.',
        type: 'STRING',
        placeholder: 'Arabic',
        field: 'NATIVE_LANG',
      }).goTo('DOC_EXPIRE_DATE'),

      new State({ 
        key: 'NATIVE_LANG',
        question: 'What is your native language (include dialect, if applicable)?',
        context: 'Your "native language" is the one you spoke at home. If you used another language at school or at work, enter that in Question 25.',
        type: 'STRING',
        placeholder: 'Arabic',
        field: 'NATIVE_LANG',
      }).goTo('ENGLISH_FLUENCY'),

      new State({ 
        key: 'ENGLISH_FLUENCY',
        question: ' Are you fluent in English?',
        context: 'Do NOT say you are fluent in English unless you really are, and are willing to give up your right to bring an interpreter to your asylum interview (and have one supplied by the U.S. government if your case later proceeds to immigration court).',
        type: 'BOOL',
        field: 'ENGLISH_FLUENCY',
      }).goTo('OTHER_FLUENCY'),

      new State({ 
        key: 'OTHER_FLUENCY',
        question: 'What other languages do you speak fluently? (If any)',
        type: 'STRING',
        placeholder: 'Farsi, Urdu',
        field: 'OTHER_FLUENCY',
      }).goTo('RESIDENCE_US_STREET'),

      new State({ 
        key: 'RESIDENCE_US_STREET',
        question: 'On which street is your residence?',
        context: 'Where you currently physically reside or hope to in the future.',
        type: 'STRING',
        placeholder: 'Persimmon Street',
        field: 'RESIDENCE_US_STREET',
      }).goTo('RESIDENCE_US_NUM'),

      new State({ 
        key: 'RESIDENCE_US_NUM',
        question: 'Which number?',
        type: 'NUMERIC',
        placeholder: '10',
        field: 'RESIDENCE_US_NUM',
      }).goTo('RESIDENCE_US_APT_NUM'),

      new State({ 
        key: 'RESIDENCE_US_APT_NUM',
        question: 'Which apartment number?',
        type: 'NUMERIC',
        placeholder: '3',
        field: 'RESIDENCE_US_APT_NUM',
      }).goTo('RESIDENCE_US_CITY'),

      new State({ 
        key: 'RESIDENCE_US_CITY',
        question: 'In which city?',
        type: 'String',
        placeholder: 'Chicago',
        field: 'RESIDENCE_US_CITY',
      }).goTo('RESIDENCE_US_STATE'),

      new State({ 
        key: 'RESIDENCE_US_STATE',
        question: 'In which state?',
        type: 'String',
        placeholder: 'Illinois',
        field: 'RESIDENCE_US_STATE',
      }).goTo('RESIDENCE_US_ZIPCODE'),

      new State({ 
        key: 'RESIDENCE_US_ZIPCODE',
        question: 'What is your Zip Code?',
        type: 'NUMERIC',
        placeholder: 'Illinois',
        field: 'RESIDENCE_US_ZIPCODE',
      }).goTo('PHONENUM'),

      new State({ 
        key: 'PHONENUM',
        question: 'What is your contact phone number?',
        type: 'NUMERIC',
        placeholder: '(001) 123-456-1234',
        field: 'PHONENUM',
      }).goTo('FORM_FILLING'),

      new State({ 
        key: 'FORM_FILLING',
        question: 'Is someone filling out this form for you?',
        context: 'If a lawyer or someone else if filling out this form for you, then this tool might not be helpful to you. This service is not intended as professional legal advice. Please consult your lawyer if you have one.',
        type: 'BOOL',
        field: 'FORM_FILLING',
      }).goTo('MAIL_ADDRESS'),
      
      new State({ 
        key: 'MAIL_ADDRESS',
        question: 'Is your mailing address the same as the one you just entered?',
        type: 'BOOL',
        field: 'MAIL_ADDRESS',
      }).if('False').goTo('MAIL_ADDRESS_STREET').if('True').goTo('ALIEN_NUM'),

      new State({ 
        key: 'MAIL_ADDRESS_STREET',
        question: 'On which street is your mailing address?',
        context: 'Where you currently receive mail or hope to in the future.',
        type: 'STRING',
        placeholder: 'Persimmon Street',
        field: 'MAIL_ADDRESS_STREET',
      }).goTo('MAIL_ADDRESS_NUM'),

      new State({ 
        key: 'MAIL_ADDRESS_NUM',
        question: 'Which number?',
        type: 'NUMERIC',
        placeholder: '10',
        field: 'MAIL_ADDRESS_NUM',
      }).goTo('MAIL_ADDRESS_APT_NUM'),

      new State({ 
        key: 'RESIDENCE_US_APT_NUM',
        question: 'Which apartment number?',
        type: 'NUMERIC',
        placeholder: '3',
        field: 'MAIL_ADDRESS_APT_NUM',
      }).goTo('MAIL_ADDRESS_US_CITY'),

      new State({ 
        key: 'MAIL_ADDRESS_CITY',
        question: 'In which city?',
        type: 'String',
        placeholder: 'Chicago',
        field: 'MAIL_ADDRESS_CITY',
      }).goTo('MAIL_ADDRESS_STATE'),

      new State({ 
        key: 'MAIL_ADDRESS_STATE',
        question: 'In which state?',
        type: 'String',
        placeholder: 'Illinois',
        field: 'MAIL_ADDRESS_STATE',
      }).goTo('MAIL_ADDRESS_ZIPCODE'),

      new State({ 
        key: 'MAIL_ADDRESS_ZIPCODE',
        question: 'What is your Zip Code?',
        type: 'NUMERIC',
        placeholder: 'Illinois',
        field: 'MAIL_ADDRESS_ZIPCODE',
      }).goTo('ALIEN_NUM'),

      new State({ 
        key: 'ALIEN_NUM',
        question: 'If you have one, what is your Alien Registration Number?',
        context: 'Also known as an A-Number or USCIS#, your Alien Registration Number is an 8 or 9 digit number that can be found on your Permanent Resident Card (also known as a green card). In the example below, the A-Number is listed as “000-001-001” underneath USCIS#. (Alien number (A#). You are likely to have one only if you\'ve submitted previous applications to USCIS or been in removal (deportation) proceedings.)',
        type: 'NUMERIC',
        placeholder: '123456789',
        field: 'ALIEN_NUM',
      }).goTo('US_SSN'),

      new State({ 
        key: 'US_SSN',
        question: 'If you have one, what is your United States Social Security Number?',
        context: 'In the US a Social Security Number (SSN) is a number in the format 000-00-0000, unique for each individual, used to track Social Security benefits and for other identification purposes. Unless you are a non-citizen who wants to work in the United States, you probably don’t need a Social Security number.',
        type: 'NUMERIC',
        placeholder: '123-45-6789',
        field: 'US_SSN',
      }).goTo('USCIS_ACC'),

      new State({ 
        key: 'USCIS_ACC',
        question: 'If you have one, what is your USCIS Online Account Number?',
        context: 'A USCIS account may be useful but is NOT REQUIRED. You can create a USCIS Online Account When Paying the USCIS Immigrant Fee. A USCIS online account will let you easily track the status of your Green Card, receive electronic notifications and case updates, and change and update your mailing address.Chances are slim that you have a USCIS Online Account Number; it is only for people who have submitted certain types of applications to USCIS via the Internet.',
        type: 'NUMERIC',
        placeholder: '123456789',
        field: 'USCIS_ACC',
      }).goTo('USCIS_ACC'),
      
    ]
  }
}

module.exports = i589;
