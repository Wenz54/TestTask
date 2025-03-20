import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { savePortfolio, loadPortfolio } from '../utils/storage';

export interface Asset {
  id: string;
  symbol: string;
  quantity: number;
  price: number;
  totalValue: number;
  change24h: number;
}

interface PortfolioState {
  assets: Asset[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PortfolioState = {
  assets: loadPortfolio(),
  status: 'idle',
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<Omit<Asset, 'id' | 'price' | 'totalValue' | 'change24h'>>) => {
      const newAsset = {
        ...action.payload,
        id: crypto.randomUUID(),
        price: 0,
        totalValue: 0,
        change24h: 0,
      };
      state.assets.push(newAsset);
      savePortfolio(state.assets);
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter(asset => asset.id !== action.payload);
      savePortfolio(state.assets);
    },
    updatePrices: (state, action: PayloadAction<{ symbol: string; price: number; change24h: number }>) => {
      state.assets.forEach(asset => {
        if (asset.symbol.toUpperCase() === action.payload.symbol.toUpperCase()) {
          asset.price = action.payload.price;
          asset.totalValue = Number((asset.quantity * action.payload.price).toFixed(4));
          asset.change24h = action.payload.change24h;
        }
      });
      savePortfolio(state.assets);
    },
  },
});

export const selectTotalValue = createSelector(
  [(state: RootState) => state.portfolio.assets],
  (assets) => assets.reduce((sum, asset) => sum + asset.totalValue, 0)
);

export const { addAsset, removeAsset, updatePrices } = portfolioSlice.actions;
export default portfolioSlice.reducer;