import { motion } from 'framer-motion';

const RainEffect = () => {
  const raindropCount = 100;
  
  const raindrops = Array.from({ length: raindropCount }, (_, index) => ({
    id: index,
    left: `${Math.random() * 100}vw`,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 2,
  }));

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute bg-cyan-400 w-[2px] h-[10px] rounded-lg opacity-90"
          style={{
            left: drop.left,
          }}
          initial={{ y: -100 }}
          animate={{ y: "100vh" }}
          transition={{
            y: {
              repeat: Infinity,
              repeatType: "loop",
              duration: drop.duration,
              delay: drop.delay,
            },
          }}
        />
      ))}
    </div>
  );
};

export default RainEffect;
