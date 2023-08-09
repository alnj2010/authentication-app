import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export function useTextField(
    initial = ""
  ): [
    string,
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    Dispatch<SetStateAction<string>>
  ] {
    const [value, setValue] = useState<string>(initial);
  
    const textFieldHandler = (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
      setValue(e.target.value);
    };
  
    return [value, textFieldHandler, setValue];
  }
  