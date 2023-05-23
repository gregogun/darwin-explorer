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
import { SearchFilter, TypeFilter } from "../types";

interface ParamsProps {
  type: TypeFilter;
  filter: SearchFilter;
  value: string;
}

export default function Search() {
  const [results, setResults] = useState<[]>();
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
          <Typography>{results}</Typography>
        ) : (
          <Typography>No results</Typography>
        )}
      </Flex>
    </>
  );
}
