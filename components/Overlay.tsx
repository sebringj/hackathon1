/** @jsx h */
import { h, FunctionComponent as FC } from "preact";

const Overlay: FC<{ show: boolean, opacity?: number }> = ({ show, children, opacity }) => {
  return (
      <div style={{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        pointerEvents: show ? 'all' : 'none',
        backgroundColor: `rgba(255, 255, 255, ${opacity || '0.5'})`,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: show ? 1 : 0,
        }}>
        {children}
      </div>
  );
}

export default Overlay
