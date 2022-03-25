import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  IconButton,
  CircularProgress,
  TextField,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { Refresh, Close, Save } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useGetAuthToken } from '../../hooks/aes';
import { useUpdateAuthToken } from '../../hooks/aes/useUpdateAuthToken';

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
}));

export const AesConfig = ({ onClose }) => {
  const { t } = useTranslation();
  const { loading: isLoading, authToken, refresh } = useGetAuthToken();
  const { inProgress, update } = useUpdateAuthToken();
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(authToken);
  }, [authToken, isLoading]);
  const loading = isLoading || inProgress;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Grid container>
          <Grid item xs={12} container>
            <Grid item xs={8}>
              <Typography variant={'h4'}>
                {t('app_config_aes_title')}
              </Typography>
            </Grid>
            <Grid item xs={4} container direction="row-reverse">
              <Grid item xs={2}>
                <IconButton onClick={() => refresh()}>
                  <Refresh />
                </IconButton>
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => onClose()}>
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  <TextField
                    fullWidth
                    multiline
                    label={t('app_config_aes_label_auth_token')}
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                  />
                  <IconButton onClick={() => update(token.trim())}>
                    <Save />
                  </IconButton>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
