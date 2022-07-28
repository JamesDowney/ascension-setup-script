import { Box, Select, SelectProps } from "@chakra-ui/react";
import Line from "./Line";

interface Props extends SelectProps {
  header: string;
  optionData: string[];
  disabled?: boolean;
}

const Selector: React.FC<Props> = ({
  header,
  name,
  value,
  onChange,
  children,
  optionData,
  disabled,
}) => {
  const options = optionData.map((option) => (
    <option value={option} key={option}>
      {option}
    </option>
  ));

  return (
    <Box alignSelf="stretch" alignContent="flex-start" marginLeft={4}>
      <Line>{header}:</Line>
      <Select onChange={onChange} name={name} value={value} disabled={disabled}>
        {children}
        {options}
      </Select>
    </Box>
  );
};

export default Selector;
