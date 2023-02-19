
const dmg_txt = game.i18n.localize('DND5E.Damage');
const dmg = {v: '', m: '', t: ''}
let damage = {dmg1: deepClone(dmg), dmg2: deepClone(dmg), dmg3: deepClone(dmg), dmg_total: 0};

let dialogDamge = new Dialog({
  title: dmg_txt,
  content: create_con(),
  buttons: {
    calc_b: {
      label: 'Рассчитать урон',
      callback: () => {
        const dmg_form = document.querySelectorAll("#dmg_apply input");
        for (let node_d of dmg_form){
          if (node_d.name in damage) damage[node_d.name].v = node_d.value
        };
        dialogDamge.data.content = create_con();
        damageCalc()
        console.log(damage);
        dialogDamge.render(true);
      }
    },
    applyDmg: {
      label: game.i18n.localize('DND5E.ChatContextDamage'),
      callback: () => {
        dialogDamge.render(true);
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
      <input type="text" name="dmg1" value=${damage.dmg1.v || "''"} />
      <strong>${' =' + damage.dmg1.t}</strong>
  </div>
  <div class="form-group">
    <label style="flex: 1">${dmg_txt} 2:</label>
    <input type="text" name="dmg2" value=${damage.dmg2.v || "''"} />
    <strong>${' /2 = ' + damage.dmg2.t}</strong>
  </div>
  <div class="form-group">
    <label style="flex: 1">${dmg_txt} 3:</label>
    <input type="text" name="dmg3" value=${damage.dmg3.v || "''"} />
    <strong>${' /4 = ' + damage.dmg3.t}</strong>
  </div>
  <div class="form-group">
    <label style="flex: 1">${game.i18n.localize('DND5E.PropertyTotal')}:</label>
    <input type="text" name="dmg_total" value=${damage.dmg_total} disabled/>
    <strong> </strong>
  </div>
</form>`;
  return cont_l;
};

function damageCalc() {
  rollDamage(damage.dmg1, '');
  rollDamage(damage.dmg2, '/2');
  rollDamage(damage.dmg3, '/4');
  damage.dmg_total = damage.dmg1.t + damage.dmg2.t + damage.dmg3.t;
};

function rollDamage(i_dmg, mod){
  if (!i_dmg.v) {
    i_dmg.t = 0;
    i_dmg.m = i_dmg.v;
  } else if (i_dmg.v != i_dmg.m) {
    formula = mod ? '(' + i_dmg.v + ')' + mod : i_dmg.v;
    dmg_r = new Roll(formula);
    dmg_r.evaluate({async: false});
    i_dmg.t = parseInt(dmg_r._total);
    i_dmg.m = i_dmg.v;
  };
};
