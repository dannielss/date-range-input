import { format } from 'date-fns';

export const formatDate = (date: Date | null) => (date ? format(date, 'MM/dd/yyyy') : '');

export const customCalendarStyle = (
  isSelected: boolean | null,
  isInRange: boolean | null,
  highlightColor: string,
  highlightRangeColor: string,
  color: string
) => {
  if (isSelected) {
    return {
      backgroundColor: highlightColor,
      borderColor: highlightColor,
      color,
    };
  } else if (isInRange) {
    return {
      backgroundColor: highlightRangeColor,
      borderColor: highlightRangeColor,
      color,
    };
  }

  return {
    borderColor: highlightColor,
  };
};
