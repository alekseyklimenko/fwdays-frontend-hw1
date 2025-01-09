const LoadingSpinner = ({ size = 'sm', color = 'cyan' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    const colorClasses = {
        cyan: 'border-cyan-500',
        blue: 'border-blue-500',
        red: 'border-red-500',
        green: 'border-green-500',
        purple: 'border-purple-500'
    };

    return (
        <div className="flex items-center justify-center">
            <div className={`${sizeClasses[size]} border-4 border-t-transparent ${colorClasses[color]} rounded-full animate-spin`}/>
        </div>
    );
};

export default LoadingSpinner;
