import styled from 'styled-components/macro'
import { Section } from './common'

export function Instructions() {
  return (
    <Section>
      <h2>INSTRUCTIONS</h2>
      <p style={{ maxWidth: 350 }}>
        Get to the goal as fast as possible. Collect 1-5 gems for a tougher
        challenge.
      </p>
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
          <Key style={{ gridColumnStart: 4 }}>
            <span>
              <Right></Right>
            </span>
          </Key>
          <Key style={{ gridColumnStart: 6 }}>
            <span>R</span>
          </Key>
          <p
            style={{
              gridColumnStart: 1,
              gridColumnEnd: 5,
              textAlign: 'center',
              margin: 0,
              width: '100%',
            }}
          >
            Move
          </p>
          <p
            style={{
              gridColumnStart: 6,
              textAlign: 'center',
              margin: 0,
              width: '100%',
            }}
          >
            Restart
          </p>
        </Keys>
      </Controls>
    </Section>
  )
}

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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 4px;
  width: min-content;
  height: min-content;
  align-items: center;
  justify-items: center;
`
