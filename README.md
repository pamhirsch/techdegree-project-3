# techdegree-project-3
 Interactive Form

 ## Description

The Interactive Form project displays a registration form for the Full Stack
conference. The following fields are required to be entered by the registrant.

- Name (may contain only letters - upper and lowercase - periods or spaces)
- Email (may contain letters - upper and lowercase - numbers, and 1 @ and 1 period. The format is xxxxxxxx@xxxxxx.xxx.
- Job Role - this is a drop down selector. If the registrant chooses 'Other', the form will display an input field 'Your Job Role'. This field is not validated for
any kind of entry.
- T-Shirt information
  - Size (drop down selector)
  - Design (drop down selector)
  - Color (drop down selector). This field is not displayed until the registrant
  selects a Design.
- Activity Registration - this is a list of checkboxes for available activities.
The registrant may select as many as they want as long as an event is not on the same day/time as another one they've chosen. The form will prevent them from
doing this. A Total Cost is displayed with the total cost of the events chosen.
- Payment information
  - Payment type (drop down selector). If Credit Card is chosen (it is the default), 5 fields are displayed - cc number, zip code, CVV, expiration date (month and year). The CC number field must be only numbers and there must be
  between 13 and 16 of them. The zip field must be 5 numbers and the CVV number
  must be 3 numbers.
  - If another payment type is chosen (PayPal or Bitcoin), the cc fields are
  removed and the informational text about the type chosen is displayed.

For any validated fields, if the content does not pass validation and error message is displayed and the form is not submitted.

EXCEEDS EXPECTATIONS

- The color choice (label and dropdown) is not displayed at all until the
registrant chooses a Design theme.
- The Name field has a tooltip validator and will display the following message
when something other than an upper/lower case letter, period of space is
entered "Please enter only letters, spaces, and periods." This goes away when
a valid character is entered.
- The Credit Card field will display one of 2 different messages depending on the error. "***Please enter a credit card number.***" if the field is blank or
"***Credit card number must be between 13 and 16 digits.***"

 ## License
 [MIT](https://choosealicense.com/licenses/mit/)
