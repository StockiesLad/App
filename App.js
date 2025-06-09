import React, { useState, useEffect } from 'react';
import Runtime from "session/Runtime";

export const WHITE = '#FFFFFF'
export const GRAY = '#D9D9D9'
export const RED = '#941A1D'
export const BLACK = '#262626'

const runtime = new Runtime();

export default function App() {
    // 1) React state to track which screen to render
  const [ScreenComponent, setScreenComponent] = useState(() => runtime.screen);

  // 2) On first mount, run the screen logic *and* update React state
  useEffect(() => {
    // call your screen’s run() to potentially change runtimeData.currentScreen
    const screenInstance = new ScreenComponent({ runtime: runtime });
    screenInstance.upload();

    // now pull the possibly-changed screen class out of runtimeData
    setScreenComponent(() => runtime.screen);
  }, []); // [] so it only runs once, on mount

  // 3) Render whatever is now in React state
  return <ScreenComponent runtime={runtime} />;
}