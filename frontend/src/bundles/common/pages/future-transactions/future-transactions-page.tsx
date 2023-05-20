/* eslint-disable @typescript-eslint/no-unused-vars */
import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { type MultiValue, type SingleValue } from 'react-select';

import DashboardPlaceholder from '~/assets/img/dashboard-placeholder.png';
import { RangeCalendar } from '~/bundles/common/components/calendar/components/components.js';
import {
    BaseModal,
    Button,
    Icon,
    Input,
    Loader,
    MultiDropdown,
    Placeholder,
    RangeSlider,
    TransactionModal,
    TransactionTable,
} from '~/bundles/common/components/components.js';
import { type TransactionType } from '~/bundles/common/components/transanction-table/types';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    DataStatus,
    FaIcons,
    InputType,
    TransactionModalType,
} from '~/bundles/common/enums/enums.js';
import {
    findCurrencyById,
    findMinMaxAmount,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { actions as categoriesActions } from '~/bundles/common/stores/categories';
import { type CategoryGetAllItemResponseDto } from '~/bundles/common/stores/categories/types/types';
import { actions as transactionsActions } from '~/bundles/common/stores/transactions';
import { type DataType } from '~/bundles/common/types/dropdown.type.js';
import { type RangeLimits } from '~/bundles/common/types/range-slider.type.js';
import { actions as currenciesActions } from '~/bundles/currencies/store';
import { actions as walletsActions } from '~/bundles/wallets/store';
import { type WalletGetAllItemResponseDto } from '~/bundles/wallets/wallets';

import styles from './styles.module.scss';

const DEFAULT_INPUT: { note: string } = {
    //It needs to change
    note: '',
};

const FutureTransactionsPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [currentWallet, setCurrentWallet] = useState<
        WalletGetAllItemResponseDto | undefined
    >();
    const [isSelectedTransactions, setIsSelectedTransactions] = useState<
        string[]
    >([]);

    const addIdCheckedTransactions = useCallback((id: string): void => {
        setIsSelectedTransactions((previousState) => {
            if (previousState.includes(id)) {
                return previousState.filter(
                    (previousState_) => previousState_ !== id,
                );
            }
            return [...previousState, id];
        });
    }, []);

    const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

    const handleOpenModalDelete = useCallback(() => {
        setIsDeleteModalShown(true);
    }, []);

    const handleCloseModalDelete = useCallback(() => {
        setIsDeleteModalShown(false);
    }, []);

    const handleClickDeleteTransactions = useCallback(() => {
        void dispatch(
            transactionsActions.removeTransactions(isSelectedTransactions),
        );
        setIsSelectedTransactions([]);
        setIsDeleteModalShown(false);
    }, [dispatch, isSelectedTransactions]);

    const { wallets, dataStatus } = useAppSelector((state) => state.wallets);
    const { currencies } = useAppSelector((state) => state.currencies);
    const { control, errors, watch, reset } = useAppForm<{ note: string }>({
        //It needs to change
        defaultValues: DEFAULT_INPUT,
    });

    const transactions = useAppSelector(
        (state) => state.transactions.transactions?.items ?? [],
    );

    const category = useAppSelector(
        (state) => state.categories.categories?.items ?? [],
    );

    const newDataMenu = category.map((item) => ({
        ...item,
        value: item.id,
    }));

    const currency = findCurrencyById(
        currencies,
        currentWallet?.currencyId,
    )?.symbol;

    const [transactionData, setTransactionData] = useState<TransactionType[]>(
        [],
    );

    const thisWalletTransactions = useMemo(
        () => transactions.filter((it) => it.walletsId === id),
        [id, transactions],
    );

    const data = useMemo(() => {
        return transactions.map((item) => ({
            id: item.id,
            date: item.date,
            category: category.find((cat) => cat.id === item.categoryId),
            name: category.find((cat) => cat.id === item.categoryId)?.name,
            label: item.labelId,
            amount: item.amount,
            currency: currencies.find(
                (current) => current.id === item.currencyId,
            )?.symbol,
            note: item.note,
            walletsId: item.walletsId,
        })) as unknown as TransactionType[];
    }, [category, currencies, transactions]);

    const [rangeLimits, setRangeLimits] = useState(
        findMinMaxAmount(thisWalletTransactions),
    );
    const [categoriesDropdown, setCategoriesDropdown] = useState<
        MultiValue<DataType> | SingleValue<DataType>
    >([]);
    const [currentRange, setCurrentRange] = useState(rangeLimits);
    const [filteredData, setFilteredData] = useState(transactionData);
    const [activeModal, setActiveModal] = useState(false);

    const categoriesIdDropdown = new Set(
        (categoriesDropdown as unknown as CategoryGetAllItemResponseDto[]).map(
            (category) => category.id,
        ),
    );
    const getNoteFilter = watch('note');
    const transactionsByCategory = filteredData.filter((transaction) =>
        categoriesIdDropdown.has(transaction.category.id),
    );
    const isFilterEmpty =
        categoriesIdDropdown.size > 0 ? transactionsByCategory : filteredData;
    const transactionsByNote = isFilterEmpty.filter((transaction) =>
        transaction.note?.includes(getNoteFilter),
    );
    const categoryOrNoteFilter =
        getNoteFilter.length > 0 ? transactionsByNote : isFilterEmpty;

    const openTransactionModal = useCallback((): void => {
        setActiveModal(true);
    }, []);

    const closeTransactionModal = useCallback(() => {
        setActiveModal(false);
    }, []);

    const handleCategoriesMultiDropdownChange = useCallback(
        (selectedOption: MultiValue<DataType> | SingleValue<DataType>) => {
            if (selectedOption === null) {
                setCategoriesDropdown([]);
            } else {
                setCategoriesDropdown(selectedOption);
            }
        },
        [],
    );

    const handleSliderChange = useCallback(
        (range: RangeLimits): void => {
            setCurrentRange(range);

            const newFilteredData = transactionData.filter(
                (item) => item.amount >= range.min && item.amount <= range.max,
            );
            setFilteredData(newFilteredData);
        },
        [transactionData],
    );

    const hangleReset = useCallback((): void => {
        setCategoriesDropdown([]);
        setFilteredData(transactionData);
        setCurrentRange(rangeLimits);
        const isReset = reset;
        isReset && reset();
    }, [rangeLimits, reset, transactionData]);

    const handleNavidation = useCallback(() => {
        navigate(`/wallet/${id}/transaction`);
    }, [id, navigate]);

    useEffect(() => {
        setCurrentWallet(wallets.find((wallet) => wallet.id === id));
    }, [id, wallets]);

    useEffect(() => {
        void dispatch(walletsActions.loadAll());
        void dispatch(transactionsActions.loadTransactions());
        void dispatch(categoriesActions.loadCategories());
        void dispatch(currenciesActions.loadAll());
    }, [dispatch]);

    const formatOptionLabel = useCallback(
        (data: DataType): JSX.Element => (
            <div className={styles.item}>
                <input
                    type="checkbox"
                    checked={(categoriesDropdown as MultiValue<DataType>).some(
                        (option) => option.value === data.value,
                    )}
                    readOnly
                    className={styles.checkbox}
                />

                {data.icon && (
                    <span
                        className={styles.dropdownCategoryIcon}
                        style={{
                            background: `var(${data.color})`,
                        }}
                    >
                        <Icon name={data.icon as IconProp} />
                    </span>
                )}

                {data.name && <span className={styles.name}>{data.name}</span>}
            </div>
        ),
        [categoriesDropdown],
    );

    useEffect(() => {
        setCurrentWallet(wallets.find((wallet) => wallet.id === id));
    }, [id, wallets]);

    useEffect(() => {
        void dispatch(walletsActions.loadAll());
        void dispatch(transactionsActions.loadTransactions());
        void dispatch(categoriesActions.loadCategories());
        void dispatch(currenciesActions.loadAll());
    }, [dispatch]);

    useEffect(() => {
        setRangeLimits(findMinMaxAmount(thisWalletTransactions));
    }, [thisWalletTransactions]);

    useEffect(() => {
        setCurrentRange(rangeLimits);
    }, [rangeLimits]);

    useEffect(() => {
        setFilteredData(transactionData);
    }, [transactionData]);

    useEffect(() => {
        setTransactionData(data);
    }, [data]);

    if (dataStatus === DataStatus.PENDING) {
        return (
            <div className={styles.loaderContainer}>
                <Loader />
            </div>
        );
    }

    return (
        <div className={styles.app}>
            <div className={styles.body}>
                <div className={classNames(styles.bodyContainer, 'container')}>
                    <div className={styles.buttonsDate}>
                        <div className={styles.buttonsContainer}>
                            <Button
                                variant={ButtonVariant.PRIMARY}
                                size={ButtonSize.MEDIUM}
                                className={styles.transactionButton}
                                onClick={openTransactionModal}
                            >
                                <FontAwesomeIcon icon={FaIcons.PLUS} />
                                <span>Add transaction</span>
                            </Button>

                            <div className={styles.buttons}>
                                {isSelectedTransactions.length > 0 && (
                                    <Button
                                        className={styles.button}
                                        variant={ButtonVariant.DELETE}
                                        size={ButtonSize.MEDIUM}
                                        onClick={handleOpenModalDelete}
                                    >
                                        Delete
                                    </Button>
                                )}
                                <Button
                                    className={styles.button}
                                    variant={ButtonVariant.PLAIN}
                                    size={ButtonSize.MEDIUM}
                                    onClick={handleNavidation}
                                >
                                    Future
                                </Button>
                            </div>
                        </div>
                        <RangeCalendar />
                    </div>
                    <div className={styles.filters}>
                        <div
                            className={classNames(
                                styles.filtersContainer,
                                'container',
                            )}
                        >
                            <div className={styles.filterText}>
                                <h2>Filters</h2>
                                <button
                                    className={styles.reset}
                                    onClick={hangleReset}
                                >
                                    Скинути фільтри
                                </button>
                            </div>
                            <div className={styles.applyFilters}>
                                <div className={styles.filter}>
                                    <div className={styles.dropdown}>
                                        <MultiDropdown
                                            formatOptionLabel={
                                                formatOptionLabel
                                            }
                                            data={newDataMenu}
                                            selectedOption={categoriesDropdown}
                                            handleChange={
                                                handleCategoriesMultiDropdownChange
                                            }
                                            label="За категорією"
                                            placeholder="Вибрати..."
                                        />
                                    </div>
                                </div>
                                <div className={styles.filter}>
                                    <div className={styles.dropdown}>
                                        <Input
                                            type={InputType.TEXT}
                                            label="За приміткою"
                                            placeholder="Фільтрувати за ключовим словом"
                                            name="note"
                                            control={control}
                                            errors={errors}
                                            inputClassName={styles.input}
                                        />
                                    </div>
                                </div>
                                <div
                                    className={classNames(
                                        styles.filter,
                                        styles.rangeFilter,
                                    )}
                                >
                                    <span className={styles.categoryText}>
                                        За сумою
                                    </span>
                                    <div className={styles.slider}>
                                        <RangeSlider
                                            rangeLimits={rangeLimits}
                                            currentRange={currentRange}
                                            onChange={handleSliderChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.walletTransactions}>
                        <div className={styles.walletTransactionsContainer}>
                            {transactions.length > 0 ? (
                                <div className={styles.transactionsContainer}>
                                    <TransactionTable
                                        walletsId={id}
                                        transactions={categoryOrNoteFilter}
                                        isOnlyFutureTransactions={true}
                                        addIdCheckedTransactions={
                                            addIdCheckedTransactions
                                        }
                                    />
                                </div>
                            ) : (
                                <Placeholder
                                    path={DashboardPlaceholder}
                                    body="У вас ще немає транзакцій"
                                />
                            )}
                            <TransactionModal
                                type={TransactionModalType.ADD}
                                handleCancel={closeTransactionModal}
                                active={activeModal}
                            />
                            <BaseModal
                                isShown={isDeleteModalShown}
                                onClose={handleCloseModalDelete}
                                onSubmit={handleClickDeleteTransactions}
                                Header={
                                    <h2
                                        className={styles.modalTitle}
                                    >{`Ви збираєтесь видалити ${
                                        isSelectedTransactions.length
                                    } ${
                                        isSelectedTransactions.length > 1
                                            ? 'транзакцій'
                                            : 'транзакцію'
                                    }`}</h2>
                                }
                                Body={
                                    <>
                                        <h4
                                            className={
                                                styles.modalDetailsContainer
                                            }
                                        >
                                            Ця зміна є незворотною. Ви справді
                                            хочете{' '}
                                            {isSelectedTransactions.length > 1
                                                ? 'їх'
                                                : 'її'}{' '}
                                            видалити ?
                                        </h4>
                                    </>
                                }
                                submitButtonName={`Видалити ${
                                    isSelectedTransactions.length > 1
                                        ? 'транзакції'
                                        : 'транзакцію'
                                }`}
                                submitButtonVariant={ButtonVariant.DELETE}
                                footerContainerClass={styles.modalFooter}
                                buttonsSize={ButtonSize.MEDIUM}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { FutureTransactionsPage };
