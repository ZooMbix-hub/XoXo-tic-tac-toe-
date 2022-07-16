import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const AnimateModal = ({children, nameClass, onClick = Function.prototype}) => {
	return (
		<AnimatePresence>
			<motion.div 
				className={nameClass}
				onClick={onClick}
				initial={{ opacity: 0}}
				animate={{ opacity: 1}}
				exit={{ opacity: 0}}
				transition={{duration: 0.3}}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}

export default AnimateModal