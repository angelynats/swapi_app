import Types from './Types';

// SIGNIN

export const signinRequest = () => ({
  type: Types.SIGNIN_REQUEST,
});

export const signinSuccess = response => ({
  type: Types.SIGNIN_SUCCESS,
  payload: { response },
});

export const signinError = error => ({
  type: Types.SIGNIN_ERROR,
  payload: { error },
});

// LOGOUT

export const logOut = () => ({
  type: Types.LOGOUT,
});

// REFRESH

export const refreshUser = response => ({
  type: Types.REFRESH_USER,
  payload: { response },
});
