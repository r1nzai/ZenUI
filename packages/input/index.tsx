import { cx } from '@zen/utils/cx';
import { ComponentProps } from 'react';

export default function Input(props: InputProps) {
    const { className, ...rest } = props;
    return (
        <input
            className={cx(
                'h-10 w-full rounded border-2 border-input bg-background px-3 py-2 text-sm text-foreground transition',
                'focus-visible:border-primary focus-visible:shadow-xs focus-visible:shadow-ring focus-visible:outline-hidden',
                'read-only:cursor-pointer read-only:border-none! read-only:bg-transparent read-only:text-foreground read-only:shadow-none! read-only:outline-hidden!',
                'disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted',
                'file:border-0 file:bg-transparent file:text-sm file:font-medium',
                className,
            )}
            {...rest}
        />
    );
}

export type InputProps = ComponentProps<'input'>;
