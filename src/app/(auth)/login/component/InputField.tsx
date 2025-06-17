interface InputFieldProps {
    label: string;
    type?: string;
    register?: any;
    required?: boolean;
    placeholder?: string;
    className?: string;
}

const InputField = ({
    label,
    type = "text",
    register,
    required = false,
    placeholder,
    className = ""
}: InputFieldProps) => {
    return (
        <div>
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <input
                {...(register && register({ required }))}
                type={type}
                placeholder={placeholder}
                className={`w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400 ${className}`}
            />
        </div>
    );
};

export default InputField;
