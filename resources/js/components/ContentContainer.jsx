export default function ContentContainer({children}) {
    return (
        <div className={`
            bg-base-200 h-[calc(100vh-210px)] grid w-100 z-0 justify-center place-content-center gap-2 p-2
        `}>
            {children}
        </div>
    );
}
