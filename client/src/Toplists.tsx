import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { Section } from './common'
import { msToTime } from './utils'

type ToplistType = { name: string; time: number }[]

type ToplistsType = {
  zero: ToplistType
  one: ToplistType
  two: ToplistType
  three: ToplistType
  four: ToplistType
  five: ToplistType
}

export function Toplists() {
  const [toplists, setToplists] = useState<ToplistsType | null>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL ?? '/api'}/toplists`)
      .then((r) => r.json())
      .then((r) => setToplists(r))
  }, [])

  const refresh = () => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_API_URL ?? '/api'}/toplists`)
      .then((r) => r.json())
      .then((r) => setToplists(r))

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  return (
    <Section>
      <TitleBar>
        <Title>TOP LISTS</Title>
        <Button disabled={loading} onClick={refresh}>
          Refresh
        </Button>
      </TitleBar>
      <ListOfToplists>
        <TopList>
          <span>5 gems</span>
          <ol>
            {toplists?.five.map((x, idx) => (
              <li key={idx}>
                <PlayerName>{x.name}</PlayerName> <span>-</span>{' '}
                {msToTime(x.time)}
              </li>
            ))}
          </ol>
        </TopList>
        <TopList>
          <span>4 gems</span>
          <ol>
            {toplists?.four.map((x, idx) => (
              <li key={idx}>
                <PlayerName>{x.name}</PlayerName> <span>-</span>{' '}
                {msToTime(x.time)}
              </li>
            ))}
          </ol>
        </TopList>
        <TopList>
          <span>3 gems</span>
          <ol>
            {toplists?.three.map((x, idx) => (
              <li key={idx}>
                <PlayerName>{x.name}</PlayerName> <span>-</span>{' '}
                {msToTime(x.time)}
              </li>
            ))}
          </ol>
        </TopList>
        <TopList>
          <span>2 gems</span>
          <ol>
            {toplists?.two.map((x, idx) => (
              <li key={idx}>
                <PlayerName>{x.name}</PlayerName> <span>-</span>{' '}
                {msToTime(x.time)}
              </li>
            ))}
          </ol>
        </TopList>
        <TopList>
          <span>1 gems</span>
          <ol>
            {toplists?.one.map((x, idx) => (
              <li key={idx}>
                <PlayerName>{x.name}</PlayerName> <span>-</span>{' '}
                {msToTime(x.time)}
              </li>
            ))}
          </ol>
        </TopList>
        <TopList>
          <span>No gems</span>
          <ol>
            {toplists?.zero.map((x, idx) => (
              <li key={idx}>
                <PlayerName>{x.name}</PlayerName> <span>-</span>{' '}
                {msToTime(x.time)}
              </li>
            ))}
          </ol>
        </TopList>
      </ListOfToplists>
    </Section>
  )
}

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Title = styled.h2`
  display: inline-block;
`

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  font-family: 'Press Start 2P';
  cursor: pointer;
  padding: 4px;

  &:disabled {
    opacity: 0.5;
  }
`

const ListOfToplists = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  max-width: 700px;
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

const PlayerName = styled.span`
  width: 130px;
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
`
