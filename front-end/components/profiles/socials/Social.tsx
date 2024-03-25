import { CopyToClipboard } from "react-copy-to-clipboard";
type Props = {
  name: string;
  data: string;
};
const Social: React.FC<Props> = ({ name, data }: Props) => {
  return (
    <div className="flex flex-col">
      <span className="text-black font-bold m-1 p-1">{name}:</span>
      <div className=" text-black m-1 grid grid-cols-5">
        <span className=" bg-white rounded-lg m-1 pl-1 col-span-4 break-words">{data}</span>
        <CopyToClipboard text={data}>
          <span className="text-center mb-1">📋</span>
        </CopyToClipboard>
      </div>
    </div>
  );
};
export default Social;
