import { type ChangeEvent } from 'react';

import { BaseModal } from '~/bundles/common/components/components';
import { ButtonSize, ButtonVariant } from '~/bundles/common/enums/enums';
import { useState } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

type Properties = {
    isShown: boolean;
    onClose: () => void;
    onDelete: () => void;
};

const UserDeleteCheckboxesText = [
    'Я розумію, що всі мої гаманці будуть видалені.',
    'Я розумію, що всі мої транзакції, бюджети та дані в цих гаманцях буде видалено.',
    'Я розумію, що цей процес є незворотнім.',
];

const defaultCheckboxListState: boolean[] = UserDeleteCheckboxesText.map(
    () => false,
);

const UserDeleteModal: React.FC<Properties> = ({
    isShown,
    onClose,
    onDelete,
}) => {
    const [checkboxList, setCheckboxList] = useState<boolean[]>(
        defaultCheckboxListState,
    );

    const handleCheckboxChange = (
        event: ChangeEvent<HTMLInputElement>,
        index: number,
    ): void => {
        const newList = [...checkboxList];
        newList[index] = event.target.checked;
        setCheckboxList(newList);
    };
    return (
        <BaseModal
            isShown={isShown}
            onClose={onClose}
            Header={
                <div className={styles.headerContainer}>
                    <h1 className={styles.headerTitle}>
                        Видалити обліковий запис
                    </h1>
                    <p className={styles.headerSubTitle}>
                        Ви збираєтесь видалити ваш обліковий запис. Будь ласка,
                        підтвердіть цю дію
                    </p>
                </div>
            }
            Body={
                <ul className={styles.listContainer}>
                    {UserDeleteCheckboxesText.map((text, index) => (
                        <li key={index} className={styles.listItem}>
                            <input
                                type="checkbox"
                                checked={checkboxList[index]}
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange={(event): void =>
                                    handleCheckboxChange(event, index)
                                }
                            />
                            <span>{text}</span>
                        </li>
                    ))}
                </ul>
            }
            submitButtonName="Видалити обліковий запис"
            submitButtonVariant={ButtonVariant.DELETE}
            onSubmit={onDelete}
            disabled={checkboxList.includes(false)}
            footerContainerClass={styles.modalFooter}
            buttonsSize={ButtonSize.MEDIUM}
        />
    );
};

export { UserDeleteModal };
