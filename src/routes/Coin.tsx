import styled from "styled-components";
import { Link, Route, Routes, useLocation, useMatch, useParams } from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  margin-top: 20px;
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
  font-weight: 600;
  line-height: 1.5;
`;

const Home = styled.div`
  margin-left: 50px;
  margin-top: 10px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.accentColor};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.bgColor};
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  background-color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  padding: 10px 0px;
  border-radius: 15px;
  a {
    display: block;
  }
`;
type IRouteParams = {
  coinId: string;
};

interface IRouteState {
  state: {
    name: string;
    symbol: string;
    priceData: IPriceData;
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
  const { coinId } = useParams() as IRouteParams;
  const { state } = useLocation() as IRouteState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["info", coinId], () =>
    fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>{coinId}</title>
        <link
          rel="icon"
          type="image/png"
          href={`https://coinicons-api.vercel.app/api/icon/${state.symbol}`}
          sizes="16x16"
        ></link>
      </Helmet>
      <Header>
        <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
        <Link to="/">
          <Home>
            <FontAwesomeIcon icon={faHouse} />
          </Home>
        </Link>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <InfoWrapper>
            <Info>
              <span>RANK</span>
              <span>{infoData?.rank}</span>
            </Info>
            <Info>
              <span>SYMBOL</span>
              <span>{infoData?.symbol}</span>
            </Info>
            <Info>
              <span>PRICE NOW</span>
              <span>${tickersData ? Math.round(tickersData.quotes.USD.price) : "Loading..."}</span>
            </Info>
          </InfoWrapper>
          <Description>{infoData?.description}</Description>
          <InfoWrapper>
            <Info>
              <span>TOTAL SUPPLY</span>
              <span>{tickersData?.total_supply}</span>
            </Info>
            <Info>
              <span>MAX SUPPLY</span>
              <span>{tickersData?.max_supply}</span>
            </Info>
          </InfoWrapper>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`} state={{ symbol: state.symbol }}>
                Chart
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`} state={{ symbol: state.symbol, priceData: tickersData }}>
                Price
              </Link>
            </Tab>
          </Tabs>
          <Routes>
            <Route path="price" element={<Price coinId={coinId} />} />
            <Route path="chart" element={<Chart coinId={coinId} />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
