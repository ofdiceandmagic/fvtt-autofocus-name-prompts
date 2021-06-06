Hooks.on('renderDialog', () => {
  let nameInput = document.querySelectorAll('#entity-create input[name=name]')[0];
  if (!nameInput) return;
  nameInput.focus();
});
Hooks.on('renderFolderConfig', () => {
  let nameInput = document.querySelectorAll('#folder-create input[name=name]')[0];
  if (!nameInput) return;
  nameInput.focus();
});
