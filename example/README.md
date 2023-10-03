# Example

**参考資料**

- [Panda CSS - Chakra UI の Zero Runtime CSS フレームワーク](https://zenn.dev/cybozu_frontend/articles/panda-is-coming)

- [プロジェクトへの導入方法](https://panda-css.com/docs/installation/nextjs?value=pages-dir)
  - styled-sytem は自動生成されるため、gitignore 推奨

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

Type Safe かつ VS Code での補間に対応
![image](https://github.com/yud0uhu/basic-panda-app/assets/60646787/80981ac2-8149-4e15-aaf6-0c0d36f56142)

- `styled-system/css`ディレクトリは、`yarn panda codegen`でビルドした結果出力される

```css
// styled-sytem/style.css
@layer reset, base, tokens, recipes, utilities;

@import "./reset.css";

@import "./global.css";

@import "./tokens/index.css";

@import "./tokens/keyframes.css";
```

## Dynamic styling

Panda CSS は静的解析を行った上でのビルドを前提としている
そのため、ビルド時に静的に分析できない値を使用する(ランタイムの値に依存する)と、意図しないスタイル値が出力される可能性がある

例えば、条件分岐を含めた静的解析では以下の点に注意する

- 同じファイル内で定義されていない変数
- 関数呼び出しの結果として得られる変数 (例`const color = getColor()` )

[Referenced values](https://panda-css.com/docs/guides/dynamic-styling#referenced-values) より

**参考資料**

- [Panda CSS の出力結果から注意点を学ぶ](https://zenn.dev/cybozu_frontend/articles/panda-output#runtime-conditions)

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

- [Dynamic styling](https://panda-css.com/docs/guides/dynamic-styling)

## 例 : 動的に style を書き換える

```tsx
import React, { useState } from "react";
import { css } from "@/styled-system/css";

const buttonStyles = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "240px",
  height: "48px",
  borderRadius: "50px",
  backgroundColor: "rgb(245, 205, 0)",
  color: "rgb(0, 0, 0)",
  fontWeight: "700",
  padding: "0.25em 1em",
  cursor: "pointer",
  transition: "all 0.2s",
  "&:active": {
    transitionDuration: "0.05s",
    boxShadow: "0 0 0.2em #0003",
    transform: "scale(0.95)",
    filter: "brightness(0.9) contrast(1.2)",
  },
  "&::before": {
    content: "'🐼'",
    display: "inline-block",
    paddingRight: "0.5em",
  },
  "@media screen and (max-width: 360px)": {
    "&::before": {
      content: "'🐱'",
    },
  },
});

const PandaButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      className={isActive ? `${buttonStyles} active` : buttonStyles}
      onClick={handleClick}
    >
      Click me
    </button>
  );
};

export default PandaButton;
```
