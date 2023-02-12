path = `systems/dnd5e/templates/chat/roll-dialog.hbs`;
defaultRollMode = `publicroll`;
chooseModifier  = false;
tttt = `Hellow World`
prf_cont = `<form>
     <div class=\"form-group\">
         <label>Урон:</label>
         <input type="number" id="damage" name="damage" size="4" placeholder="полученный урон">
     </div>
          `
// ======================================

const cont_suf = await renderTemplate(path , {
 formula: ` + @bonus`,
 defaultRollMode,
 rollModes: CONFIG.Dice.rollModes,
 chooseModifier,
 abilities: CONFIG.DND5E.abilities
});
content = prf_cont + cont_suf.substr(8);
// ====================================

confirmed = false;
new Dialog({
    title: "Проверка концентрации",
    content: content,
    buttons: {
               advantage: {    label: game.i18n.localize("DND5E.Advantage"),    callback: () => confirmed = 'a' },
               normal: {       label: game.i18n.localize("DND5E.Normal"),       callback: () => confirmed = 'n' },
               disadvantage: { label: game.i18n.localize("DND5E.Disadvantage"), callback: () => confirmed = 'd' },
    },

   close: html => {
       (async () => {
                   dmg_val = html.find('#damage')[0].value;
                   console.log(tttt + 1)
                   test_fun()
       })();
   }
}).render(true);

console.log(tttt + 2);

function test_fun() {console.log(tttt + 3)};
