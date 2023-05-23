import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "../../ui/Popover";
import {
  Flex,
  IconButton,
  Label,
  Radio,
  RadioGroup,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@aura-ui/react";
import { InfoCircledIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { SearchFilter, TypeFilter } from "../../types";
import { SetStateAction } from "react";

interface AdvancedFilterProps {
  type: TypeFilter;
  filter: SearchFilter;
  setType: React.Dispatch<SetStateAction<TypeFilter>>;
  setFilter: React.Dispatch<SetStateAction<SearchFilter>>;
}

export const AdvancedFilter = ({
  type,
  filter,
  setType,
  setFilter,
}: AdvancedFilterProps) => {
  const handleTypeChange = (value: TypeFilter) => setType(value);
  const handleFilterChange = (value: SearchFilter) => setFilter(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton size="1" variant="outline">
          <MixerHorizontalIcon />
        </IconButton>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          css={{
            backdropFilter: "blur(6px)",
            display: "flex",
            flexDirection: "row",
            gap: "$10",
            justify: "between",
          }}
          collisionPadding={20}
          sideOffset={12}
        >
          <Flex direction="column" gap="3">
            <Label>Search for: </Label>
            <RadioGroup
              onValueChange={(value) => handleTypeChange(value as TypeFilter)}
              defaultValue={type}
              css={{
                gap: "$3",
              }}
            >
              <Flex align="center" gap="1">
                <Radio colorScheme="indigo" value="app">
                  App
                </Radio>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoCircledIcon />
                  </TooltipTrigger>
                  <TooltipContent></TooltipContent>
                </Tooltip>
              </Flex>
              <Flex align="center" gap="1">
                <Radio colorScheme="indigo" value="version">
                  Version
                </Radio>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoCircledIcon />
                  </TooltipTrigger>
                  <TooltipContent>
                    Relates to specific versions of an app
                  </TooltipContent>
                </Tooltip>
              </Flex>
            </RadioGroup>
          </Flex>
          <Flex direction="column" gap="3">
            <Label>Search by: </Label>
            <RadioGroup
              onValueChange={(value) =>
                handleFilterChange(value as SearchFilter)
              }
              defaultValue={filter}
              css={{
                gap: "$3",
              }}
            >
              <Radio colorScheme="indigo" value="name">
                Name
              </Radio>
              <Radio colorScheme="indigo" value="id">
                Transaction ID
              </Radio>
            </RadioGroup>
          </Flex>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
};
