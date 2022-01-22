// Libraries
import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"

// Assets
import dappnode from "../assets/run-a-node/dappnode.svg"
import dapptap from "../assets/run-a-node/dapptap.svg"
import terminal from "../assets/run-a-node/terminal.svg"
import decentralizationGlyph from "../assets/run-a-node/decentralization-glyph.svg"
import sovereigntyGlyph from "../assets/run-a-node/sovereignty-glyph.svg"
import privacyGlyph from "../assets/run-a-node/privacy-glyph.svg"
import megaphoneGlyph from "../assets/run-a-node/megaphone-glyph.svg"
import voteGlyph from "../assets/run-a-node/vote-glyph.svg"
import earthGlyph from "../assets/run-a-node/earth-glyph.svg"
import plugAndPlayGlyph from "../assets/run-a-node/plug-and-play-glyph.svg"
import downloadGlyph from "../assets/run-a-node/download-glyph.svg"
import hardwareGlyph from "../assets/run-a-node/hardware-glyph.svg"

// Components
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import {
  Content,
  Divider,
  Page,
  CardGrid,
} from "../components/SharedStyledComponents"
import ExpandableCard from "../components/ExpandableCard"
import ExpandableInfo from "../components/ExpandableInfo"
import Emoji from "../components/Emoji"
import Link from "../components/Link"
import ButtonLink from "../components/ButtonLink"
import FeedbackCard from "../components/FeedbackCard"
import Icon from "../components/Icon"
import NakedButton from "../components/NakedButton"

// Utils
import { translateMessageId } from "../utils/translations"

// Styles
const GappedPage = styled(Page)`
  gap: 4rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    gap: 3rem;
  }
  * {
    scroll-margin-top: 5.5rem;
  }
`

const GappedContent = styled(Content)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 1rem 4rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    gap: 2rem;
    padding: 1rem 2rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    padding: 1rem 0;
  }
`

const HeroContainer = styled.div`
  background: ${({ theme }) => theme.colors.runNodeGradient};
  width: 100%;
`

const Hero = styled(PageHero)`
  padding-bottom: 2rem;
`

const TwoColumnContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0rem;
    margin-right: 0rem;
  }
`

const StyledTwoColumnContent = styled(TwoColumnContent)`
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    flex-direction: row;
    align-items: center;
    /* margin-left: 0rem;
    margin-right: 0rem; */
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    flex-direction: column;
    align-items: center;
  }
`

const SplitContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    width: 100%;
    flex-direction: column-reverse;
  }
`

const Column = styled.div`
  flex: 1;
`

const ResponsiveButtonLink = styled(ButtonLink)`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: fit-content;
  padding-left: 2rem;
  padding-right: 2rem;

  &:hover {
    svg {
      fill: ${({ theme }) => theme.colors.buttonColor};
      transform: scale(1.15);
      transition: 0.1s;
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    width: 100%;
    justify-content: center;
  }
`

const Highlight = styled(Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
  border: 1px solid #dadada;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 2rem 6rem;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  isolation: isolate;
  img {
    margin: 0 0 0 2rem;
  }
  &:nth-of-type(even) {
    flex-direction: row-reverse;
    img {
      margin: 0 2rem 0 0;
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    padding: 2rem;
    flex-direction: column-reverse;
    &:nth-of-type(even) {
      flex-direction: column-reverse;
      img {
        margin: 0 0 2rem;
      }
    }
    img {
      margin: 0 0 2rem;
    }
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: inherit;
    filter: blur(1rem);
  }
`

const SoftwareHighlight = styled(Highlight)``

const StyledExpandableInfo = styled(ExpandableInfo)`
  width: 90%;
  align-self: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    margin: 0;
    width: 100%;
  }
`

const InfoGrid = styled(CardGrid)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
  gap: 1rem 2rem;
  & > div {
    height: fit-content;
    &:hover {
      transition: 0.1s;
      transform: scale(1.01);
      img {
        transition: 0.1s;
        transform: scale(1.1);
      }
    }
  }
`

const ColumnFill = styled.div`
  line-height: 2;
  box-sizing: border-box;
  flex: 1;
  ul {
    list-style: none;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    width: 100%;
  }
`

const ColumnNarrow = styled.div`
  box-sizing: border-box;
  display: flex;
  inset: auto;
  justify-content: center;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    width: 100%;
  }
`

const PlugIcon = styled(ColumnNarrow)`
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    width: fit-content;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    width: 100%;
  }
`

const Width60 = styled.div`
  flex: 3;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    width: 100%;
  }
`

const Width40 = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-self: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    width: 100%;
  }
`

const FlexContent = styled(Content)`
  display: flex;
  flex-direction: column;
`

const Flex = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const MarginFlex = styled(Flex)`
  margin: 3rem 0;
`

const Container = styled.div`
  background: ${({ theme }) => theme.colors.grayBackground};
  border: 1px solid #d1d1d1;
  box-sizing: border-box;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.text};
  padding: 0 2rem;
`

const BuildBox = styled(Container)`
  background: ${({ theme }) => theme.colors.preBackground};
  flex: 1;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const FullyLoaded = styled(Container)`
  display: flex;
  flex-direction: column;
  line-height: 200%;
  padding: 2rem;
  p {
    font-size: 110%;
  }
  code {
    font-weight: 600;
    line-height: 125%;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    button {
      width: fit-content;
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    button {
      width: 100%;
    }
  }
  &:hover {
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const SvgTitle = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const DappNodeButtonLink = styled(ResponsiveButtonLink)`
  background-color: #187d76;
  span {
    color: ${({ theme }) => theme.colors.white};
  }
  &:hover {
    background-color: #0f5f5f;
    box-shadow: 4px 4px 0 0 #187d7677;
  }
`

const DappNodeSetupButtonContainer = styled(ButtonContainer)`
  align-self: center;
  margin-top: auto;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    align-self: flex-start;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    width: 100%;
  }
`

const AvadoButtonLink = styled(ResponsiveButtonLink)`
  background-color: #37822e;
  span {
    color: ${({ theme }) => theme.colors.white};
  }
  &:hover {
    background-color: #2e6d2e;
    box-shadow: 4px 4px 0 0 #37822e77;
  }
`

const StyledEmoji = styled(Emoji)`
  margin-right: 1rem;
`

const ScrollLink = styled(NakedButton)`
  text-align: start;
  color: ${({ theme }) => theme.colors.primary};
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const CenteredContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  * {
    text-align: center;
    line-height: 200%;
  }
`

const HardwareContainer = styled(Container)`
  flex: 3;
  padding: 2rem;
`

const SoftwareContainer = styled(FullyLoaded)`
  flex: 1;
`

const ScrollButtonSecondary = styled.button`
  text-decoration: none;
  display: inline-block;
  padding: 0.5rem 2rem;
  margin-top: 1rem;
  font-size: 1rem;
  border-radius: 0.25em;
  text-align: center;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.text};
  background-color: transparent;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.colors.cardBoxShadow};
  }
  &:active {
    background-color: ${({ theme }) =>
      theme.colors.secondaryButtonBackgroundActive};
  }
  &:hover {
    transition: transform 0.1s;
    transform: scale(1.05);
  }
`

const DiscordIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.buttonColor};
`

const StakingCalloutContainer = styled(SplitContent)`
  background: linear-gradient(
    262.78deg,
    rgba(152, 186, 249, 0.25) 0%,
    rgba(207, 177, 251, 0.25) 53.12%,
    rgba(151, 252, 246, 0.25) 100%
  );
  width: 100%;
  padding: 2rem;
  gap: 5rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column;
    gap: 3rem;
  }
`

const Leslie = styled(GatsbyImage)`
  transform: scaleX(-1) scale(1.15) translateX(2rem);
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    transform: scaleX(-1) translateY(-3rem);
  }
`

const StyledFeedbackCard = styled(FeedbackCard)`
  width: 100%;
  max-width: 700px;
  margin: 0 2rem;
`

const RunANodePage = ({ data }) => {
  const intl = useIntl()
  const heroContent = {
    title: <Translation id="page-run-a-node-title" />,
    header: <Translation id="page-run-a-node-hero-header" />,
    subtitle: <Translation id="page-run-a-node-hero-subtitle" />,
    image: getImage(data.ethereumInside),
    alt: <Translation id="page-run-a-node-hero-alt" />,
    buttons: [
      {
        content: "Learn more",
        pathId: "what-is-a-node",
      },
      {
        content: "Let's dive in!",
        pathId: "getting-started",
        isSecondary: "isSecondary",
      },
    ],
  }

  const whyRunANodeCards = [
    {
      image: privacyGlyph,
      title: "page-run-a-node-privacy-title",
      preview: "page-run-a-node-privacy-preview",
      body: [
        "page-run-a-node-privacy-1",
        "page-run-a-node-privacy-2",
        "page-run-a-node-privacy-3",
      ],
    },
    {
      image: megaphoneGlyph,
      title: "page-run-a-node-censorship-resistance-title",
      preview: "page-run-a-node-censorship-resistance-preview",
      body: [
        "page-run-a-node-censorship-resistance-1",
        "page-run-a-node-censorship-resistance-2",
      ],
    },
    {
      image: earthGlyph,
      title: "page-run-a-node-participate-title",
      preview: "page-run-a-node-participate-preview",
      body: ["page-run-a-node-participate-1", "page-run-a-node-participate-2"],
    },
    {
      image: decentralizationGlyph,
      title: "page-run-a-node-decentralized-title",
      preview: "page-run-a-node-decentralized-preview",
      body: [
        "page-run-a-node-decentralized-1",
        "page-run-a-node-decentralized-2",
      ],
    },
    {
      image: voteGlyph,
      title: "page-run-a-node-voice-your-choice-title",
      preview: "page-run-a-node-voice-your-choice-preview",
      body: [
        "page-run-a-node-voice-your-choice-1",
        "page-run-a-node-voice-your-choice-2",
      ],
    },
    {
      image: sovereigntyGlyph,
      title: "page-run-a-node-sovereignty-title",
      preview: "page-run-a-node-sovereignty-preview",
      body: ["page-run-a-node-sovereignty-1", "page-run-a-node-sovereignty-2"],
    },
  ]

  const scrollToId = (id) => {
    const element = document.getElementById(id)
    if (!element) return
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <GappedPage>
      <PageMetadata
        title={translateMessageId("page-run-a-node-title", intl)}
        description={translateMessageId(
          "page-run-a-node-meta-description",
          intl
        )}
      />
      <HeroContainer>
        <Hero content={heroContent} isReverse />
      </HeroContainer>

      <Content id="what-is-a-node">
        <TwoColumnContent>
          <Width60>
            <h2>
              <Translation id="page-run-a-node-what-title" />
            </h2>
            <h3>
              <Translation id="page-run-a-node-what-1-subtitle" />
            </h3>
            <p>
              <Translation id="page-run-a-node-what-1-text" />
            </p>
            <h3>
              <Translation id="page-run-a-node-what-2-subtitle" />
            </h3>
            <p>
              <Translation id="page-run-a-node-what-2-text" />
            </p>
            <h3>
              <Translation id="page-run-a-node-what-3-subtitle" />
            </h3>
            <p>
              <Translation id="page-run-a-node-what-3-text" />
            </p>
          </Width60>
          <Width40>
            <GatsbyImage image={getImage(data.hackathon)} />
          </Width40>
        </TwoColumnContent>
      </Content>

      <FlexContent>
        <StyledExpandableInfo
          image={getImage(data.impact)}
          title={<Translation id="page-run-a-node-who-title" />}
          contentPreview={<Translation id="page-run-a-node-who-preview" />}
          background="runNodeGradient2"
          forceOpen
        >
          <p>
            <Translation id="page-run-a-node-who-copy-1" />
          </p>
          <p>
            <Translation id="page-run-a-node-who-copy-2" />
          </p>
          <p>
            <Translation id="page-run-a-node-who-copy-3" />
          </p>
          <h3>
            <Translation id="page-run-a-node-who-copy-bold" />
          </h3>
        </StyledExpandableInfo>
      </FlexContent>

      <Content>
        <h2>
          <Translation id="page-run-a-node-why-title" />
        </h2>
        <InfoGrid>
          {whyRunANodeCards.map(({ image, title, preview, body }, idx) => (
            <ExpandableCard
              contentPreview={<Translation id={preview} />}
              title={<Translation id={title} />}
              svg={image}
              key={idx}
            >
              {body.map((item, idx) => (
                <p key={idx}>{<Translation id={item} />}</p>
              ))}
            </ExpandableCard>
          ))}
        </InfoGrid>
      </Content>

      <Divider />

      <Content id="getting-started">
        <h2>Getting started</h2>
        <GappedContent>
          <SoftwareHighlight backgroundColor="homeBoxTurquoise">
            <ColumnFill>
              <p>
                <Translation id="page-run-a-node-getting-started-software-section-1" />
              </p>
              <p>
                <code>
                  <StyledEmoji text=":warning:" size={1} />
                  <Translation id="page-run-a-node-getting-started-software-section-1-alert" />
                </code>
              </p>
              <Link to="/developers/docs/nodes-and-clients/run-a-node/#spinning-up-node">
                <Translation id="page-run-a-node-getting-started-software-section-1-link" />
              </Link>
            </ColumnFill>
            <ColumnNarrow>
              <img
                src={terminal}
                alt={translateMessageId(
                  "page-run-a-node-glyph-alt-terminal",
                  intl
                )}
              />
            </ColumnNarrow>
          </SoftwareHighlight>

          <SoftwareHighlight backgroundColor="homeBoxOrange">
            <ColumnFill>
              <p>
                Now we have DAppNode, which is{" "}
                <b>free and open-source software</b> that gives users an{" "}
                <b>app-like experience</b> while managing their node.
              </p>
            </ColumnFill>
            <ColumnNarrow>
              <img
                src={dappnode}
                alt={translateMessageId(
                  "page-run-a-node-glyph-alt-dappnode",
                  intl
                )}
              />
            </ColumnNarrow>
          </SoftwareHighlight>

          <SoftwareHighlight backgroundColor="homeBoxPurple">
            <ColumnFill>
              <p>In just a few taps you can have your node up and running.</p>
              <p>
                DAppNode makes it easy for users to run full nodes, as well as
                dapps and other P2P networks, with no need to touch the
                command-line. This makes it easier for everyone to participate
                and create a more decentralized network.
              </p>
            </ColumnFill>
            <ColumnNarrow>
              <img
                src={dapptap}
                alt={translateMessageId(
                  "page-run-a-node-glyph-alt-phone",
                  intl
                )}
              />
            </ColumnNarrow>
          </SoftwareHighlight>
        </GappedContent>
      </Content>

      <Content>
        <h2>Choose your adventure</h2>
        <p>
          <Translation id="page-run-a-node-getting-started-hardware-1" />
        </p>
        <p>
          <Translation id="page-run-a-node-getting-started-hardware-2" />
        </p>
        <MarginFlex>
          <FullyLoaded>
            <div>
              <h3>
                <StyledEmoji text=":shopping_cart:" size={2} />
                <Translation id="page-run-a-node-buy-fully-loaded-title" />
              </h3>
              <p>
                <Translation id="page-run-a-node-buy-fully-loaded-description" />
              </p>
              <ul>
                <li>
                  <Translation id="page-run-a-node-buy-fully-loaded-note-1" />
                </li>
                <li>
                  <Translation id="page-run-a-node-buy-fully-loaded-note-2" />
                </li>
                <li>
                  <code>
                    <Translation id="page-run-a-node-buy-fully-loaded-note-3" />
                  </code>
                </li>
              </ul>
              <StyledTwoColumnContent>
                <PlugIcon>
                  <img
                    src={plugAndPlayGlyph}
                    alt={translateMessageId(
                      "page-run-a-node-glyph-alt-pnp",
                      intl
                    )}
                  />
                </PlugIcon>
                <ColumnFill>
                  <Translation id="page-run-a-node-plug-and-play-1" />
                </ColumnFill>
              </StyledTwoColumnContent>
            </div>
            <ButtonContainer>
              <DappNodeButtonLink to="https://shop.dappnode.io/">
                <Translation id="page-run-a-node-shop-dappnode" />
              </DappNodeButtonLink>
              <AvadoButtonLink to="https://ava.do/">
                <Translation id="page-run-a-node-shop-avado" />
              </AvadoButtonLink>
            </ButtonContainer>
          </FullyLoaded>

          <CenteredContainer>
            <h3>
              <StyledEmoji text=":building_construction:" size={2} />
              Build your own
            </h3>
            <p>A good (and cheaper) option for slightly more technical users</p>
            <ScrollButtonSecondary
              onClick={() => scrollToId("build-your-own")}
              isSecondary
            >
              Start building
            </ScrollButtonSecondary>
          </CenteredContainer>
        </MarginFlex>
      </Content>
      <Content id="build-your-own">
        <h2>Build your own</h2>
        <MarginFlex>
          <HardwareContainer>
            <SvgTitle>
              <img src={hardwareGlyph} alt="Hardware glyph" />
              <h3>Hardware</h3>
            </SvgTitle>

            <Flex>
              <BuildBox>
                <h4>
                  <Translation id="page-run-a-node-build-your-own-minimum-specs" />
                </h4>
                <ul>
                  <li>
                    <p>
                      <Translation id="page-run-a-node-build-your-own-min-ram" />
                    </p>
                    <p>
                      <ScrollLink onClick={() => scrollToId("plan-on-staking")}>
                        <Translation id="page-run-a-node-build-your-own-ram-note-1" />
                      </ScrollLink>
                    </p>
                    <p>
                      <ScrollLink onClick={() => scrollToId("rasp-pi")}>
                        <Translation id="page-run-a-node-build-your-own-ram-note-2" />
                      </ScrollLink>
                    </p>
                  </li>
                  <li>
                    <p>
                      <Translation id="page-run-a-node-build-your-own-min-ssd" />
                    </p>
                    <p>
                      <small>
                        <em>
                          <Translation id="page-run-a-node-build-your-own-ssd-note" />
                        </em>
                      </small>
                    </p>
                  </li>
                </ul>
              </BuildBox>

              <BuildBox>
                <h4>
                  <Translation id="page-run-a-node-build-your-own-recommended" />
                </h4>
                <ul>
                  <li>
                    <Translation id="page-run-a-node-build-your-own-nuc" />
                    <p>
                      <small>
                        <Translation id="page-run-a-node-build-your-own-nuc-small" />
                      </small>
                    </p>
                  </li>
                  <li>
                    <Translation id="page-run-a-node-build-your-own-connection" />
                    <p>
                      <small>
                        <Translation id="page-run-a-node-build-your-own-connection-small" />
                      </small>
                    </p>
                  </li>
                  <li>
                    <Translation id="page-run-a-node-build-your-own-peripherals" />
                    <p>
                      <small>
                        <Translation id="page-run-a-node-build-your-own-peripherals-small" />
                      </small>
                    </p>
                  </li>
                </ul>
              </BuildBox>
            </Flex>
          </HardwareContainer>

          <SoftwareContainer>
            <SvgTitle>
              <img src={downloadGlyph} alt="Download glyph" />
              <h3>Software</h3>
            </SvgTitle>
            <p>
              When you're ready with your hardware, DAppNode can be downloaded
              from any computer and installed onto a fresh SSD via a USB drive.
            </p>
            <DappNodeSetupButtonContainer>
              <DappNodeButtonLink to="https://docs.dappnode.io">
                <Translation id="page-run-a-node-dappnode-setup" />
              </DappNodeButtonLink>
            </DappNodeSetupButtonContainer>
          </SoftwareContainer>
        </MarginFlex>
      </Content>

      <Content>
        <SplitContent>
          <Column>
            <h2>
              <Translation id="page-run-a-node-community-title" />
            </h2>
            <p>
              <Translation id="page-run-a-node-community-description" />
            </p>
            <ButtonContainer>
              <ResponsiveButtonLink to="https://discord.gg/c28an8dA5k">
                <DiscordIcon name="discord" />
                <Translation id="page-run-a-node-community-link" />
              </ResponsiveButtonLink>
            </ButtonContainer>
          </Column>
          <Column>
            <GatsbyImage image={getImage(data.community)} />
          </Column>
        </SplitContent>
      </Content>

      <Content>
        <h2>
          <Translation id="page-run-a-node-further-reading-title" />
        </h2>
        <ul>
          <li>
            <Link to="https://github.com/ethereumbook/ethereumbook/blob/develop/03clients.asciidoc#should-i-run-a-full-node">
              <Translation id="page-run-a-node-further-reading-1-link" />
            </Link>{" "}
            -{" "}
            <i>
              <Translation id="page-run-a-node-further-reading-1-author" />
            </i>
          </li>
          <li>
            <Link to="https://ethereum-on-arm-documentation.readthedocs.io/en/latest/">
              <Translation id="page-run-a-node-further-reading-2-link" />
            </Link>
          </li>
          <li>
            <Link to="https://vitalik.ca/general/2021/05/23/scaling.html">
              <Translation id="page-run-a-node-further-reading-3-link" />
            </Link>{" "}
            -{" "}
            <i>
              <Translation id="page-run-a-node-further-reading-3-author" />
            </i>
          </li>
        </ul>
      </Content>

      <Divider />

      <StakingCalloutContainer>
        <Column>
          <Leslie image={getImage(data.leslie)} />
        </Column>
        <Column>
          <h2>
            <Translation id="page-run-a-node-staking-title" />
          </h2>
          <p>
            <Translation id="page-run-a-node-staking-description" />
          </p>
          <ButtonContainer>
            <ResponsiveButtonLink to="/eth2/staking">
              <Translation id="page-run-a-node-staking-link" />
            </ResponsiveButtonLink>
          </ButtonContainer>
        </Column>
      </StakingCalloutContainer>
      <Content>
        <h3 id="plan-on-staking">
          <StyledEmoji text=":cut_of_meat:" size={2} />
          <Translation id="page-run-a-node-staking-plans-title" />
        </h3>
        <p>
          <Translation id="page-run-a-node-staking-plans-description" />
        </p>
        <p>
          <Link to="https://cpubenchmark.net">cpubenchmark.net</Link>
        </p>
        <h3 id="rasp-pi">
          <StyledEmoji text=":pie:" size={2} />
          <Translation id="page-run-a-node-rasp-pi-title" />
        </h3>
        <p>
          <Translation id="page-run-a-node-rasp-pi-description" />
        </p>
        <ul>
          <li>
            <Link to="https://docs.dappnode.io/get-started/installation/arm-hardware/installation">
              <Translation id="page-run-a-node-rasp-pi-note-1-link" />
            </Link>{" "}
            -{" "}
            <i>
              <Translation id="page-run-a-node-rasp-pi-note-1-description" />
            </i>
          </li>
          <li>
            <Link to="https://ethereum-on-arm-documentation.readthedocs.io/en/latest">
              <Translation id="page-run-a-node-rasp-pi-note-2-link" />
            </Link>{" "}
            -{" "}
            <i>
              <Translation id="page-run-a-node-rasp-pi-note-2-description" />
            </i>
          </li>
          <li>
            <Link to="/developers/tutorials/run-node-raspberry-pi">
              <Translation id="page-run-a-node-rasp-pi-note-3-link" />
            </Link>{" "}
            -{" "}
            <i>
              <Translation id="page-run-a-node-rasp-pi-note-3-description" />
            </i>
          </li>
        </ul>
      </Content>
      <StyledFeedbackCard
        prompt={translateMessageId("page-run-a-node-feedback-prompt", intl)}
      />
    </GappedPage>
  )
}

export default RunANodePage

export const query = graphql`
  query {
    ethereumInside: file(
      relativePath: { eq: "run-a-node/ethereum-inside.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    hackathon: file(relativePath: { eq: "hackathon_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    impact: file(relativePath: { eq: "impact_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 300
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    community: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    leslie: file(relativePath: { eq: "eth2/eth2_rhino.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
