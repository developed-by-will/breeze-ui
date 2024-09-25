import Logo from '@/components/project/Logo';
import LoginPage01 from '@/registry/components/block/login-01/components/form';
import cover from './pexels-nietjuh-1906440.jpg';

export default function Login() {
  async function signIn() {
    alert('Sign in logic');
  }

  async function signInWithGoogle() {
    alert('Sign in with Google logic');
  }

  const logo = <Logo font1="text-6xl" font2="text-4xl" />;

  return (
    <LoginPage01
      backgroundImage={cover}
      companyLogo={logo}
      title="Breeze UI"
      description="Build your projects with breeze"
      customBtnColor="bg:background"
      customLabel="Sign In"
      customIcon=""
      formWidth={300}
      providers={['custom', 'google']}
      handleLogin={[() => signIn(), () => signInWithGoogle()]}
    />
  );
}
