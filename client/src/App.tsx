import React from 'react'
import styled from 'styled-components/macro'
import { About } from './About'

import GameComponent from './game/GameComponent'
import { Header } from './Header'
import { Instructions } from './Instructions'
import { Toplists } from './Toplists'

function App() {
  return (
    <Wrapper>
      <Header></Header>
      <GameWrapper>
        <GameComponent></GameComponent>
      </GameWrapper>
      <Sections>
        <Instructions></Instructions>
        <About></About>
        <Toplists></Toplists>
      </Sections>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 36px;
  padding-bottom: 16px;
`

const GameWrapper = styled.div`
  padding: 24px 0;
`

const Sections = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`

export default App
