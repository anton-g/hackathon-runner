import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components/macro'
import { io } from 'socket.io-client'

import { Section } from './common'
import GameComponent from './game/GameComponent'
import { About } from './About'
import { Header } from './Header'
import { Instructions } from './Instructions'
import { Toplists } from './Toplists'
import { useLocalStorage } from './useLocalStorage'

console.log(process.env.REACT_APP_API_URL)
const socket = io({
  path: process.env.REACT_APP_API_URL ? '/api/socket.io' : '/socket.io',
})

function App() {
  const [name, setName] = useLocalStorage<string>('player-name', '')

  useEffect(() => {
    if (name) socket.emit('join', name)
  }, [name])

  const handleJoin = (e: any) => {
    e.preventDefault()

    if (!e.target.name.value) return
    setName(e.target.name.value)
  }

  const handleScore = useCallback(
    (score: { time: number; gems: number }) => {
      socket.emit('message', { name, ...score })
    },
    [name],
  )

  return (
    <Wrapper>
      <Header></Header>
      <GameWrapper>
        {!name && (
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Section>
              <h2>START</h2>
              <p>Enter your name to begin playing:</p>
              <form style={{ display: 'flex' }} onSubmit={handleJoin}>
                <Input type="text" name="name"></Input>
                <Button type="submit">GO!</Button>
              </form>
            </Section>
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                opacity: 0.7,
              }}
            ></div>
          </div>
        )}
        <GameComponent
          onScore={handleScore}
          enabled={Boolean(name)}
          socket={socket}
        ></GameComponent>
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
  position: relative;
  max-width: 100%;
`

const Sections = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`

const Input = styled.input`
  border: none;
  border-radius: 0;
  border-bottom: 2px solid white;
  font-size: 2rem;
  font-family: 'Press Start 2P';
  background-color: transparent;
  color: white;
  max-width: 250px;
  margin-right: 16px;
`

const Button = styled.button`
  border: 2px solid white;
  border-radius: 0;
  background-color: transparent;
  color: white;
  font-size: 1.3rem;
  font-family: 'Press Start 2P';
  cursor: pointer;
  padding: 8px;
`

export default App
