import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const covers = [
  { id: 1, color: "bg-red-400", message: "Tap to reveal surprise! 🎁" },
  { id: 2, color: "bg-yellow-400", message: "Unwrapping layer 2! 🎉" },
  { id: 3, color: "bg-blue-400", message: "Almost there... 💫" },
  { id: 4, color: "bg-pink-400", message: "One last peel! 🌟" },
];

const wishes = [
  "You light up every room you walk into ✨",
  "May this year bring you endless happiness 💖",
  "Keep being the amazing person you are 🌸",
  "Happy Birthday Dear Sis! 🎂🎉",
];

const balloons = new Array(10).fill(null).map((_, i) => ({
  id: i,
  left: Math.random() * 90 + "%",
  delay: Math.random() * 2,
}));

const fireworks = new Array(5).fill(null).map((_, i) => ({
  id: i,
  top: Math.random() * 70 + "%",
  left: Math.random() * 90 + "%",
  delay: Math.random() * 2,
}));

const GiftCard = () => {
  const [layer, setLayer] = useState(0);
  const [showPortal, setShowPortal] = useState(false);
  const [wishIndex, setWishIndex] = useState(0);

  const handleClick = () => {
    if (layer < covers.length) {
      setLayer(layer + 1);
    }
  };

  useEffect(() => {
    if (layer === covers.length) {
      setTimeout(() => setShowPortal(true), 1000);
    }
  }, [layer]);

  useEffect(() => {
    let interval;
    if (showPortal) {
      interval = setInterval(() => {
        setWishIndex((prev) => (prev + 1) % wishes.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [showPortal]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 to-pink-200 overflow-hidden relative">
      {/* Balloons */}
      {showPortal &&
        balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            initial={{ y: 500, opacity: 0 }}
            animate={{ y: -600, opacity: 1 }}
            transition={{ duration: 6, delay: balloon.delay, repeat: Infinity }}
            className="absolute w-6 h-8 rounded-full bg-pink-400"
            style={{ left: balloon.left }}
          ></motion.div>
        ))}

      {/* Fireworks */}
      {showPortal &&
        fireworks.map((fw) => (
          <motion.div
            key={fw.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 0], opacity: [1, 1, 0] }}
            transition={{ duration: 1.5, delay: fw.delay, repeat: Infinity }}
            className="absolute w-16 h-16 rounded-full border-4 border-yellow-300"
            style={{ top: fw.top, left: fw.left }}
          ></motion.div>
        ))}

      <div
        onClick={handleClick}
        className="cursor-pointer relative w-80 h-80 z-20"
      >
        <AnimatePresence>
          {layer < covers.length && (
            <motion.div
              key={covers[layer].id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: -200 }}
              transition={{ duration: 0.7 }}
              className={`absolute inset-0 flex items-center justify-center rounded-2xl shadow-xl text-white text-xl font-bold ${covers[layer].color}`}
            >
              {covers[layer].message}
            </motion.div>
          )}
        </AnimatePresence>

        {layer >= covers.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl shadow-2xl bg-white text-center p-4 overflow-hidden"
          >
            <h1 className="text-3xl font-extrabold text-pink-600 mb-4 z-10">
              Happy Birthday Sis 🎂🎈
            </h1>

            {/* Magical portal ring */}
            {showPortal && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.4, 1], opacity: [0, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute w-72 h-72 rounded-full border-4 border-pink-400 z-0"
              ></motion.div>
            )}

            {/* Wishes Carousel */}
            {showPortal && (
              <div className="z-10">
                <motion.p
                  key={`wish-${wishIndex}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-lg font-medium text-gray-700 px-2"
                >
                  {wishes[wishIndex]}
                </motion.p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GiftCard;
