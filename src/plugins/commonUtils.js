import * as ERROR_MESSAGES from "./customErrorMessages";

export default function getFirebaseErrorMessage(code) {
  let message = null;

  switch (code) {
    case "auth/user-not-found":
      message = ERROR_MESSAGES.USER_NOT_FOUND;
      break;
    case "auth/email-already-in-use":
      message = ERROR_MESSAGES.EMAIL_ALREADY_EXIST;
      break;
    case "auth/email-already-exists":
      message = ERROR_MESSAGES.EMAIL_ALREADY_EXIST;
      break;
    case "auth/internal-error":
      message = ERROR_MESSAGES.INTERNAL_ERROR;
      break;
    case "auth/invalid-credential":
      message = ERROR_MESSAGES.INVALID_CREDENTIAL;
      break;
    case "auth/invalid-email":
      message = ERROR_MESSAGES.INVALID_EMAIL_FORMAT;
      break;
    case "auth/invalid-password":
      message = ERROR_MESSAGES.INVALID_CREDENTIAL;
      break;
    case "auth/wrong-password":
      message = ERROR_MESSAGES.INVALID_CREDENTIAL;
      break;
    case "auth/weak-password":
      message = ERROR_MESSAGES.INVALID_PASSWORD_FORMAT;
      break;
    case "auth/requires-recent-login":
      message = ERROR_MESSAGES.REQUIRES_RECENT_LOGIN;
      break;
    default:
      message = ERROR_MESSAGES.DEFAULT_MESSAGE;
      break;
  }
  return message;
}
