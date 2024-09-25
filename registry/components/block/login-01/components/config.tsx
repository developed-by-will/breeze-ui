/* For the preview */
import { componentsMetadata, ComponentType } from '@/registry/components/ui/metadata';
import LoginPage01 from './form';

const codeSnippet = `
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image, { StaticImageData } from 'next/image';
import { BsDiscord, BsEnvelopeFill, BsFacebook, BsGithub, BsGoogle } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';

// List of providers
type ProvidersEnum = 'google' | 'github' | 'discord' | 'facebook' | 'email' | 'custom';

// Exclude 'custom' from the list because it is handled separately
const providerDetails: Record<
  Exclude<ProvidersEnum, 'custom'>,
  { label: string; icon?: JSX.Element; background: string }
> = {
  google: { label: 'Sign in with Google', icon: <BsGoogle />, background: 'bg-orange-600' },
  github: { label: 'Sign in with GitHub', icon: <BsGithub />, background: 'bg-stone-600' },
  discord: { label: 'Sign in with Discord', icon: <BsDiscord />, background: 'bg-indigo-600' },
  facebook: { label: 'Sign in with Facebook', icon: <BsFacebook />, background: 'bg-blue-600' },
  email: { label: 'Sign in with Email', icon: <BsEnvelopeFill />, background: 'bg-emerald-600' }
};

// Check if one of the providers is 'custom'
// If it is then customLabel & customBtnColor are required
export type LoginPage01Type = {
  backgroundImage?: string | StaticImageData;
  companyLogo: string | StaticImageData | JSX.Element;
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  providers: ProvidersEnum[];
  handleLogin: Array<() => void>;
  formWidth: number;
} & (
  | { providers: Exclude<ProvidersEnum, 'custom'>[] }
  | {
      providers: (ProvidersEnum | 'custom')[];
      customLabel: string;
      customBtnColor: string;
      customIcon: IconType | string | JSX.Element;
    }
);

export default function LoginPage01(props: Readonly<LoginPage01Type>) {
  const {
    backgroundImage,
    companyLogo,
    title,
    description,
    providers = [],
    handleLogin = [],
    formWidth
  } = props;

  // Optional chaining ensures customLabel & customBtnColor are only accessed if defined
  const customLabel = 'customLabel' in props ? props.customLabel : undefined;
  const customBtnColor = 'customBtnColor' in props ? props.customBtnColor : undefined;

  return (
    <>
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt="Background image of a forest"
          className="absolute w-full h-full object-cover"
          quality={100}
          priority
          fill
        />
      )}

      <div className="flex flex-col items-center justify-center h-screen">
        <Card className={\`flex flex-col items-center justify-center z-10 w-[\${formWidth}px]\`}>
          <CardHeader className="flex flex-col items-center gap-2">
            {typeof companyLogo === 'string' || 'src' in companyLogo ? (
              <Image src={companyLogo} alt="Company Logo" width={formWidth} height={100} />
            ) : (
              companyLogo
            )}
            <CardTitle>{title && <h2>{title}</h2>}</CardTitle>
            <CardDescription>
              {description && <div className="text-colors-neutral-700">{description}</div>}
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full">
            <div className="flex flex-col gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Emaill address" />
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            {providers.map((provider, index) => {
              const { label, icon, background } =
                provider === 'custom'
                  ? { label: customLabel!, icon: undefined, background: customBtnColor! }
                  : providerDetails[provider];
              const handleClick = handleLogin[index];

              return (
                <Button
                  key={provider}
                  onClick={handleClick}
                  className={\`flex items-center w-full gap-2 hover:saturate-50 transition-all duration-300 \${background}\`}
                >
                  {icon} {label}
                </Button>
              );
            })}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}`;

/* For the example */
import Logo from '@/components/project/Logo';
import cover from '../pexels-nietjuh-1906440.jpg';

async function signInWithEmail() {
  alert('Sign with email logic');
}

async function signIn() {
  alert('Custom sign in logic');
}

async function signInWithGoogle() {
  alert('Sign in with Google logic');
}

const logo = <Logo font1="text-6xl" font2="text-4xl" />;

const example = (
  <LoginPage01
    backgroundImage={cover}
    companyLogo={logo}
    title="Breeze UI"
    description="Build your projects with breeze"
    customBtnColor="bg:background"
    customLabel="Custom Login"
    customIcon=""
    formWidth={300}
    providers={['email', 'custom', 'google']}
    handleLogin={[() => signInWithEmail(), () => signIn(), () => signInWithGoogle()]}
  />
);

const exampleAsString = `import Logo from '@/components/project/Logo';
import cover from '../pexels-nietjuh-1906440.jpg';

export default function Page() {
    async function signInWithEmail() {
      alert('Sign with email logic');
    }

    async function signIn() {
        alert('Custom sign in logic');
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
            customLabel="Custom Login"
            customIcon=""
            formWidth={300}
            providers={['email', 'custom', 'google']}
            handleLogin={[() => signInWithEmail(), () => signIn(), () => signInWithGoogle()]}
        />
    );
  }
}
`;

export const config: ComponentType = {
  slug: componentsMetadata.login01.slug,
  name: componentsMetadata.login01.name,
  title: componentsMetadata.login01.title,
  description: componentsMetadata.login01.description,
  codeSnippet,
  example,
  implementation_1: exampleAsString,
  addCommand: ''
};
