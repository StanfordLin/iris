import React  from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import { UserIcon } from '../components/Wallet'
import Share from '../assets/Share'
import Heart from '../assets/Heart'
import Comment from '../assets/Comment'
import Retweet from '../assets/Retweet'

export const StyledLink = styled(Link)`
    text-decoration: none;
    font-weight: 600;
    color: black;
    transition: all 50ms ease-in-out;
    border-bottom: 1px solid transparent;
    &:hover{
        border-bottom: 2px solid ${p=>p.theme.primary};
        color: ${p=>p.theme.primary};
    }
`

const Icon = styled(UserIcon)`
    display: inline-block;
    width: 3em;
    height: 3em;
`

const Container = styled.div`
    display: flex;
    gap: 10px;
`

const Actions = styled.div`
    margin-top: 1em;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    width: 400px;
`

const Content = styled.div`
    padding-top: 4px;
`

const StyledCard = styled(Card)`
    margin-bottom: 1em;
`

function Post({ post }) {

    console.log("POST DATA", post)
    return (
        <StyledCard>
            <Container>
                <Link to={`/user/${post.profile.handle}`}>
                    <Icon link={true} />
                </Link>
                <Content>
                    <StyledLink to={`/user/${post.profile.handle}`}>
                        <b>@{post.profile.handle}</b>
                    </StyledLink>
                    <p>{post.metadata.description}</p>
                    <Actions>
                        <Comment/>
                        <Retweet/>
                        <Heart/>
                        <Share/>
                    </Actions>
                </Content>
            </Container>
        </StyledCard>
    );
  }

export default Post