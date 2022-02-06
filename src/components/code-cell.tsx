import { useState } from "react";

import bundle from "../bundler";
import CodeEditor from "../components/code-editor";
import Preview from "../components/preview";

function CodeCell() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  async function submitHandler() {
    const output = await bundle(input);
    setCode(output);
  }

  return (
    <div>
      <CodeEditor
        intialValue="const x = 3;"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={submitHandler}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
}

export default CodeCell;
