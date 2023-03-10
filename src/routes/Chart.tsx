import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface IRouteState {
  state: {
    symbol: string;
  };
}

type Candle = {
  x: string;
  y: number[];
};

function Chart({ coinId }: ChartProps) {
  const { state } = useLocation() as IRouteState;
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
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
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              data: data?.map((price) => ({
                x: new Date(parseInt(price.time_close) * 1000).getDate().toString(),
                y: Array.of(price.open, price.high, price.low, price.close) as number[],
              })) as Candle[],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#b3cee5",
                  downward: "#f8aba9",
                },
              },
            },
            chart: {
              toolbar: {
                show: false,
              },
              background: "#2f3542",
              fontFamily: "sans serif",
              height: 500,
              type: "candlestick",
            },
            title: {
              text: data
                ? new Date(parseInt(data[0].time_close) * 1000).toDateString() +
                  " - " +
                  new Date(parseInt(data[data.length - 1].time_close) * 1000).toDateString()
                : "Coin Price",
              align: "left",
              style: {
                color: "#FFFFFF",
                fontWeight: "400",
              },
            },
            tooltip: {
              enabled: true,
            },
            xaxis: {
              type: "numeric",
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              tooltip: {
                formatter: function (val) {
                  return "Day " + val;
                },
              },
            },
            yaxis: {
              labels: {
                formatter: function (value) {
                  return "$ " + value;
                },
              },
              tooltip: {
                enabled: false,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
