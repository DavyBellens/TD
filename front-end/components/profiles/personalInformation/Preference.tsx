import { Preference } from "@/types";
import { FormEvent, useState } from "react";

type Props = {
  callBack: Function;
  existing?: Preference;
  setStage: Function;
};

const PreferenceForm: React.FC<Props> = ({ callBack, existing, setStage }: Props) => {
  const [preference, setPreference] = useState<Preference | undefined>(existing ? existing : undefined);
  const [error, setError] = useState<string>("");
  const validate = () => {
    let isValid = true;
    if (!preference) {
      setError("You must choose an option");
      isValid = false;
    }
    return isValid;
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!validate()) return;
    callBack(preference);
    setStage(5);
  };

  const handleSelect = (e: FormEvent, preference: Preference) => {
    e.preventDefault();
    e.stopPropagation();
    setPreference(preference);
  };

  const setClickedStyle = (value: Preference) => {
    return value === preference ? "bg-opacity-70" : "bg-opacity-50";
  };

  const btns = "bg-white bg-opacity-80 rounded-lg text-black p-2 pl-4 pr-4 ";
  const input =
    "text-center bg-white bg-opacity-50 text-white w-full justify-center text-xl p-3 items-center rounded-3xl flex flex-col ";

  return (
    <>
      <form className="grid grid-cols-2 justify-center items-center mt-5 gap-5 w-max ">
        <h1 className="text-xl m-2 text-center col-span-2 mb-0">
          <strong>
            What's your <br /> preference?
          </strong>
        </h1>
        <button className={input + setClickedStyle("FEMALE")} onClick={(e) => handleSelect(e, "FEMALE")}>
          <span className="text-6xl font-mono">♀</span>
          <strong>Female</strong>
        </button>
        <button className={input + setClickedStyle("MALE")} onClick={(e) => handleSelect(e, "MALE")}>
          <span className="text-6xl font-mono">♂</span>
          <strong>Male</strong>
        </button>
        <button className={input + setClickedStyle("BOTH") + " col-span-2 "} onClick={(e) => handleSelect(e, "BOTH")}>
          <span className="text-6xl font-mono">♀♂</span>
          <strong className="text-xl ">Both</strong>
        </button>
        <button
          className={input + setClickedStyle("OTHER/SECRET") + " col-span-2 text-md"}
          onClick={(e) => handleSelect(e, "OTHER/SECRET")}
        >
          <strong className="grid grid-rows-2 w-full">
            <span>Other/</span>
            <span>Prefer not to say</span>
          </strong>
        </button>
      </form>
      {error && <div>{error}</div>}
      <div className="flex justify-between w-full mt-3">
        <button type="submit" className={btns} onClick={() => setStage(3)}>
          Go back
        </button>
        <button type="submit" className={btns} onClick={handleSubmit}>
          Next
        </button>
      </div>
    </>
  );
};
export default PreferenceForm;
