import { useRouter } from "next/router";
type Props = {
  message: string;
  style: string;
};
const Back: React.FC<Props> = ({ message, style }: Props) => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className={style}>
      {message}
    </button>
  );
};
export default Back;
