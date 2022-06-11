import React, { useCallback, useReducer } from 'react';

import { FilledStarIcon, StrokeStarIcon } from './icons.js';

export type LockFlag = boolean;
export type StarScore = 1 | 2 | 3 | 4 | 5;
export type OnOperated = (operateAt: StarScore) => void;

export type RateSliderProps =
	| {
			onMouseOver?: OnOperated;
			onClick: OnOperated;
			disabled?: false;
	  }
	| {
			onMouseOver?: undefined;
			onClick?: undefined;
			disabled: true;
	  };

/**
 * CourseAPI 的評價滑動選擇器。
 *
 * 它會動態在滑動時即時顯示目前選取的星星，
 * 以及在點擊時記錄目前選取的星星。
 *
 * @example
 * import { RateSlider } from "@courseapi-fe/components";
 *
 * // 使用者點選星星時，會觸發 `onClick` 事件。以本 callback 為例，則是顯示目前的星星。
 * // 另外也可以選擇性加上 `onMouseOver` 事件的監聽。這個事件舉例來說，可以讓您以文字化的形式顯示目前選擇的星星。
 * <RateSlider onClick={(star) => console.log(star)} />
 *
 * // disabled 為 true 時，就不會接收任何事件。
 * <RateSlider disabled />
 */
export const RateSlider = ({
	// eslint-disable-next-line react/prop-types
	onMouseOver,
	// eslint-disable-next-line react/prop-types
	onClick,
	// eslint-disable-next-line react/prop-types
	disabled,
}: RateSliderProps) => {
	const memoedStarReducer = useCallback(starReducer, []);
	const [starState, starDispatcher] = useReducer(memoedStarReducer, {
		displayStar: 0,
		savedStar: 0,
	});

	const onMouseOverForIcons = useCallback(
		(star: StarScore) => {
			// Do nothing when disabled.
			if (disabled) return;

			starDispatcher({
				type: StarReducerActionType.PushDisplayStar,
				star,
			});
			if (onMouseOver) onMouseOver(star);
		},
		[disabled, onMouseOver],
	);

	const onMouseOutForIcons = useCallback(() => {
		// Do nothing when disabled.
		if (disabled) return;

		starDispatcher({ type: StarReducerActionType.PopDisplayStar });
	}, [disabled]);

	const onClickForIcons = useCallback(
		(star: StarScore) => {
			// Do nothing when disabled.
			if (disabled) return;

			starDispatcher({
				type: StarReducerActionType.SaveStar,
				star,
			});
			if (onClick) onClick(star);
		},
		[disabled, onClick],
	);

	const ActableStarIconFactory = useCallback(
		(props: { starOfThis: StarScore }) => (
			<ActableStarIcon
				starOfThis={props.starOfThis}
				currentDisplayStar={starState.displayStar}
				onMouseOver={onMouseOverForIcons}
				onMouseOut={onMouseOutForIcons}
				onClick={onClickForIcons}
			/>
		),
		[
			onClickForIcons,
			onMouseOutForIcons,
			onMouseOverForIcons,
			starState.displayStar,
		],
	);

	return (
		<div className="flex items-center">
			<ActableStarIconFactory starOfThis={1} />
			<ActableStarIconFactory starOfThis={2} />
			<ActableStarIconFactory starOfThis={3} />
			<ActableStarIconFactory starOfThis={4} />
			<ActableStarIconFactory starOfThis={5} />
		</div>
	);
};

/**
 * 要向 Reducer 執行的動作。
 */
enum StarReducerActionType {
	/**
	 * `onMouseOver` 時，設定要向使用者展示（亮燈）的 Star。
	 *
	 * 在 `onMouseOut` 的時候，應呼叫 `PopDisplayStar`
	 * 恢復到 `SaveStar` 設定的值。
	 */
	PushDisplayStar = 'push_display_star',
	/**
	 * 使用者實際要送出的 Star。通常是 `onClick` 的時候觸發。
	 */
	SaveStar = 'save_star',
	/**
	 * `onMouseOut` 時，要將展示（亮燈）Star
	 * 恢復回 `SaveStar` 值的操作。
	 */
	PopDisplayStar = 'pop_display_star',
}

type StarReducerAction =
	| {
			type:
				| StarReducerActionType.PushDisplayStar
				| StarReducerActionType.SaveStar;
			/**
			 * 要存入的 star。
			 */
			star: 0 | StarScore;
	  }
	| { type: StarReducerActionType.PopDisplayStar };

type StarReducerInnerState = {
	/**
	 * 使用者看到的 star。
	 */
	displayStar: 0 | StarScore;
	/**
	 * 實際要送出 / 恢復的 star。
	 */
	savedStar: 0 | StarScore;
};

const starReducer = (
	state: StarReducerInnerState,
	action: StarReducerAction,
): StarReducerInnerState => {
	switch (action.type) {
		case StarReducerActionType.PushDisplayStar:
			return { ...state, displayStar: action.star };
		case StarReducerActionType.SaveStar:
			return { ...state, savedStar: action.star };
		case StarReducerActionType.PopDisplayStar:
			return { ...state, displayStar: state.savedStar };
		default:
			throw new TypeError('no such an action type');
	}
};

type ActableStarIconProps<CurrentStar extends StarScore = StarScore> = {
	onMouseOver: (star: CurrentStar) => void;
	onMouseOut: () => void;
	onClick: (star: CurrentStar) => void;
	starOfThis: CurrentStar;
	currentDisplayStar: 0 | StarScore;
};

const ActableStarIcon = <C extends StarScore>({
	onMouseOver,
	onMouseOut,
	onClick,
	starOfThis,
	currentDisplayStar,
}: ActableStarIconProps<C>) => {
	return (
		<button
			type="button"
			className="px-4 py-1"
			onMouseOver={() => {
				onMouseOver(starOfThis);
			}}
			onMouseOut={onMouseOut}
			onClick={() => {
				onClick(starOfThis);
			}}
		>
			<MemoedStarIcon enabled={currentDisplayStar >= starOfThis} />
		</button>
	);
};

const StarIcon = ({ enabled }: { enabled: boolean }) =>
	enabled ? (
		<FilledStarIcon width="20px" height="20px" />
	) : (
		<StrokeStarIcon width="20px" height="20px" />
	);
const MemoedStarIcon = React.memo(StarIcon);

export default React.memo(RateSlider);
