import { CategoryType } from '~/bundles/categories/categories.js';
import { type CategoryRequestDto } from '~/bundles/categories/types/types.js';
import { Gradients, Icons } from '~/bundles/user-categories/enums/enums.js';

const defaultCategories: CategoryRequestDto[] = [
    {
        name: 'Подарунки',
        icon: Icons.GIFT,
        color: Gradients.GRADIENT_1,
        type: CategoryType.INCOME,
    },
    {
        name: 'Бізнес',
        icon: Icons.BRIEFCASE,
        color: Gradients.GRADIENT_2,
        type: CategoryType.INCOME,
    },
    {
        name: 'Додатковий дохід',
        icon: Icons.SACK_DOLLAR,
        color: Gradients.GRADIENT_3,
        type: CategoryType.INCOME,
    },
    {
        name: 'Зарплата',
        icon: Icons.SACK_DOLLAR,
        color: Gradients.GRADIENT_4,
        type: CategoryType.INCOME,
    },
    {
        name: 'Авто',
        icon: Icons.CAR,
        color: Gradients.GRADIENT_6,
        type: CategoryType.EXPENSE,
    },
    {
        name: 'Покупки',
        icon: Icons.BASKET_SHOPPING,
        color: Gradients.GRADIENT_7,
        type: CategoryType.EXPENSE,
    },
    {
        name: 'Подорожі',
        icon: Icons.CAR,
        color: Gradients.GRADIENT_8,
        type: CategoryType.EXPENSE,
    },
    {
        name: 'Дім',
        icon: Icons.PAW,
        color: Gradients.GRADIENT_9,
        type: CategoryType.EXPENSE,
    },
    {
        name: 'Їжа та напої',
        icon: Icons.BASKET_SHOPPING,
        color: Gradients.GRADIENT_10,
        type: CategoryType.EXPENSE,
    },
    {
        name: 'Освіта',
        icon: Icons.GRADUATION_CAP,
        color: Gradients.GRADIENT_11,
        type: CategoryType.EXPENSE,
    },
    {
        name: 'Інше',
        icon: Icons.TRASH,
        color: Gradients.GRADIENT_12,
        type: CategoryType.EXPENSE,
    },
];

export { defaultCategories };
