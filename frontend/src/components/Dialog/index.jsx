import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { Spring } from 'react-spring/renderprops.cjs';
import closeIcon from './closeIcon.svg';

/** 사용법:
 *  (1) 코드 추가
    const [show, setShow] = useState(false);
    const handleClick = () => {
        setShow(!show);
    }

 *  (2) 버튼과 다이어로그(모달) 컴포넌트 추가
    <button onClick={handleClick}>모달 여는 버튼</button>
    <Dialog show={show} handleClose={handleClick}>
      ...
    </Dialog>
*/

export default function Dialog({ show, handleClose, children }) {
  const animation = useMemo(() => {
    const hiddenState = { opacity: 0, scale: 0.9 };
    const showState = { opacity: 1, scale: 1 };

    return show ? { from: hiddenState, to: showState } : { from: showState, to: hiddenState };
  }, [show]);

  return (
    <Spring {...animation} config={{ tension: 480, friction: 40, precision: 0.01 }} delay={0.1}>
      {styles => (
        <Wrapper show={show}>
          <Dimmer style={{ opacity: styles.opacity }} />
          <Content style={{ transform: `scale(${styles.scale})` }}>
            <CloseButton aria-label="창 닫기" onClick={handleClose}>
              <img src={closeIcon} alt="" aria-hidden={true} />
            </CloseButton>
            {children}
          </Content>
        </Wrapper>
      )}
    </Spring>
  );
}

const Wrapper = styled.div`
  z-index: 1000;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  display: ${props => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

const Dimmer = styled.div`
  position: absolute;
  background-color: rgba(97, 103, 111, 0.6);
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  min-width: 360px;
  max-width: 784px;
  width: 65%;
  max-height: 716px;
  height: 90%;
  box-sizing: border-box;
  padding: 26px;
  border-radius: 10px;
  background-color: #ffffff;
  overflow-x: hidden;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  height: 18px;
  padding: 0;
  position: relative;
  left: 714px;
  background-color: transparent;
  border: none;
  outline: none;
`;
