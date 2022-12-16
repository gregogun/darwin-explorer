import { useState } from "react";
import { Box } from "../components/Box";
import { Typography } from "../components/Typography";
import { Button } from "../components/Button";
import { TreeGraphDialog } from "../modules/TreeGraph/TreeGraphDialog";

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);

  const handleShowDialog = () => setShowDialog(true);
  const handleCancelDialog = () => setShowDialog(false);

  return (
    <Box
      css={{
        display: "grid",
        placeItems: "center",
        height: "100%",
        position: "relative",
      }}
    >
      <Typography
        css={{
          m: "$5",
          position: "absolute",
          top: "$5",

          textAlign: "center",
        }}
        size="h2"
      >
        Fair Forks Wrapper Page
      </Typography>
      <Button onClick={handleShowDialog} size="3">
        View Fork Tree
      </Button>
      <TreeGraphDialog open={showDialog} onClose={handleCancelDialog} />
    </Box>
  );
}
