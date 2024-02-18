import { useRouter } from "next/router";
import Back from "./Back";

type Props = {
  what: string;
};

const Apologize: React.FC<Props> = ({ what }: Props) => {
  const buttonStyle = "bg-white bg-opacity-50 mt-10 p-2 rounded-xl font-bold text-center";
  return (
    what && (
      <div className="flex flex-col items-center">
        <p className="p-5 text-xl font-bold text-center">You can't {what} someone else's account</p>
        <p className="p-5 text-xl text-center">Now apologize</p>
        <Back message="Sorry" style={buttonStyle} />
        <Back message="NEVER!!!" style={buttonStyle} />
      </div>
    )
  );
};
export default Apologize;
