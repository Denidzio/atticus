import { CardVariant } from '../../enums/enums';
import { CardTotal, CodeHighlight } from '../components';
import styles from './styles.module.scss';

const codeExample = `
const CardExample: React.FC = () => {
    return (
    <>
        <CardTotal
            title="Загальний баланс Загальний баланс Загальний баланс Загальний баланс Загальний баланс"
            sum={40.45}
            variant={CardVariant.ORANGE}
        />
        <CardTotal
            title="Загальна зміна за період"
            sum={504_000_000_000.549}
            variant={CardVariant.BLUE}
        />
        <CardTotal
            title="Загальні витрати за період"
            sum={-9700.34}
            variant={CardVariant.WHITE}
        />
        <CardTotal
            title="Загальний баланс"
            sum={7600.34}
            variant={CardVariant.VIOLET}
        />
    </>
    );
}

export { CardExample };
`;

const CardPart: React.FC = () => {
    return (
        <div className={styles.container}>
            <CodeHighlight code={codeExample} />
            <div className={styles.cardTotalContainer}>
                <CardTotal
                    title="Загальний баланс Загальний баланс Загальний баланс Загальний баланс Загальний баланс"
                    sum={40.45}
                    variant={CardVariant.ORANGE}
                />
                <CardTotal
                    title="Загальна зміна за період"
                    sum={504_000_000_000.549}
                    variant={CardVariant.BLUE}
                />
                <CardTotal
                    title="Загальні витрати за період"
                    sum={-9700.34}
                    variant={CardVariant.WHITE}
                />
                <CardTotal
                    title="Загальний баланс"
                    sum={7600.34}
                    variant={CardVariant.VIOLET}
                />
            </div>
        </div>
    );
};

export { CardPart };
