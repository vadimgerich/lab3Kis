import Bugalt from "./model";

export default {
    async run(req, res) {
        try {
            await Bugalt.deleteMany({});
            const bugalts = [
                {
                    pib: "pib1",
                    posada: "posada1",
                    payment: 100,
                    countOfChilds: 1,
                    stage: 368
                },
                {
                    pib: "pib2",
                    posada: "posada2",
                    payment: 101,
                    countOfChilds: 2,
                    stage: 362
                },
                {
                    pib: "pib3",
                    posada: "posada3",
                    payment: 103,
                    countOfChilds: 3,
                    stage: 363
                },
                {
                    pib: "pib4",
                    posada: "posada4",
                    payment: 104,
                    countOfChilds: 4,
                    stage: 364
                },
                {
                    pib: "pib5",
                    posada: "posada5",
                    payment: 105,
                    countOfChilds: 5,
                    stage: 365
                },
                {
                    pib: "pib6",
                    posada: "posada6",
                    payment: 106,
                    countOfChilds: 6,
                    stage: 366
                }
            ];

            bugalts.forEach(async bugalt => await new Bugalt(bugalt).save());
        } catch (error) {
            console.log(error)
        }
    }
}
