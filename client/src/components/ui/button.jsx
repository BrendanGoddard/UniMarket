export function Button({ children, ...props }) {
return (
<button
className="px-4 py-2 rounded transition btn"
{...props}
>
{children}
</button>
)
}