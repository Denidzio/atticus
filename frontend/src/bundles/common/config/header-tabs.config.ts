import { AppRoute } from '~/bundles/common/enums/enums.js';

const tabsDashboard = [
    { title: 'Дашборд', to: AppRoute.DASHBOARD, icon: 'DASHBOARD' },
    { title: 'Бюджети', to: AppRoute.BUDGETS, icon: 'BUDGET' },
];

const tabsData = [
    { title: 'Транзакції', to: AppRoute.TRANSACTION, icon: 'TRANSACTION' },
    { title: 'Бюджети', to: AppRoute.BUDGETS, icon: 'BUDGET' },
    {
        title: 'Налаштування гаманця',
        to: AppRoute.WALLET_SETTINGS,
        icon: 'GEAR',
    },
];

const dataTabs = {
    dashboard: tabsDashboard,
    wallets: tabsData,
};

export { dataTabs };
