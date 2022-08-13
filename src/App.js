import { useEffect, useReducer } from 'react';
import useWebSocket, { ReadyState } from "react-use-websocket"
import btc from 'assets/icons/btc.png'
import Logo from 'assets/icons/lrc.svg'


function App() {

  const initialState = {
    btc: {
      product_id: "BTC-USD",
      price: "0",
      volume_24h: "0",
      best_bid: "0",
      best_ask: "0",
      logo: Logo
    },
    eth: {
      product_id: "ETH-USD",
      price: "0",
      volume_24h: "0",
      best_bid: "0",
      best_ask: "0",
      logo: btc
    },
    dai: {
      product_id: "DAI-USD",
      price: "0",
      volume_24h: "0",
      best_bid: "0",
      best_ask: "0",
      logo: Logo
    },
    sol: {
      product_id: "SOL-USD",
      price: "0",
      volume_24h: "0",
      best_bid: "0",
      best_ask: "0",
      logo: btc
    },
    shib: {
      product_id: "SHIB-USD",
      price: "0",
      volume_24h: "0",
      best_bid: "0",
      best_ask: "0",
      logo: Logo
    },
  };

  const reducer = (state, action) => {
    const {
      type,
      payload: { product_id, price, volume_24h, best_bid, best_ask },
    } = action;

    switch (type) {
      case "BTC-USD":
        return {
          ...state,
          btc: {
            ...state.btc,
            product_id,
            price,
            volume_24h,
            best_bid,
            best_ask,
          },
        };
      case "ETH-USD":
        return {
          ...state,
          eth: {
            ...state.eth,
            product_id,
            price,
            volume_24h,
            best_bid,
            best_ask,
          },
        };
      case "DAI-USD":
        return {
          ...state,
          dai: {
            ...state.dai,
            product_id,
            price,
            volume_24h,
            best_bid,
            best_ask,
          },
        };
      case "SOL-USD":
        return {
          ...state,
          sol: {
            ...state.sol,
            product_id,
            price,
            volume_24h,
            best_bid,
            best_ask,
          },
        };
      case "SHIB-USD":
        return {
          ...state,
          shib: {
            ...state.shib,
            product_id,
            price,
            volume_24h,
            best_bid,
            best_ask,
          },
        };
      default:
        return state;
    }
  };

  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket("wss://ws-feed.exchange.coinbase.com")
  const [currencies, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {

    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "subscribe",
        product_ids: ["BTC-USD", "ETH-USD", "DAI-USD", "SOL-USD", "SHIB-USD"],
        channels: ["ticker_batch"],
      })
    }
  }, [readyState])

  useEffect(() => {
    if (lastJsonMessage) {
      const { channels, ...payload } = lastJsonMessage;
      const type = payload.product_id;
      dispatch({ type, payload });
    }
  }, [lastJsonMessage]);


  return (
    Object.values(currencies).map(p => <div className='flex flex-row items-center py-3 border-t-[1px]'>
      <div className='basis-1/6'>
        <img className='w-[45px] h-[45px]' src={p.logo} />
      </div>
      <div className='basis-1/6'>{p.product_id}</div>
      <div className='basis-1/6'>{`$ ${p.price}`}</div>
    </div>)
  );
}

export default App;
