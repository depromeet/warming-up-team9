import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUpForm from '../../components/SignUpForm';
// import * as authAction from '../stores/modules/auth';
import FormValidator from './FormValidator';

class SignUpFormContainer extends Component {
  constructor() {
    super();
    // 조건 : 비밀번호가 8자리 미만일 때 false
    const isPassword = (pw) => {
      if (pw.length < 8) {
        return false;
      } else {
        return true;
      }
    }
    // 조건 : 입력한 비밀번호와 재입력 비밀번호가 동일하지 않을 때 false
    const checkPassword = (cpw) => {
      if (this.state.password !== cpw) {
        return false;
      } else {
        return true;
      }
    }
    // 조건 : 
    const checkagree = (cka) => {
      console.log(cka);

    }

    // 입력 값에 따른 유효성 검사
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
      },
      {
        field: 'checkagree',
        method: checkagree,
        formValid: true,
        message: '회원가입 조항에 체크해주십시오.'
      }
    ])

    // state 정의
    this.state = {
      email: '',
      password: '',
      nickname: '',
      checkpassword: '',
      checkagree: '',
      validation: this.validator.validResult(),
    }
  }

  // 입력 필드에 대한 onChange 핸들러 (사용자가 입력 상태 업데이트)
  onChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  // 유효성 검사가 모두 통과되었는지 확인 후 변경
  onFormSubmit = () => {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
  }

  render() {
    // const { errorCode } = this.props;
    console.log(this.state.checkagree);
    const {
      email,
      password,
      checkpassword,
      nickname,
      checkagree,
      validation
    } = this.state;

    return (
      <SignUpForm
        email={email}
        password={password}
        nickname={nickname}
        checkpassword={checkpassword}
        checkagree={checkagree}
        onChange={this.onChange}
        onFormSubmit={this.onFormSubmit}
        validation={validation}
        // errorCode={errorCode}
      />
    )

  }
}

// const mapStateToProps = state => ({
//   status : state.auth.register.status,
//   errorCode : state.auth.register.error
// }); 

// const mapDispatchToProps = dispatch => ({
//   registerRequest: ({ email, password, nickname }) => {
//     return dispatch(registerRequest(email, password, nickname));
//   }
// });

export default SignUpFormContainer;

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SignUpFormContainer);

