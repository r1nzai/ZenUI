import Component, { ComponentProps } from '@zen/component';
import { cx } from '@zen/utils/cx';

export default function Input(props: InputProps) {
    const { className, ...rest } = props;
    return (
        <Component
            tag="input"
            className={cx(
                'h-10 w-full rounded border-2 border-input bg-background px-3 py-2 text-sm text-foreground transition',
                'focus-visible:border-primary focus-visible:shadow-sm focus-visible:shadow-ring focus-visible:outline-none',
                'disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted',
                'file:border-0 file:bg-transparent file:text-sm file:font-medium',
                className,
            )}
            {...rest}
        />
    );
}

export interface InputProps extends ComponentProps<'input'> {}
