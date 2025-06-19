interface AuthHeaderProps {
    title: string;
    subtitle: string;
    description: string;
}

const AuthHeader = ({ title, subtitle, description }: AuthHeaderProps) => {
    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-light tracking-wider">Travel Around</h1>
                <p className="text-sm text-gray-600">Explore More. Experience Life.</p>
            </div>

            <div className="">
                <div className="text-2xl font-light ml-8">{title}</div>
                <div className="px-8 text-sm text-gray-500">{description}</div>
            </div>
        </>
    );
};

export default AuthHeader;
