export type Languages =
  | 'typescript'
  | 'sql'
  | 'json'
  | 'jsx'
  | 'bash'
  | 'batch'
  | 'c'
  | 'csharp'
  | 'css'
  | 'django'
  | 'docker'
  | 'ejs'
  | 'git'
  | 'go'
  | 'graphql'
  | 'http'
  | 'java'
  | 'javascript'
  | 'log'
  | 'lua'
  | 'markdown'
  | 'mongodb'
  | 'nginx'
  | 'pascal'
  | 'perl'
  | 'php'
  | 'powershell'
  | 'python'
  | 'regex'
  | 'ruby'
  | 'rust'
  | 'sass'
  | 'scss'
  | 'swift'
  | 'tsx'
  | 'visualBasic'
  | 'yaml';

import * as PrismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
export { PrismStyles };
export type StyleName = keyof typeof PrismStyles;

export type PropsType =
  | {
      codeSnippet: string;
      styleName: StyleName;
      showAlert?: false;
      language?: Languages;
    }
  | {
      codeSnippet: string;
      styleName: StyleName;
      showAlert: true;
      language?: Languages;
      alertTitle: string;
      alertMessage: string;
      alertDialogAction: string;
    };
