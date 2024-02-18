import { Gender } from "@/types";
import { FormEvent, useState } from "react";

type Props = {
  callBack: Function;
  existing?: Gender;
  setStage: Function;
};

const GenderForm: React.FC<Props> = ({ callBack, existing, setStage }: Props) => {
  const [gender, setGender] = useState<Gender | undefined>(existing ? existing : undefined);
  const [error, setError] = useState<string>("");
  const validate = () => {
    let isValid = true;
    if (!gender) {
      setError("You must choose an option");
      isValid = false;
    }
    return isValid;
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!validate()) return;
    callBack(gender);
    setStage(4);
  };

  const handleSelect = (e: FormEvent, gender: Gender) => {
    e.preventDefault();
    e.stopPropagation();
    setGender(gender);
  };

  const setClickedStyle = (value: Gender) => {
    if (value === gender) {
      return " bg-opacity-70 ";
    } else {
      return " bg-opacity-50 ";
    }
  };

  const btns = "bg-white bg-opacity-80 rounded-lg text-black p-2 pl-4 pr-4 ";
  const input =
    "text-center bg-white bg-opacity-50 text-white w-full justify-center text-xl p-3 items-center rounded-3xl flex flex-col ";

  return (
    <>
      <form className="grid grid-cols-2 justify-center items-center mt-5 gap-5 w-max">
        <h1 className="text-xl m-2 text-center col-span-2">
          <strong>What's your gender?</strong>
        </h1>
        <button className={input + setClickedStyle("WOMAN")} onClick={(e) => handleSelect(e, "WOMAN")}>
          <span className="text-6xl font-mono">♀</span>
          <strong>Woman</strong>
        </button>
        <button className={input + setClickedStyle("MAN")} onClick={(e) => handleSelect(e, "MAN")}>
          <span className="text-6xl font-mono">♂</span>
          <strong>Man</strong>
        </button>
        <button className={input + setClickedStyle("X")} onClick={(e) => handleSelect(e, "X")}>
          <span className="text-4xl font-mono font-bold">X</span> <strong className="text-xl w-min">Non-Binary</strong>
        </button>
        <button className={input + setClickedStyle("OTHER") + " h-full"} onClick={(e) => handleSelect(e, "OTHER")}>
          <strong>Other</strong>
        </button>
        <button
          className={input + setClickedStyle("SECRET") + " col-span-2 text-md"}
          onClick={(e) => handleSelect(e, "SECRET")}
        >
          <strong>Prefer not to say</strong>
        </button>
      </form>
      {error && <div>{error}</div>}
      <div className="flex justify-between w-full mt-3">
        <button type="submit" className={btns} onClick={() => setStage(2)}>
          Go back
        </button>
        <button type="submit" className={btns} onClick={handleSubmit}>
          Next
        </button>
      </div>
    </>
  );
};
export default GenderForm;
