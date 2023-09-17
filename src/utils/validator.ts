const MAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validateEmail = (mail: string) => {
  return mail.match(MAIL_REGEX) ? '' : 'Error Email Format';
};

const validateUser = (user: string) => {
  console.log('sdfsdfs', !!user);
  return !!user ? '' : 'Username is empty';
};

const validatePassword = (pass: string) => {
  return pass.length < 8 ? 'Please enter at least 8 characters' : '';
};

export { validateEmail, validateUser, validatePassword };
