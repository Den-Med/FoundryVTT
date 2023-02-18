
const dmg_txt = game.i18n.localize('DND5E.Damage');
let damage = {dmg1: "", dmg2: "", dmg3: ""};

let dialogDamge = new Dialog({
  title: dmg_txt,
  content: create_con(),
  buttons: {
    calc_b: {
      label: 'Рассчитать урон',
      callback: () => {
//        ====
        const form = document.querySelector("#dmg_apply");
        damage.dmg1 = form.damage1.value;
        damage.dmg2 = form.damage2.value;
        damage.dmg3 = form.damage3.value;
        dialogDamge.data.content = create_con();
        console.log(dmg1+dmg2+dmg3);
        dialogDamge.render(true);
      }
    },
    applyDmg: {
      label: game.i18n.localize('DND5E.ChatContextDamage'),
      callback: () => {
//        _token.actor.update(updates, {dhp: -10});
//        dialogDamge.render(true);

      }
    },
  },
  default: "close",
  close: () => {};
});

dialogDamge.render(true);

function create_con() {
  cont_l = `<form id="dmg_apply">
  <div class="form-group">
      <label style="flex: 1">${dmg_txt} 1:</label>
      <input type="text" name="dmg1" value=${damage.dmg1 || "''"} />
      <strong ></strong>
  </div>
  <div class="form-group">
    <label style="flex: 1">${dmg_txt} 2:</label>
    <input type="text" name="dmg2" value=${damage.dmg2 || "''"} />
    <strong> /2</strong>
  </div>
  <div class="form-group">
    <label style="flex: 1">${dmg_txt} 3:</label>
    <input type="text" name="dmg3" value=${damage.dmg3 || "''"} />
    <strong>/4</strong>
  </div>
  <div class="form-group">
    <label style="flex: 1">${game.i18n.localize('DND5E.PropertyTotal')}:</label>
    <input type="text" name="dmg_total" value="1" disabled/>
    <strong> </strong>
  </div>
</form>`;
  return cont_l;
};
