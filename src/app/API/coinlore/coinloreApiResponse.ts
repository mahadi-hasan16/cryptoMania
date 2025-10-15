import { CryptoCoin } from "../../models/finance/cryptoCoin";

export type CoinloreApiResponse={
  data: CryptoCoin[];
  info: {
    coins_num: number;
    time: number;
  }
}
