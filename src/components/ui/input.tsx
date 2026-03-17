import * as React from "react";
import { cn } from "@/lib/shadcn/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

function Input({
  className,
  type,
  icon,
  iconPosition = "left",
  ...props
}: InputProps) {
  const hasIcon = Boolean(icon);
  const [showPassword, setShowPassword] = React.useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      {hasIcon && (
        <span
          className={cn(
            "text-muted-foreground absolute top-1/2 -translate-y-1/2",
            iconPosition === "left" ? "left-3" : "right-3",
          )}
        >
          {icon}
        </span>
      )}

      <input
        type={inputType}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-primary focus-visible:ring-1",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          hasIcon && (iconPosition === "left" ? "pr-3 pl-9" : "pr-9 pl-3"),
          isPassword && "pr-10", // espaço para o botão do olho
          className,
        )}
        {...props}
      />

      {isPassword && (
        <button
          type="button"
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          onClick={() => setShowPassword((prev) => !prev)}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      )}
    </div>
  );
}

export { Input };
