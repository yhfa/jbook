import { ResizableBox } from "react-resizable";

import "./resizable.css";

interface ResizableProps {
  direction: "horizonatl" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox
      width={Infinity}
      height={300}
      resizeHandles={["s"]}
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
      minConstraints={[Infinity, 48]}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
