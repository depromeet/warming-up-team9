export const COMMON_ACTION_TYPES = {
  checkAuth: 'common/check-auth',
  checkAuthSuccess: 'common/check-auth-success',
  checkAuthFail: 'common/check-auth-fail',
};

export const checkAuthAction = () => ({
  type: COMMON_ACTION_TYPES.checkAuth,
});

export const checkAuthSuccessAction = payload => {
  const { isAuthenticated, user } = payload;

  return {
    type: COMMON_ACTION_TYPES.checkAuthSuccess,
    payload: {
      isAuthenticated,
      user: isAuthenticated ? user : null,
    },
  };
};

export const checkAuthFailAction = error => ({
  type: COMMON_ACTION_TYPES.checkAuthFail,
  error,
});
