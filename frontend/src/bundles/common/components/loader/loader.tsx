import classNames from 'classnames';

import styles from './styles.module.scss';

interface LoaderProperties {
    white?: boolean;
}

const Loader: React.FC<LoaderProperties> = ({ white }) => {
    return (
        <div className={classNames(styles.spinner, white && styles.white)}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export { Loader };
