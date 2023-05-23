import { darkTheme, Flex, IconButton, TextField } from "@aura-ui/react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchFilter, TypeFilter } from "../../types";
import { AdvancedFilter } from "./filter";

export const Search = () => {
  const [filter, setFilter] = useState<SearchFilter>("name");
  const [type, setType] = useState<TypeFilter>("app");
  const [value, setValue] = useState<string>();

  useEffect(() => {
    console.log(type);
  }, [type]);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  return (
    <Flex
      as="form"
      css={{
        position: "relative",
        minWidth: 300,
      }}
      gap="1"
      align="center"
    >
      <TextField
        onChange={(e) => setValue(e.currentTarget.value)}
        css={{
          "&[type]": {
            lineHeight: "$sizes$11",
          },
        }}
        size="2"
        variant="outline"
        placeholder="Search..."
        border
      />
      <Flex
        css={{
          position: "absolute",
          right: "$2",
          bottom: "$2",
          backgroundColor: "$indigo1",
          [`.${darkTheme} &`]: {
            backgroundColor: "#08090A",
          },
        }}
        gap="1"
      >
        <AdvancedFilter
          type={type}
          filter={filter}
          setType={setType}
          setFilter={setFilter}
        />
        <Link
          href={`/search?type=${type}&filter=${filter}&value=${value}`}
          passHref
        >
          <IconButton as="a" size="1" variant="outline" aria-label="Search">
            <MagnifyingGlassIcon />
          </IconButton>
        </Link>
      </Flex>
    </Flex>
  );
};
