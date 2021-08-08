import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/VishalAkhouri/gapi-drive-react-ui">
                GitHub Repository
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}