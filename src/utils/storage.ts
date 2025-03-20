import { Asset } from '../store/portfolioSlice';

const PORTFOLIO_KEY = 'portfolio';

export const loadPortfolio = (): Asset[] => {
  const saved = localStorage.getItem(PORTFOLIO_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const savePortfolio = (assets: Asset[]) => {
  localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(assets));
};