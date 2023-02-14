c_token = _token;
if (!c_token.controlled) { 
     ui.notifications.warn('Не выбран токен!')
     return;
};
save_bonus = c_token.actor.system.abilities.con.save;
path = `systems/dnd5e/templates/chat/roll-dialog.hbs`;
// ======================================

const cont = await renderTemplate(path , {
 formula: `1d20 + ` + save_bonus + ` + @bonus`,
 rollModes: CONFIG.Dice.rollModes,
});
var cont_elem = document.createElement(`form`);
cont_elem.innerHTML = cont;
var v_div = document.createElement(`div`);
v_div.classList.add(`form-group`);
v_div.innerHTML = '<label>Урон:</label>\n<input type="number" name="damage" min="1" placeholder="полученный урон">';
cont_elem.insertBefore(v_div, cont_elem.childNodes[0])
content = cont_elem.outerHTML;
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
            const form = html[0].querySelector("form");
            dmg_val = form.damage.value;
            rollMode = form.rollMode.value;
            if (dmg_val < 1) { 
                 ui.notifications.warn('Уронне может быть меньше 1');
                 return; 
            };
            con_bonus = form.bonus.value;
            con_roll(dmg_val, confirmed, con_bonus, rollMode)
       })();
   }
}).render(true);

function con_roll(dmg, mod, bon, rmod) {
     target_val = Math.max(10, dmg);
     switch (mod) {
          case 1: //Advantage
               modif = [`kh`];
//               num_d = 2;
               break;
          case 0: //Normal
               modif = undefined;
//               num_d = 1;
               break;
          case -1: //Disadvantage
               modif = [`kl`];
//               num_d = 2;
               break;
          default:
               console.error(`con_check.js - callback error`)
               return;
     };
     if (!modif) {num_d = 2} else {num_d = 1};
     const die = new Die({number: num_d, faces: 20, modifiers: modif,
                    options: { target: target_val },
                   });
     const roll = new Roll.fromTerms([die]);
     const save_b = new Roll(`+` + save_bonus);
     const bonus_roll = new Roll(bon);
     if ( !(bonus_roll.terms[0] instanceof OperatorTerm) && bonus_roll.terms[0] ) save_b.terms.push(new OperatorTerm({operator: "+"}));
     roll.terms = roll.terms.concat(save_b.terms, bonus_roll.terms);
     roll._formula = roll.constructor.getFormula(roll.terms);
     descr = `Проверка концентрации. Сложность: ` + target_val;
     roll.toMessage({speaker: ChatMessage.getSpeaker(),
                     flavor: descr},
                    {rollMode: rmod} 
                   );
};
