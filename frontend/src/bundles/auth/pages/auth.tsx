import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';

import {
    AuthAppLogo,
    AuthWrapper,
    Loader,
    SignInForm,
    SignUpForm,
} from '../components/components.js';
import { AppRoute } from '../enums/enums.js';
import { actions as authActions } from '../store';
import styles from './styles.module.scss';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dataStatus } = useAppSelector((state) => state.auth);
    const { pathname } = useLocation();

    const handleSignInSubmit = useCallback(
        (payload: UserSignInRequestDto): void => {
            void dispatch(authActions.signIn(payload));
        },
        [dispatch],
    );

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto): void => {
            void dispatch(authActions.signUp(payload));
        },
        [dispatch],
    );

    const getScreen = (screen: string): React.ReactNode => {
        if (screen.includes(AppRoute.SIGN_UP)) {
            return <SignUpForm onSubmit={handleSignUpSubmit} />;
        }

        if (screen.includes(AppRoute.ROOT)) {
            return <SignInForm onSubmit={handleSignInSubmit} />;
        }

        return null;
    };

    const authPath =
        pathname === AppRoute.ROOT ? AppRoute.SIGN_UP : AppRoute.ROOT;

    return (
        <div className={styles.authContainer}>
            <div className={styles.authWrap}>
                <div className={styles.authInside}>
                    <span className={styles.authRoundlarge}></span>
                    <span className={styles.authRoundsmall}></span>
                    <span className={styles.authRing}></span>
                    {dataStatus === DataStatus.PENDING ? (
                        <Loader />
                    ) : (
                        <AuthWrapper
                            authPath={authPath}
                            screen={getScreen(pathname)}
                            pathname={pathname}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export { Auth };
