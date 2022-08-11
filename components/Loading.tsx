/** @jsx h */
import { h, FunctionComponent as FC } from "preact";
import Overlay from './Overlay.tsx'

const Loading: FC<{ show: boolean }> = ({ show }) => {
  return <Overlay show={show}><img src="/loading.svg" style="width: 100px; height: 100px;" /></Overlay>
}

export default Loading
