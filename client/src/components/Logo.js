import React from 'react'
import styled from 'styled-components'

const Logo = () => {
    return (
        <Wrapper>
            Virtual Guestbook
        </Wrapper>
    )
}

const Wrapper = styled.header`
    text-align: center;
    width: 100%;
    font-size: 5em;
    @media (max-width: 600px) {
        font-size: 2.5em;
    }
    font-family: Pacifico;
    color: #ff2e63;
`

export default Logo
