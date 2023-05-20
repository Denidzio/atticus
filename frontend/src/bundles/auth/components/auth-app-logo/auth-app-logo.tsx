import { AppRoute } from '../../enums/enums';
import { Link } from '../components';
import styles from './styles.module.scss';

const AuthAppLogo: React.FC = () => {
    return (
        <Link to={AppRoute.ROOT} className={styles.logoLink}>
            <span className={styles.logoText}>Atticus</span>
        </Link>
    );
};

export { AuthAppLogo };
