import { useEffect } from 'react';
import Head from 'next/head';
import SignInSide from './signin';
import { handleClientLoad } from '../src/utils/gapi';

export default function Home() {
  useEffect(async () => {
    await handleClientLoad();
  });

  return (
    <div>
      <Head>
        <title>Google Drive API - React</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://apis.google.com/js/api.js" />
      </Head>
      
      <SignInSide></SignInSide>
    </div>
  );
}