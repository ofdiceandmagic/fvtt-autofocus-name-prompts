/**
 * Welcome Message
 */
 const MODNAME = 'autofocus-name-prompts';

 Hooks.on('ready', async() => {
 
	 game.settings.register(MODNAME, "version", {
		 name: `${MODNAME} version.`,
		 scope: "client",
		 config: false,
		 default: '0.0.0',
		 type: String
	 });
 
	 game.settings.register(MODNAME, "show-welcome-message", {
		 name: `${MODNAME} version.`,
		 scope: "client",
		 config: false,
		 default: true,
		 type: Boolean
	 });    
 
	 const currentV = game.modules.get(MODNAME).data.version;
	 const oldV = game.settings.get(MODNAME, "version");
	 const isNewV = isNewerVersion(currentV, oldV);
	 let renderDialog = false;
 
	 if (isNewV){
		 //if it is a new version
		 game.settings.set(MODNAME, "version", currentV);
	 }
	 if ((game.user.isGM && (game.settings.get(MODNAME, "show-welcome-message") || isNewV) )){
		//if user is gm and either show-welcome-message is true or its a new version, set renderDialog to true
		renderDialog = true;
	}
 
 
	 const html = await renderTemplate(`modules/${MODNAME}/templates/welcome-screen.html`);
 
	 new Dialog({
		 title: `${MODNAME} - Welcome Screen`,
		 content: html,
		 buttons: {
		   welcome: {
			 label: "Okay",
			 callback: async() => {
			   checkWelcome();
			 }
		   }
		 },
		 default: "welcome",
		 close: () => checkWelcome()
	   }).render(renderDialog);
	 
	   function checkWelcome(){
		 let version = "0.0.0";
		 let checkBox = document.querySelectorAll('.show-again')[0].checked;
		 if (checkBox) {
			 //its checked, so they don't want it to show again until the next update.
			 version = currentV;
			 game.settings.set(MODNAME, "version", version);
			 game.settings.set(MODNAME, "show-welcome-message", false);
		 }
	   }
 
 });
//________________________________________________________________________________________________________



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