import { useEffect, useState } from "react";
import {
  Grid,
  Flex,
  Typography,
  keyframes,
  styled,
  TextField,
  Button,
} from "@aura-ui/react";
import { TreeGraphDialog } from "../modules/TreeGraph/TreeGraphDialog";
import graph from "@permaweb/asset-graph";
import { TreeNode } from "../types";
import { FormikErrors, useFormik } from "formik";
import { config } from "../config";
import { useRouter } from "next/dist/client/router";

const moveBg = keyframes({
  to: {
    backgroundPosition: "var(--bg-size) 0",
  },
});

const FormGroup = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "$2",
  width: "100%",
});

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);
  const [rawTree, setRawTree] = useState<TreeNode>();
  const router = useRouter();

  useEffect(() => {
    // console.log(router.query.tx);

    if (router.query.tx) {
      //@ts-ignore
      validateTx(router.query.tx);
    } else {
      return;
    }
  }, [router.query.tx]);

  const validateTx = async (tx: string) => {
    try {
      const res = await graph(tx);
      setRawTree(res);
      handleShowDialog();
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik<{ id: string }>({
    initialValues: {
      id: rawTree?.id || "",
    },
    validate: (values) => {
      const errors: FormikErrors<{ id: string }> = {};

      if (!values.id) {
        errors.id = "No App Version ID provided";
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting, validateField }) => {
      validateField("id");
      setSubmitting(true);
      const res = await graph(values.id);
      console.log(res);

      if (!res) {
        formik.setErrors({ id: "App Version not found" });
      }

      setRawTree(res);
      setSubmitting(false);
      handleShowDialog();
    },
  });

  const handleShowDialog = () => setShowDialog(true);
  const handleCancelDialog = () => setShowDialog(false);

  return (
    <Grid
      css={{
        placeItems: "center",
        height: "100%",
        background: `url(${config.gatewayUrl}/rZxyRryWyH-8cis1yzrXR4Dyzx8LaNllkVVA29rdggE)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <Flex
        css={{
          mt: "-$20",
          py: "$10",
          px: "$12",
          br: "$3",
          boxShadow: "inset 0 0 0 2px $colors$indigo4",
          backdropFilter: "blur($space$3)",
        }}
        align="center"
        direction="column"
        gap="10"
      >
        <Flex align="center" direction="column" gap="3">
          <Typography
            css={{
              "--bg-size": "400%",

              letterSpacing: "-1px",
              background: `linear-gradient(
              90deg,
              hsla(263, 93%, 69%, 1),
              hsla(282, 57%, 64%, 1),
              hsla(325, 55%, 66%, 1),
              hsla(0, 92%, 75%, 1),
              hsla(16, 65%, 78%, 1),
              hsla(32, 50%, 80%, 1),
              hsla(16, 65%, 78%, 1),
              hsla(0, 92%, 75%, 1),
              hsla(325, 55%, 66%, 1),
              hsla(282, 57%, 64%, 1),
              hsla(263, 93%, 69%, 1)
            ) 0 0 / var(--bg-size) 100%`,

              color: "transparent",
              "-webkit-background-clip": "text",
              backgroundClip: "text",

              "@media (prefers-reduced-motion: no-preference)": {
                animation: `${moveBg} 12s infinite linear`,
              },
            }}
            size="4"
            weight="5"
          >
            A whole new era for web applications
          </Typography>
          <Typography
            contrast="hiContrast"
            css={{ letterSpacing: "-1px" }}
            size="8"
            weight="6"
          >
            Evolutionary App Explorer
          </Typography>
        </Flex>
        <FormGroup onSubmit={formik.handleSubmit}>
          <TextField
            name="id"
            size="2"
            onChange={formik.handleChange}
            variant="outline"
            css={{
              "&[type]": {
                width: "100%",
                boxShadow: "0 0 0 1px $colors$indigo7",
                color: "$indigo12",

                "&::placeholder": {
                  color: "$indigo9",
                },

                "&::selection": {
                  background: "$indigo9",
                  color: "white",
                },

                "&:hover": {
                  boxShadow: "0 0 0 1px $colors$indigo8",
                },

                "&:focus": {
                  boxShadow: "inset 0 0 0 2px $colors$indigo8",
                },
              },
            }}
            placeholder="Enter an App Version ID"
          />
          <Button
            css={{
              color: "$indigo11",
              backgroundColor: "$indigoA3",

              "&:hover": {
                backgroundColor: "$indigoA4",
              },

              "&:active": {
                backgroundColor: "$indigoA5",
              },

              "&:focus-visible": {
                boxShadow: "inset 0 0 0 2px $colors$indigoA8",
              },
            }}
            size="3"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Loading..." : "View Fork Tree"}
          </Button>
          {formik.errors && (
            <Typography css={{ color: "$red11", textAlign: "center" }} size="1">
              {formik.errors.id}
            </Typography>
          )}

          <TreeGraphDialog
            rawTree={rawTree}
            open={showDialog}
            onClose={handleCancelDialog}
          />
        </FormGroup>
      </Flex>
    </Grid>
  );
}
