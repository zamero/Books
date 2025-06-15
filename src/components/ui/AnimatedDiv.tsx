import { motion } from "framer-motion"; // Using framer-motion as motion.dev is a library, and framer-motion is a popular React animation library that aligns with the provided documentation.

interface AnimatedDivProps {
  children: React.ReactNode;
  delay?: number;
}

export function AnimatedDiv({ children, delay = 0 }: AnimatedDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {children}
    </motion.div>
  );
}