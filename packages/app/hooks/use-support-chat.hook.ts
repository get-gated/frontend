export function useSupportChat() {
  const show = () => {
    window.Intercom('show');
  };

  const hide = () => {
    window.Intercom('hide');
  };

  return { show, hide };
}
