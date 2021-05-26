const ENTER_KEY_KOD = 13;
export const isCtrlEnterKey = (evt) => (evt.ctrlKey || evt.key === 'Meta') && evt.keyCode === ENTER_KEY_KOD;

export const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};
