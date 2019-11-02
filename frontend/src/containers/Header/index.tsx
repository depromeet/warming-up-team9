import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '../../models';
import { HEADER_SIZE } from './sizes';

interface Props {
  user: User | null;
}

export default function Header({ user }: Props) {
  const history = useHistory();

  const handleClick = useCallback(() => {
    if (user) {
      // TODO(@seokju-na): 로그아웃
    } else {
      history.push('/login');
    }
  }, [history, user]);

  return (
    <Wrapper>
      <Logo href="/" aria-label="짜요짜요">
        로고
      </Logo>
      <Button onClick={handleClick}>{user == null ? '로그인' : '로그아웃'}</Button>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  width: 100%;
  height: ${HEADER_SIZE}px;
  padding: 0 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dddcdc;
  box-sizing: border-box;
`;

const Logo = styled.a`
  text-align: center;
  display: inline-flex;
  align-items: center;
`;

const Button = styled.button`
  padding: 0 8px;
  height: 48px;
  margin: 0;
  border: none;
  outline: 0;
  background: transparent;
  font-size: 13px;
  font-weight: bold;
  line-height: 48px;
  letter-spacing: -0.56px;
  text-align: center;
  color: #61676f;
`;
