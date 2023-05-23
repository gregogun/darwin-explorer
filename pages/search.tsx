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
import { AppHeader } from "../modules/Layout/AppHeader";
import { useRouter } from "next/router";
import { searchData } from "../lib/search";
import {
  AppItemProps,
  SearchFilter,
  TypeFilter,
  VersionItemProps,
} from "../types";
import { AppItem } from "../modules/Cards/AppItem";
import { VersionItem } from "../modules/Cards/VersionItem";

function isVersionItem(
  item: VersionItemProps | AppItemProps
): item is VersionItemProps {
  return (item as VersionItemProps).id !== undefined;
}

interface ParamsProps {
  type: TypeFilter;
  filter: SearchFilter;
  value: string;
}

export default function Search() {
  const [results, setResults] = useState<AppItemProps[] | VersionItemProps[]>();
  const router = useRouter();

  useEffect(() => {
    const query = router.query;
    if (query && query.type && query.filter && query.value) {
      fetchResults({
        type: query.type as TypeFilter,
        filter: query.filter as SearchFilter,
        value: query.value as string,
      });
    } else {
      return;
    }
  }, [router.query]);

  const fetchResults = async (params: ParamsProps) => {
    if (!params) {
      return;
    }

    try {
      const res = await searchData(params.type, params.filter, params.value);
      // console.log("search found", res);

      setResults(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AppHeader />
      <Flex direction="column" align="center" css={{ mt: "$10" }}>
        <Typography css={{ mb: "$5" }} size="6" weight="6">
          Search Results
        </Typography>
        {results && results.length > 0 ? (
          results.map((app) => {
            if (isVersionItem(app)) {
              return (
                <VersionItem
                  key={app.id}
                  title={app.title}
                  description={app.description}
                  topics={app.topics}
                  stamps={app.stamps}
                  id={app.id}
                />
              );
            } else {
              return (
                <AppItem
                  key={app.txid}
                  title={app.title}
                  description={app.description}
                  txid={app.txid}
                  baseId={app.baseId}
                  logo={app.logo}
                  topics={app.topics}
                  published={app.published}
                />
              );
            }
          })
        ) : (
          <Typography>No results</Typography>
        )}
      </Flex>
    </>
  );
}
