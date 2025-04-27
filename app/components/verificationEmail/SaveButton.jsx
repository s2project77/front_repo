import { Button } from "@/components/ui/button";

export default function SaveButton({ children, color = "green" }) {
  const colorClasses = {
    green: {
      bg: "bg-green-100",
      text: "text-green-900",
      hover: "hover:bg-green-200",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-900",
      hover: "hover:bg-blue-200",
    },
  };

  const styles = colorClasses[color] || colorClasses.green;

  return (
    <Button className={`${styles.bg} ${styles.text} ${styles.hover} px-8 md:px-12`}>
      {children}
    </Button>
  );
}
