import { Icon } from "lucide-react";

type Props = {
  Text: string;
  Icon: Icon;
};

const TextWithIcon = (props: Props) => {
  const { Text, Icon } = props;
  return (
    <div className="flex items-center space-x-1">
      <Icon className="inline-block text-center text-[#A162F7]" size={20} />
      <span className="inline-block mr-1 text-gray-600">{Text}</span>
    </div>
  );
};

export default TextWithIcon;
