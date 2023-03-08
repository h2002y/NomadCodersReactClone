import {useParams} from "react-router";

interface RouteParams{
    coinId: string;
}

function Coin(){
    // useParams() URL에서 관심있는 정보를 잡아낼 수 있게 해줌
    const { coinId } = useParams();
    return <h1>Coin: {coinId}</h1>;
}

export default Coin;