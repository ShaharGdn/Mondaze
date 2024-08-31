import React from "react";
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

export function PopoverNoArrow({
  children,
  trigger,
  open,
  setOpen,
  placement = 'bottom-start',  // Default placement
  offset: offsetValue = 5,     // Default offset
  flip: flipEnabled = true,    // Default flip enabled
  shift: shiftEnabled = true   // Default shift enabled
}) {
  const { refs, floatingStyles, context } = useFloating({
    placement,  // Use the passed placement prop
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(offsetValue),  // Use the passed offset prop
      flipEnabled && flip(),  // Conditionally include flip middleware
      shiftEnabled && shift()  // Conditionally include shift middleware
    ].filter(Boolean),  // Filter out any false middleware
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return (
    <>
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
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
