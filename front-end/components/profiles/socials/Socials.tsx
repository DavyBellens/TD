import { FormEvent, useState } from "react";
import InputField from "../personalInformation/InputField";

type Props = {
  socials?: string[];
  callBack: Function;
  setStage: Function;
};

const SocialsForm: React.FC<Props> = ({ socials, callBack, setStage }: Props) => {
  const [instagram, setInstagram] = useState<string>(socials ? socials[0] : "");
  const [facebook, setFacebook] = useState<string>(socials ? socials[1] : "");
  const [snapchat, setSnapchat] = useState<string>(socials ? socials[2] : "");
  const [messenger, setMessenger] = useState<string>(socials ? socials[3] : "");
  const [phoneNumber, setPhoneNumber] = useState<string>(socials ? socials[4] : "");
  const [instagramError, setInstagramError] = useState<string>("");
  const [facebookError, setFacebookError] = useState<string>("");
  const [snapchatError, setSnapchatError] = useState<string>("");
  const [messengerError, setMessengerError] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const validate = () => {
    let isValid = true;
    if (instagram && instagram.length > 30) {
      setInstagramError("Instagram username can't be longer than 30 characters");
      isValid = false;
    }

    if (facebook && facebook.length > 50) {
      setFacebookError("Facebook username can't be longer than 50 characters");
      isValid = false;
    }
    if (snapchat && snapchat.length > 30) {
      setSnapchatError("Snapchat username can't be longer than 30 characters");
      isValid = false;
    }
    if (messenger && messenger.length > 50) {
      setMessengerError("Messenger username can't be longer than 50 characters");
      isValid = false;
    }
    if (phoneNumber && phoneNumber.replace(" ", "").length > 12) {
      setPhoneNumberError("Phone number can't be longer than 12 digits");
      isValid = false;
    }
    const socialsList = [instagram, facebook, snapchat, messenger, phoneNumber];
    const empty = socialsList.filter((s) => s == "" || s == undefined);
    if (empty.length === socialsList.length) {
      setError("At least one is required");
      isValid = false;
    }
    return isValid;
  };
  const handleSubmit = (e: FormEvent) => {
    const socialsList = [instagram, facebook, snapchat, messenger, phoneNumber];
    e.preventDefault();
    e.stopPropagation();
    if (!validate()) return;
    callBack(socialsList);
    setStage(3);
  };

  const btns = "bg-white bg-opacity-80 rounded-lg text-black p-2 pl-4 pr-4 ";
  const labelStyle = "text-md mt-3";
  const input = "bg-white bg-opacity-60 text-black p-1 rounded-lg";
  return (
    <>
      <form>
        <h1 className="text-xl m-5 text-center">
          <strong>Where can people contact you?</strong>
          <br />
          <small>(Only 1 required)</small>
        </h1>
        <div className="flex flex-col">
          <InputField
            labelStyle={labelStyle}
            inputStyle={input}
            callBack={setInstagram}
            field="Instagram"
            id="instagramInput"
            type="text"
            value={instagram}
          />
          {instagramError}
        </div>
        <div className="flex flex-col">
          <InputField
            labelStyle={labelStyle}
            inputStyle={input}
            callBack={setFacebook}
            field="Facebook"
            id="facebookInput"
            type="text"
            value={facebook}
          />
          {facebookError}
        </div>
        <div className="flex flex-col">
          <InputField
            labelStyle={labelStyle}
            inputStyle={input}
            callBack={setSnapchat}
            field="Snapchat"
            id="snapchatInput"
            type="text"
            value={snapchat}
          />
          {snapchatError}
        </div>
        <div className="flex flex-col">
          <InputField
            labelStyle={labelStyle}
            inputStyle={input}
            callBack={setMessenger}
            field="Messenger"
            id="messengerInput"
            type="text"
            value={messenger}
          />
          {messengerError}
        </div>
        <div className="flex flex-col">
          <InputField
            labelStyle={labelStyle}
            inputStyle={input}
            callBack={setPhoneNumber}
            field="Phone Number"
            id="phoneNumberInput"
            type="tel"
            value={phoneNumber}
          />
          {phoneNumberError}
        </div>
        {error && <div>{error}</div>}
      </form>
      <div className="flex justify-between w-full mt-3">
        <button type="submit" className={btns} onClick={() => setStage(1)}>
          Go back
        </button>
        <button type="submit" className={btns} onClick={handleSubmit}>
          Next
        </button>
      </div>
    </>
  );
};
export default SocialsForm;
