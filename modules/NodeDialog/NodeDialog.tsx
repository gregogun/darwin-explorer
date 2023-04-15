import {
  ArrowRightIcon,
  BadgeIcon,
  CheckIcon,
  CopyIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import {
  Dialog,
  DialogTitle,
  Button,
  Box,
  IconButton,
  styled,
  Typography,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  Flex,
  Separator as SeparatorBase,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@aura-ui/react";
import { NodeProps } from "../../types";
import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";
import { config } from "../../config";
import arweaveGraphql from "arweave-graphql";
import { arweave } from "../../lib/arweave";
import { VscRepoForked } from "react-icons/vsc";
import { RxDownload, RxFile, RxFileText } from "react-icons/rx";
import { HiBadgeCheck } from "react-icons/hi";
import { getStampCount, stampAsset } from "../../lib/stamps";

const StyledDropdownMenuItem = styled(DropdownMenuItem, {
  color: "$indigo11",
  px: "$3",
  gap: "$2",
  justifyContent: "start",

  variants: {
    color: {
      indigo: {
        "&[data-disabled]": {
          color: "$indigo8",
          pointerEvents: "none",
        },

        "&[data-highlighted]": {
          backgroundColor: "$indigo4",
          color: "$indigo12",
        },

        "&:hover": {
          backgroundColor: "$indigo4",
          color: "$indigo12",
        },
      },
    },
  },

  defaultVariants: {
    color: "indigo",
  },
});

const DescriptionContainer = styled("div", {
  pl: 60,
  pr: 80,
  py: "$5",
});

const TagsContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1.5fr",
  mb: "$5",
  pl: 60,
  pr: 100,
});

const TagsWrapper = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "$2",
});

const Tag = styled("div", {
  py: "$1",
  px: "$2",
  backgroundColor: "$indigo3",
  color: "$indigo11",
  boxShadow: "0 0 0 1px $colors$indigo7",
  br: "$pill",
  fontSize: "$1",
});

const ValueWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$3",
});

const InfoContainer = styled("div", {
  pl: 60,
  pr: 100,
  py: "$5",
});

const InfoItemContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1.5fr",
  mb: "$2",
});

const MainInfoItem = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => {
  const timeAgo = (date: number) => {
    return formatDistance(new Date(date), new Date(), { addSuffix: true });
  };
  return (
    <InfoItemContainer>
      <Typography
        weight="6"
        size="3"
        css={{
          color: "$indigo10",
          textTransform: "capitalize",
          userSelect: "none",
        }}
      >
        {title}
      </Typography>
      <Typography
        weight="6"
        size="3"
        css={{
          color: "$indigo11",
        }}
      >
        {typeof value === "number" && title === "published"
          ? timeAgo(value)
          : value}
      </Typography>
    </InfoItemContainer>
  );
};

interface AbbreviateAddressOptions {
  startChars?: number;
  endChars?: number;
  noOfEllipsis?: number;
}

interface AbbreviateAddress {
  address: string | undefined;
  options?: AbbreviateAddressOptions;
}

const MoreInfoItem = ({
  title,
  value,
  exclude,
}: {
  title: keyof IdInfo;
  value: string | undefined;
  exclude?: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  let renamedTitle;

  switch (title) {
    case "id":
      renamedTitle = "Version ID";
      break;
    case "metaId":
      renamedTitle = "Meta ID";
      break;
    case "groupId":
      renamedTitle = "App ID";
      break;
    case "forks":
      renamedTitle = "Parent Fork ID";
      break;
    case "author":
      renamedTitle = "Author";
      break;
    default:
      renamedTitle = "";
      break;
  }

  const abbreviateAddress = ({ address, options = {} }: AbbreviateAddress) => {
    if (!address) return;
    const { startChars = 5, endChars = 4, noOfEllipsis = 2 } = options;

    if (address.length <= startChars + endChars) {
      return address;
    }

    const dot = ".";
    const firstFive = address?.substring(0, startChars);
    const lastFour = address?.substring(address.length - endChars);
    return `${firstFive}${dot.repeat(noOfEllipsis)}${lastFour}`;
  };

  const handleClick = () => {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <>
      {exclude || !value ? null : (
        <InfoItemContainer>
          <Typography
            weight="6"
            size="3"
            css={{
              color: "$indigo10",
              userSelect: "none",
            }}
          >
            {renamedTitle}
          </Typography>
          <ValueWrapper>
            <Typography
              weight="6"
              size="3"
              css={{
                color: "$indigo11",
              }}
            >
              {value
                ? abbreviateAddress({
                    address: value,
                    options: { startChars: 7, endChars: 7 },
                  })
                : `No ${title}.`}
            </Typography>
            {value && (
              <IconButton
                onClick={handleClick}
                css={{
                  cursor: "pointer",
                  pointerEvents: isCopied ? "none" : "auto",
                  color: isCopied ? "$green11" : "$indigo10",

                  "&:hover, &:focus": {
                    backgroundColor: "transparent",
                    color: "$indigo11",
                  },
                }}
                size="1"
                variant="ghost"
              >
                {isCopied ? (
                  <Flex
                    align="center"
                    gap="1"
                    css={{
                      color: "$green11",
                      fontSize: "$1",
                      lineHeight: "$1",
                      ml: "$7",
                    }}
                    as="span"
                  >
                    <CheckIcon />
                    Copied!
                  </Flex>
                ) : (
                  <CopyIcon />
                )}
              </IconButton>
            )}
          </ValueWrapper>
        </InfoItemContainer>
      )}
    </>
  );
};

const Separator = styled(SeparatorBase, {
  backgroundColor: "$indigo4",
});

type MainInfo = Pick<NodeProps, "title" | "published" | "stamps">;

type IdInfo = { author: string | undefined } & Pick<
  NodeProps,
  "id" | "metaId" | "groupId" | "forks"
>;

interface NodeDialogProps {
  open: boolean;
  onClose: () => void;
  node: Omit<NodeProps, "type">;
}

export const NodeDialog = ({ onClose, open, node }: NodeDialogProps) => {
  const [author, setAuthor] = useState<string>();
  const [appUrl, setAppUrl] = useState<string>();
  const [sourceUrl, setSourceUrl] = useState<string>();
  const [stampCount, setStampCount] = useState<number>();

  useEffect(() => {
    if (open) {
      getData();
    }
  }, [open]);

  // const getStamps = async () => {
  //   const stamps = await getStampCount(node.id);
  //   console.log("stamps", stamps);

  //   setStampCount(stamps);
  // };

  const getData = async () => {
    const data = await arweaveGraphql(
      `${config.gatewayUrl}/graphql`
    ).getTransactions({
      ids: node.id,
    });
    const stamps = await getStampCount(node.id);

    setStampCount(stamps);

    await arweave.transactions
      .getData(node.id, { decode: true })
      .then((data: any) => {
        console.log(data);

        setAppUrl(data.manifest);
        setSourceUrl(data.sourceCode);
      });

    const metadata = data.transactions.edges[0];
    console.log(metadata);

    const author = metadata.node.owner.address;

    setAuthor(author);
  };

  const mainData: MainInfo = {
    title: node.title,
    published: node.published,
    stamps: node.stamps,
  };

  const mainInfo = Object.entries(mainData).map(([key, value]) => ({
    key,
    value,
  }));

  const margin = 60;

  const ids: IdInfo = {
    id: node.id,
    metaId: node.metaId,
    groupId: node.groupId,
    forks: node.forks,
    author,
  };

  const moreInfo = Object.entries(ids).map(([key, value]) => ({
    key,
    value,
  }));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay
          css={{
            backdropFilter: "blur(1px)",
          }}
        />
        <DialogContent
          css={{
            backgroundColor: "$indigoA1",
            backdropFilter: "blur($space$3)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 0 1px $colors$indigo4",
            br: "$5",
            p: 0,
          }}
        >
          <Flex
            css={{
              p: "$5",
              pl: "$10",
              background:
                "linear-gradient(90deg, rgba(21, 25, 45, 0.25) 0%, rgba(21, 25, 45, 0.5) 100%)",
            }}
            align="center"
            justify="between"
          >
            <IconButton
              onClick={onClose}
              css={{
                br: "$round",
                backgroundColor: "transparent",
                boxShadow: "inset 0 0 0 1px $colors$indigo5",
                color: "$indigo11",

                "&:hover": {
                  backgroundColor: "$indigoA3",
                },

                "&:active": {
                  backgroundColor: "$indigo4",
                },

                "&:focus": {
                  boxShadow: "inset 0 0 0 1px $colors$indigo8",
                },
              }}
              size="1"
            >
              <Cross2Icon />
            </IconButton>
            <Flex gap="2">
              <Button
                onClick={() =>
                  stampAsset(node.id).then(async () => {
                    const stamps = await getStampCount(node.id);

                    setStampCount(stamps);
                  })
                }
                variant="outline"
                colorScheme="indigo"
              >
                <HiBadgeCheck />
                {stampCount ? stampCount : 0}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" colorScheme="indigo">
                    <VscRepoForked />
                    Fork
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent
                    css={{
                      backgroundColor: "$indigo2",
                      border: "1px solid $indigo6",
                    }}
                    sideOffset={8}
                  >
                    <StyledDropdownMenuItem
                      as="a"
                      href={`${config.gatewayUrl}/${sourceUrl}`}
                    >
                      <RxDownload />
                      Download Source
                    </StyledDropdownMenuItem>
                    <StyledDropdownMenuItem>
                      <RxFileText />
                      Fork Documentation
                    </StyledDropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
              <Button
                css={{ cursor: "pointer" }}
                as="a"
                href={`${config.gatewayUrl}/${appUrl}`}
                target="_blank"
                rel="noreferrer"
                variant="solid"
                colorScheme="indigo"
                aria-disabled={!appUrl}
              >
                Visit
                <ArrowRightIcon />
              </Button>
            </Flex>
          </Flex>
          <Separator />
          <Box
            css={{
              marginTop: 20,
            }}
          >
            <InfoContainer>
              <>
                {mainInfo.map((item) => (
                  <MainInfoItem
                    key={item.key}
                    title={item.key}
                    value={item.value}
                  />
                ))}
                {moreInfo
                  .filter((info) => info.key === "author")
                  .map((item) => (
                    <MoreInfoItem
                      key={item.key}
                      title={item.key as keyof IdInfo}
                      value={item.value}
                    />
                  ))}
              </>
            </InfoContainer>
            <Separator css={{ ml: margin, maxWidth: "$10" }} />
            <InfoContainer>
              {moreInfo
                .filter((info) => info.key !== "author")
                .map((item) => (
                  <MoreInfoItem
                    key={item.key}
                    title={item.key as keyof IdInfo}
                    value={item.value}
                  />
                ))}
            </InfoContainer>
            <TagsContainer>
              <Typography
                weight="6"
                size="3"
                css={{
                  color: "$indigo10",
                  userSelect: "none",
                }}
              >
                Topics
              </Typography>
              <TagsWrapper>
                {node.topics?.split(",").map((topic) => (
                  <Tag key={topic}>{topic}</Tag>
                ))}
              </TagsWrapper>
            </TagsContainer>
          </Box>
          <Separator />
          <DescriptionContainer>
            <Typography
              weight="6"
              size="3"
              css={{ color: "$indigo10", mb: "$1" }}
            >
              Description
            </Typography>
            <Typography css={{ color: "$indigo11" }}>
              {node.description}
            </Typography>
          </DescriptionContainer>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
