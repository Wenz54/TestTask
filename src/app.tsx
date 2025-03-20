import React from 'react'
import PortfolioOverview from './components/PortfolioOverview'
import './styles/App.scss'

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1 className="app-title">Мой Инвестиционный Портфель</h1>
      <PortfolioOverview />
    </div>
  )
}

export default App