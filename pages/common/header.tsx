import { FC } from 'react';
import Router from 'next/router'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { auth2SignOut } from "../../src/utils/gapi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

interface IButtonAppBarProps {
  isSignedIn: boolean;
}

const ButtonAppBar: FC<IButtonAppBarProps> = ({ isSignedIn }) => {
  const classes = useStyles();

  const handleLogout = () => {
    if (isSignedIn) {
        auth2SignOut();
        Router.push('/');
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Google Drive API (Demo)
          </Typography>
          <Button color="inherit" onClick={handleLogout}>{isSignedIn ? 'Logout' : 'Login'}</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ButtonAppBar;
