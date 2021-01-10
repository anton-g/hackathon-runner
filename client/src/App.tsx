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

const socket = io(process.env.REACT_APP_API_URL ?? '/')

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent,
)

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
      {isMobile && (
        <MobileWarning>
          It looks like you might be on a mobile device and the game requires a
          keyboard to play but you can still watch other people run around.
        </MobileWarning>
      )}
      <GameWrapper>
        {!name && !isMobile && (
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

const MobileWarning = styled.p`
  font-size: 8px;
  background-color: black;
  color: white;
  padding: 8px;
  line-height: 1.3;
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
  max-width: 100%;
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
