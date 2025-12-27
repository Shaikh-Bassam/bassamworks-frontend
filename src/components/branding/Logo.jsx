import { BRAND } from "../../config/branding";

export default function Logo({ className = "" }) {
    return (
        <h2 className={`text-white text-xl font-extrabold tracking-tight ${className}`}>
            {BRAND.first}
            {
                BRAND.second && (
                    <span className="text-gray-400 font-semibold">
                        {BRAND.second}
                    </span>
                )
            }
        </h2>
    );
}
