import Runtime from "session/Runtime";

export const WHITE = '#FFFFFF'
export const GRAY = '#D9D9D9'
export const RED = '#941A1D'
export const BLACK = '#262626'

const runtime = new Runtime();

export default function App() {
    var screen = runtime.screen;
    screen.run();
    return screen.render();
}