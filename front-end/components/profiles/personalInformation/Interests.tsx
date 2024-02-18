import React, { useEffect, useState } from "react";

type Props = {
  existing?: string[];
  callback: Function;
  setInterestsError: Function;
};

const Interests: React.FC<Props> = ({ existing, callback, setInterestsError }: Props) => {
  const [interestToAdd, setInterestToAdd] = useState<string>("");
  const [interests, setInterests] = useState<string[]>(existing ? existing : []);

  const addInterest = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setInterestsError("");
    if (interests.includes(interestToAdd)) {
      setInterestsError("You already added this interest");
      return;
    }
    if (!interestToAdd.trim()) {
      setInterestsError("An interest can't be empty");
      return;
    }
    const newInterests = [...interests, interestToAdd];
    if (newInterests.length > 10) {
      setInterestsError("Max. 10 interests allowed");
      return;
    }
    setInterests(newInterests);
    callback(newInterests);
    setInterestToAdd("");
    return;
  };
  const removeInterest = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: string) => {
    e.preventDefault();
    e.stopPropagation();
    setInterestsError("");
    const newInterests = [...interests.filter((i) => i != value)];
    setInterests(newInterests);
    callback(newInterests);
    return;
  };
  return (
    <div className="flex flex-col justify-center">
      <label className="text-center text-md" htmlFor="interestInput">
        <strong>Interests:</strong>
      </label>
      <ul>
        {interests &&
          interests.map((i, index) => {
            return (
              <li
                key={index}
                className={
                  "grid grid-cols-4 bg-white bg-opacity-60 text-black " +
                  //if there are more than one interests then check
                  (interests.length > 1
                    ? //if it is the first interest
                      index == 0
                      ? // if it is, then tell it to only round the top-right and -left
                        " rounded-tr-lg rounded-tl-lg"
                      : // if it is the last element then only round the bottom right and left
                        index == interests.length - 1 && " rounded-br-lg rounded-bl-lg"
                    : // otherwise just round large
                      "rounded-lg")
                }
              >
                <span className="col-span-3 p-1">{i}</span>
                <button
                  className={
                    "bg-white bg-opacity-90 text-red-600 p-1 rounded-s-none " +
                    (interests.length > 1
                      ? index == 0
                        ? " rounded-tr-lg "
                        : index == interests.length - 1 && " rounded-br-lg "
                      : " rounded-lg ")
                  }
                  onClick={(e) => removeInterest(e, i)}
                >
                  <strong>X</strong>
                </button>
              </li>
            );
          })}
      </ul>
      <div className="grid grid-cols-4 mt-1">
        <input
          type="text"
          id="interestInput"
          className="bg-white bg-opacity-60 text-black p-1 rounded-lg rounded-e-none w-full col-span-3"
          onChange={(e) => {
            setInterestToAdd(e.target.value);
            setInterestsError("");
          }}
          value={interestToAdd}
        />
        <button
          className="bg-white bg-opacity-90 text-black p-1 rounded-lg rounded-s-none "
          onClick={(e) => {
            addInterest(e);
          }}
        >
          add
        </button>
      </div>
    </div>
  );
};

export default Interests;
