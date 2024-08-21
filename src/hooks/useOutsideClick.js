import { useEffect, useRef } from "react";

function useOutsideClick(handler, listenCapturing = true) {
  // 设置useRef钩子
  const ref = useRef();

  // Detecting a Click Outside the Modal
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    // 第三个参数 true 表示事件的捕获阶段, false 表示冒泡阶段
    // 捕获阶段（Capturing Phase): 事件从根元素（如 document）开始向目标元素传播。如果你在添加事件监听器时将第三个参数设置为 true，处理程序会在事件到达目标元素之前被触发。这意味着事件会在捕获阶段被处理。
    // 冒泡阶段（Bubbling Phase): 事件从目标元素向根元素传播。如果第三个参数是 false（或者省略），事件处理程序会在事件的冒泡阶段被触发。这意味着事件会在目标元素之后，向上传播到其父元素、祖先元素等，直到根元素。
    document.addEventListener("click", handleClick, listenCapturing);

    // 卸载EventListener
    return () => document.removeEventListener("click", handleClick);
  }, [handler]);

  return { ref };
}

export default useOutsideClick;

