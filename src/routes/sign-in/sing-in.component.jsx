import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form-component";
const SingIn = () => {

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h1>sing in page</h1>
      <button onClick={logGoogleUser}>
        Sign In With Google Popup
      </button>
      <SignUpForm />
    </div>
  )
}

export default SingIn;