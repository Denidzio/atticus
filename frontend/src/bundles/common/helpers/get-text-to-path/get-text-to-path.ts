import { AppRoute } from '~/bundles/common/enums/enums.js';

const getText = (pathname: string, type: string): string => {
    type Properties = Record<string, string>;

    const titles: Properties = {
        [AppRoute.ROOT]: 'Ввійти',
        [AppRoute.SIGN_UP]: 'Зареєструватись',
    };

    const authText: Properties = {
        [AppRoute.ROOT]: 'Немає облікового запису?',
        [AppRoute.SIGN_UP]: 'Є обліковий запис?',
    };

    const authLink: Properties = {
        [AppRoute.ROOT]: 'Зареєструватись',
        [AppRoute.SIGN_UP]: 'Ввійти',
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
