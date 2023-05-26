import { useEffect, useState } from "react";
import { Flex, Typography } from "@aura-ui/react";
import { searchData } from "../../lib/search";
import {
  AppItemProps,
  SearchFilter,
  TypeFilter,
  VersionItemProps,
} from "../../types";
import { AppItem } from "../explore/AppItem";
import { VersionItem } from "../appGroup/VersionItem";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();

  useEffect(() => {
    const query = location.search;

    const urlParams = new URLSearchParams(query);
    const type = urlParams.get("type");
    const filter = urlParams.get("filter");
    const value = urlParams.get("value");

    if (type && filter && value) {
      fetchResults({
        type: type as TypeFilter,
        filter: filter as SearchFilter,
        value: value as string,
      });
    } else {
      return;
    }
  }, []);

  const fetchResults = async (params: ParamsProps) => {
    if (!params) {
      return;
    }

    try {
      const res = await searchData(params.type, params.filter, params.value);

      setResults(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Flex
        direction="column"
        align="center"
        css={{ mt: "$10", mx: "auto", maxW: 600 }}
      >
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
