interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
}

export default function Button({ children, className, variant, ...rest }: ButtonProps) {
  const variantClasses = {
    primary: 'bg-black hover:bg-gray-900 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-black',
    destructive: 'bg-red-500 hover:bg-red-600 text-white',
    outline: 'border border-gray-500 text-gray-500 hover:bg-gray-200',
  };

  return (
    <button
      className={`
      inline-flex items-center justify-center whitespace-nowrap text-sm 
      h-10
      w-auto
      px-3
      rounded-md
      ${variant ? variantClasses[variant] : variantClasses.primary}
      ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
}
