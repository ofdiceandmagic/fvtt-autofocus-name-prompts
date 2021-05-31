Hooks.on('renderDialog', () => {
  document.querySelectorAll('#entity-create input[name=name]')[0].focus();
});
