import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;


  //注册完毕后重置表单
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  //提交注册信息
  const handleSubmit = async (e) => {
    e.preventDefault();
    //验证密码
    if (password !== confirmPassword) {
      alert('password do not match');
      return;
    }
    //向数据库提交信息
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName })
      console.log(user);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert("cannot create user, email already in use");
      }
      else {
        console.log('user creation encounterd an error', error);
      }
    }
    resetFormFields();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div>
      <h1>Sign Up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type="text"
          required name="displayName"
          onChange={handleChange}
          value={displayName}
        />

        <FormInput
          label='Email'
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label='Password'
          type="password"
          required
          name="password"
          onChange={handleChange}
          value={password}
        />

        <FormInput
          label='Confirm Password'
          type="password"
          required
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm;