# 建立 CourseAPI 組件的 Story

> 這份文件還沒寫完 orz

## Story 的位置

原則上置於與 tsx 同目錄：

```plain
- button.tsx
- button.stories.tsx
```

icons 的 stories 是特例，因為 icon 都是 export 在同個檔案，
因此我有另外開一個 `stories/` 放各個 icons 的 story：

```plain
- icons.tsx
- stories
  - bars.stories.tsx
  - download.stories.tsx
  - [圖示代號].stories.tsx
```

## Story 的範本

詳細寫法可參見 <https://ladle.dev/docs/stories>。

```tsx
// [component].stories.tsx

import type { Story } from '@ladle/react';
import React from 'react';

import type { ComponentProps } from './[component].js';
import { Component } from './[component].js';

// eslint-disable-next-line react/function-component-definition
export const Default: Story<ComponentProps> = (props) => (
  <Component {...props} />
);
Default.args = {};
Default.argTypes = {};
```
