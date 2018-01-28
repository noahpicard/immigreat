const path = require('path');
const util = require('util');

const { Form, State } = require('../index.js');

class i589 extends Form {
  constructor() {
    super();

    this.form = path.join(__dirname, '../../../src/forms/i589/i589ApplicationForAsylum.pdf');

    this.states = [
      new State({
        key: 'INTRO',
        question: 'Introduction',
        type: 'NONE',
        field: 'INTRO',
        placeholder: 'Nour',
        initial: true, // This is the first pop up info blurb
      }).goTo('FIRST_NAME'),

      new State({
        key: 'FIRST_NAME',
        question: 'What is your first name?',
        type: 'STRING',
        field: 'FIRST_NAME',
        placeholder: 'Nour',
      }).goTo('LAST_NAME'),

      new State({
        key: 'LAST_NAME',
        question: 'What is your last name?',
        type: 'STRING',
        field: 'LAST_NAME',
        placeholder: 'Aldalaijan',
      }).goTo('US_SSN'),

      new State({
        key: 'US_SSN',
        question: 'If you have one, what is your United States Social Security Number?',
        context: 'In the US a Social Security Number (SSN) is a number in the format 000-00-0000, unique for each individual, used to track Social Security benefits and for other identification purposes. Unless you are a non-citizen who wants to work in the United States, you probably don’t need a Social Security number.',
        type: 'STRING',
        placeholder: '123-45-6789',
        field: 'US_SSN',
      }).goTo('MARITAL_STATUS'),

      /*
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
      }).goTo('MARITAL_STATUS'),
      */

      new State({ // FILL THIS OUT LATER: checkboxes for states,
        // if MARRIED, open A.II 1-24. Otherwise, skip to your CHILDREN,
        key: 'MARITAL_STATUS',
        question: 'What is your marital status?',
        context: 'This refers to your legal status, not your current living situation.',
        type: 'MULTI',
        options: ['Single', 'Married', 'Divorced', 'Widowed'],
        field: 'MARITAL_STATUS',
      }).goTo('ENGLISH_FLUENCY'), // DO ABOVE,

      new State({
        key: 'ENGLISH_FLUENCY',
        question: ' Are you fluent in English?',
        context: 'Do NOT say you are fluent in English unless you really are, and are willing to give up your right to bring an interpreter to your asylum interview (and have one supplied by the U.S. government if your case later proceeds to immigration court).',
        type: 'BOOLEAN',
        field: 'ENGLISH_FLUENCY',
      }).goTo('COURT_NOW'),

      new State({
        key: 'COURT_NOW',
        question: 'Are you currently in a court proceeding?',
        type: 'BOOLEAN',
        field: 'COURT_NOW',
      }).ifFalse('COURT_EVER').ifTrue('FINAL'),

      new State({
        key: 'COURT_EVER',
        question: 'Have you ever been through immigration court proceedings?',
        context: 'If you have ever seen an immigration judge in removal proceedings or been arrested by immigration or border patrol authorities, see an attorney for help with your asylum application. You may not be eligible to File I-589 except via the immigration court.',
        type: 'BOOLEAN',
        field: 'COURT_EVER',
      }).goTo('FINAL'),

      new State({
        key: 'FINAL',
        question: "Thank you for providing this information. We're preparing your form.",
        type: 'NONE',
        final: true,
      }),

      /*new State({
        key: 'OTHER_NAMES',
        question: 'Have you used any other names? (Include maiden name and aliases). If so, please provide them here.',
        placeholder: 'John Doe, Johnny Doe',
        context: 'If you have a different name when travelling make sure to start using your real name now',
        type: 'STRING',
        field: 'OTHER_NAMES',
      }).goTo('GENDER'),*/

      /*new State({ // FILL THIS OUT LATER: add a dropdown for male/female,
        key: 'GENDER',
        question: 'What is your gender?',
        context: 'If you are transgender or your asylum claim involves matters of gender identity such that choosing either "Male" or "Female" is no simple matter, write an asterisk ("*") here and say, “See Supplement.” Then make sure to further explain this in your supplementary statement.',
        type: 'MULTI',
        options: ['Male', 'Female'],
        field: 'GENDER',
      }).goTo('DOB'),*/

      /*new State({
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
      }).goTo('BIRTH_NATIONALITY'),*/


      /*new State({
        key: 'RACE',
        question: 'What Race, Ethnic or Tribal Group do you belong to?',
        context: 'If you are applying for asylum based on race, ethnicity, or tribal affiliation, enter the name of your group here. Make sure that the identifying name matches any evidence that you are attaching to prove your claim. If you need further space to explain, use Supplement B.',
        type: 'STRING',
        placeholder: 'Kurdish',
        field: 'RACE',
      }).goTo('RELIGION'),*/

      /*new State({
        key: 'RELIGION',
        question: 'Which Religion or Religious Group do you belong to?',
        context: 'If you are applying for asylum based on religion, make sure your answer here matches any evidence that you provide with your application and that you name the specific branch, sect, or denomination. For example, instead of "Jewish," an applicant persecuted on the basis of religion might say, "Orthodox Jewish."',
        type: 'STRING',
        placeholder: 'Muslim',
        field: 'RELIGION',
      }).goTo('MARITAL_STATUS'),*/

      /*
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
      }).goTo('ENGLISH_FLUENCY'),
      */

      /*
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
        question: 'Which number on that street?',
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
        type: 'STRING',
        placeholder: 'Chicago',
        field: 'RESIDENCE_US_CITY',
      }).goTo('RESIDENCE_US_STATE'),

      new State({
        key: 'RESIDENCE_US_STATE',
        question: 'In which state?',
        type: 'STRING',
        placeholder: 'Illinois',
        field: 'RESIDENCE_US_STATE',
      }).goTo('RESIDENCE_US_ZIPCODE'),

      new State({
        key: 'RESIDENCE_US_ZIPCODE',
        question: 'What is your Zip Code?',
        type: 'NUMERIC',
        placeholder: 'Illinois',
        field: 'RESIDENCE_US_ZIPCODE',
      }).goTo('PHONENUM'),*/

      /*
      new State({
        key: 'PHONENUM',
        question: 'What is your contact phone number?',
        type: 'NUMERIC',
        placeholder: '001-456-1234',
        field: 'PHONENUM',
      }).goTo('FORM_FILLING'),

      new State({
        key: 'FORM_FILLING',
        question: 'Is someone filling out this form for you?',
        context: 'If a lawyer or someone else if filling out this form for you, then this tool might not be helpful to you. This service is not intended as professional legal advice. Please consult your lawyer if you have one.',
        type: 'BOOLEAN',
        field: 'FORM_FILLING',
      }).goTo('MAIL_ADDRESS'),
      */

      /*
      new State({
        key: 'MAIL_ADDRESS',
        question: 'Is your mailing address the same as the one you just entered?',
        type: 'BOOLEAN',
        field: 'MAIL_ADDRESS',
      }).ifFalse('MAIL_ADDRESS_STREET').ifTrue('ALIEN_NUM'),

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
        key: 'MAIL_ADDRESS_APT_NUM',
        question: 'Which apartment number?',
        type: 'NUMERIC',
        placeholder: '3',
        field: 'MAIL_ADDRESS_APT_NUM',
      }).goTo('MAIL_ADDRESS_US_CITY'),

      new State({
        key: 'MAIL_ADDRESS_CITY',
        question: 'In which city?',
        type: 'STRING',
        placeholder: 'Chicago',
        field: 'MAIL_ADDRESS_CITY',
      }).goTo('MAIL_ADDRESS_STATE'),

      new State({
        key: 'MAIL_ADDRESS_STATE',
        question: 'In which state?',
        type: 'STRING',
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
      */

      /*
      new State({
        key: 'ALIEN_NUM',
        question: 'If you have one, what is your Alien Registration Number?',
        context: 'Also known as an A-Number or USCIS#, your Alien Registration Number is an 8 or 9 digit number that can be found on your Permanent Resident Card (also known as a green card). In the example below, the A-Number is listed as “000-001-001” underneath USCIS#. (Alien number (A#). You are likely to have one only if you\'ve submitted previous applications to USCIS or been in removal (deportation) proceedings.)',
        type: 'NUMERIC',
        placeholder: '123456789',
        field: 'ALIEN_NUM',
      }).goTo('US_SSN'),
      */

      /*
      new State({
        key: 'USCIS_ACC',
        question: 'If you have one, what is your USCIS Online Account Number?',
        context: 'A USCIS account may be useful but is NOT REQUIRED. You can create a USCIS Online Account When Paying the USCIS Immigrant Fee. A USCIS online account will let you easily track the status of your Green Card, receive electronic notifications and case updates, and change and update your mailing address.Chances are slim that you have a USCIS Online Account Number; it is only for people who have submitted certain types of applications to USCIS via the Internet.',
        type: 'NUMERIC',
        placeholder: '123456789',
        field: 'USCIS_ACC',
      }).goTo('19_a'),

      new State({
        key: '19_a',
        question: 'When did you last leave your country?',
        type: 'NUMERIC',
        placeholder: 'MM/DD/YYY',
        field: '19_a',
      }).goTo('19_b'),

      new State({
        key: '19_b',
        question: 'If you have one, what is your current I-94 number?',
        context: 'If you have entered the US on a Visa before your I-94 number should be entered here. If you have not, this question does not appy and you can skip it.  Be sure to answer this section completely and truthfully even if you entered without inspection or overstayed your visa. In most cases, immigration violations will not affect your asylum case if they were due to an effort to escape persecution.',
        type: 'NUMERIC',
        placeholder: '0123456789',
        field: '19_b',
      }).goTo('19_c'),

      new State({ // TODO: MULTI BLANK input state, please add
        key: '19_c',
        question: 'If you have one, what is your current I-94 number?',
        context: 'If you have entered the US on a Visa before your I-94 number should be entered here. If you have not, this question does not appy and you can skip it.  Be sure to answer this section completely and truthfully even if you entered without inspection or overstayed your visa. In most cases, immigration violations will not affect your asylum case if they were due to an effort to escape persecution.',
        type: 'NUMERIC',
        placeholder: '0123456789',
        field: '19_c',
      }).goTo('COURT_NOW'),
      */

      // MARITAL SECTION - Skipped if not married

      /*
      new State({
        key: 'SPOUSE_NAME',
        question: 'What is your spouse\'s name?',
        type: 'STRING',
        field: 'SPOUSE_NAME',
        placeholder: 'Nour',
      }).goTo('SPOUSE_MIDDLE_NAME'),

      new State({
        key: 'SPOUSE_MIDDLE_NAME',
        question: 'What is your spouse\'s middle name?',
        type: 'STRING',
        field: 'SPOUSE_MIDDLE_NAME',
        placeholder: 'Abdulla',
      }).goTo('SPOUSE_LAST_NAME'),

      new State({
        key: 'SPOUSE_LAST_NAME',
        question: 'What is your spouse\'s last name?',
        type: 'STRING',
        field: 'SPOUSE_LAST_NAME',
        placeholder: 'Aldalaijan',
      }).goTo('SPOUSE_OTHER_NAMES'),

      new State({
        key: 'SPOUSE_OTHER_NAMES',
        question: 'Has your spouse used any other names? (Include maiden name and aliases). If so, please provide them here.',
        placeholder: 'John Doe, Johnny Doe',
        context: 'If your spouse has a different name when travelling make sure to start using their real name now.',
        type: 'STRING',
        field: 'SPOUSE_OTHER_NAMES',
      }).goTo('SPOUSE_DOB'),

      new State({
        key: 'SPOUSE_DOB',
        question: 'What is your spouse\'s date of birth?',
        context: 'If you aren\'t sure of the birth date (and aren\'t able to locate documents showing it), you can enter your best estimate or write "unknown." Then enter an asterisk and explain the situation in your Supplement.',
        type: 'NUMERIC',
        placeholder: 'MM-DD-YYYY',
        field: 'SPOUSE_DOB',
      }).goTo('SPOUSE_BIRTH_CITY_COUNTRY'),

      new State({
        key: 'SPOUSE_BIRTH_CITY_COUNTRY',
        question: 'In which country and city was your spouse born?',
        type: 'STRING',
        placeholder: 'Damascus, Syria',
        field: 'SPOUSE_BIRTH_CITY_COUNTRY',
      }).goTo('SPOUSE_PRESENT_NATIONALITY'),

      new State({
        key: 'SPOUSE_PRESENT_NATIONALITY',
        question: 'What is your spouse\'s Nationality right now?',
        context: 'You can say that they are stateless if their nationality has been taken away from them and you have no legal right to live in any country. The fact that you might be arrested if you return to your home country, however, does not make you stateless.',
        type: 'STRING',
        placeholder: 'Iraqi',
        field: 'SPOUSE_PRESENT_NATIONALITY',
      }).goTo('SPOUSE_RACE'),

      new State({
        key: 'SPOUCE_RACE',
        question: 'What Race, Ethnic or Tribal Group does your spouse belong to?',
        context: 'If you are applying for asylum based on race, ethnicity, or tribal affiliation, enter the name of your group here. Make sure that the identifying name matches any evidence that you are attaching to prove your claim. If you need further space to explain, use Supplement B.',
        type: 'STRING',
        placeholder: 'Kurdish',
        field: 'SPOUCE_RACE',
      }).goTo('RELIGION'),
      */
    ]
  }

  mapStateToFields(state = {}) {
    const {
      FIRST_NAME = "",
      MIDDLE_NAME = "",
      LAST_NAME = "",
      OTHER_NAMES = "",
      GENDER = "Male",
      DOB = "",
      BIRTH_CITY_COUNTRY = "",
      BIRTH_NATIONALITY = "",
      PRESENT_NATIONALITY = "",
      RACE = "",
      RELIGION = "",
      MARITAL_STATUS = "Single",
      TRAVEL_DOC_ORIGIN = "",
      DOC_EXPIRE_DATE = "",
      NATIVE_LANG = "",
      ENGLISH_FLUENCY = true,
      OTHER_FLUENCY = "",
      RESIDENCE_US_STREET = "",
      RESIDENCE_US_NUMBER = "",
      RESIDENCE_US_APT_NUM = "",
      RESIDENCE_US_CITY = "",
      RESIDENCE_US_STATE = "",
      RESIDENCE_US_ZIPCODE = "",
      PHONENUM = "",
      FORM_FILLING = false,
      MAIL_ADDRESS = false,
      MAIL_ADDRESS_STREET = "",
      MAIL_ADDRESS_NUM = "",
      MAIL_ADDRESS_APT_NUM = "",
      MAIL_ADDRESS_CITY = "",
      MAIL_ADDRESS_STATE = "",
      MAIL_ADDRESS_ZIPCODE = "",
      ALIEN_NUM = "",
      US_SSN = "",
      USCIS_ACC = "",
      COURT_NOW = false,
      COURT_EVER = false,
      MARRIED = false,
      HAS_CHILDREN = false,
    } = state;

    // TODO: 19_b, 19_c invalid identifiers

    const raw_fields = this.fields();

    const fields = raw_fields.map(field => field.name);

    let mapped = {}

    // mapped[fields[47]] = TORTURE;

    mapped[fields[87]] = !MARRIED;

    if (!HAS_CHILDREN) {
      mapped[fields[115]] = true;
    }

    // Information about application.
    mapped[fields[306]] = true;
    mapped[fields[307]] = true;
    mapped[fields[308]] = true;
    mapped[fields[309]] = true;
    mapped[fields[314]] = true;
    mapped[fields[315]] = true;
    mapped[fields[316]] = true;
    mapped[fields[317]] = true;
    mapped[fields[321]] = true;
    mapped[fields[322]] = true;
    mapped[fields[323]] = true;

    mapped[fields[8]] = FIRST_NAME;
    mapped[fields[9]] = MIDDLE_NAME;
    mapped[fields[2]] = LAST_NAME;
    mapped[fields[57]] = USCIS_ACC;

    mapped[fields[3]] = OTHER_NAMES;
    mapped[fields[0]] = ALIEN_NUM;
    mapped[fields[4]] = util.format("%d %s", RESIDENCE_US_NUMBER, RESIDENCE_US_STREET);

    if (GENDER === "Male") {
      mapped[fields[20]] = true;
    } else if (GENDER === "Female") {
      mapped[fields[21]] = true;
    }

    mapped[fields[1]] = US_SSN;
    mapped[fields[6]] = DOB;

    mapped[fields[5]] = RESIDENCE_US_CITY;
    mapped[fields[13]] = RESIDENCE_US_STATE;
    mapped[fields[14]] = RESIDENCE_US_ZIPCODE;
    mapped[fields[12]] = RESIDENCE_US_APT_NUM;

    if (MAIL_ADDRESS) {
      mapped[fields[16]] = util.format("%d %s", MAIL_ADDRESS_NUM, MAIL_ADDRESS_STREET);
      mapped[fields[15]] = MAIL_ADDRESS_APT_NUM;
      mapped[fields[18]] = MAIL_ADDRESS_CITY;
      mapped[fields[19]] = MAIL_ADDRESS_STATE;
      mapped[fields[17]] = MAIL_ADDRESS_ZIPCODE;
    }

    mapped[fields[26]] = BIRTH_CITY_COUNTRY;
    mapped[fields[27]] = BIRTH_NATIONALITY;
    mapped[fields[7]] = PRESENT_NATIONALITY;
    mapped[fields[28]] = RACE;
    mapped[fields[29]] = RELIGION;

    if (MARITAL_STATUS === "Single") {
      mapped[fields[22]] = true;
    } else if (MARITAL_STATUS === "Married") {
      mapped[fields[23]] = true;
    } else if (MARITAL_STATUS === "Divorced") {
      mapped[fields[24]] = true;
    } else if (MARITAL_STATUS === "Widowed") {
      mapped[fields[25]] = true;
    }

    if (COURT_NOW) {
      mapped[fields[32]] = true;
    } else if (COURT_EVER) {
      mapped[fields[31]] = true;
    } else {
      mapped[fields[30]] = true;
    }

    if (ENGLISH_FLUENCY) {
      mapped[fields[54]] = true;
    } else {
      mapped[fields[55]] = true;
    }

    return mapped;
  }
}

module.exports = i589;
