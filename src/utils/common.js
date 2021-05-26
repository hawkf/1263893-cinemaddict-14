const ENTER_KEY_CODE = 13;
export const isCtrlEnterKey = (evt) => (evt.ctrlKey || evt.key === 'Meta') && evt.keyCode === ENTER_KEY_CODE;

export const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};
