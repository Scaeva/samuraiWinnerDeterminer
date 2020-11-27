'use strict';
const testsOutput = [];
const it = (desc, fn) => {
    try{
        fn();
        testsOutput.push(`\u2714 ${desc}`);
    } catch (error){
        testsOutput.push(`\u2718 ${desc}`);
        testsOutput.push(error);
    }
}
const assert = (trueFn) => {
    var result = trueFn();
    if(!result){
        throw new Error(`${trueFn} is not true`);
    }
}
const runTests = (tests) => {
    for (let index = 0; index < tests.length; index++) {
        const testFn = tests[index];
        testFn();
    }
}

const tests = [
    () => it('Given_EmptyPlayersStats_When_DetermineWinner_Then_EqualsFalse', () => assert(() => determineWinner({}) === false)),
    () => it('Given_PlayersStats_When_DetermineWinner_Then_WinnerMatch', () => {
        assert(() => determineWinner({red: {rice: 2}})[0].player === 'red');
        assert(() => determineWinner({blue: {buddhas: 2}})[0].player === 'blue');
        assert(() => determineWinner({
        /*
            (E.g. red has 5 helmets, 3 buddhas, and 1 rice field.
            blue has 2 helmets, 3 buddhas, and 2 rice fields.
            red has the majority in helmets (his 5 vs blue's 2).
            Both players are tied in buddhas (3 vs 3) while blue has the majority in rice (his 2 vs red's 1).
            red's other figures would be 4 (3 buddhas + 1 rice field)
            while blue's other figures would be 5 (2 helmets + 3 buddhas).
            blue wins even though red has more total figures.
        */
            red: {helmets: 5, buddhas: 3, rice: 1},
            blue: {helmets: 2, buddhas: 3, rice: 2}
        })[0].player === 'blue');

    })
    //TODO: add invalid players
    //TODO: add invalid types
];