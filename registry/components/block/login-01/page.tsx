'use client';

import logo from './assets/001-generic-company-logo.png';
import cover from './assets/pexels-nietjuh-1906440.jpg';
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
      backgroundImage={cover}
      companyLogo={logo}
      companyLogoAlt="Company logo"
      customBtnColor="bg:background"
      customLabel="Sign In"
      customIcon=""
      formWidth={300}
      providers={['custom', 'google']}
      handleLogin={[() => signIn(), () => signInWithGoogle()]}
    />
  );
}
