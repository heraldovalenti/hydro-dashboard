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

const LoginForm = () => {
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
    <form noValidate autoComplete="off">
      {wrongCredentials && (
        <fieldset>
          <div>{t('auth_form_wrong_credentials_message')}</div>
        </fieldset>
      )}
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
  );
};

export default LoginForm;
