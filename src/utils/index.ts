import { format } from 'date-fns';

export const formatDate = (date: Date | null) => (date ? format(date, 'MM/dd/yyyy') : '');
