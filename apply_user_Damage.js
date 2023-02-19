
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
        dmg_form.forEach((node_d)=>{
          if (node_d.name in damage) damage[node_d.name].v = node_d.value
        });
        dialogDamge.data.content = create_con();
        damageCalc()
        console.log(damage);
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
    <input type="text" name="dmg_total" value=${damage.dmg_total} disabled/>
    <strong> </strong>
  </div>
</form>`;
  return cont_l;
};

function damageCalc() {
  if (damage.dmg1.v != damage.dmg1.m){
    dmg_r = new Roll(damage.dmg1.v);
    dmg_r.evaluate({async: false});
    damage.dmg1.t = parseInt(dmg_r._total);
    damage.dmg1.m = damage.dmg1.v;
  };
  if (damage.dmg2.v != damage.dmg2.m){
    dmg_r = new Roll('(' + damage.dmg2.v + ')/2');
    dmg_r.evaluate({async: false});
    damage.dmg2.t = parseInt(dmg_r._total);
    damage.dmg2.m = damage.dmg2.v;
  };
  if (damage.dmg3.v != damage.dmg3.m){
    dmg_r = new Roll('(' + damage.dmg3.v + ')/4');
    dmg_r.evaluate({async: false});
    damage.dmg3.t = parseInt(dmg_r._total);
    damage.dmg3.m = damage.dmg3.v;
  };
  damage.dmg_total = damage.dmg1.t + damage.dmg2.t + damage.dmg3.t;
};
