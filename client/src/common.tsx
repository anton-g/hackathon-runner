import styled from 'styled-components/macro'

export const Section = styled.section`
  background-color: black;
  padding: 24px;
  width: max-content;
  color: white;
  margin-bottom: 16px;
  z-index: 2;

  > h2 {
    color: white;
    display: inline-block;
  }

  p {
    max-width: 550px;
    font-size: 12px;
    line-height: 1.4;

    > a {
      color: white;
    }
  }
`
