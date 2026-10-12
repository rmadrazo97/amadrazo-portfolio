/**
 * Fixed drawing-sheet chrome: hairline border, registration marks, ruler ticks,
 * and a faint paper grain. Sits over the page and never receives clicks.
 */
export default function SheetFrame() {
  return (
    <>
      <div className="sheet-grain" aria-hidden="true" />
      <div className="sheet-frame" aria-hidden="true">
        <span className="sheet-cross sheet-cross-nw" />
        <span className="sheet-cross sheet-cross-ne" />
        <span className="sheet-cross sheet-cross-sw" />
        <span className="sheet-cross sheet-cross-se" />
      </div>
    </>
  );
}
