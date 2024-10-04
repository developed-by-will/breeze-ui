/* For the preview */
import codeSource from '!!raw-loader!./form.tsx';
import { componentsMetadata, ComponentType } from '@/registry/components/metadata';
import LoginPage01 from './form';

export const codeSnippet = codeSource;

/* For the example */
import logoAlternative from '../assets/generic-company-logo-white.png';
import logo from '../assets/generic-company-logo.png';
import cover from '../assets/pexels-nietjuh-1906440.jpg';

async function signIn() {
  alert('Custom sign in logic');
}

async function signInWithGoogle() {
  alert('Sign in with Google logic');
}

const example = (
  <LoginPage01
    backgroundImage={cover}
    companyLogo={logo}
    companyLogoAlternative={logoAlternative}
    companyLogoAlt="Company logo"
    customBtnColor="bg:background"
    customLabel="Sign In"
    customIcon=""
    formWidth={300}
    providers={['custom', 'google']}
    handleLogin={[() => signIn(), () => signInWithGoogle()]}
  />
);

const exampleAsString = `import LoginPage01 from './components/form';

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
}`;

export const config: ComponentType = {
  type: 'block',
  slug: componentsMetadata.login01.slug,
  name: componentsMetadata.login01.name,
  title: componentsMetadata.login01.title,
  description: componentsMetadata.login01.description,
  codeSnippet,
  example,
  implementation_1: exampleAsString,
  addCommand: `npx shadcn add https://breeze-ui.wilsongomes.me/public/registry/components/${componentsMetadata.login01.name}.json`
};
