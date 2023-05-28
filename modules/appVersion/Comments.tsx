import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Box,
  Button,
  Flex,
  Grid,
  Textarea,
  Toast,
  Typography,
} from "@aura-ui/react";
import { FormikErrors, useFormik } from "formik";
import { readComment, writeComment } from "../../lib/comments";
import { Comment } from "../../types";
import { CommentItem } from "./CommentItem";
import { Loader } from "../../ui/Loader";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useConnect } from "arweave-wallet-ui-test";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import { abbreviateAddress } from "../../utils";
import { useMotionAnimate } from "motion-hooks";
import { stagger } from "motion";

interface CommentsProps {
  versionTx: string;
  versionOwner: string;
}

export const Comments = ({ versionTx, versionOwner }: CommentsProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState("");
  const { profile, walletAddress } = useConnect();
  const queryClient = useQueryClient();
  const commentRef = useRef<HTMLDivElement | null>(null);
  const { play } = useMotionAnimate(
    ".comment",
    { opacity: 1 },
    {
      delay: stagger(0.075),
      duration: 0.75,
      easing: "ease-in-out",
    }
  );
  const {
    data: commentsData,
    isLoading: commentsLoading,
    isError: commentsError,
    fetchNextPage,
    hasNextPage: moreComments,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments"],
    cacheTime: 0,
    enabled: !!versionTx,
    queryFn: ({ pageParam }) =>
      readComment({ sourceTx: versionTx, cursor: pageParam }),
    getNextPageParam: (lastPage) => {
      // check if we have more pages.
      if (!lastPage.hasNextPage) {
        return undefined;
      }

      // return the cursor of the last item on the last page.
      return lastPage.data[lastPage.data.length - 1].cursor;
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

      if (!versionTx) {
        setErrors({ comment: "No source transaction ID found." });
        return;
      }

      commentMutation.mutate({
        comment: values.comment as string,
        sourceTx: versionTx,
      });
    },
  });

  const commentMutation = useMutation({
    mutationFn: writeComment,
    onSuccess: (data) => {
      if (submitting) {
        setSubmitting(false);
      }
      setCommentSuccess(
        `Comment successfully created: ${abbreviateAddress({
          address: data.id,
        })}`
      );

      // we do this to give data time to be read back from network
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["comments"] });
      }, 250);

      formik.resetForm();
    },
    onError: (error: any) => {
      if (submitting) {
        setSubmitting(false);
      }
      console.error(error);
    },
  });

  const commentList = commentsData?.pages.flatMap((page) => page.data);

  // Play the animation on mount of the component
  useEffect(() => {
    if (commentList && commentList.length > 0) {
      play();
    }
  }, [commentsData]);

  useEffect(() => {
    // prohibit scroll into view on initial load
    if (commentsData && commentsData?.pages.length > 1) {
      commentRef.current?.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [commentsData, commentsData?.pages]);

  const commentLabel = walletAddress ? "Comment" : "Connect to comment";

  return (
    <>
      <Flex css={{ my: "$7", py: "$3" }} direction="column" gap="3">
        <Typography as="h3" size="5" weight="6">
          Comments
        </Typography>
        <Flex
          as="form"
          onSubmit={formik.handleSubmit}
          css={{
            p: "$3",
            boxShadow: "0 0 0 1px $colors$slate3",
            br: "$3",

            "&:hover": {
              boxShadow: "0 0 0 1px $colors$slate4",
            },

            "&:focus-within": {
              boxShadow: "0 0 0 2px $colors$indigo10",
            },
          }}
          direction="column"
          gap="2"
        >
          <Flex gap="2">
            {walletAddress && (
              <Box
                css={{
                  pt: "$1",
                }}
              >
                <Avatar size="3">
                  <AvatarImage
                    src={
                      profile?.avatar
                        ? profile.avatar
                        : `https://source.boringavatars.com/marble/40/${walletAddress}`
                    }
                  />
                  <AvatarFallback>
                    {walletAddress.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Box>
            )}
            <Textarea
              css={{
                flex: 1,

                boxShadow: "none",
                minHeight: 100,
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
          </Flex>
          <Button
            type="submit"
            disabled={submitting || !walletAddress || !formik.values.comment}
            css={{ alignSelf: "end" }}
            variant="solid"
            colorScheme="indigo"
          >
            {!submitting && !commentSuccess && commentLabel}
            {submitting && "Submitting..."}
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
        <Box
          css={{
            mt: "$5",
          }}
        >
          <Flex direction="column" gap="3">
            {commentsData?.pages.map((infinitePage, i) => (
              <React.Fragment key={i}>
                {infinitePage.data.map((comment) => (
                  <CommentItem
                    key={comment.txid}
                    txid={comment.txid}
                    owner={comment.owner}
                    isOwner={versionOwner === comment.owner}
                    published={comment.published}
                    comment={comment.comment}
                    account={comment.account[0]}
                    ref={commentRef}
                  />
                ))}
              </React.Fragment>
            ))}
          </Flex>
        </Box>
        {commentsLoading && (
          <Grid
            css={{
              my: "$10",
              width: "100%",
              min: 80,
              placeItems: "center",
            }}
          >
            <Loader />
          </Grid>
        )}
        {/* prevent false pagination for excluded/filtered results that are not factored into hasNextPage */}
        {moreComments && commentList && commentList?.length > 0 && (
          <Button
            disabled={isFetchingNextPage}
            colorScheme="indigo"
            css={{
              alignSelf: "center",
            }}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage
              ? "Loading more comments..."
              : "Load more comments"}
          </Button>
        )}
        {commentsError ||
          // if there is no comment items on the first page, show no data view
          (commentsData?.pages[0].data.length === 0 && !commentsLoading && (
            <Flex
              align="center"
              css={{
                my: "$10",
                "& svg": { size: "$6" },
                color: "$slate11",
              }}
              direction="column"
              gap="5"
            >
              <ChatBubbleIcon />
              <Typography weight="6">No comments yet...</Typography>
              <Typography size="2">
                Be the first to share your thoughts!
              </Typography>
            </Flex>
          ))}
      </Flex>
      <Toast
        open={!!commentSuccess}
        onOpenChange={() => setCommentSuccess("")}
        title="Comment submitted"
        description={commentSuccess}
        colorScheme="green"
      />
    </>
  );
};
