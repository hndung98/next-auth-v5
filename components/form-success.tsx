import { TiInputChecked } from "react-icons/ti";

type FormSuccessProps = {
  message: string;
};

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 flex items-center gap-x-2 text-sm text-emerald-500">
      <TiInputChecked className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
