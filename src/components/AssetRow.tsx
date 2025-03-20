import { motion } from 'framer-motion';
import { Asset } from '../store/portfolioSlice';
import styles from '../styles/PortfolioOverview.module.scss';

type Props = {
  asset: Asset;
  onRemove: (id: string) => void;
  totalValue: number;
};

const AssetRow = ({ asset, onRemove, totalValue }: Props) => {
  const share = totalValue > 0 
    ? ((asset.totalValue / totalValue) * 100).toFixed(2)
    : '0.00';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.row}
      onClick={() => onRemove(asset.id)}
    >
      <div className={styles.name}>{asset.symbol}</div>
      <div className={styles.quantity}>{asset.quantity.toFixed(4)}</div>
      <div className={styles.price}>
        {asset.price > 0 ? `$${asset.price.toFixed(2)}` : 'Loading...'}
      </div>
      <div className={asset.change24h >= 0 ? styles.positive : styles.negative}>
        {asset.change24h.toFixed(2)}%
      </div>
      <div className={styles.share}>{share}%</div>
    </motion.div>
  );
};

export default AssetRow;