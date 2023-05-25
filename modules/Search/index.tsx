import { darkTheme, Flex, styled, TextField } from "@aura-ui/react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { iconButton } from "../../styles/iconButton";
import { SearchFilter, TypeFilter } from "../../types";
import { AdvancedFilter } from "./AdvancedFilter";

const SearchButton = styled(Link, {
  ...iconButton,
});

export const Search = () => {
  const [filter, setFilter] = useState<SearchFilter>("name");
  const [type, setType] = useState<TypeFilter>("app");
  const [value, setValue] = useState<string>();
  const location = useLocation();

  useEffect(() => {
    if (value) {
      setValue("");
    }
  }, [location]);

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
        value={value || ""}
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
        <SearchButton
          size="1"
          variant="outline"
          // aria-label="Search"
          to={{
            pathname: "/search",
            search: `?type=${type}&filter=${filter}&value=${value}`,
          }}
        >
          <MagnifyingGlassIcon />
        </SearchButton>
      </Flex>
    </Flex>
  );
};
