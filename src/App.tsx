import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

import "./App.css";

function App() {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState("");

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  async function submitHandler() {
    if (!ref.current) return;

    ref.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],

      define: { "process.env.NODE_ENV": "'production'", global: "window" },
    });

    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  }

  useEffect(() => {
    startService();
  }, []);

  const html = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
          </head>
          <body>
            <div id="root"></div>
            <script>
                window.addEventListener("message", (event) => {
                try{
                  eval(event.data);
                }catch(err){
                  const root = document.querySelector("#root");
                  root.innerHTML = '<div style="color:red"> <h4>Runtime Error</h4>' + err + '</div>'; 
                  console.error(err)
                }  
              })
            </script>
          </body>
        </html>
  `;

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={submitHandler}>Submit</button>
      </div>
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
}

export default App;
