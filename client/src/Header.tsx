import React from 'react'
import styled from 'styled-components/macro'

export function Header() {
  return (
    <Wrapper>
      <HeaderTitle style={{ width: 'min-content' }}>
        HACKATHON RUNNER
      </HeaderTitle>
      <HeaderSubtitle>A DO + DEV hackathon project</HeaderSubtitle>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  background-color: black;
  padding: 24px;
  width: max-content;
  color: white;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
`

const HeaderTitle = styled.h1`
  color: white;
  margin: 0;
  margin-bottom: 4px;
  font-size: 24px;
`

const HeaderSubtitle = styled.span`
  color: white;
  font-size: 10px;
`
