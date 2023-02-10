debugger
const die = new Die({number: 1, faces: 20,
                    options: { target: 2 },
                   });

const roll = Roll.fromTerms([die]);

// inserting bonus
const bonus = new Roll(`1d8`);
if ( !(bonus.terms[0] instanceof OperatorTerm) ) roll.terms.push(new OperatorTerm({operator: "+"}));
roll.terms = roll.terms.concat(bonus.terms)
roll._formula = roll.constructor.getFormula(roll.terms);

// rolling
await roll.toMessage();
