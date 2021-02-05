import React, { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { AuthContext } from '../../providers/AuthProvider';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../components/Icons/Logo';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      margin: 10,
    },
    '& fieldset': {
      borderWidth: 0,
    },
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  wrapper: {
    margin: 'auto',
    marginTop: 20,
    padding: 0,
    width: '500px',
    border: '1px solid #d5d5d5',
    boxShadow: '0 2px 3px rgb(0 0 0 / 5%)',
    borderRadius: 4,
  },
  logo: {},
}));

const LoginForm = () => {
  const classes = useStyles();
  const { login, wrongCredentials } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const performLogin = () => {
    login({ username, password });
  };
  const { t } = useTranslation();
  return (
    <div className={classes.wrapper}>
      <form noValidate autoComplete="off" className={classes.root}>
        <fieldset style={{ alignItems: 'center' }}>
          <Logo height={50} width={100} className={classes.logo} />
        </fieldset>
        <fieldset>
          <FormControl>
            <TextField
              label={t('auth_form_username_label')}
              id="username"
              required
              value={username}
              onChange={handleUsernameChange}
            />
          </FormControl>
        </fieldset>
        <fieldset>
          <FormControl>
            <InputLabel htmlFor="password">
              {t('auth_form_password_label')}
            </InputLabel>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              onChange={handlePasswordChange}
              required
              value={password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </fieldset>
        {wrongCredentials && (
          <fieldset>
            <div className={classes.error}>
              {t('auth_form_wrong_credentials_message')}
            </div>
          </fieldset>
        )}
        <fieldset>
          <Button
            variant="contained"
            color="primary"
            onClick={performLogin}
            type="submit"
          >
            {t('auth_form_login_button')}
          </Button>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginForm;
