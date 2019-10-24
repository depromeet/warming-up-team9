import React from 'react';
/** @jsx jsx */
import {css, jsx} from '@emotion/core';

function Button(props) {
    return (
        <button
            type={props.type}
            onClick={props.handleClick}
            css={props.css}
            {...props}
        >
            {props.children}
        </button>
    );
}

Button.defaultProps = {
    type: 'button',
    handleClick: console.log('no handleClick prop passed'),
    css: {
        backgroundColor: 'white',
        border: 'solid 1px #cccccc',
        borderRadius: 4,
        fontFamily: 'SpoqaHanSans',
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
        width: 136,
        height: 48,
    },
};

export default Button;
