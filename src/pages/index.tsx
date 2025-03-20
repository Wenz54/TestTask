import { Provider } from 'react-redux';
import { store } from '../store/store';
import PortfolioOverview from '../components/PortfolioOverview';

export default function Home() {
  return (
    <Provider store={store}>
      <PortfolioOverview />
    </Provider>
  );
}