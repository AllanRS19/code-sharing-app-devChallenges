import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

const selectVariants = cva(
    "appearance-none inline-flex items-center rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-gray-brand-200 text-gray-brand-600",
    {
        variants: {
            size: {
                default: "h-9 pl-4 pr-9 py-2",
                sm: "h-8 pl-3 pr-8 gap-1.5",
                lg: "h-12 pl-6 pr-10 text-base font-medium",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

const Select = ({
    className,
    size,
    options,
    ...props
}: React.ComponentProps<"select"> &
    VariantProps<typeof selectVariants> & {
        options: readonly string[];
    }
) => {
    return (
        <div className="relative inline-flex">
            <select
                className={cn(selectVariants({ size, className }))}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.toLowerCase()} value={option === 'Dark' ? 'vs-dark' : option.toLowerCase()}>
                        {option}
                    </option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4" />
        </div>
    );
};

export { Select };