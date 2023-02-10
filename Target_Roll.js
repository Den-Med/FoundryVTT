const die = new Die({number: 1, faces: 20,
                    options: { target: 2 },
                   });

const roll = Roll.fromTerms([die]);

await roll.toMessage();
