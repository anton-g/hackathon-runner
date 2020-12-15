import React from 'react'
import styled from 'styled-components/macro'

import GameComponent from './game/GameComponent'

function App() {
  return (
    <Wrapper>
      <Header>
        <HeaderTitle style={{ width: 'min-content' }}>
          HACKATHON RUNNER
        </HeaderTitle>
        <HeaderSubtitle>A DO + DEV hackathon project</HeaderSubtitle>
      </Header>
      <GameWrapper>
        <GameComponent></GameComponent>
      </GameWrapper>
      <Sections>
        <Section>
          <SectionTitle>INSTRUCTIONS</SectionTitle>
          <SectionText style={{ maxWidth: 350 }}>
            Get to the goal as fast as possible. Collect 1-5 gems for a tougher
            challenge.
          </SectionText>
          <Controls>
            <p>CONTROLS:</p>
            <Keys>
              <Key style={{ gridColumnStart: 2 }}>
                <span>
                  <Up></Up>
                </span>
              </Key>
              <Key style={{ gridColumnStart: 1 }}>
                <span>
                  <Left></Left>
                </span>
              </Key>
              <Key style={{ gridColumnStart: 3 }}>
                <span>
                  <Right></Right>
                </span>
              </Key>
            </Keys>
          </Controls>
        </Section>
        <Section>
          <SectionTitle>ABOUT</SectionTitle>
          <SectionText>
            HACKATHON RUNNER is a small platform game built with the game engine
            Phaser. It was created for DigitalOceans App Platform Hackathon on
            DEV (
            <Link href="https://dev.to/devteam/announcing-the-digitalocean-app-platform-hackathon-on-dev-2i1k">
              link
            </Link>
            ).
          </SectionText>
          <SectionText>
            The most technically exciting feature is probably the "ghosts" that
            you see when playing. They are real time representations of every
            other player that is active right now.
          </SectionText>
          <SectionText>
            The entire thing is also open source (
            <Link href="https://github.com/anton-g/hackathon-runner">link</Link>
            ) and some of the progress building this is documented on DEV (
            <Link href="https://dev.to">link</Link>).
          </SectionText>
        </Section>
      </Sections>
      <Section>
        <SectionTitle>TOP LISTS</SectionTitle>
        <TopLists>
          <TopList>
            <span>5 gems</span>
            <ol>
              <li>Anton - 00:00:01</li>
              <li>Anton - 00:00:01</li>
              <li>Anton - 00:00:01</li>
            </ol>
          </TopList>
          <TopList>
            <span>4 gems</span>
            <ol>
              <li>Anton - 00:00:01</li>
              <li>Anton - 00:00:01</li>
              <li>Anton - 00:00:01</li>
            </ol>
          </TopList>
          <TopList>
            <span>3 gems</span>
            <ol>
              <li>Anton - 00:00:01</li>
              <li>Anton - 00:00:01</li>
              <li>Anton - 00:00:01</li>
            </ol>
          </TopList>
          <TopList>
            <span>2 gems</span>
            <ol>
              <li>Anton - 00:00:01</li>
              <li>Anton - 00:00:01</li>
              <li>Anton - 00:00:01</li>
            </ol>
          </TopList>
          <TopList>
            <span>1 gems</span>
            <ol>
              <li>Anton - 00:00:01</li>
              <li>Anton - 00:00:01</li>
              <li>Anton - 00:00:01</li>
            </ol>
          </TopList>
          <TopList>
            <span>No gems</span>
            <ol>
              <li>Anton - 00:00:01</li>
              <li>Anton - 00:00:01</li>
              <li>Anton - 00:00:01</li>
            </ol>
          </TopList>
        </TopLists>
      </Section>
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

const Section = styled.section`
  background-color: black;
  padding: 24px;
  width: max-content;
  color: white;
  margin-bottom: 16px;
`

const Header = styled.header`
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

const SectionTitle = styled.h2`
  color: white;
  display: inline-block;
`

const SectionText = styled.p`
  max-width: 550px;
  font-size: 12px;
  line-height: 1.4;
`

const Link = styled.a`
  color: white;
`

const HeaderSubtitle = styled.span`
  color: white;
  font-size: 10px;
`

const Controls = styled.div`
  display: flex;
  flex-direction: column;
`

const Arrow = styled.i`
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
`

const Up = styled(Arrow)`
  transform: rotate(-135deg);
`

const Left = styled(Arrow)`
  transform: rotate(135deg);
`

const Right = styled(Arrow)`
  transform: rotate(-45deg);
`

const Key = styled.div`
  width: 35px;
  height: 37px;
  padding: 1px;

  span {
    display: block;
    width: 35px;
    height: 35px;
    border: 1px solid #a9a9a9;
    border-radius: 2px 2px 2px 2px;
    -moz-border-radius: 2px 2px 2px 2px;
    -webkit-border-radius: 2px 2px 2px 2px;
    font-size: 12px;
    -moz-box-sizing: border-box !important;
    -webkit-box-sizing: border-box !important;
    box-sizing: border-box !important;
    text-align: center;
    padding-top: 10px;
    color: white;
    box-shadow: 0px 6px 0px -2px rgba(0, 0, 0, 1),
      0px 5px 0px 0px rgba(169, 169, 169, 1);
    cursor: pointer;
  }
`

const Keys = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 4px;
  width: min-content;
  height: min-content;
`

const TopLists = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  max-width: 600px;
  justify-content: space-evenly;
`

const TopList = styled.div`
  > ol {
    margin-bottom: 24px;

    > li {
      font-size: 12px;
      margin-bottom: 8px;
    }
  }
`

export default App
