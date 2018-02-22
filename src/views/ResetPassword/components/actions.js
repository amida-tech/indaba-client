import { push } from 'react-router-redux';

import apiService from '../../../services/api';

export const resetPassword = (token, password) => dispatch =>
apiService.auth.resetPassword(token, password)
.then(() => dispatch(push('/login')));
