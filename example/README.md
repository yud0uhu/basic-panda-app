# Example

**参考資料**

- [Panda CSS - Chakra UI の Zero Runtime CSS フレームワーク](https://zenn.dev/cybozu_frontend/articles/panda-is-coming)

## 基本文法

`className` の後に`css({})`とすることで css を記述することができる

```tsx
import { css } from "../styled-system/css";
import { stack, vstack, hstack } from "../styled-system/patterns";

function Example() {
  return (
    <div>
      <div className={hstack({ gap: "30px", color: "pink.300" })}>Box 1</div>
      <div className={css({ fontSize: "lg", color: "red.400" })}>Box 2</div>
    </div>
  );
}
```

## Dynamic styling

静的 CSS のみサポートしている

```tsx
// この書き方はできない
import { useState } from "react";
import { css } from "../styled-system/css";

const App = () => {
  const [color, setColor] = useState("red.300");

  return (
    <div
      className={css({
        // ❌ Avoid: Panda can't determine the value of color at build-time
        color,
      })}
    />
  );
};
```

```tsx
// この書き方はできる
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  staticCss: {
    css: [
      {
        properties: {
          // ✅ Good: Pre-generate the styles for the color
          color: ["red.300"],
        },
      },
    ],
  },
});
```

Panda CSS のサポートする`token()` 関数で実行時のトークンの生の値をクエリできる

```tsx
import { useState } from "react";
import { css } from "../styled-system/css";
import { token } from "../styled-system/tokens";

const Component = (props) => {
  return (
    <div
      className={css({
        // ✅ Good: Store the value in a CSS custom property
        color: "var(--color)",
      })}
      style={{
        // ✅ Good: Handle the runtime value in the style attribute
        "--color": token(`colors.${props.color}`),
      }}
    >
      Dynamic color with runtime value
    </div>
  );
};

// App.tsx
const App = () => {
  const [runtimeColor, setRuntimeColor] = useState("pink.300");

  return <Component color={runtimeColor} />;
};
```

- css カスタムプロパティの参照を取得する

```tsx
import { useState } from "react";
import { token } from "../styled-system/tokens";

const Component = (props) => {
  return (
    <div
      style={{
        // ✅ Good: Dynamically generate CSS custom property from the token
        color: token.var(`colors.${props.color}`),
      }}
    >
      Dynamic color with runtime value
    </div>
  );
};

const App = () => {
  const [runtimeColor, setRuntimeColor] = useState("yellow.300");

  return <Component color={runtimeColor} />;
};
```

- props を渡す

> すべての prop-value ペアが静的に抽出可能である限り、Panda は自動的に CSS を生成する

```tsx
import { styled } from "../styled-system/jsx";

const Card = (props) => {
  return <styled.div px="4" py="3" {...props} />;
};

const App = () => {
  return (
    <Card color="blue.300">
      <p>Some content</p>
    </Card>
  );
};
```

**参考資料**
[Dynamic styling](https://panda-css.com/docs/guides/dynamic-styling)

## 例 : 動的に style を書き換える

```tsx

```
