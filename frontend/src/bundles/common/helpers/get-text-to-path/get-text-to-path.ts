import { AppRoute } from '~/bundles/common/enums/enums.js';

const getText = (pathname: string, type: string): string => {
    type Properties = Record<string, string>;

    const titles: Properties = {
        [AppRoute.ROOT]: 'Log In',
        [AppRoute.SIGN_UP]: 'Sign Up',
    };

    const authText: Properties = {
        [AppRoute.ROOT]: 'No account?',
        [AppRoute.SIGN_UP]: 'Have an account?',
    };

    const authLink: Properties = {
        [AppRoute.ROOT]: 'Sign Up',
        [AppRoute.SIGN_UP]: 'Log In',
    };

    switch (type) {
        case 'title': {
            return titles[pathname] || '';
        }
        case 'authText': {
            return authText[pathname] || '';
        }
        case 'authLink': {
            return authLink[pathname] || '';
        }
        default: {
            return '';
        }
    }
};

export { getText };
