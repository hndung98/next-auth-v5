import { FaExclamation } from "react-icons/fa";

type FormErrorProps = {
  message?: string;
};

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 flex items-center gap-x-2 text-sm text-destructive">
      <FaExclamation className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
