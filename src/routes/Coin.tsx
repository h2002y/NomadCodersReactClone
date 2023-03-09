import styled from "styled-components";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Price from "./Price";
import Chart from "./Chart";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 56px;
`;

const Loader = styled.span`
  text-align: center;
  font-size: 48px;
  display: block;
`;

const InfoWrapper = styled.div`
  border-radius: 20px;
  margin: 20px 0px;
  padding: 10px;
  background-color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    padding: 5px;
    color: ${(props) => props.theme.bgColor};
  }

  span:nth-child(2) {
    font-size: 28px;
  }
`;

const Description = styled.div`
  margin: 20px 0px;
  padding: 20px 5px;
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: lighter;
  line-height: 1.5;
`;

interface IRouteParams {
  coinId: string;
}

interface IRouteState {
  state: {
    name: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

function Coin() {
  // useParams() URL에서 관심있는 정보를 잡아낼 수 있게 해줌
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const { state } = useLocation() as IRouteState;
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);
  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : loading ? "Loading..." : info?.name}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <InfoWrapper>
            <Info>
              <span>RANK</span>
              <span>{info?.rank}</span>
            </Info>
            <Info>
              <span>SYMBOL</span>
              <span>{info?.symbol}</span>
            </Info>
            <Info>
              <span>PRICE NOW</span>
              <span>${priceInfo ? Math.round(priceInfo.quotes.USD.price) : "Loading..."}</span>
            </Info>
          </InfoWrapper>
          <Description>{info?.description}</Description>
          <InfoWrapper>
            <Info>
              <span>TOTAL SUPPLY</span>
              <span>{priceInfo?.total_supply}</span>
            </Info>
            <Info>
              <span>MAX SUPPLY</span>
              <span>{priceInfo?.max_supply}</span>
            </Info>
          </InfoWrapper>
          <Routes>
            <Route path="price" element={<Price />} />
            <Route path="chart" element={<Chart />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
