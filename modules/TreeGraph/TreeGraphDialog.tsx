import {
  Box,
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  IconButton,
  styled,
} from "@aura-ui/react";
import { GraphKey } from "./GraphKey";
import { TreeGraph } from "./TreeGraph";
import { Cross1Icon } from "@radix-ui/react-icons";

const StyledDialogContent = styled(DialogContent, {
  width: "100%",
  minWidth: "100vw",
  maxWidth: "100vw",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "max-content",
});

interface TreeGraphDialogProps {
  open: boolean;
  onClose: () => void;
}

export const TreeGraphDialog = ({ open, onClose }: TreeGraphDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <StyledDialogContent>
          <Box
            css={{
              placeSelf: "center",
              position: "relative",
              width: "100%",
              height: "100vh",
              maxHeight: "100vh",
            }}
          >
            <DialogClose asChild>
              <IconButton
                css={{
                  top: "$5",
                  right: "$5",
                  zIndex: 1,
                  backgroundColor: "$indigo3",
                  color: "$indigo11",

                  "&:hover": {
                    backgroundColor: "$indigo4",
                  },

                  "&:active": {
                    backgroundColor: "$indigo5",
                  },

                  "&:focus": {
                    boxShadow: "inset 0 0 0 2px $colors$indigo8",
                  },
                }}
                colorScheme="indigo"
              >
                <Cross1Icon />
              </IconButton>
            </DialogClose>
            <GraphKey />
            <TreeGraph />
          </Box>
        </StyledDialogContent>
      </DialogPortal>
    </Dialog>
  );
};
