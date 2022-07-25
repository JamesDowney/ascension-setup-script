import { useState } from "react";
import { Box, Select } from "@chakra-ui/react";
import Line from "./Line";

interface Props {
  header: string;
  dataToParent?: any;
  dataFromParent?: (newType: any) => void;
}

const Selector: React.FC<Props> = ({ header, dataToParent }) => {
  const [selectedItem, setSelectedItem] = useState<any>();

  const selectItem = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedItem(value);
    event.preventDefault();
    dataToParent?.(value);
  };

  return (
    <Box alignSelf="stretch" alignContent="flex-start">
      <Line>{header}:</Line>
      <Select onChange={selectItem} value={selectedItem} />
    </Box>
  );
};

export default Selector;
