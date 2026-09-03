import {
    CheckCircle2,
    Circle
} from "lucide-react";

interface PasswordChecklistProps {

    password: string;

}

export default function PasswordChecklist({

    password

}: PasswordChecklistProps) {

    const checks = [

        {
            label: "At least 8 characters",
            valid: password.length >= 8
        },

        {
            label: "One uppercase letter",
            valid: /[A-Z]/.test(password)
        },

        {
            label: "One lowercase letter",
            valid: /[a-z]/.test(password)
        },

        {
            label: "One number",
            valid: /[0-9]/.test(password)
        },

        {
            label: "One special character",
            valid: /[^A-Za-z0-9]/.test(password)
        }

    ];

    return (

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-slate-700 dark:bg-slate-900">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                Password Requirements
            </h3>

            <div className="space-y-3">
                {
                    checks.map((item) => (
                        <div key={item.label} className="flex items-center gap-3" >
                            {
                                item.valid
                                    ? ( <CheckCircle2 size={18} className="text-green-500" /> )
                                    : ( <Circle size={18} className="text-gray-400" />)
                            }
                            <span
                                className={
                                    item.valid
                                        ? "text-sm font-medium text-green-600 dark:text-green-400"
                                        : "text-sm text-gray-500 dark:text-gray-400"}
                            >
                                {item.label}
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}