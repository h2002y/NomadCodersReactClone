import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

interface IRouteState {
  state: {
    coinId: string;
    symbol: string;
  };
}

function Price() {
  const { state } = useLocation() as IRouteState;
  return (
    <div>
      <Helmet>
        <title>{state.coinId}</title>
        <link
          rel="icon"
          type="image/png"
          href={`https://coinicons-api.vercel.app/api/icon/${state.symbol}`}
          sizes="16x16"
        ></link>
      </Helmet>
      <h1>Price</h1>
    </div>
  );
}

export default Price;
