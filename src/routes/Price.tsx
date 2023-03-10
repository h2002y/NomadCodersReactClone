import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

interface IPriceProps {
  coinId: string;
}

const Info = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  span {
    margin: 5px 20px;
    padding: 5px;
    color: ${(props) => props.theme.bgColor};
  }
  &:first-child{
    border-radius: 15px 15px 0px 0px;
  }
  &:nth-child(odd){
    background-color: ${(props) => props.theme.textColor};
  }
  &:nth-child(even){
    background-color: ${(props) => props.theme.accentColor};
  }
  &:last-child{
    border-radius: 0px 0px 15px 15px;
  }
  `;

const InfoWrapper = styled.ul`
  border-radius: 20px;
  background-color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

function Price({coinId} : IPriceProps) {
  const { state } = useLocation();
  console.log(state);
  return (
    <div>
      <Helmet>
        <title>{coinId}</title>
        <link
          rel="icon"
          type="image/png"
          href={`https://coinicons-api.vercel.app/api/icon/${state.symbol}`}
          sizes="16x16"
        ></link>
      </Helmet>
      <InfoWrapper>
        <Info>
          <span>Price Now : </span>
          <span>$ {parseFloat(state.priceData.quotes.USD.price).toFixed(3)}</span>
        </Info>
        <Info>
          <span>Rate 1Hr : </span>
          <span> {(state.priceData.quotes.USD.percent_change_1h)} %</span>
        </Info>
        <Info>
          <span>Rate 24Hr : </span>
          <span> {(state.priceData.quotes.USD.percent_change_24h)} %</span>
        </Info>
        <Info>
          <span>Highest $ : </span>
          <span>$$$ {parseFloat(state.priceData.quotes.USD.ath_price).toFixed(3)}</span>
        </Info>
        <Info>
          <span>Total $ 24Hr : </span>
          <span>$ {parseFloat(state.priceData.quotes.USD.volume_24h).toFixed(3)}</span>
        </Info>
        <Info>
          <span>Market Cap : </span>
          <span>$ {parseFloat(state.priceData.quotes.USD.market_cap)}</span>
        </Info>
      </InfoWrapper>
    </div>
  );
}

export default Price;
