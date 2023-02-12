c_token = _token;
if (!c_token.controlled) { 
     ui.notifications.warn('Не выбран токен!')
     return;
};
save_bonus = c_token.actor.system.abilities.con.save;
path = `systems/dnd5e/templates/chat/roll-dialog.hbs`;
defaultRollMode = `publicroll`;
chooseModifier  = false;
tttt = `Hellow World`;
prf_cont = `<form>
     <div class=\"form-group\">
         <label>Урон:</label>
         <input type="number" name="damage" size="4" placeholder="полученный урон">
     </div>
          `;
suf_cont = `</form>`;
// ======================================

const cont = await renderTemplate(path , {
 formula: `1d20 + ` + save_bonus + ` + @bonus`,
 defaultRollMode,
 rollModes: CONFIG.Dice.rollModes,
 chooseModifier,
 abilities: CONFIG.DND5E.abilities
});
content = prf_cont + cont.slice(8, -368) + suf_cont;
// ====================================

confirmed = false;
new Dialog({
    title: "Проверка концентрации",
    content: content,
    buttons: {
         advantage:    { label: game.i18n.localize("DND5E.Advantage"),    callback: () => confirmed = 1 },
         normal:       { label: game.i18n.localize("DND5E.Normal"),       callback: () => confirmed = 0 },
         disadvantage: { label: game.i18n.localize("DND5E.Disadvantage"), callback: () => confirmed = -1 },
    },

   close: html => {
       (async () => {
            if (confirmed < -1 || confirmed > 1 ) { return };
            const form = html[0].querySelector("form");
            dmg_val = form.damage.value;
            if (dmg_val < 1) { 
                 ui.notifications.warn('Уронне может быть меньше 1');
                 return; 
            };
            con_bonus = form.bonus.value;
            con_roll(dmg_val, confirmed, con_bonus)
       })();
   }
}).render(true);

function con_roll(dmg, mod, bon) {
     target_val = Math.max(10, dmg);
     switch (mod) {
          case 1:
               modif = [`kh`];
               num_d = 2;
               break;
          case 0:
               modif = undefined;
               num_d = 1;
               break;
          case -1:
               modif = [`kl`];
               num_d = 2;
               break;
     };
     const die = new Die({number: num_d, faces: 20, modifiers: modif,
                    options: { target: target_val },
                   });
     const roll = Roll.fromTerms([die]);
     const save_b = new Roll(`+` + save_bonus);
     const bonus_roll = new Roll(bon);
     if ( !(bonus_roll.terms[0] instanceof OperatorTerm) && bonus_roll.terms[0] !== undefined ) save_b.terms.push(new OperatorTerm({operator: "+"}));
//     save_b.terms = save_b.terms.concat(bonus_roll.terms);
     roll.terms = roll.terms.concat(save_b.terms, bonus_roll.terms);
     roll._formula = roll.constructor.getFormula(roll.terms);
     descr = `Проверка концентрации, при уроне ` + target_val;
     roll.toMessage({
          speaker: ChatMessage.getSpeaker(),
          flavor: descr});
};
