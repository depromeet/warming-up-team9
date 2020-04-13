export const COMMON_ACTION_TYPES = {
  checkAuthRequest: 'common/check-auth-request',
  checkAuthResponse: 'common/check-auth-response',
};

export const checkAuthRequestAction = () => ({
  type: COMMON_ACTION_TYPES.checkAuthRequest,
});

export const checkAuthResponseAction = payload => {
  const { isAuthenticated, user } = payload;

  return {
    type: COMMON_ACTION_TYPES.checkAuthResponse,
    payload: {
      isAuthenticated,
      user: isAuthenticated ? user : null,
    },
  };
};
