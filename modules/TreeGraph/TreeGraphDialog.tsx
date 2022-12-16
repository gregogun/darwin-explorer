import { Box } from "../../components/Box";
import { Dialog, DialogContent, DialogTitle } from "../../components/Dialog";
import { Typography } from "../../components/Typography";
import { styled } from "../../stitches.config";
import { GraphKey } from "./GraphKey";
import { TreeGraph } from "./TreeGraph";

const StyledDialogContent = styled(DialogContent, {
  width: "100vw",
  maxWidth: "100%",
  maxHeight: "100%",
});

interface TreeGraphDialogProps {
  open: boolean;
  onClose: () => void;
}

export const TreeGraphDialog = ({ open, onClose }: TreeGraphDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <StyledDialogContent
        closeButtonStyles={{
          top: 40,
          right: 40,
        }}
      >
        {/* <DialogTitle asChild>
          <Typography size="h2">Fork Tree</Typography>
        </DialogTitle> */}
        <Box
          css={{
            placeSelf: "center",
            position: "relative",
            width: "100%",
            height: "100vh",
            maxHeight: "100vh",
          }}
        >
          <GraphKey />
          <TreeGraph />
        </Box>
      </StyledDialogContent>
    </Dialog>
  );
};
