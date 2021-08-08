import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router'
import { isAuth2SignedIn, auth2SignIn, auth2SignInListener } from '../../src/utils/gapi';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useSigninStyles from './styles';

export default function SignInSide() {
  const classes = useSigninStyles();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (gapi.auth2) {
      const isSignedIn = isAuth2SignedIn();
      console.log(`check user is isSignedIn on load: ${isSignedIn}`);
      setIsSignedIn(isSignedIn);
    }
  });

  const updateSigninStatus = (isSignedIn: boolean) => {
    console.log(`SignIn listner callback triggered (isSignedIn) : ${isSignedIn}`);
    setIsSignedIn(isSignedIn);
  }

  const showDriveFiles = () => {
    console.log('showing drive files');
    if (isSignedIn) {
      /// listFiles();
      Router.push('/gdrive/list')
    } else {
      console.log('sign in first');
    }
  };

  const signIn = () => {
    if (gapi.auth2) {
      if (!isSignedIn) {
        // gapi.auth2.getAuthInstance().signIn();
        auth2SignIn();
        // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        auth2SignInListener(updateSigninStatus);
        console.log('waiting to the isSignedIn Listener');
      }
    }
  };

  const signOut = () => {
    console.log('signing out user: (isSignedIn)', isSignedIn);
    if (isSignedIn) {
      gapi.auth2.getAuthInstance().signOut();
      setIsSignedIn(false);
      console.log('signing out complete: (isSignedIn)', isSignedIn);
    }
  };

  return (
    <div>
      <Head>
        <title>Google API - React</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://apis.google.com/js/api.js" />
      </Head>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {!isSignedIn ? 'Sign in with Google' : 'View Google Drive Files'}
            </Typography>
            {!isSignedIn &&
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={signIn}
              >
                Sign In (Using Google OAuth2)
              </Button>
            }
            {isSignedIn &&
              <>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={showDriveFiles}
                >
                  Show Google Drive Files
                </Button>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={signOut}
                >
                  Sign Out
                </Button>
              </>
            }
          </div>
        </Grid>
      </Grid>
    </div>
  );
}