import {useState} from "react";

export default function App() {
    /*
    Reactのフック機能、およびuseStateの使い方を知るために書いた習作？
    (変数名がオワってるのはそういう訳。)
    useStateの返す関数？　とその使われ方が全く持ってわからない。
    とにかく勉強不足なのでなんとも言えない！
    */
    const [count, setUnchiUnchi] = useState(0);
    const increment = () => setUnchiUnchi((UnchiUnchi) => UnchiUnchi + 1);
    const decrement = () => setUnchiUnchi((UnchiUnchi) => UnchiUnchi - 1);

    return (
        <>
            <h1>クッキークリッカー！</h1>
            <p>カウント：{count}</p>
            <button onClick={increment}>増やす</button>
            <button onClick={decrement}>減らす</button>
        </>
    );
}