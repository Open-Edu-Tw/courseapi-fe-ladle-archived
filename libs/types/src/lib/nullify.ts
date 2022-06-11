/**
 * 讓 T 裡面 entries 的類型變成 `undefined`.
 *
 * 舉例來說，你有一個這樣的 Record：
 *
 * ```ts
 * type Props = {
 *   onClick: () => void;
 * }
 * ```
 *
 * `Nullify<Props>` 之後會變成：
 *
 * ```ts
 * type NullifiedProps = {
 *   onClick?: undefined;
 * }
 * ```
 *
 * 這個是《嚴格取向的 React 引數傳入》十分重要的部分，
 * 詳細資訊可以見 docs 文件了解相關理念。
 */
export type Nullify<T> = {
  [P in keyof T]?: undefined;
};

export default Nullify;
