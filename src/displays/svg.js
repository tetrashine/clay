const PathToSvgIcon = (d, size, className='', style='') => {
  const MENU_CLASS = `class="${className}"`;
  const STYLE = `style="${style}"`;
  const ICON_SIZE = `width="${size}" height="${size}"`;
  return `<svg ${MENU_CLASS} ${STYLE} viewBox="0 0 24 24" ${ICON_SIZE}><g><g><path d="${d}"/></g></g></svg>`;
}
const MuiSize = 18;
const MuiPathToSvgIcon = (d, {className, style}={className: '', style: ''}) => PathToSvgIcon(d, MuiSize, className, style);
export const MoreVert = MuiPathToSvgIcon("M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z");
export const ArrowDown = MuiPathToSvgIcon("M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z");
export const ArrowUp = MuiPathToSvgIcon("M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z");
export const ArrowForward = MuiPathToSvgIcon("M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z");
export const Delete = MuiPathToSvgIcon("M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z");
export const Add = MuiPathToSvgIcon("M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z");
export const CancelInRed = MuiPathToSvgIcon("M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z", { style: "fill:#E21B1B;"});
export const Play = MuiPathToSvgIcon("M8 5v14l11-7z");
export const Pause = MuiPathToSvgIcon("M6 19h4V5H6v14zm8-14v14h4V5h-4z");
export const Stop = MuiPathToSvgIcon("M6 6h12v12H6z");
export const Undo = MuiPathToSvgIcon("M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z");
export const Redo = MuiPathToSvgIcon("M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z");
export const ZoomIn = MuiPathToSvgIcon("M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z");
export const ZoomOut = MuiPathToSvgIcon("M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z");
export const FormatColorFill = MuiPathToSvgIcon("M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z");
export const FormatColorText = MuiPathToSvgIcon("M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z");