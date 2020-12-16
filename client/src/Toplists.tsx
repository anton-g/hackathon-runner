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

  useEffect(() => {
    fetch('/api/toplists')
      .then((r) => r.json())
      .then((r) => setToplists(r))
  }, [])

  return (
    <Section>
      <h2>TOP LISTS</h2>
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
