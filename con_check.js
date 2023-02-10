let content = `
              <form>
                 <div class="form-group">
                    <input type="number" id="damage" name="damage" size="4" placeholder="Введите полученный урон">
                 </div>
                 <div class="form-group">
                    <input type="number" id="damage" name="damage" size="4" placeholder="Ситуационный бонус, на пример 1d4">
                 </div>
              </form>
              `;

new Dialog({
    title: "Проверка концентрации",
    content: content,
    buttons: {
               button1: { label: "button1", callback: () => confirmed = true },
               button2: { label: "button2", callback: () => confirmed = false }
    },

  
   close: html => {
       (async () => {
                   dmg_val = html.find('#damage')[0].value
                   if (confirmed) { chat_text = dmg_val 
                                   ChatMessage.create({ content : chat_text })
                                  }
                             
           

       })();
   }
}).render(true);
