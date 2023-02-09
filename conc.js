const flavor = "test"

     const rollData = foundry.utils.mergeObject({
//      data,
      title: "test",
      flavor,
      halflingLucky: this.getFlag("dnd5e", "halflingLucky"),
      targetValue: 2,
//      messageData: {
//        speaker: speaker,
//        "flags.dnd5e.roll": {type: "death"}
//      }
    }, options);
const roll = await d20Roll(rollData);
