import '~/assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AccountSettings } from '~/bundles/account-settings/account-settings';
import { Auth } from '~/bundles/auth/pages/auth';
import {
    App,
    PrivateRoute,
    PublicRoute,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components';
import { Toast } from '~/bundles/common/components/toast/toast';
import { AppRoute } from '~/bundles/common/enums/enums';
import { BudgetDetails } from '~/bundles/common/pages/budgets/budget-details/budget-details';
import { Budgets } from '~/bundles/common/pages/budgets/budgets';
import { Dashboard } from '~/bundles/common/pages/dashboard/dashboard';
import { NotFound } from '~/bundles/common/pages/not-found/not-found';
import { WalletDetails } from '~/bundles/common/pages/wallet-details/wallet-details';
import { Landing } from '~/bundles/landing/landing';
import { StyleGuide } from '~/bundles/ui/ui';
import { store } from '~/framework/store/store';

import { FutureTransactionsPage } from './bundles/common/pages/future-transactions/future-transactions-page';
import { WalletSettings } from './bundles/common/pages/wallet-settings/wallet-settings';

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <Toast />
        <StoreProvider store={store.instance}>
            <RouterProvider
                routes={[
                    {
                        path: AppRoute.ROOT,
                        element: <App />,
                        children: [
                            {
                                index: true,
                                element: (
                                    <PublicRoute>
                                        <Auth />
                                    </PublicRoute>
                                ),
                            },
                            {
                                path: AppRoute.SIGN_UP,
                                element: (
                                    <PublicRoute>
                                        <Auth />
                                    </PublicRoute>
                                ),
                            },
                            {
                                path: AppRoute.DASHBOARD,
                                element: (
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                ),
                            },
                            {
                                path: AppRoute.BUDGETS,
                                element: (
                                    <PrivateRoute>
                                        <Budgets />
                                    </PrivateRoute>
                                ),
                            },
                            {
                                path: AppRoute.WALLET_DETAILS_BUDGETS,
                                element: (
                                    <PrivateRoute>
                                        <Budgets />
                                    </PrivateRoute>
                                ),
                            },
                            {
                                path: AppRoute.WALLET_DETAILS_TRANSACTION,
                                element: (
                                    <PrivateRoute>
                                        <WalletDetails />
                                    </PrivateRoute>
                                ),
                            },
                            {
                                path: AppRoute.BUDGETS_DETAILS,
                                element: (
                                    <PrivateRoute>
                                        <BudgetDetails />
                                    </PrivateRoute>
                                ),
                            },
                            {
                                path: AppRoute.WALLET_DETAILS_SETTINGS,
                                element: (
                                    <PrivateRoute>
                                        <WalletSettings />
                                    </PrivateRoute>
                                ),
                            },
                            {
                                path: AppRoute.WALLET_DETAILS_FUTURE_TRANSACTIONS,
                                element: (
                                    <PrivateRoute>
                                        <FutureTransactionsPage />
                                    </PrivateRoute>
                                ),
                            },
                            {
                                path: AppRoute.USER_CATEGORIES,
                                element: (
                                    <PrivateRoute>
                                        <AccountSettings />
                                    </PrivateRoute>
                                ),
                            },
                            {
                                path: AppRoute.USER_PROFILE,
                                element: (
                                    <PrivateRoute>
                                        <AccountSettings />
                                    </PrivateRoute>
                                ),
                            },
                        ],
                    },
                    {
                        path: AppRoute.NOT_FOUND,
                        element: <NotFound />,
                    },
                    {
                        path: AppRoute.UI,
                        element: <StyleGuide />,
                    },
                ]}
            />
        </StoreProvider>
    </StrictMode>,
);
