import { forwardRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { CSS, keyframes, styled } from "../stitches.config";
import { IconButton } from "./IconButton";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "rgba(8, 8, 8, 0.7)",
  position: "fixed",
  inset: 0,

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  children: React.ReactNode;
  overlay?: boolean;
};

export function Dialog({ children, overlay = true, ...props }: DialogProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal>
        {overlay && <StyledOverlay />}
        {children}
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: "$slate1",
  color: "$slate11",
  borderRadius: 8,
  boxShadow: "0px 0px 33px rgba(0, 0, 0, 0.08)",
  position: "fixed",
  margin: "auto",
  width: "90vw",
  maxWidth: "550px",
  maxHeight: "max-content",
  padding: 20,
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  transform: "translate(-50%, -50%)",

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    willChange: "transform",
  },

  "&:focus": { outline: "none" },
});

const StyledCloseButton = styled(DialogPrimitive.Close, {
  position: "absolute",
  top: 20,
  right: 20,
});

type DialogContentProps = React.ComponentProps<
  typeof DialogPrimitive.Content
> & { closeButton?: boolean; closeButtonStyles?: CSS };

export const DialogContent = forwardRef<
  React.ElementRef<typeof StyledContent>,
  DialogContentProps
>(
  (
    { children, closeButton = true, closeButtonStyles, ...props },
    forwardedRef
  ) => (
    <StyledContent {...props} ref={forwardedRef}>
      {children}
      {closeButton && (
        <StyledCloseButton asChild>
          <IconButton css={closeButtonStyles}>
            <Cross1Icon width={15} height={15} />
          </IconButton>
        </StyledCloseButton>
      )}
    </StyledContent>
  )
);

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
