import styled from 'styled-components'

interface LabelProps {
    readonly alignment: string;
  }

  interface ButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }


const Layout = styled.div`
width: 710px;
height: 476px;
left: 365px;
top: 313px;
background: linear-gradient(180deg, #10171D 0.01%, #07020D 21.88%, #2BC69D 100%);
border-radius: 30px;
`
const Title = styled.h3`
font-style: normal;
font-weight: 900;
font-size: 26px;
line-height: 32px;
color: #FFF4F4;`

const InfoDiv = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
justify-content: space-between;
width: 450px;
height: 60px;
background: #FFFFFF;
border: 1px solid #000000;
margin: 50px auto;
padding: 10px;
border-radius: 30px;
`

const Label = styled.span<LabelProps>`
font-family: Montserrat;
font-size: 26px;
line-height: 32px;
color: #000000;
text-align: ${props => props.alignment};
}
`

const Button = styled.button<ButtonProps>`
background: #FFFFFF;
border-radius: 30px;
width: 456px;
height: 56px;
`

const Swap = () => {
    return (
        <Layout>
            <Title>Swap</Title>
            <InfoDiv>
                <Label alignment='left'>ETH</Label>    
                <Label alignment='right'>0.051154326730685478</Label>    
            </InfoDiv>
            <InfoDiv><Label alignment='left'>DAI</Label><Label alignment='right'>158 USD</Label></InfoDiv>
            <Button onClick={()=>console.log('clicked')}> <Label alignment='center'>Swap</Label> </Button>
        </Layout>
    )
}

export default Swap
