import { type Recurrence } from '../types/types.js';

const recurrences: Recurrence[] = [
    { value: 'ONCE', label: 'Один раз' },
    { value: 'DAILY', label: 'Щодня' },
    { value: 'WEEKLY', label: 'Щотижня' },
    { value: 'BIWEEKLY', label: 'Двічі на тиждень' },
    { value: 'MONTHLY', label: 'Щомісяця' },
    { value: 'YEARLY', label: 'Щорічно' },
];

export { recurrences };
