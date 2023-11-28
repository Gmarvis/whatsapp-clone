import React, { FC, useState, useRef } from "react";

interface Props {}

const OTPField: FC<Props> = (props): JSX.Element => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      {otp.map((_, index) => {
        return (
          <React.Fragment key={index}>
            <input
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={otp[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              maxLength={1}
              className="w-12 h-12 border-2 rounded-md bg-transparent outline-none text-center font-semibold text-xl border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
            />
            {index === otp.length - 1 ? null : (
              <span className="w-2 py-0.5 bg-gray-100" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OTPField;
