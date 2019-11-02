import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../components/LoginForm'
// import validate from './LoginFormValidationRules';
// import useRequest from '../../lib/hooks/useRequest';
// import { loginRequest } from '../../lib/api/auth';

const LoginFormContainer = ({history}) => {
  const [errors, setErrors] = useState(null);
  const [onLogin] = useRequest(loginRequest);

  const onSubmit = async (form) => {
    setErrors(null);
    const validation = validate(form); 
    if(validation){
      setErrors(validation);
      return;
    }

    try {
      await onLogin(form);
      // history.push('/');
    } catch (e) {
      if(e.response.status === 409){
        setErrors({common : '이미 존재하는 이메일 입니다. !'});
      }
      setErrors({common : '에러 발생 !'});
    }
  }
  return (
    <LoginForm
      onSubmit={onSubmit}
      errors={errors}
    />
  )
}
export default withRouter(LoginFormContainer);
