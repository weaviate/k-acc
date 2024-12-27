"use client"

import React from 'react';
import { motion } from 'framer-motion';

interface ComponentRotatorProps {
    cards: {
        id: string;
        component: React.ReactElement;
    }[];
}

const ComponentRotator: React.FC<ComponentRotatorProps> = ({ cards }) => {
    return (
        <div className="w-full overflow-hidden relative">
            <motion.div
                className="flex gap-4 py-8 px-4"
                animate={{
                    x: [0, -400], // Adjust this value based on your content width
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                }}
            >
                {/* Original cards */}
                {cards.map((card, index) => (
                    <div
                        key={`original-${card.id}`}
                    >
                        {card.component}
                    </div>
                ))}

                {/* Duplicated cards for seamless loop */}
                {cards.map((card, index) => (
                    <div key={`duplicate-${card.id}`}>
                        {card.component}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default ComponentRotator;
