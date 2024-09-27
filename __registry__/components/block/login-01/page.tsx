'use client';

import LoginPage01 from './components/form';

export default function Login() {
  async function signIn() {
    alert('Sign in logic');
  }

  async function signInWithGoogle() {
    alert('Sign in with Google logic');
  }

  return (
    <LoginPage01
      customBtnColor="bg:background"
      customLabel="Sign In"
      customIcon=""
      formWidth={300}
      providers={['custom', 'google']}
      handleLogin={[() => signIn(), () => signInWithGoogle()]}
    />
  );
}
