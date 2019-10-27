import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUpForm from '../../components/SignUpForm';
// import * as authAction from 'App/store/modules/auth';
import FormValidator from './FormValidator';

class SignUpFormContainer extends Component {
  constructor() {
    super();
    const isPassword = (pw) => {
      if (pw.length < 8) {
        return false;
      } else {
        return true;
      }
    }
    const checkPassword = (pw) => {
      if (isPassword !== pw) {
        return false;
      } else {
        return true;
      }
    }

    this.validator = new FormValidator([
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: '이메일은 필수항목 입니다.'
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: '이메일 형식이 맞지 않습니다.'
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: '비밀번호는 필수항목 입니다.'
      },
      {
        field: 'password',
        method: isPassword,
        validWhen: true,
        message: '비밀번호는 8자리 이상의 문자,숫자 조합이여야 합니다.'
      },
      {
        field: 'password',
        method: checkPassword,
        validWhen: true,
        message: '비밀번호가 일치하지 않습니다.'
      },
      {
        field: 'nickname',
        method: 'isEmpty',
        validWhen: false,
        message: '닉네임은 필수항목 입니다.'
      },
    ])

    this.state = {
      email: '',
      password: '',
      nickname: '',
      validation: this.validator.makeValidResult(),
    }
  }

    onChange = e => {
      let { name, value } = e.target; 
      this.setState({[name]: value});
    } 

    onFormSubmit = () => {
      const validation = this.validator.validate(this.state);
      this.setState({validation});
    }

  render() {
    const { registerError } = this.props; 
    const { 
      email,
      password,
      nickname,
      validation
    } = this.state;

    return (
      <SignUpForm
      email={email}
      password={password}
      nickname={nickname}
      onChange={this.onChange}
      onFormSubmit={this.onFormSubmit}
      validation={validation}
      registerError={registerError}
      />
    )
  }
}

// const mapStateToProps = state => ({
//   status : state.auth.register.status,
//   registerError : state.auth.register.error
// }); 

// const mapDispatchToProps = dispatch => ({
//   registerRequest: ({ email, password, nickname }) => 
//   dispatch(authAction.registerRequest({ email, password, nickname })),
// })

export default SignUpFormContainer;

