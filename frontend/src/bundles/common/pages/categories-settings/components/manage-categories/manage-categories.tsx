import {
    BaseModal,
    Button,
    Icon,
} from '~/bundles/common/components/components';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    FaIcons,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks';
import { actions as categoryActions } from '~/bundles/common/stores/categories';

import styles from './styles.module.scss';

type Properties = {
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

const ManageCategories: React.FC<Properties> = ({
    selectedCategories,
    setSelectedCategories,
}) => {
    const dispatch = useAppDispatch();

    const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

    const handleOpenModalDelete = useCallback(() => {
        setIsDeleteModalShown(true);
    }, []);

    const handleClickDeleteCategories = useCallback(() => {
        void dispatch(categoryActions.removeCategories(selectedCategories));
        setIsDeleteModalShown(false);
        setSelectedCategories([]);
    }, [dispatch, selectedCategories, setSelectedCategories]);

    const handleCloseModal = useCallback(() => {
        setIsDeleteModalShown(false);
    }, []);

    const buttonIsCheckedCategoriesDeleteActive =
        selectedCategories.length <= 0;

    const buttonIsCheckedCategoriesDeleteName =
        selectedCategories.length === 0
            ? 'Видалити категорії'
            : `Видалити категорії (${selectedCategories.length})`;

    return (
        <>
            <div className={styles.manageWrapper}>
                <h2 className={styles.title}>Керувати категоріями</h2>
                <div className={styles.wrapperAllBtn}>
                    <div className={styles.wrapperBtn}>
                        <Button
                            type={ButtonType.BUTTON}
                            variant={ButtonVariant.DELETE}
                            size={ButtonSize.MEDIUM}
                            disabled={buttonIsCheckedCategoriesDeleteActive}
                            className={styles.btn}
                            onClick={handleOpenModalDelete}
                        >
                            <Icon name={FaIcons.TRASH} />
                            <span className={styles.btnName}>
                                {buttonIsCheckedCategoriesDeleteName}
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
            <BaseModal
                isShown={isDeleteModalShown}
                onClose={handleCloseModal}
                onSubmit={handleClickDeleteCategories}
                Header={
                    <h2 className={styles.modalTitle}>
                        {selectedCategories.length === 1 &&
                            `Ви збираєтесь видалити ${selectedCategories.length} категорію`}
                        {selectedCategories.length != 1 &&
                            `Ви збираєтесь видалити ${selectedCategories.length} категорії`}
                    </h2>
                }
                Body={
                    <p className={styles.modalDetailsContainer}>
                        Ця зміна є незворотною. Ви дійсно хочете їх видалити?
                    </p>
                }
                submitButtonName="Видалити категорії"
                footerContainerClass={styles.modalFooter}
                submitButtonVariant={ButtonVariant.DELETE}
                buttonsSize={ButtonSize.MEDIUM}
            />
        </>
    );
};

export { ManageCategories };
