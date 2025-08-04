import { endpoint } from '../../block/login-01/constants';
import { LoginPayloadType, LoginResponseType } from '../../block/login-01/formValidations';

export async function POST<TPayload, TResponse>(
  url: string,
  payload: TPayload
): Promise<TResponse> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.Message || `HTTP error! Status: ${response.status}`);
  }

  return data as TResponse;
}

export async function login(payload: LoginPayloadType) {
  return POST<LoginPayloadType, LoginResponseType>(endpoint['LOGIN'].path, payload);
}
