export default function PageTitle({title}) {
    return (
        <div className="text-4xl font-bold bg-transparent text-base-content">
            <h2>{title}</h2>
            <hr className="w-full mt-1 mb-4 border-accent border-2"/>
        </div>
    );
}
