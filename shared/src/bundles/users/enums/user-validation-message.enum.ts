enum UserValidationMessage {
    EMAIL_REQUIRE = 'Email обов\'яковий',
    EMAIL_WRONG = 'Неправильна e-mail адреса',
    PASSWORD_REQUIRE = 'Пароль обов\'яковий',
    PASSWORD_MIN = 'Мінімум 8 символів ',
    PASSWORD_MAX = 'Максимум 30 символів',
    PASSWORD_CONFIRM = 'Паролі не співпадають',
    FIRSTNAME_REQUIRE = 'Ім\'я обов\'язкове',
    FIRSTNAME_INVALID = 'Неправильний формат імені',
    NAME_MIN = 'Мінімум 2 символи',
    NAME_MAX = 'Максимум 30 символів',
    FIRSTNAME_INCORRECT = 'Некоректний символ в імені',
    LASTNAME_REQUIRE = 'Прізвище обов\'язкове',
    LASTNAME_INVALID = 'Неправильний формат прізвища',
    LASTNAME_INCORRECT = 'Некоректний символ в прізвищі',
    DATE_FORMAT_WRONG = 'Некоректна дата',
    DATE_REQUIRE = 'Некоректна дата народження',
    DATE_MINIMUM = 'Ви повинні бути старше 16 років',
}

export { UserValidationMessage };
