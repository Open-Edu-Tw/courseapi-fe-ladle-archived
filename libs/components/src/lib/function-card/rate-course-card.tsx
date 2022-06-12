import React from 'react';

import type { StarScore } from '../rate-slider.js';
import { RateSlider } from '../rate-slider.js';

export type RateCourseCardProps = {
	currentScore: number;
	onRated: (score: StarScore) => void;
};

export function RateCourseCard({ currentScore, onRated }: RateCourseCardProps) {
	return (
		<section className="space-y-2 rate-course-card">
			<h2 className="pb-1 text-xl font-bold">課程評分</h2>
			<p>目前這個課程得到了 {currentScore} 的分數，也歡迎您的評價～</p>
			<RateSlider onClick={onRated} />
		</section>
	);
}

export default RateCourseCard;
