import {
  Box,
  Button,
  darkTheme,
  Flex,
  Grid,
  Separator,
  Textarea,
  Typography,
} from "@aura-ui/react";
import {
  ArrowRightIcon,
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";
import { Tag } from "arweave-graphql";
import { useEffect, useState } from "react";
import { HiThumbUp } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { getVersionInfo } from "../../lib/getVersionInfo";
import { Skeleton } from "../../ui/Skeleton";
import { abbreviateAddress, timeAgo } from "../../utils";
import { getStampCount, stampAsset } from "../../lib/stamps";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { FormikErrors, useFormik } from "formik";
import { readComment, writeComment } from "../../lib/comments";
import { Comment } from "../../types";
import { CommentItem } from "./CommentItem";
import { Loader } from "../../ui/Loader";
import { useConnect } from "arweave-wallet-ui-test";

interface VersionProps {
  title: string;
  description: string;
  txid: string;
  metaId: string;
  logo: string;
  topics: Tag[];
  published: string;
  owner: string;
  source: string;
}

const AppVersion = () => {
  const [version, setVersion] = useState<VersionProps>();
  const [isCopied, setIsCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { walletAddress } = useConnect();
  const location = useLocation();
  const queryClient = useQueryClient();
  const {
    data: stamps,
    isLoading: stampsLoading,
    isError: stampsError,
  } = useQuery({
    queryKey: ["stamps"],
    enabled: !!version?.txid,
    queryFn: () => {
      if (!version?.txid) {
        throw new Error("No txid for the asset provided");
      }

      return getStampCount(version.txid);
    },
  });
  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useQuery({
    queryKey: ["comments"],
    enabled: !!version?.txid,
    queryFn: () => {
      if (!version?.txid) {
        throw new Error("No source txid found");
      }

      return readComment(version.txid);
    },
  });
  const formik = useFormik<Pick<Comment, "comment">>({
    initialValues: {
      comment: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: (values) => {
      const errors: FormikErrors<Pick<Comment, "comment">> = {};

      if (values.comment && values.comment.length < 3) {
        errors.comment = "Comment must be a minimum of 3 characters.";
      }

      if (values.comment && values.comment.length > 300) {
        errors.comment = "Comment must be a maximum of 300 characters.";
      }

      if (submitting) {
        setSubmitting(false);
      }
      return errors;
    },
    onSubmit: async (values, { setErrors, validateForm }) => {
      setSubmitting(true);
      validateForm();

      const wallet = await window.arweaveWallet;

      if (!wallet) {
        setErrors({ comment: "Connect a wallet to comment." });
        return;
      }

      if (!version?.txid) {
        setErrors({ comment: "No source transaction ID found." });
        return;
      }

      commentMutation.mutate({
        comment: values.comment as string,
        sourceTx: version.txid,
      });
    },
  });

  const commentMutation = useMutation({
    mutationFn: writeComment,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      if (submitting) {
        setSubmitting(false);
      }
      formik.resetForm();
    },
    onError: (error: any) => {
      if (submitting) {
        setSubmitting(false);
      }
      console.error(error);
    },
  });

  useEffect(() => {
    const query = location.search;
    const urlParams = new URLSearchParams(query);

    const id = urlParams.get("tx");

    if (id) {
      fetchVersionInfo(id);
    } else {
      return;
    }
  }, []);

  const fetchVersionInfo = async (tx: string) => {
    try {
      const res = await getVersionInfo(tx);
      setVersion(res[0] as VersionProps);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopy = (tx: string | undefined) => {
    if (!tx) {
      return;
    }
    navigator.clipboard.writeText(tx).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  const mutation = useMutation({
    mutationFn: stampAsset,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["stamps"] });
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const handleClick = () => {
    if (!version?.txid) {
      return;
    }

    mutation.mutate(version?.txid);
  };

  useEffect(() => {
    console.log(submitting);
  }, [submitting]);

  const commentLabel = walletAddress ? "Comment" : "Connect to comment";

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return (
    <Flex
      direction="column"
      css={{
        mt: "$10",
        maxW: 600,
        mx: "auto",
      }}
    >
      <Box>
        <Flex justify="between">
          {version ? (
            <Typography
              as="h2"
              css={{
                color: "$slate12",
              }}
              size="8"
              weight="6"
            >
              {version.title}
            </Typography>
          ) : (
            <Skeleton
              css={{
                br: "$1",
                width: 200,
                height: "$7",
              }}
            />
          )}
          <Flex gap="5">
            <Button
              disabled={!version}
              as="a"
              href={`https://g8way.io/${version?.txid}`}
              colorScheme="indigo"
              css={{ gap: "$2" }}
            >
              Visit
              <ArrowRightIcon />
            </Button>
            <Button
              onClick={handleClick}
              disabled={!version}
              colorScheme="indigo"
              variant="solid"
            >
              <HiThumbUp />
              Stamp
              <Flex
                css={{
                  backgroundColor: "$indigo11",
                  [`.${darkTheme} &`]: {
                    backgroundColor: "$indigo8",
                  },
                  pt: 2,
                  px: "$1",
                  placeItems: "center",
                  minWidth: 20,
                  maxHeight: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  br: "$pill",
                  fontSize: 10,
                  color: "white",
                }}
              >
                {stampsLoading || stampsError || typeof stamps === "undefined"
                  ? "-"
                  : stamps}
              </Flex>
            </Button>
          </Flex>
        </Flex>
        <Flex
          css={{
            mt: "$1",
            "& p": {
              color: "$slate11",
              fontSize: "$2",
              lineHeight: "$2",
            },
          }}
          align="center"
          gap="1"
        >
          {version ? (
            <>
              <Typography>
                Created by {abbreviateAddress({ address: version.owner })}
              </Typography>
              <Typography>•</Typography>
              <Typography>{timeAgo(Number(version.published))}</Typography>
            </>
          ) : (
            <Skeleton
              css={{
                br: "$1",
                width: 240,
                height: "$5",
              }}
            />
          )}
        </Flex>
        <Flex css={{ mt: "$10" }} direction="column" gap="1">
          <Typography css={{ color: "$slate11" }}>Description</Typography>
          {version ? (
            <Typography>{version.description}</Typography>
          ) : (
            <Skeleton
              css={{
                br: "$1",
                width: "100%",
                height: "$30",
              }}
            />
          )}
        </Flex>
        <Flex css={{ mt: "$10" }} gap="5">
          <Button
            variant="ghost"
            css={{
              gap: "$2",
              p: 0,
              "&:hover": {
                backgroundColor: "transparent",
                color: "$slate12",
              },
              "&:active": { backgroundColor: "transparent" },
            }}
            disabled={!version}
            href={`https://g8way.io/${version?.metaId}`}
            as="a"
          >
            Release Notes
            <FileTextIcon />
          </Button>
          <Button
            variant="ghost"
            css={{
              gap: "$2",
              p: 0,
              "&:hover": {
                backgroundColor: "transparent",
                color: "$slate12",
              },
              "&:active": { backgroundColor: "transparent" },
            }}
            disabled={!version}
            href={`https://g8way.io/${version?.source}`}
            as="a"
          >
            Download source
            <DownloadIcon />
          </Button>
          <Button
            variant="ghost"
            css={{
              gap: "$2",
              p: 0,
              pointerEvents: isCopied ? "none" : "auto",
              color: isCopied ? "$green11" : "$slate11",
              "&:hover": {
                backgroundColor: "transparent",
                color: "$slate12",
              },
              "&:active": { backgroundColor: "transparent" },
            }}
            disabled={!version}
            onClick={() => handleCopy(version?.txid)}
          >
            {isCopied ? "Copied!" : "Copy Version ID"}
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </Button>
        </Flex>
        <Box
          css={{
            background:
              "linear-gradient(89.46deg, #1A1B1E 1.67%, rgba(26, 29, 30, 0) 89.89%)",
            height: 1,
            my: "$3",
          }}
        />
        <Flex
          as="form"
          onSubmit={formik.handleSubmit}
          css={{
            mt: "$5",
            p: "$3",
            boxShadow: "0 0 0 1px $colors$slate3",
            br: "$3",

            "&:hover": {
              boxShadow: "0 0 0 1px $colors$slate4",
            },

            "&:focus-within": {
              boxShadow: "0 0 0 2px $colors$blue8",
            },
          }}
          direction="column"
          gap="2"
        >
          <Textarea
            css={{
              boxShadow: "none",
              minHeight: 120,
              resize: "none",

              "&:hover": {
                boxShadow: "none",
              },

              "&:focus": {
                boxShadow: "none",
              },
            }}
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            required
            minLength={3}
            maxLength={300}
            variant="outline"
            placeholder="Share your thoughts..."
          />
          <Button
            type="submit"
            disabled={
              !version || submitting || !walletAddress || !formik.values.comment
            }
            css={{ alignSelf: "end" }}
            variant="solid"
            colorScheme="indigo"
          >
            {submitting ? "Submitting..." : commentLabel}
          </Button>
        </Flex>
        {formik.values.comment.length < 3 && formik.errors.comment && (
          <Typography
            size="2"
            css={{
              mt: "$2",
              color: "$red11",
            }}
          >
            {formik.errors.comment}
          </Typography>
        )}

        <Flex css={{ mt: "$7", py: "$3" }} direction="column" gap="3">
          <Typography as="h3" size="5" weight="6">
            Comments
          </Typography>
          <Separator
            css={{
              background:
                "linear-gradient(89.46deg, #1A1B1E 1.67%, rgba(26, 29, 30, 0) 89.89%)",
            }}
          />
          <Flex direction="column" gap="3">
            {comments &&
              comments.length > 0 &&
              comments.map((comment) => (
                <CommentItem
                  key={comment?.txid}
                  txid={comment?.txid}
                  owner={comment?.owner}
                  isOwner={version?.owner === comment?.owner}
                  published={comment?.published}
                />
              ))}
          </Flex>
          {commentsLoading && (
            <Grid
              css={{
                width: "100%",
                min: 80,
                placeItems: "center",
              }}
            >
              <Loader />
            </Grid>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default AppVersion;
