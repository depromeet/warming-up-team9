import styled from '@emotion/styled';
import React from 'react';
import closeIcon from './closeIcon.svg'

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
  return (
    <Wrapper role="dialog" show={show}>
      <Modal>
        <CloseButton aria-label="창 닫기" onClick={handleClose}>
          <img src={closeIcon} alt="" aria-hidden={true} />
        </CloseButton>
        {children}
      </Modal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: ${props => props.show ? 'center' : 'none'};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(97, 103, 111, 0.6);
`;

const Modal = styled.div`
  width: 784px;
  max-height: 716px;
  height: 90%;
  box-sizing: border-box;
  padding: 26px;
  margin: auto;
  border-radius: 10px;
  background-color: #ffffff;
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
