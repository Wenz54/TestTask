import { motion } from 'framer-motion';
import { FixedSizeList as List } from 'react-window';
import { useAppSelector, useAppDispatch } from '../store/store';
import { selectTotalValue, removeAsset } from '../store/portfolioSlice';
import AssetForm from './AssetForm';
import AssetRow from './AssetRow';
import useWebSocket from '../hooks/useWebSocket';
import styles from '../styles/PortfolioOverview.module.scss';

const PortfolioOverview = () => {
    const assets = useAppSelector(state => state.portfolio.assets);
    const totalValue = useAppSelector(selectTotalValue);
    const dispatch = useAppDispatch();

    useWebSocket();

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
        <div style={style}>
            <AssetRow
                asset={assets[index]}
                onRemove={(id) => dispatch(removeAsset(id))}
                totalValue={totalValue}
            />
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.container}
        >
            <div className={styles.container}>
                <h1>Портфель</h1>
                <AssetForm />

                <div className={styles.listHeader}>
                    <div>Актив</div>
                    <div>Количество</div>
                    <div>Цена</div>
                    <div>Изменение за 24 часа</div>
                    <div>Процент портфеля</div>
                </div>

                <List
                    height={500}
                    itemCount={assets.length}
                    itemSize={60}
                    width="100%"
                >
                    {Row}
                </List>
            </div>
        </motion.div>
    );
};

export default PortfolioOverview;