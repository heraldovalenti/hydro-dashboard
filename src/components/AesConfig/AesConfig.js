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
import { useGetAuthTokens } from '../../hooks/aes';
import { useUpdateAuthTokens } from '../../hooks/aes';
import { AesConnectionHealthCheck } from './AesConnectionHealthCheck';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
}));

export const AesConfig = ({ onClose }) => {
  const { t } = useTranslation();
  const { loading: isLoading, authTokens, refresh } = useGetAuthTokens();
  const { inProgress, update } = useUpdateAuthTokens();
  const [fedAuthToken, setFedAuthToken] = useState();
  const [rtFaToken, setRtFaToken] = useState();
  useEffect(() => {
    setFedAuthToken(authTokens?.fedAuth);
    setRtFaToken(authTokens?.rtFa);
  }, [authTokens, isLoading]);
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
                <IconButton onClick={() => onClose()}>
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} container>
            <AesConnectionHealthCheck />
          </Grid>
          <Grid item container xs={12}>
            {loading ? (
              <Grid item xs={12}>
                <CircularProgress />
              </Grid>
            ) : (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    label={t('app_config_aes_label_auth_token_fed_auth')}
                    value={fedAuthToken}
                    onChange={(e) => setFedAuthToken(e.target.value)}
                  />
                  <IconButton onClick={() => refresh()}>
                    <Refresh />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      update({ ...authTokens, fedAuth: fedAuthToken.trim() })
                    }
                  >
                    <Save />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    label={t('app_config_aes_label_auth_token_rt_fa')}
                    value={rtFaToken}
                    onChange={(e) => setRtFaToken(e.target.value)}
                  />
                  <IconButton onClick={() => refresh()}>
                    <Refresh />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      update({ ...authTokens, rtFa: rtFaToken.trim() })
                    }
                  >
                    <Save />
                  </IconButton>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
