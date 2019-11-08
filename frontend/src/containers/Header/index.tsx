import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AUTH_TOKEN_STORAGE_KEY } from '../../constants';
import { User } from '../../models';
import { generateStorage } from '../../utils';
import { HEADER_SIZE } from './sizes';
import logo from './logo.png';
import logo2x from './logo@2x.png';
import logo3x from './logo@3x.png';

interface Props {
  user: User | null;
}

const storage = generateStorage();

export default function Header({ user }: Props) {
  const history = useHistory();

  const handleClick = useCallback(() => {
    if (user) {
      storage.remove(AUTH_TOKEN_STORAGE_KEY);
      window.location.reload();
    } else {
      history.push('/login');
    }
  }, [history, user]);

  return (
    <Wrapper>
      <Logo href="/" aria-label="짜요짜요">
        <img src={logo3x} srcSet={`${logo} 1x, ${logo2x} 2x, ${logo3x} 3x`} alt="" aria-hidden={true} />
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
  cursor: pointer;
  user-select: none;

  > img {
    height: 34px;
  }
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
  cursor: pointer;
`;
