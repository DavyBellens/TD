type Props = {
  id: string;
  field: string;
  type: string;
  value: string | number;
  callBack: Function;
  inputStyle: string;
  labelStyle: string;
};

const InputField: React.FC<Props> = ({ id, field, type, value, callBack, inputStyle, labelStyle }) => {

  return (
    <>
      <label className={labelStyle} htmlFor={id}>
        {/*"text-md mt-3"*/}
        <strong>{field}:</strong>
      </label>
      <input
        className={inputStyle}
        id={id}
        type={type}
        value={typeof value === "number" ? (value > 0 ? value : "") : value} // don't show default age of 0
        onChange={(e) => callBack(e.target.value)}
      />
    </>
  );
};
export default InputField;
