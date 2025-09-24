export function Card({ children, className = '' }) {
return <div className={`card ${className}`}>{children}</div>;
}


export function CardContent({ children }) {
return <div className="flex flex-col gap-2">{children}</div>;
}