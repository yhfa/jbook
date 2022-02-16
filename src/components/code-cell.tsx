import { useState } from "react";

import bundle from "../bundler";
import CodeEditor from "../components/code-editor";
import Preview from "../components/preview";
import Resizable from "../components/resizable";

function CodeCell() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  async function submitHandler() {
    const output = await bundle(input);
    setCode(output);
  }

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            intialValue="const x = 3;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>

        <Preview code={code} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
