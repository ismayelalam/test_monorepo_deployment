import axios from 'axios';
import { headers } from 'next/headers';

export default async function AddIpHeader() {
  const header = await headers();
  const forward = header.get('x-forwarded-for') ?? '';
  const real = header.get('x-real-ip') ?? '';
  axios.defaults.headers['x-forwarded-for'] = forward;
  axios.defaults.headers['x-real-ip'] = real;
  return null;
}
