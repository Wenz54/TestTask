import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '../store/store';
import { addAsset } from '../store/portfolioSlice';
import styles from '../styles/AssetForm.module.scss';

const cryptocurrencies = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'BNB', name: 'Binance Coin' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'XRP', name: 'Ripple' },
    { symbol: 'DOT', name: 'Polkadot' },
    { symbol: 'DOGE', name: 'Dogecoin' },
    { symbol: 'AVAX', name: 'Avalanche' },
    { symbol: 'SHIB', name: 'Shiba Inu' },
    { symbol: 'MATIC', name: 'Polygon' },
    { symbol: 'LTC', name: 'Litecoin' },
    { symbol: 'TRX', name: 'TRON' },
    { symbol: 'LINK', name: 'Chainlink' },
    { symbol: 'ATOM', name: 'Cosmos' },
    { symbol: 'UNI', name: 'Uniswap' },
    { symbol: 'XMR', name: 'Monero' },
    { symbol: 'ETC', name: 'Ethereum Classic' },
    { symbol: 'XLM', name: 'Stellar' },
    { symbol: 'BCH', name: 'Bitcoin Cash' },
    { symbol: 'ALGO', name: 'Algorand' },
    { symbol: 'VET', name: 'VeChain' },
    { symbol: 'ICP', name: 'Internet Computer' },
    { symbol: 'FIL', name: 'Filecoin' },
    { symbol: 'APE', name: 'ApeCoin' },
    { symbol: 'EOS', name: 'EOS' },
    { symbol: 'AAVE', name: 'Aave' },
    { symbol: 'QNT', name: 'Quant' },
    { symbol: 'XTZ', name: 'Tezos' },
    { symbol: 'NEAR', name: 'NEAR Protocol' },
    { symbol: 'GRT', name: 'The Graph' },
    { symbol: 'STX', name: 'Stacks' },
    { symbol: 'CHZ', name: 'Chiliz' },
    { symbol: 'MANA', name: 'Decentraland' },
    { symbol: 'SAND', name: 'The Sandbox' },
    { symbol: 'CRV', name: 'Curve DAO Token' },
    { symbol: 'LDO', name: 'Lido DAO' },
    { symbol: 'USDT', name: 'Tether' },
    { symbol: 'USDC', name: 'USD Coin' },
    { symbol: 'BUSD', name: 'Binance USD' },
    { symbol: 'DAI', name: 'Dai' },
    { symbol: 'FTM', name: 'Fantom' },
    { symbol: 'THETA', name: 'Theta Network' },
    { symbol: 'HBAR', name: 'Hedera Hashgraph' },
    { symbol: 'EGLD', name: 'Elrond' },
    { symbol: 'AXS', name: 'Axie Infinity' },
    { symbol: 'KLAY', name: 'Klaytn' },
    { symbol: 'FLOW', name: 'Flow' },
    { symbol: 'GMT', name: 'STEPN' },
    { symbol: 'ZEC', name: 'Zcash' },
    { symbol: 'BSV', name: 'Bitcoin SV' },
    { symbol: 'NEO', name: 'Neo' },
    { symbol: 'WAVES', name: 'Waves' },
    { symbol: 'KSM', name: 'Kusama' },
    { symbol: 'RUNE', name: 'THORChain' },
    { symbol: 'COMP', name: 'Compound' },
    { symbol: 'MKR', name: 'Maker' },
    { symbol: 'SNX', name: 'Synthetix' },
    { symbol: 'BAT', name: 'Basic Attention Token' },
    { symbol: 'ENJ', name: 'Enjin Coin' },
    { symbol: 'GALA', name: 'Gala' },
    { symbol: '1INCH', name: '1inch Network' },
  ];

const AssetForm = () => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredAssets, setFilteredAssets] = useState(cryptocurrencies);
  const dispatch = useAppDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    const searchValue = value.toUpperCase();
    setSymbol(searchValue);
    
    setFilteredAssets(
      cryptocurrencies.filter(asset =>
        asset.symbol.includes(searchValue) ||
        asset.name.toLowerCase().includes(value.toLowerCase())
    ));
    
    if (value === '') {
      setFilteredAssets(cryptocurrencies);
    }
  };

  const handleSelect = (selectedSymbol: string) => {
    setSymbol(selectedSymbol);
    setShowDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cryptocurrencies.some(asset => asset.symbol === symbol)) {
      return;
    }
    dispatch(addAsset({
      symbol,
      quantity: parseFloat(quantity),
    }));
    setSymbol('');
    setQuantity('');
  };

  const handleFocus = () => {
    setFilteredAssets(cryptocurrencies);
    setShowDropdown(true);
  };

  return (
    <div className={styles.formWrapper} ref={wrapperRef}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              value={symbol}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={handleFocus}
              placeholder="Поиск криптовалюты..."
              className={styles.searchInput}
              autoComplete="off"
            />
            
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={styles.dropdown}
                >
                  {filteredAssets.map(asset => (
                    <div
                      key={asset.symbol}
                      className={styles.dropdownItem}
                      onClick={() => handleSelect(asset.symbol)}
                    >
                      <span className={styles.symbol}>{asset.symbol}</span>
                      <span className={styles.name}>{asset.name}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <input
            type="number"
            step="0.0001"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Кол-во"
            className={styles.amountInput}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className={styles.addButton}
          disabled={!symbol || !quantity}
        >
          Добавить актив
          <svg className={styles.icon} viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </motion.button>
      </form>
    </div>
  );
};

export default AssetForm;