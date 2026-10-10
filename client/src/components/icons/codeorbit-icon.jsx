import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero.png";

/**
 * Full CodeOrbit logo.
 */
export function CodeOrbitLogo({ className, ...props }) {
  return (
    <img
      src={heroImage}
      alt="CodeOrbit"
      className={cn(
        "block h-20 w-auto shrink-0 object-contain",
        className
      )}
      {...props}
    />
  );
}

/**
 * Sidebar logo.
 */
// export function CodeOrbitIcon({ className, ...props }) {
//   return (
//     <img
//       src={heroImage}
//       alt="CodeOrbit"
//       className={cn(
//         "block h-16 w-auto shrink-0 object-contain",
//         className
//       )}
//       {...props}
//     />
//   );
// }

// export default CodeOrbitLogo;