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

    const cont_suf = await renderTemplate(path , {
      formula: ` + @bonus`,
      defaultRollMode,
      rollModes: CONFIG.Dice.rollModes,
      chooseModifier,

      abilities: CONFIG.DND5E.abilities
    });

content = prf_cont + cont_suf.substr(8)

confirmed = false;
new Dialog({
    title: "Проверка концентрации",
    content: content,
    buttons: {
               button1: { label: "button1", callback: () => confirmed = true },
               button2: { label: "button2", callback: () => confirmed = false }
    },

  
   close: html => {
       (async () => {
                   dmg_val = html.find('#damage')[0].value;
                   console.log(tttt)
                   if (confirmed && dmg_val > 0) { chat_text = dmg_val 
                                   ChatMessage.create({ content : chat_text })
                                  };
                             
           

       })();
   }
}).render(true);
