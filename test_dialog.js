let content = `
              <p>Text1</p>
              <p>Text2</p>
              `;

new Dialog({
    title: "TestTitle",
    content: content,
    buttons: {
               button1: { label: "button1", callback: () => confirmed = true },
               button2: { label: "button2", callback: () => confirmed = false }
    },
    default: "def_test",
  
   close: html => {
     (async () => {
                   if (confirmed) { chat_text = "b1" }
                             else { chat_text = "b2" };
           
                   ChatMessage.create({ content : chat_text })
              })();
   }
}).render(true);
