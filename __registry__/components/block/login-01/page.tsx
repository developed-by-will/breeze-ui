import LoginPage01 from './components/form';
import logo from './generic-company-logo.png';
import cover from './pexels-nietjuh-1906440.jpg';

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
      customBtnColor="bg:background"
      customLabel="Sign In"
      customIcon=""
      formWidth={300}
      providers={['custom', 'google']}
      handleLogin={[() => signIn(), () => signInWithGoogle()]}
    />
  );
}
