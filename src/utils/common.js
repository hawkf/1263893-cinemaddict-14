export const isCtrlEnterKey = (evt) => evt.ctrlKey && evt.keyCode === 13;

export const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};
