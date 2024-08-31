import React, { useRef } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useInteractions,
  FloatingPortal,
  FloatingFocusManager,

} from "@floating-ui/react";

export function PopoverNoArrow({ children, trigger, placement = "right", open, setOpen, classNameContent }) {

  const { refs, floatingStyles, context, middlewareData, placement: currentPlacement } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(5),
      flip(),
      shift(),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return (
    <>
      {/* Apply refs and props to the trigger element */}
      {React.cloneElement(trigger, {
        ref: refs.setReference,
        ...getReferenceProps(),
        onClick: () => setOpen(!open),
      })}
      {open && (
        <FloatingPortal>
          <FloatingFocusManager context={context}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="Popover"
            >
              <div className={classNameContent}>
                {children}
              </div>
              {/* Adjust FloatingArrow component for dynamic positioning */}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}

