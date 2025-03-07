import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import { cx } from '@zen/utils/cx';
import useClickOutside from '@zen/utils/useClickOutside';
import { ComponentProps, MouseEvent, RefObject, useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Popover(props: PopoverProps) {
    const {
        className,
        placement = 'bottom-start',
        trigger = 'hover',
        content,
        children,
        onClose,
        onOpen,
        disabled = false,
        show = false,
        setShow,
        role = 'tooltip',
        style,
        ...rest
    } = props;
    const [__internalShow, __setInternalShow] = useState(show);
    const getShow = () => {
        return setShow !== undefined && show !== undefined ? show : __internalShow;
    };
    const getShowSetter = () => {
        return setShow !== undefined && show !== undefined ? setShow : __setInternalShow;
    };
    const { x, y, strategy, refs } = useFloating({
        open: getShow(),
        middleware: [offset(4), flip(), shift()],
        whileElementsMounted: autoUpdate,
        placement,
    });
    const rootId = useId();
    useEffect(
        useClickOutside(refs.floating as RefObject<HTMLElement>, (outside) => {
            if (outside) {
                getShowSetter()(false);
            }
        }),
        [],
    );
    return (
        <>
            <div
                className="z-auto min-w-fit max-w-fit"
                id={`zen__popover-${rootId}`}
                ref={refs.setReference}
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                    if (trigger === 'click') {
                        if (disabled) {
                            return;
                        }
                        if (getShow()) {
                            getShowSetter()(false);
                            onClose?.();
                        } else {
                            getShowSetter()(true);
                            onOpen?.();
                        }
                    }
                    e.stopPropagation();
                }}
                role={role}
            >
                {children}
            </div>
            {getShow() &&
                createPortal(
                    <div
                        {...rest}
                        onClick={(e) => e.stopPropagation()}
                        role="tooltip"
                        className={cx(
                            'zen__popover z-50 w-fit rounded border border-border bg-background shadow-secondary',
                            className,
                        )}
                        ref={refs.setFloating}
                        style={{
                            ...style,
                            position: strategy,
                            top: y ?? 0,
                            left: x ?? 0,
                        }}
                    >
                        {content}
                    </div>,
                    document.body,
                )}
        </>
    );
}

export interface PopoverProps extends Omit<ComponentProps<'div'>, 'content'> {
    placement?: Placement;
    className?: string;
    children?: React.ReactNode;
    trigger?: 'hover' | 'click';
    content?: React.ReactNode;
    onOpen?: () => void;
    onClose?: () => void;
    disabled?: boolean;
    show?: boolean;
    setShow?: (show: boolean) => void;
    role?: AriaRole | ComponentRole;
}
type AriaRole = 'tooltip' | 'dialog' | 'alertdialog' | 'menu' | 'listbox' | 'grid' | 'tree';
type ComponentRole = 'select' | 'label' | 'combobox';
type Placement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end';
