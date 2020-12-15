import { Section } from './common'

export function About() {
  return (
    <Section>
      <h2>ABOUT</h2>
      <p>
        HACKATHON RUNNER is a small platform game built with the game engine
        Phaser. It was created for DigitalOceans App Platform Hackathon on DEV (
        <a href="https://dev.to/devteam/announcing-the-digitalocean-app-platform-hackathon-on-dev-2i1k">
          link
        </a>
        ).
      </p>
      <p>
        The most technically exciting feature is probably the "ghosts" that you
        see when playing. They are real time representations of every other
        player that is active right now.
      </p>
      <p>
        The entire thing is also open source (
        <a href="https://github.com/anton-g/hackathon-runner">link</a>) and some
        of the progress building this is documented on DEV (
        <a href="https://dev.to">link</a>).
      </p>
    </Section>
  )
}
