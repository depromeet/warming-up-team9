import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUpForm from '../../components/SignUpForm';
import * as authAction from '../../stores/actions/auth';
import FormValidator from './SignUpFormValidator';

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

    const checkPassword = (cpw) => {
      if (this.state.password !== cpw || this.state.password === '') {
        return false;
      } else {
        return true;
      }
    }

    this.validator = new FormValidator([
      {
        field: 'email',
        method: 'isEmpty',
        formValid: false,
        message: '이메일은 필수항목 입니다.'
      },
      {
        field: 'email',
        method: 'isEmail',
        formValid: true,
        message: '이메일 형식이 맞지 않습니다.'
      },
      {
        field: 'password',
        method: 'isEmpty',
        formValid: false,
        message: '비밀번호는 필수항목 입니다.'
      },
      {
        field: 'password',
        method: isPassword,
        formValid: true,
        message: '비밀번호는 8자리 이상의 문자,숫자 조합이여야 합니다.'
      },
      {
        field: 'checkpassword',
        method: checkPassword,
        formValid: true,
        message: '비밀번호가 일치하지 않습니다.'
      },
      {
        field: 'nickname',
        method: 'isEmpty',
        formValid: false,
        message: '닉네임은 필수항목 입니다.'
      }
    ])

    this.state = {
      email: '',
      password: '',
      nickname: '',
      checkpassword: '',
      checked: false,
      validation: this.validator.validResult(),
    }
  }

  onChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
    if (name = "checked") {
      this.setState({ checked: !this.state.checked });
    }
  }

  onFormSubmit = (e) => {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });

    if (validation.isValid && this.state.checked === true) {
      const { email, password, nickname } = this.state;
      return authAction.registerUserAPI({ email, password, nickname });
    }
    if (this.state.checked === false) {
      alert('회원가입 조항에 체크해주십시오.');
    }
  }

  render() {
    // const { errorCode } = this.props;
    const {
      email,
      password,
      checkpassword,
      nickname,
      checked,
      validation
    } = this.state;

    return (
      <SignUpForm
        email={email}
        password={password}
        nickname={nickname}
        checkpassword={checkpassword}
        checked={checked}
        onChange={this.onChange}
        onFormSubmit={this.onFormSubmit}
        validation={validation}
      // errorCode={errorCode}
      />
    )

  }
}

const mapStateToProps = state => ({
  status: state.auth.signUpStatus,
  // errorCode : state.auth.register.error
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpFormContainer);
