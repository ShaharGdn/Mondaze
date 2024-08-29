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
  arrow,
  FloatingArrow,
} from "@floating-ui/react";

export function Popover({ children, trigger, placement = "bottom", open, setOpen }) {
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context, middlewareData, placement: currentPlacement } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(5),
      flip(),
      shift(),
      arrow({ element: arrowRef }),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  const ARROW_WIDTH = 20; // Example arrow size
  const ARROW_HEIGHT = 10; // Example arrow size
  const arrowX = middlewareData.arrow?.x ?? 0;
  const arrowY = middlewareData.arrow?.y ?? 0;

  // Determine if the popover is on top or bottom
  const isPopoverOnTop = currentPlacement.startsWith('top');
  const isPopoverOnLeft = currentPlacement.startsWith('left');
  const isPopoverOnRight = currentPlacement.startsWith('right');

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
              {children}
              {/* Adjust FloatingArrow component for dynamic positioning */}
              <FloatingArrow
                ref={arrowRef}
                context={context}
                width={ARROW_WIDTH}
                height={ARROW_HEIGHT}
                style={{
                  left: arrowX,
                  top: isPopoverOnTop ? '100%' : undefined, 
                  bottom: isPopoverOnTop ? undefined : '100%', 
                  transformOrigin: 'center',
                  fill: "white",
                }}
              />
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}

