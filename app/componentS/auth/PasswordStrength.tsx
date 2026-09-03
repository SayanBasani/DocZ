interface PasswordStrengthProps {

    score: number;

}

const levels = [

    {
        label: "Very Weak",
        width: "20%",
        color: "bg-red-500"
    },

    {
        label: "Weak",
        width: "40%",
        color: "bg-orange-500"
    },

    {
        label: "Fair",
        width: "60%",
        color: "bg-yellow-500"
    },

    {
        label: "Strong",
        width: "80%",
        color: "bg-blue-500"
    },

    {
        label: "Very Strong",
        width: "100%",
        color: "bg-green-500"
    }

];

export default function PasswordStrength({
    score
}: PasswordStrengthProps) {
    if (score === 0) { return null; }
    const current = levels[Math.min(score - 1, levels.length - 1)];
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password Strength
                </span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {current.label}
                </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                <div  className={`h-full rounded-full transition-all duration-300 ${current.color} ${current.width}`}  />
            </div>
        </div>
    );
}