export type InputProps = {
  label?: string;
  name: string;
  type: string;
  register?: any;
  errorMessage?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  inputClassName?: string;
};

export default function Input({
  label,
  name,
  type,
  register,
  errorMessage,
  className,
  onChange,
  inputClassName,
  ...rest
}: InputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        data-state={errorMessage ? "error" : ""}
        // {...register}
        onChange={onChange}
        {...rest}
        className={`
        px-2 h-8 w-full items-center text-base transition-all outline-none focus-visible:outline-none disabled:pointer-events-none
        border-transparent border-2 focus:outline-none focus:ring-0 focus-within:border-gray-500 data-[state=error]:border-red-500
        bg-gray-200 placeholder:text-gray-500 hover:bg-gray-300 
        rounded-md
        ${inputClassName}
        `}
      />
      {errorMessage && <InputErrorMessage message={errorMessage} />}
    </div>
  );
}

export const InputErrorMessage = ({message}: {message: string}) => {
  return (
    <div className="flex flex-col">
      <p className="text-red-500 text-sm">{message}</p>
    </div>
  );
};
