import * as React from 'react';
export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    value?: Date | null;
    defaultValue?: Date | null;
    onValueChange?: (value: Date) => void;
    month?: Date;
    defaultMonth?: Date;
    onMonthChange?: (month: Date) => void;
    min?: Date;
    max?: Date;
    locale?: string;
    weekStartsOn?: 0 | 1;
    previousLabel?: string;
    nextLabel?: string;
}
export declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=date-picker.d.ts.map