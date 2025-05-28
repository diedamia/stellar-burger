import { Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../common-type';

export interface ResetPasswordUIProps {
  errorText?: string;
  password: string;
  token: string;
  setPassword: (value: string) => void;
  setToken: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
